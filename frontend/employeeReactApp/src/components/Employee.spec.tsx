import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Employee from "./Employee";
import { searchEmployees } from "../services/EmployeeService";

const employeeMockData = [{id: '1', 
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
  }}];

// vi.hoisted lets the mock data exist before vi.mock (which is hoisted to the top of the file)
const { departmentMockData } = vi.hoisted(() => ({
  departmentMockData: [
    { id: '1', name: 'Technology', location: 'New York' },
    { id: '2', name: 'Finance', location: 'London' },
  ],
}));

vi.mock("../services/DepartmentService", () => ({
  fetchDepartments: vi.fn(() => Promise.resolve(departmentMockData)),
}));

vi.mock("../services/EmployeeService", () => ({
  searchEmployees: vi.fn((searchText: string) =>
    Promise.resolve(
      employeeMockData.filter(emp =>
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchText.toLowerCase())
      )
    )
  ),
}));

describe('Employee Component', () => {
    let router : ReturnType<typeof createMemoryRouter>;

    beforeEach(async () => {
        router = createMemoryRouter([
            {
                path: "/",
                element: <Employee />,
                loader: () => employeeMockData,
            },
        ]);

        render(<RouterProvider router={router} />);
        await screen.findByText("Employee List");
    })
    test("should render h1 tag", async () => {
        expect(await screen.findByText("Employee List")).toBeInTheDocument();
    })
    test("should have a table with expected th titles", () => {
        const thead = ['Name', 'Email', 'Date of Hire', 'Department Name', 'Status'];
        const th = screen.getAllByRole("columnheader");
        const headerTexts = th.map(h => h.textContent);
        expect(thead).toEqual(headerTexts);    
    })
    test("should have equal number of rows as the data", () => {
        const [_, tbody] = screen.getAllByRole("rowgroup");
        const dataRows = within(tbody).getAllByRole("row");
        expect(employeeMockData.length).toEqual(dataRows.length);
    })
    test("should match with mock data", () => {
        const [_, tbody] = screen.getAllByRole("rowgroup");
        const dataRows = within(tbody).getAllByRole("row");
        const dataFromTable = dataRows.map(row => within(row).getAllByRole('cell').map(cell => cell.textContent));
        const mockData = employeeMockData[0];
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };

        const dateFormatter = new Intl.DateTimeFormat("en-US", options);
        const expectedDate = dateFormatter.format(new Date(mockData.dateOfHire));
        expect(dataFromTable[0]).toContain(mockData.firstName + ' ' +mockData.lastName);
        expect(dataFromTable[0]).toContain(expectedDate);
        expect(dataFromTable[0]).toContain(mockData.departmentName);
        expect(dataFromTable[0]).toContain(mockData.email);
    })
    test("should filter based on department(Technology) selected", () => {
        const [departmentComboBox, statusComboBox] = screen.getAllByRole("combobox");
        fireEvent.change(departmentComboBox, {target: {value: 'Technology'}});
        const [_, tbody] = screen.getAllByRole("rowgroup");
        const datRows = within(tbody).getAllByRole("row");
        const [name, email, dateOfHire, department, status] = within(datRows[0]).getAllByRole("cell");
        expect(datRows.length).toBe(1);
        expect(name.textContent).toContain("Tanvee Anjankar");
        expect(department.textContent).toContain("Technology");
    })
    test("should filter based on department(All) selected", () => {
        const [departmentComboBox, statusComboBox] = screen.getAllByRole("combobox");
        fireEvent.change(departmentComboBox, {target: {value: 'All'}});
        const [_, tbody] = screen.getAllByRole("rowgroup");
        const datRows = within(tbody).getAllByRole("row");
        const [name, email, dateOfHire, department, status] = within(datRows[0]).getAllByRole("cell");
        expect(datRows.length).toBe(2);
    })
    test("should filter based on status(ACTIVE) selected", () => {
        const [departmentComboBox, statusComboBox] = screen.getAllByRole("combobox");
        fireEvent.change(departmentComboBox, {target: {value: 'All'}});
        fireEvent.change(statusComboBox, {target: {value: 'ACTIVE'}});
        const [_, tbody]= screen.getAllByRole("rowgroup");
        const dataRows = within(tbody).getAllByRole("row");
        const [name, email, dateOfHire, department, status] = within(dataRows[0]).getAllByRole("cell");
        expect(dataRows.length).toBe(1);
        expect(status.textContent).toBe('ACTIVE');
    })
    test("should filter based on status(ALL) selected", () => {
        const [departmentComboBox, statusComboBox] = screen.getAllByRole("combobox");
        fireEvent.change(departmentComboBox, {target: {value: 'All'}});
        fireEvent.change(statusComboBox, {target: {value: 'All'}});
        const [_, tbody]= screen.getAllByRole("rowgroup");
        const dataRows = within(tbody).getAllByRole("row");
        expect(dataRows.length).toBe(2);
    })
    test("should filter based on department(Technology) + status(ACTIVE) selected", () => {
        const [departmentComboBox, statusComboBox] = screen.getAllByRole("combobox");
        fireEvent.change(departmentComboBox, {target: {value: 'Technology'}});
        fireEvent.change(statusComboBox, {target: {value: 'ACTIVE'}});
        const [_, tbody]= screen.getAllByRole("rowgroup");
        const dataRows = within(tbody).getAllByRole("row");
        expect(dataRows.length).toBe(1);
    })
    test("should search employee through search input", async () => {
        const [inputBox] = screen.getAllByRole("textbox");
        fireEvent.change(inputBox, {target: {value: 'Tanvee'}});

        await waitFor(() => {
            expect(searchEmployees).toHaveBeenCalledWith('Tanvee');
        });

        const [_, tbody] = screen.getAllByRole("rowgroup");
        const dataRows = await waitFor(() => {
            const rows = within(tbody).getAllByRole("row");
            expect(rows.length).toBe(1);
            return rows;
        });
        const [name] = within(dataRows[0]).getAllByRole("cell");
        expect(name.textContent).toContain("Tanvee Anjankar");
    })
})