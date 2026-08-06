import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { beforeEach, describe, expect, test } from "vitest";
import Employee from "./Employee";

const employeeMockData = [{id: '1', firstName: 'Tanvee', 
  lastName: 'Anjankar', dateOfHire: '2022-01-03', departmentName: 'Technology', email: 'drama@gmail.com', status: 'ACTIVE'}];

describe('Employee Component', () => {
    let router : ReturnType<typeof createMemoryRouter>;

    beforeEach(() => {
        router = createMemoryRouter([
            {
                path: "/",
                element: <Employee />,
                loader: () => employeeMockData,
            },
        ]);

        render(<RouterProvider router={router} />);
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
})