import { Student } from './student.model';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class StudentService {

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getStudents(): Observable<Student[]> {
    return this.authHttp.get('/api/v1/students')
        .map(res => res.json());
  }
}
