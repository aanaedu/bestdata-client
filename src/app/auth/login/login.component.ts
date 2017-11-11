import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  invalidLogin;
  pageTitle = 'Login';

  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    this.buildForm();
  }


  onSubmit() {
    this.authService.login(this.form.value)
    .subscribe(result => {
      if (result) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/admin';
        this.router.navigate([returnUrl]);
      } else {
        this.invalidLogin = true;
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [
        Validators.required, Validators.email]
      ],
      password: ['', Validators.required]
    });
  }

}
