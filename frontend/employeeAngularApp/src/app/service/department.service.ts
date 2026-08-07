import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Department } from '../model/department.model';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private url = environment.apiUrl + '/departments'
  constructor(private httpClient: HttpClient) { }

  fetchDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.url).pipe(catchError(err => of([])))
  }
  
}
