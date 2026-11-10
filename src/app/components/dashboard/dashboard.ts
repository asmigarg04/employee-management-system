import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user.model';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [RouterLink]
})
export class Dashboard {

  currentUser: User | null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    this.currentUser = this.authService.getCurrentUser();

  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}