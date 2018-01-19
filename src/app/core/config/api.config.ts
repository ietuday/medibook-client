import { Injectable } from '@angular/core';


/**
 *
 */
export interface IApiEndpoint {
  name: string;
  method?: string;
  url: string;
  restfull?: boolean;
}

/**
 *
 */
export enum ApiEndpointType {
  GET, PUT, POST, DELETE
}

/**
 *
 */
@Injectable()
export class EndpointService {

  private readonly baseUrl = 'http://localhost:8080' ;
  // http://50.116.31.221';

  private endpoints: Array<IApiEndpoint> = [];

  constructor() {
    this.init();
  }

  /**
   * his.baseUrl
   * @param name
   */
  get(name: string): IApiEndpoint {

    const requiredEndpoint = this.endpoints.find(endpoint => endpoint.name === name);

    if (requiredEndpoint && requiredEndpoint.url.indexOf(this.baseUrl) !== 0) {// check if endpoint url has the baseUrl already.
      requiredEndpoint.url = this.baseUrl + requiredEndpoint.url;
    }

    return requiredEndpoint;
  }

  private init() {

    this.endpoints = [
      /**Login**/
      { name: 'LOGIN', url: '/login', method: 'POST' },

      /**Register**/
      {name:'REGISTER', url:'/signup', method:'POST'}

    ];
  }
}
