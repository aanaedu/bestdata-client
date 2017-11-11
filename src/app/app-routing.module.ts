import { UserFormComponent } from './admin/users/user-form/user-form.component';
import { StudentFormComponent } from './admin/students/student-form/student-form.component';
import { NoAccessComponent } from './core/pages/no-access/no-access.component';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { StudentListComponent } from './admin/students/student-list/student-list.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminAuthGuard } from './auth/shared/guards/admin-auth-guard';
import { AuthGuard } from './auth/shared/guards/auth-guard';

import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './core/pages/contact/contact.component';
import { AboutComponent } from './core/pages/about/about.component';
import { HomeComponent } from './core/pages/home/home.component';
import { NgModule, SkipSelf, Optional } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'students', component: StudentListComponent },
      { path: "students/add", component: StudentFormComponent },
      { path: 'users', component: UserListComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'users/add', component: UserFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    ]
  },
  { path: 'forbidden', component: NoAccessComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
  constructor( @Optional() @SkipSelf() appRoutingModule: AppRoutingModule) {
    if (appRoutingModule) {
      throw new Error("AppRoutingModule can only be a singleton imported by the Root AppModule ");
    }
  }
}
