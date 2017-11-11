import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BootstrapAlertService } from 'ng2-alert-service/bootstrap-alert.service';
import { URL_CONSTANTS } from './constants';
import { AuthHttp, AuthHttpError } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CoreService {

  constructor(private http: Http, private authHttp: AuthHttp,
    private bootstrapAlertService: BootstrapAlertService, private router: Router) {

  }

  getData(url, data) {
    return this.authHttp.post(`/api/${URL_CONSTANTS.API_VERSION}/${url}`, data)
      .map(res => {
        if (res.status === 200) {
          return res.json();
        }
      }).catch(err => this.handleError(err));
  }

  postData(url, data) {
    return this.authHttp.post(`/api/${URL_CONSTANTS.API_VERSION}/${url}`, data)
      .map(res => {
        if (res.status === 200) {
          return res.json();
        }
      }).catch(err => this.handleError(err));
  }

  updateData(url, id, data) {
    return this.authHttp.put(`/api/${URL_CONSTANTS.API_VERSION}/${url}/${id}`, data)
      .map(res => {
        if (res.status === 200) {
          return res.json();
        }
      }).catch(err => this.handleError(err));
  }
  deleteData(url, id) {
    return this.authHttp.delete(`/api/${URL_CONSTANTS.API_VERSION}/${url}/${id}`)
      .map(res => {
        if (res.status === 200) {
          return res.json();
        }
      }).catch(err => this.handleError(err));
  }


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
