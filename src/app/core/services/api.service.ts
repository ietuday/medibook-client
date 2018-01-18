import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { ExceptionService } from './exception.service';
import { AppStorage } from './app-storage.service';
import { LoadingBarService } from './../components/loading-bar/loading-bar.service';
import { EndpointService, ApiEndpointType, IApiEndpoint } from './../config/api.config';

export interface ApiParam {
  data?: Object;
  queryParams?: Object;
  pathParams?: Object;
  headers?: Object;
}

export interface Paginator {
  currentPage: number;
  limit: number;
  totalCount: number;
}

interface ApiResponse {
  result: ApiResult;
  success: boolean;
}

interface ApiResult {
  data;
  paginator?: Paginator;
  message: string
}

@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private exceptionService: ExceptionService,
    private appStorage: AppStorage,
    private endpointService: EndpointService,
    private loadingService: LoadingBarService) { }


  request(name: string, params?: ApiParam): Observable<any> {
    const endpoint = this.getEndpoint(name);
    const url = this.addPathParamsIfAny(endpoint.url, params);

    const requestOptions: RequestOptionsArgs = {
      headers: this.getHeaders(params),
      method: endpoint.method,
      body: params ? params.data : {},
      search: this.getQueryParams(params)
    }

    this.loadingService.show();
    return this.http.request(url, requestOptions)
      .map(res => this.extractData<any>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.loadingService.hide());

  }

  private addPathParamsIfAny(url: string, data: ApiParam): string {

    if (data && data.pathParams) {
      for (const key in data.pathParams) {
        if (data.pathParams[key]) {
          url = url.replace(key, data.pathParams[key]);
        }
      }
    }
    return url;
  }

  private getQueryParams(params: ApiParam): URLSearchParams {
    const queryParam = new URLSearchParams();

    if (params && params.queryParams) {
      for (const key in params.queryParams) {
        if (params.queryParams[key]) {
          const value = params.queryParams[key];
          queryParam.append(key, value);
        }
      }
    }

    return queryParam;
  }

  private getEndpoint(name: string): IApiEndpoint {
    const endpoint = this.endpointService.get(name);

    if (!endpoint) {
      throw new Error('No endpoint is registered with' + name);
    }

    return endpoint;
  }

  private getHeaders(params): Headers {
    const token = this.appStorage.get('auth_token');
    // const requestHeaders = new Headers({ 'Content-Type': 'application/json' });
    const requestHeaders = new Headers();

    // check and append authorization token
    if (token && !requestHeaders.has('authorization')) {
      requestHeaders.append('authorization', 'Bearer ' + token);
    }

    // extract and add custom headers to the request
    if (params && params.headers) {
      for (const key in params.headers) {
        if (params.headers[key]) {
          const value = params.headers[key];
          requestHeaders.append(key, value);
        }
      }
    }

    // if (!requestHeaders.get('Content-Type')) {
    //   requestHeaders.append('Content-Type', 'application/json');
    // }

    // requestHeaders.append('Content-Type', undefined);

    return requestHeaders;
  }

  private extractData<R>(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    const body = res['_body'] ? (res.json ? res.json() : null) : null;

    // if (!body.success)
    //     throw new Error('Request was not successfull with an Error ->: ' + body.result.message);

    return <R>(body || {});
  }
}
