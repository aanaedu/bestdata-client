/// <reference types="datatables.net" />
import { UserService } from './../shared/user.service';
import { User } from './../shared/user.model';
import { BootstrapAlertService } from 'ng2-alert-service/bootstrap-alert.service';
import { URL_CONSTANTS } from './../../../core/shared/constants';
import { CoreService } from './../../../core/shared/core.service';
import { ActionType } from './../../../core/shared/enums/action-type.enum';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  public actionType = ActionType;
  public currentAction: ActionType;
  selectedUser: User;
  selectedIndex: number;

  users: User[];

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject();

  buttonText: string;

  constructor(private userService: UserService, private coreService: CoreService,
                private bootstrapAlertService: BootstrapAlertService) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    if (!this.users) {
      this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
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
        this.selectedUser = null;
        this.rerender();
        break;
      case this.actionType.View:
        this.currentAction = this.actionType.View;
        this.selectedUser = this.users[index];
        break;
      case this.actionType.Edit:
        this.currentAction = this.actionType.Edit;
        this.selectedUser = this.users[index];
        this.selectedIndex = index;
        this.buttonText = "Update";
        break;
      case this.actionType.Delete:
        const name = `${this.users[index].firstName} ${this.users[index].lastName}`;
        const response = confirm(`Are you sure you want to delete the user with name "${name}"?`);
        if (response) {
          this.coreService.deleteData(URL_CONSTANTS.USERS, this.users[index]._id)
            .subscribe(res => {
              if (res) {
                  this.bootstrapAlertService.showSucccess(res.message || 'Record deleted successfully!');
                  this.users.splice(index, 1);
                  this.rerender();
              }
            });
        }
        break;
    }
  }

  onActionCompleted(event: {index: number, user: User}) {
    this.users[event.index] = event.user;
    this.selectedUser = null;
    this.rerender();
  }

  getUserType(user) {
    return (user.isAdmin) ? 'Admin' : 'User';
  }

}

