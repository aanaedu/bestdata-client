import { Component } from '@angular/core';
import { BootstrapAlertService } from 'ng2-alert-service/bootstrap-alert.service';
import { ToastMessageModel } from 'ng2-alert-service/toast-message-component/toast-message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  messageList: ToastMessageModel[] = [];
  pageTitle: string = 'Best Data';
  
  constructor (private bootstrapAlertService: BootstrapAlertService) {
    
  }
  ngOnInit() { 
      this.bootstrapAlertService.getAlertEvent().subscribe(r => {
        this.messageList.push(r);
      });
  }
}
