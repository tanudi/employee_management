export interface Employee {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    dateOfHire: string,
    status: 'ACTIVE' | 'INACTIVE',
    departmentName: string,
    address:Address,
    role: Role
}

export interface Address {
    street: string,
    city: string,
    country: string,
}

export interface Role {
    level: string,
    title: string,
}