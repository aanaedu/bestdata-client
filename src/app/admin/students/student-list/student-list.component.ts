/// <reference types="datatables.net" />
import { BootstrapAlertService } from 'ng2-alert-service/bootstrap-alert.service';
import { URL_CONSTANTS } from './../../../core/shared/constants';
import { CoreService } from './../../../core/shared/core.service';
import { StudentService } from './../shared/student.service';
import { ActionType } from './../../../core/shared/enums/action-type.enum';
import { Student } from './../shared/student.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  public actionType = ActionType;
  public currentAction: ActionType;
  selectedStudent: Student;
  selectedIndex: number;
  students: Student[];

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject();

  buttonText: string;

  constructor(private studentService: StudentService, private coreService: CoreService,
                private bootstrapAlertService: BootstrapAlertService) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    if (!this.students) {
      this.studentService.getStudents()
      .subscribe(data => {
        this.students = data;
        this.dtTrigger.next();
      });
    }

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }


  action(type, index?) {
    if (!type) { type = this.actionType.Default }
    switch(type) {
      case this.actionType.Default:
        this.selectedStudent = null;
        this.rerender();
        break;
      case this.actionType.View:
        this.currentAction = this.actionType.View;
        this.selectedStudent = this.students[index];
        break;
      case this.actionType.Edit:
        this.currentAction = this.actionType.Edit;
        this.selectedStudent = this.students[index];
        this.selectedIndex = index;
        this.buttonText = "Update";
        break;
      case this.actionType.Delete:
        const name = `${this.students[index].firstName} ${this.students[index].lastName}`;
        const response = confirm(`Are you sure you want to delete student with name ${name}`);
        if (response) {
          this.coreService.deleteData(URL_CONSTANTS.STUDENTS, this.students[index]._id)
            .subscribe(res => {
              if (res) {
                  this.bootstrapAlertService.showSucccess(res.message || 'Record deleted successfully!');
                  this.students.splice(index, 1);
                  this.rerender();
              } else {
                this.bootstrapAlertService.showError(res.message || 'An error occured while processing request.')
              }
            });
        }
        break;
    }
  }

  onActionCompleted(event: {index: number, student: Student}) {
    this.students[event.index] = event.student;
    this.selectedStudent = null;
    this.rerender();
  }

}
