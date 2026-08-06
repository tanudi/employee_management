package com.fullstack.employee.dto;

import java.sql.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class EmployeeDTO {

    UUID id;
    String firstName;
    String lastName;
    String email;
    Date dateOfHire;
    String status;
    UUID departmentId;
    String departmentName;
    AddressDTO address;
    RoleDTO role;

    EmployeeDTO(EmployeeBuilder builder) {
        this.id = builder.id;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.dateOfHire = builder.dateOfHire;
        this.status = builder.status;
        this.departmentId = builder.departmentId;
        this.departmentName = builder.departmentName;
        this.address = builder.address;
        this.role = builder.role;
    }

    public static class EmployeeBuilder {
        UUID id;
        String firstName;
        String lastName;
        String email;
        Date dateOfHire;
        String status;
        UUID departmentId;
        String departmentName;
        AddressDTO address;
        RoleDTO role;

        public EmployeeBuilder setid(UUID id) {
            this.id = id;
            return this;
        }

        public EmployeeBuilder setFirstName(String firstName) {
            this.firstName  = firstName;
            return this;
        }

        public EmployeeBuilder setLastName(String lastName) {
            this.lastName  = lastName;
            return this;
        }

        public EmployeeBuilder setEmail(String email) {
            this.email = email;
            return this;
        }

        public EmployeeBuilder setStatus(String status) {
            this.status = status;
            return this;
        }

        public EmployeeBuilder setDepartmentId(UUID deptId) {
            this.departmentId = deptId;
            return this;
        }

        public EmployeeBuilder setDateOfFire(Date hiringDate) {
            this.dateOfHire = hiringDate;
            return this;
        }

        public EmployeeBuilder setDepartmenName(String deptName) {
            this.departmentName = deptName;
            return this;
        }

        public EmployeeBuilder setAddress(AddressDTO addressDTO) {
            this.address = addressDTO;
            return this;
        }

        public EmployeeBuilder setRole(RoleDTO roleDTO) {
            this.role = roleDTO;
            return this;
        }
        
        public EmployeeDTO build() {
            return new EmployeeDTO(this);
        }
    }
}
