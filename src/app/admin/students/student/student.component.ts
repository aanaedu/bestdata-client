import { Student } from './../shared/student.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  pageTitle = "Create a New Student";
  
  @Input()
  student: Student;

  constructor() { }

  ngOnInit() {
    if(this.student) {
      this.pageTitle = `${this.student.firstName} ${this.student.lastName}'s Information`;
    }
  }

}
