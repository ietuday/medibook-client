import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppStorage } from './app-storage.service';
import 'rxjs/add/observable/of';

/**
 * @class ExceptionService
 * @description Handles all types of exceptions in the application.
 */
@Injectable()
export class ExceptionService {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private appStorage: AppStorage) { }

  /**
   * @method log
   * @param error
   * @description logs the error to the console.
   */
  log(error: string): void {
    console.log(error);
  }

  /**
   * @method catchBadResponse
   * @param error
   * @description logs the error to the console.
   */
  catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
    const res = <Response>errorResponse;
    const err = res ? res.json() : '';
    const emsg = err.msg ?
      (err.result ? err.result.message : JSON.stringify(err)) :
      (res.statusText || 'unknown error');
    this.snackBar.open(`Error - ${emsg}`, '', {
      duration: 10000
    });
    this.handleStatusCode(res.status);
    // this.toastService.activate(`Error - Bad Response - ${emsg}`);
    Observable.throw(emsg); // TODO: We should NOT swallow error here.
    return Observable.of(emsg);
    // return null;
  }

  private handleStatusCode(statusCode: number): void {

    switch (statusCode) {
      case 401:
        if (this.appStorage.get('auth_token') != null) {
          this.appStorage.clear();
        }
        this.router.navigate(['/login']);
        break;
    }
  }
}
