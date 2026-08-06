import { Component, input, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import {Employee} from './employee.model';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-employee',
  imports: [CommonModule, RouterLink],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employees = input.required<Employee[]>();

}
