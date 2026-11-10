import { Injectable } from '@angular/core';

import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  // Get all employees
  getEmployees(): Employee[] {

    return JSON.parse(
      localStorage.getItem('employees') || '[]'
    );

  }


  // Get employee using ID
  getEmployeeById(id: number): Employee | undefined {

    const employees = this.getEmployees();

    return employees.find(
      employee => employee.id === id
    );

  }


  // Create employee
  addEmployee(employee: Employee): void {

    const employees = this.getEmployees();

    employees.push(employee);

    localStorage.setItem(
      'employees',
      JSON.stringify(employees)
    );

  }


  // Update employee
  updateEmployee(updatedEmployee: Employee): void {

    const employees = this.getEmployees();

    const index = employees.findIndex(
      employee => employee.id === updatedEmployee.id
    );

    if (index !== -1) {

      employees[index] = updatedEmployee;

      localStorage.setItem(
        'employees',
        JSON.stringify(employees)
      );

    }

  }


  // Delete employee
  deleteEmployee(id: number): void {

    const employees = this.getEmployees();

    const updatedEmployees = employees.filter(
      employee => employee.id !== id
    );

    localStorage.setItem(
      'employees',
      JSON.stringify(updatedEmployees)
    );

  }

}