import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';

import { Employee } from '../../models/employee.model';

@Component({

  selector: 'app-employee-form',

  standalone: true,

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './employee-form.html',

  styleUrl: './employee-form.css'

})
export class EmployeeForm implements OnInit {

  employeeForm: FormGroup;

  isEditMode = false;

  employeeId!: number;

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.employeeForm = this.fb.group({

      name: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      department: ['', Validators.required],

      designation: ['', Validators.required],

      salary: ['', [
        Validators.required,
        Validators.min(1)
      ]]

    });

  }


  // Check whether we are adding or editing
  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEditMode = true;

      this.employeeId = Number(id);

      const employee =
        this.employeeService.getEmployeeById(this.employeeId);

      if (!employee) {

        alert('Employee not found');

        this.router.navigate(['/employees']);

        return;

      }

      this.employeeForm.patchValue(employee);

    }

  }


  // Save employee
  onSubmit(): void {

    this.errorMessage = '';

    if (this.employeeForm.invalid) {

      this.employeeForm.markAllAsTouched();

      return;

    }

    const employee: Employee = {

      id: this.isEditMode ? this.employeeId : Date.now(),

      name: this.employeeForm.value.name.trim(),

      email: this.employeeForm.value.email.trim().toLowerCase(),

      department: this.employeeForm.value.department,

      designation: this.employeeForm.value.designation,

      salary: Number(this.employeeForm.value.salary)

    };


    if (this.isEditMode) {

      this.employeeService.updateEmployee(employee);

      alert('Employee updated successfully!');

    } else {

      this.employeeService.addEmployee(employee);

      alert('Employee created successfully!');

    }

    this.router.navigate(['/employees']);

  }


  // Cancel operation
  cancel(): void {

    this.router.navigate(['/employees']);

  }

}