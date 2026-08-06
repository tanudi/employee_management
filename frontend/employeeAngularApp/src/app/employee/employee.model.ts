export interface Employee {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    dateOfHire: string,
    status: 'ACTIVE' | 'INACTIVE',
    departmentName: string
}