/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComponent } from './employee.component';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

const employeeMockData = [{id: '1', firstName: 'Tanvee', 
  lastName: 'Anjankar', dateOfHire: '2022-01-03', departmentName: 'Technology', email: 'drama@gmail.com', status: 'ACTIVE'}]

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('employees', employeeMockData);
    fixture.detectChanges();
    h1 = fixture.nativeElement.querySelector('h1');
  });

  afterAll(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title `Employee list`', async () => {
      await fixture.whenStable();
      expect(h1.textContent).toContain('Employee List');
    })
  
  it('should have a table displayed', () => {
    const table = fixture.nativeElement.querySelector('table');
    expect(table).toBeTruthy();
  })

  it('should have a thead with specified list `[Name, DateOfHire, Department, Email]`', () => {
    const thead = fixture.debugElement.queryAll(By.css('th'));
    const thElements = thead.map(el => el.nativeElement.textContent.trim());
    const expectedList =  ['Name', 'Email', 'Date Of Hire', 'Department', 'Status'];
    expect(thElements).toEqual(expectedList);
  })

  it('should have same rows as per the mock data', () => {
    const tbody = fixture.debugElement.query(By.css('tbody'));
    expect(tbody.children.length).toEqual(employeeMockData.length);
  })

  it('should have the same data as mock', () => {
    const body = fixture.debugElement.query(By.css('tbody'));
    const td = body.children[0].queryAll(By.css('td'));
    const dataFromTable = td.map(child => child.nativeElement.textContent.trim());
    const mockData = employeeMockData[0];
    const datePipe = new DatePipe('en-US');
    const expectedDate = datePipe.transform(mockData.dateOfHire, 'mediumDate');
    expect(dataFromTable).toContain(mockData.firstName + ' ' +mockData.lastName);
    expect(dataFromTable).toContain(expectedDate);
    expect(dataFromTable).toContain(mockData.departmentName);
    expect(dataFromTable).toContain(mockData.email);
  })
    
});
