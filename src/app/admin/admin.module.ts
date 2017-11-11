import { UserService } from './users/shared/user.service';
import { DataTablesModule } from 'angular-datatables';
import { StudentService } from './students/shared/student.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './students/student/student.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentFormComponent } from './students/student-form/student-form.component';
import { UserComponent } from './users/user/user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {RouterModule} from "@angular/router";

const COMPONENTS = [
  StudentComponent, StudentListComponent, StudentFormComponent, UserComponent,
  UserListComponent, UserFormComponent, AdminDashboardComponent
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  providers: [StudentService, UserService]
})
export class AdminModule { }
