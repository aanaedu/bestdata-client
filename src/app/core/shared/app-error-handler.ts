import { Observable } from 'rxjs/Observable';
import { BootstrapAlertService } from 'ng2-alert-service/bootstrap-alert.service';
import { ErrorHandler } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

export class AppErrorHandler implements ErrorHandler {
    handleError(error: any): Observable<ErrorObservable> {
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body['error'] || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}