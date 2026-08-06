import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, of } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = environment.apiUrl + "/employees";

  constructor(private httpClient: HttpClient) { }

  fetchEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.url).pipe(catchError(err => of([])))
  }

  fetchEmployeeDetails(empId: string): Observable<Employee | null> {
    return this.httpClient.get<Employee>(this.url + '/' +empId).pipe(catchError(err => of(null)))
  }
}
