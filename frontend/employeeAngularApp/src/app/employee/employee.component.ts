import { Component, inject, input, OnInit, signal } from '@angular/core';
import {Employee} from './employee.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { DepartmentService } from '../service/department.service';
import { Department } from '../model/department.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DepartmentPipe, SortPipe, StatusPipe } from '../directives/generic-pipes.pipe';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, DepartmentPipe, StatusPipe, SortPipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  private departmentService = inject(DepartmentService);
  departments: Department[] = [];
  departmentSelected = new FormControl('ALL', { nonNullable: true });
  statusSelected = new FormControl<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL', { nonNullable: true });
  sortBy = new FormControl<keyof Employee>('name' as keyof Employee);
  sortByList = [{value: 'firstName', label: 'First Name'}, {value: 'lastName', label: 'Last Name'}, {value: 'departmentName', label: 'Department'}]
  ngOnInit(): void {
    this.departmentService.fetchDepartments().subscribe(data => this.departments = data);
  }
  employees = input.required<Employee[]>();

}
