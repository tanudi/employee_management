import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeByIdResolver, EmployeesResolver } from './resolver/employees.resolver';
import { ErrorComponent } from './error/error.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

export const routes: Routes = [
    {
        path: '', 
        component: EmployeeComponent, 
        resolve: {employees: EmployeesResolver}
    },
    {
        path: 'details/:id',
        component: EmployeeDetailsComponent,
        resolve: {employee: EmployeeByIdResolver}

    },
    {path: 'error', component: ErrorComponent}
];
