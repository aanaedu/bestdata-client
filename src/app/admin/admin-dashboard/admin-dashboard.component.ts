import {AuthService} from './../../auth/shared/services/auth.service';
import {Component, OnInit} from '@angular/core';
import {User} from "../users/shared/user.model";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public messages: any[];
  public tableData: any[];

  constructor(private  authService: AuthService) {
  }

  ngOnInit() {
    this.messages = [
      {
        name: "Lisa Brown",
        subject: "You have a post...",
        time: "9:30 am"
      },
      {
        name: "Lara Croft",
        subject: "I need some help...",
        time: "9:30 pm"
      },
      {
        name: "Anthony Drinkwater",
        subject: "Can you extend my licence?",
        time: "10:30 pm"
      }
    ];
    this.tableData = [
      {
        "companyName": "Elite admin",
        "date": "April 18, 2017",
        "status": "SALE",
        "price": "$3"
      },

      {
        "companyName": "Real Homes",
        "date": "April 19, 2017",
        "status": "EXTENDED",
        "price": "$24"
      },

      {
        "companyName": "Ample Admin",
        "date": "April 19, 2017",
        "status": "EXTENDED",
        "price": "$1250"
      },
      {
        "companyName": "Medical Pro",
        "date": "April 20, 2017",
        "status": "TAX",
        "price": "$1250"
      },
      {
        "companyName": "Hosting press",
        "date": "April 21, 2017",
        "status": "SALE",
        "price": "$24"
      },
      {
        "companyName": "Digital Agency",
        "date": "April 23, 2017",
        "status": "SALE",
        "price": "$64"
      },
      {
        "companyName": "Helping Hands",
        "date": "April 22, 2017",
        "status": "member",
        "price": "$1250"
      },
      {
        "companyName": "Ample Admin",
        "date": "April 19, 2017",
        "status": "EXTENDED",
        "price": "$89"
      }
    ];
  }

  get currentUser(): User {
    return this.authService.currentUser;
  }
}
