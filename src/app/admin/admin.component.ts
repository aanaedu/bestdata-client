
import { AuthService } from './../auth/shared/services/auth.service';
import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  constructor(private adminService: AdminService, private authService: AuthService,) { }

  ngOnInit() {
  
  }

  get isAdmin() {
    return this.authService.currentUser.isAdmin;
  }

}
