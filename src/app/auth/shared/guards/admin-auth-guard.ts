import { AuthService } from './../services/auth.service';
import { RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUser;
    if ( currentUser && currentUser.isAdmin) { return true; }

    this.router.navigate(['/forbidden']);
    return false;
  }
}
