import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
  HttpEvent
} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class LoadingBarService {

  private loadingSubject = new Subject<boolean>();
  public loadingSubscription = this.loadingSubject.asObservable();

  private counter = 0;

  private isLoading = false;

  show(): void {
    this.isLoading = true;
    this.counter++;
    this.loadingSubject.next(this.isLoading);
  }

  hide(): void {

    if (this.counter > 0) {
      this.counter--;

      // Make sure all the requests have been completed and then turn off the loading
      if (this.counter === 0) {
        this.isLoading = false;
        this.loadingSubject.next(this.isLoading);
      }
    }
  }
}

export class LoadingInterceptor implements HttpInterceptor {
  private loadingService = new LoadingBarService();
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show(); alert("text");

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        this.loadingService.hide();
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
        }
      }
    });
  }
}


