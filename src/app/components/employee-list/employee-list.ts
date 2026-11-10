import { Component, OnInit } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';

import { Employee } from '../../models/employee.model';

@Component({

  selector: 'app-employee-list',

  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './employee-list.html',

  styleUrl: './employee-list.css'

})
export class EmployeeList implements OnInit {

  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}


  // Load employees when page opens
  ngOnInit(): void {

    this.loadEmployees();

  }


  // Retrieve employees
  loadEmployees(): void {

    this.employees = this.employeeService.getEmployees();

  }


  // Navigate to edit page
  editEmployee(id: number): void {

    this.router.navigate(['/employees/edit', id]);

  }


  // Delete employee
  deleteEmployee(id: number): void {

    const confirmDelete = confirm(
      'Are you sure you want to delete this employee?'
    );

    if (confirmDelete) {

      this.employeeService.deleteEmployee(id);

      this.loadEmployees();

    }

  }

}