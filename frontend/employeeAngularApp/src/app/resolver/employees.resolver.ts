import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Employee } from "../employee/employee.model";
import { inject } from "@angular/core";
import { EmployeeService } from "../employee/employee.service";
import {of} from "rxjs";

export const EmployeesResolver: ResolveFn<Employee[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const employeeSerice = inject(EmployeeService);
    return employeeSerice.fetchEmployees();
}


export const EmployeeByIdResolver: ResolveFn<Employee | null> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const employeeSerice = inject(EmployeeService);
    return employeeSerice.fetchEmployeeDetails(route.params['id']);
}