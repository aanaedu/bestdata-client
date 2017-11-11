import { ActionType } from './../../../core/shared/enums/action-type.enum';
import { BootstrapAlertService } from 'ng2-alert-service/bootstrap-alert.service';
import { URL_CONSTANTS } from './../../../core/shared/constants';
import { CoreService } from './../../../core/shared/core.service';
import { Student } from './../shared/student.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  form: FormGroup;
  actionType = ActionType;
  pageTitle = "Create a new Student";

  @Input()
  student: Student;
  @Input()
  index: number;
  @Input()
  submitBtnText: string; 
  @Input()
  action: ActionType;
  @Output()
  actionCompleted = new EventEmitter<{index: number, student: Student}>();

  constructor(private fb: FormBuilder, private coreService: CoreService,
              private router: Router, private bootstrapAlertService: BootstrapAlertService) { }

  ngOnInit() {
    if (!this.submitBtnText) { this.submitBtnText = 'Add Student'; }
    this.buildForm();
    if (this.student) {
      this.form.patchValue(this.student);
      this.pageTitle = "Update Student Information";
    }

  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    if (this.student && (this.action === this.actionType.Edit)) {
      this.coreService.updateData(URL_CONSTANTS.STUDENTS, this.student._id, this.form.value)
      .subscribe(res => {
        if (res) {
          this.bootstrapAlertService.showSucccess(res.message || 'Record Updated!');
          let updatedStudent = this.form.value;
          updatedStudent._id = this.student._id;
          this.actionCompleted.emit({index: this.index, student: updatedStudent});
          this.form.reset();
          // this.router.navigate(['/admin/students']);
        } else {
          this.bootstrapAlertService.showError(res.message || 'An error occured while processing request. Please try again.')
        }
      });
    } else  {
      this.coreService.postData(URL_CONSTANTS.STUDENTS, this.form.value)
      .subscribe(res => {
        if (res) {
          this.bootstrapAlertService.showSucccess(res.message || 'Success')
          this.form.reset();
        } else {
          this.bootstrapAlertService.showError(res.message || 'An error occured while processing request. Please try again.')
        }
      });

    }
  }
  
  buildForm() {
    this.form = this.fb.group({
      studentNumber: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      gender: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      address: [null, Validators.required],
      email: [null, [
        Validators.required, Validators.email]
      ]
    });
  }

}
