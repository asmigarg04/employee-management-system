import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({

  selector: 'app-login',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './login.html',
  styleUrl: './login.css'

})
export class Login {

  loginForm: FormGroup;

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      password: ['', Validators.required]

    });

  }


  // Login function
  onLogin(): void {

    this.errorMessage = '';

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    const email = this.loginForm.value.email;

    const password = this.loginForm.value.password;

    const success = this.authService.login(email, password);

    if (success) {

      this.router.navigate(['/dashboard']);

    } else {

      this.errorMessage = 'Invalid email or password';

    }

  }

}