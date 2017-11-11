import { Router } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, public authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    if (!this.form) {
      return;
    }
    
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [
        Validators.required, Validators.email]
      ],
      password: [null, Validators.required]
    });
  }

}
