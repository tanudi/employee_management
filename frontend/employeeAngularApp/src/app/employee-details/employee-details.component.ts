import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee/employee.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  imports: [DatePipe],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent{
  employee = input.required<Employee | null>();
  tab = signal<string>('emp');
}
