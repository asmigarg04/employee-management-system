import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  signupForm: FormGroup;

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.signupForm = this.fb.group({

      name: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],

      confirmPassword: ['', Validators.required]

    }, {
      validators: this.passwordMatchValidator
    });

  }


  // Custom validator for password matching
  passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const password = control.get('password')?.value;

    const confirmPassword =
      control.get('confirmPassword')?.value;

    if (!confirmPassword) {
      return null;
    }

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };

  }


  // Signup function
  onSignup(): void {

    this.errorMessage = '';

    if (this.signupForm.invalid) {

      this.signupForm.markAllAsTouched();

      return;
    }

    const user = {

      id: Date.now(),

      name: this.signupForm.value.name.trim(),

      email: this.signupForm.value.email.trim().toLowerCase(),

      password: this.signupForm.value.password

    };

    const success = this.authService.signup(user);

    if (success) {

      alert('Registration successful! Please login.');

      this.router.navigate(['/login']);

    } else {

      this.errorMessage = 'Email already registered.';

    }

  }

}