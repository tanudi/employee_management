import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(), provideHttpClient()
      ]
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
