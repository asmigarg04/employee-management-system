import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Register new user
  signup(user: User): boolean {

    const users: User[] = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    // Check if user already exists
    const existingUser = users.find(
      u => u.email.toLowerCase() === user.email.toLowerCase()
    );

    if (existingUser) {
      return false;
    }

    users.push(user);

    localStorage.setItem(
      'users',
      JSON.stringify(users)
    );

    return true;
  }


  // Login user
  login(email: string, password: string): boolean {

    const users: User[] = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    const user = users.find(
      u =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (user) {

      localStorage.setItem(
        'currentUser',
        JSON.stringify(user)
      );

      return true;
    }

    return false;
  }


  // Get currently logged-in user
  getCurrentUser(): User | null {

    const user = localStorage.getItem('currentUser');

    return user ? JSON.parse(user) : null;
  }


  // Update user profile
  updateProfile(updatedUser: Partial<User>): boolean {

    const currentUser = this.getCurrentUser();

    if (!currentUser) {
      return false;
    }

    const users: User[] = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    // Check whether another user has the new email
    const emailExists = users.some(
      u =>
        u.email.toLowerCase() === updatedUser.email?.toLowerCase() &&
        u.id !== currentUser.id
    );

    if (emailExists) {
      return false;
    }

    const updated = {
      ...currentUser,
      ...updatedUser
    };

    const index = users.findIndex(
      u => u.id === currentUser.id
    );

    if (index === -1) {
      return false;
    }

    users[index] = updated;

    localStorage.setItem(
      'users',
      JSON.stringify(users)
    );

    localStorage.setItem(
      'currentUser',
      JSON.stringify(updated)
    );

    return true;
  }


  // Logout user
  logout(): void {

    localStorage.removeItem('currentUser');

  }

}