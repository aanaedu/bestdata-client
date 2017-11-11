import { User } from './../shared/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  pageTitle = "Create a New User";
  
  @Input()
  user: User;

  constructor() { }

  ngOnInit() {

    if(this.user) {
      this.pageTitle = `${this.user.firstName} ${this.user.lastName}'s Information`;
    }
  }

}
