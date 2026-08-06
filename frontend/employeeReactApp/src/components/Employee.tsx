import { useLoaderData } from "react-router-dom"

export interface EmployeeModel {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    dateOfHire: string,
    status: 'ACTIVE' | 'INACTIVE',
    departmentName: string
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", options);




export default function Employee() {
    // const [employees, setEmployees] = useState<EmployeeModel[]>([]);
    const employees: EmployeeModel[] = useLoaderData();

    return <div className="p-5">
    <h1 className="text-2xl my-4">Employee List</h1>
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
            {employees.map(emp => <tr key={emp.id} className="text-center border">
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