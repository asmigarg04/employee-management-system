import { Routes } from '@angular/router';

import { Signup } from './components/signup/signup';

import { Login } from './components/login/login';

import { Dashboard } from './components/dashboard/dashboard';

import { Profile } from './components/profile/profile';

import { EmployeeList } from './components/employee-list/employee-list';

import { EmployeeForm } from './components/employee-form/employee-form';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },

  {
    path: 'signup',
    component: Signup
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

  {
    path: 'profile',
    component: Profile
  },

  {
    path: 'employees',
    component: EmployeeList
  },

  {
    path: 'employees/new',
    component: EmployeeForm
  },

  {
    path: 'employees/edit/:id',
    component: EmployeeForm
  },

  {
    path: '**',
    redirectTo: 'signup'
  }

];