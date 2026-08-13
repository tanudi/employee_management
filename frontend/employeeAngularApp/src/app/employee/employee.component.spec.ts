/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComponent } from './employee.component';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';


export const employeeMockData = [{id: '1', 
  firstName: 'Tanvee', 
  lastName: 'Anjankar', 
  dateOfHire: '2022-01-03', 
  departmentName: 'Technology', 
  email: 'drama@gmail.com', 
  status: 'ACTIVE', 
  role: {
    title: 'Software Engineer',
    level: 'ABC'
  },
  address: {
    street: 'abc road',
    city: 'london',
    country: 'united kingdom'
  }},
  {id: '2',
  firstName: 'John',
  lastName: 'Doe',
  dateOfHire: '2021-05-10',
  departmentName: 'Finance',
  email: 'john@gmail.com',
  status: 'INACTIVE',
  role: {
    title: 'Accountant',
    level: 'B2'
  },
  address: {
    street: 'xyz road',
    city: 'paris',
    country: 'france'
  }}]

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let h1: HTMLElement;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeComponent, RouterTestingModule],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('employees', employeeMockData);
    fixture.detectChanges();
    h1 = fixture.nativeElement.querySelector('h3');
    
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

  it('should have a thead with specified list `[Name, Title, Department, Status, Actions]`', () => {
    const thead = fixture.debugElement.queryAll(By.css('th'));
    const thElements = thead.map(el => el.nativeElement.textContent.trim());
    const expectedList =  ['Name', 'Title', 'Department', 'Status', 'Actions'];
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
    expect(dataFromTable).toContain(mockData.firstName + ' ' +mockData.lastName);
    expect(dataFromTable).toContain(mockData.role.title);
    expect(dataFromTable).toContain(mockData.departmentName);
    expect(dataFromTable).toContain(mockData.status);
  })
    
  it('should filter employee list based on department list', () => {
    // both employees show before any filter is applied
    let rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(employeeMockData.length);

    // make the "Technology" option available in the dropdown
    component.departments = [{ id: '1', name: 'Technology', location: 'dummy' }];
    fixture.detectChanges();

    // simulate the user selecting "Technology"
    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#department')).nativeElement;
    select.value = 'Technology';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // the FormControl reflects the selection and the list is filtered
    expect(component.departmentSelected.value).toBe('Technology');
    rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(1);
    expect(rows[0].nativeElement.textContent).toContain('Tanvee Anjankar');
  })

  it('should filter employess list based on status selected', () => {
    let rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(employeeMockData.length);

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#status')).nativeElement;
    select.value = 'ACTIVE';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.statusSelected.value).toBe('ACTIVE');
    rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(1);
    expect(rows[0].nativeElement.textContent).toContain('Tanvee Anjankar');
  })
});
