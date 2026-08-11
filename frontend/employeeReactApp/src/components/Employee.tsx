import { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom"
import { fetchDepartments } from "../services/DepartmentService";

export interface EmployeeModel {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    dateOfHire: string,
    status: 'ACTIVE' | 'INACTIVE',
    departmentName: string
}

export interface Department{
    id: string,
    name: string,
    location: string
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", options);




export default function Employee() {
    const employees: EmployeeModel[] = useLoaderData();
    const [departments, setDepartments] = useState<Department[]>([])
    const [departmentSelected, setDepartmentSelected] = useState('All');
    const [statusSelected, setStatusSelected] = useState<'All' | 'ACTIVE' | 'INACTIVE'>('All');

    const filteredEmployees = useMemo(() => {
        if (departmentSelected === 'All') {
            return employees;
        }
        return employees.filter(emp => emp.departmentName === departmentSelected);
    }, [employees, departmentSelected]);

    const filteredEmployeesByStatus = useMemo(() => {
        if(statusSelected === 'All') {
            return filteredEmployees;
        }
        return filteredEmployees.filter(emp => emp.status === statusSelected)
    }, [employees, statusSelected, departmentSelected])

    useEffect(() => {
        fetchDepartments().then(response => {
            setDepartments(response);
        })
    }, [])

    function filterEmployeeListBasedOnDepartment(departmentName: string) {
        setDepartmentSelected(departmentName);
    }

    return <div className="p-5 flex flex-col">
    <h1 className="text-2xl my-4">Employee List</h1>
    <div className="flex flex-row self-center">
        <div>
            <label htmlFor="department">Departments:</label>
        <select id="department" className="border m-2" onChange={(event) => filterEmployeeListBasedOnDepartment(event.target.value)}>
            <option value='All'>ALL</option>
            {departments.map(dept => <option key={dept.id}>{dept.name}</option>)}
        </select>
        </div>

        <div>
            <label htmlFor="status" >Status:</label>
        <select id="status" className="border m-2" onChange={(event) => setStatusSelected(event.target.value as 'All' | 'ACTIVE' | 'INACTIVE')}>
            <option value={'All'}>ALL</option>
            <option value={'ACTIVE'}>ACTIVE</option>
            <option value={'INACTIVE'}>INACTIVE</option>
        </select>
        </div>
    </div>
    <div className="self-center">
        
    </div>
    <table className="table-auto mx-1 p-2 w-full border-collapse border">
        <thead>
            <tr>
                <th className="p-1 border">Name</th>
                <th className="p-1 border">Email</th>
                <th className="p-1 border">Date of Hire</th>
                <th className="p-1 border">Department Name</th>
                <th className="p-1 border">Status</th>
            </tr>
        </thead>
        <tbody>
            {filteredEmployeesByStatus.map(emp => <tr key={emp.id} className="text-center border">
                <td className="p-1 border">{emp.firstName + ' ' + emp.lastName}</td>
                <td className="p-1 border">{emp.email}</td>
                <td className="p-1 border">{dateFormatter.format(new Date(emp.dateOfHire))}</td>
                <td className="p-1 border">{emp.departmentName}</td>
                <td className="p-1 border">{emp.status}</td>
            </tr>)}
        </tbody>
    </table>
    </div>
}