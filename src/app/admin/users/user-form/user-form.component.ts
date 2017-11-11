import { User } from './../shared/user.model';
import { ActionType } from './../../../core/shared/enums/action-type.enum';
import { BootstrapAlertService } from 'ng2-alert-service/bootstrap-alert.service';
import { URL_CONSTANTS } from './../../../core/shared/constants';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from './../../../core/shared/core.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  actionType = ActionType;
  pageTitle = "Create a new User";

  @Input()
  user: User;
  @Input()
  index: number;
  @Input()
  submitBtnText: string; 
  @Input()
  action: ActionType;
  @Output()
  actionCompleted = new EventEmitter<{index: number, user: User}>();

  constructor(private fb: FormBuilder, public coreService: CoreService,
              private router: Router, private bootstrapAlertService: BootstrapAlertService) { }

  ngOnInit() {
    if (!this.submitBtnText) { this.submitBtnText = 'Add User'; }
    this.buildForm();
    if (this.user) {
      this.form.patchValue(this.user);
      this.pageTitle = "Update User Information";
    }
  }

  onSubmit() {
    if (!this.form.valid && this.action !== this.actionType.Edit) {
      return;
    }
    
    if (this.user && (this.action === this.actionType.Edit)) {
      this.coreService.updateData(URL_CONSTANTS.USERS, this.user._id, this.form.value)
      .subscribe(res => {
        if (res) {
          this.bootstrapAlertService.showSucccess(res.message || 'Record Updated!');
          let updatedUser = this.form.value;
          updatedUser._id = this.user._id;
          this.actionCompleted.emit({index: this.index, user: updatedUser});
          this.form.reset();
          // this.router.navigate(['/admin/users']);
        } else {
          this.bootstrapAlertService.showError(res.message || 'An error occured while processing request. Please try again.')
        }
      });
    } else  {
      this.coreService.postData(URL_CONSTANTS.USERS, this.form.value)
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
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [
        Validators.required, Validators.email]
      ],
      password: [null, Validators.required],
      isAdmin: [false]
    });
  }
}
