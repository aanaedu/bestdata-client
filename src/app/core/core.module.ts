import { BootstrapAlertModule } from 'ng2-alert-service/bootstrap-alert.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';


import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CoreService } from './shared/core.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { DataTablesModule } from 'angular-datatables';


const COMPONENTS = [ 
  NavbarComponent, NoAccessComponent, HomeComponent,
  AboutComponent, ContactComponent, NotFoundComponent,
  FooterComponent, ContentComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule,
    BootstrapAlertModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  providers: [CoreService]
})
export class CoreModule { }
