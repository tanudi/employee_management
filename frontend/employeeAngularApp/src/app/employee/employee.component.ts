import { Component, computed, DestroyRef, inject, input, linkedSignal, OnInit, signal } from '@angular/core';
import {Employee} from './employee.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { DepartmentService } from '../service/department.service';
import { Department } from '../model/department.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DepartmentPipe, SortPipe, StatusPipe } from '../directives/generic-pipes.pipe';
import { debounceTime, distinctUntilChanged, Subject, Subscription, switchMap } from 'rxjs';
import { EmployeeService } from '../service/employee.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, DepartmentPipe, StatusPipe, SortPipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  private departmentService = inject(DepartmentService);
  private employeeService = inject(EmployeeService);
  private destroryRef = inject(DestroyRef);


  departments: Department[] = [];
  departmentSelected = new FormControl('ALL', { nonNullable: true });
  statusSelected = new FormControl<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL', { nonNullable: true });
  sortBy = new FormControl<keyof Employee>('name' as keyof Employee);
  sortByList = [{value: 'firstName', label: 'First Name'}, {value: 'lastName', label: 'Last Name'}, {value: 'departmentName', label: 'Department'}]
  
  search$ = new Subject<string | null>();
  searchControl = new FormControl('');
  
  ngOnInit(): void {
    this.departmentService
      .fetchDepartments()
      .subscribe(data => this.departments = data);

    this.search$.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap(searchTerm => this.employeeService.searchEmployees(searchTerm ?? '')),
      takeUntilDestroyed(this.destroryRef)
    )
    .subscribe(data => this.displayList.set(data));
  }

  search() {
    this.search$.next(this.searchControl.value);
  }
  employees = input.required<Employee[]>();
  displayList = linkedSignal(() => this.employees());

}
