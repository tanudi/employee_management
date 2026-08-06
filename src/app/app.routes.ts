import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesResolver } from './resolver/employees.resolver';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    {path: '', component: EmployeeComponent, resolve: {
        employees: EmployeesResolver
    }},
    {path: 'error', component: ErrorComponent}
];
