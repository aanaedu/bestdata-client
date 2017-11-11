import { AppErrorHandler } from './core/shared/app-error-handler';
import { BootstrapAlertModule } from 'ng2-alert-service/bootstrap-alert.module';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
import { AdminAuthGuard } from './auth/shared/guards/admin-auth-guard';
import { AuthGuard } from './auth/shared/guards/auth-guard';
import { AuthService } from './auth/shared/services/auth.service';
import { ApiXHRBackend } from './core/shared/apixhrbackend.service';
import { XHRBackend } from '@angular/http';
import { AuthModule } from './auth/auth.module';
import { AdminComponent } from './admin/admin.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CoreModule,
    AuthModule,
    AdminModule,
    BootstrapAlertModule
    
  ],
  providers: [ AuthService, AuthGuard, AdminAuthGuard, AdminService,
    { provide: XHRBackend, useClass: ApiXHRBackend },
    { provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
