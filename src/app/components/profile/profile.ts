import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  currentUser: User | null = null;

  profileForm: FormGroup;

  isEditing = false;

  errorMessage = '';

  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.profileForm = this.fb.group({

      name: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]]

    });

  }


  // Load user information when page opens
  ngOnInit(): void {

    this.currentUser = this.authService.getCurrentUser();

    if (!this.currentUser) {

      this.router.navigate(['/login']);

      return;
    }

    this.profileForm.patchValue({

      name: this.currentUser.name,

      email: this.currentUser.email

    });

  }


  // Enable editing
  editProfile(): void {

    this.isEditing = true;

    this.successMessage = '';

    this.errorMessage = '';

  }


  // Save updated profile
  updateProfile(): void {

    this.errorMessage = '';

    this.successMessage = '';

    if (this.profileForm.invalid) {

      this.profileForm.markAllAsTouched();

      return;
    }

    const updatedUser = {

      name: this.profileForm.value.name.trim(),

      email: this.profileForm.value.email.trim().toLowerCase()

    };

    const success = this.authService.updateProfile(updatedUser);

    if (success) {

      this.currentUser = this.authService.getCurrentUser();

      this.isEditing = false;

      this.successMessage = 'Profile updated successfully!';

    } else {

      this.errorMessage = 'This email is already registered.';

    }

  }


  // Cancel editing
  cancelEdit(): void {

    this.isEditing = false;

    this.errorMessage = '';

    this.profileForm.patchValue({

      name: this.currentUser?.name,

      email: this.currentUser?.email

    });

  }

}