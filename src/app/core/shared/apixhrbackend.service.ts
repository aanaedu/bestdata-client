import { URL_CONSTANTS } from './constants';
import { Injectable } from '@angular/core';
import { XHRBackend, XHRConnection } from "@angular/http";
@Injectable()

export class ApiXHRBackend extends XHRBackend {
    createConnection(request): XHRConnection {
        if (request.url.startsWith('/')) {
            request.url = URL_CONSTANTS.BASE_URL + request.url;
        }
        return super.createConnection(request);
    }

}