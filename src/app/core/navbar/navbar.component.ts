import { Router } from '@angular/router';
import { AuthService } from './../../auth/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  pageTitle = 'Best Data';

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  get currentUser() {
    return this.authService.currentUser;
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
