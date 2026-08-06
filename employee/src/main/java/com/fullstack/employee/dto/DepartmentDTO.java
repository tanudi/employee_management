package com.fullstack.employee.dto;

import java.util.*;


import lombok.Data;

@Data
public class DepartmentDTO {
    UUID id;
    String name;
    String location;
    List<EmployeeSummaryDTO> employees;

    DepartmentDTO(DepartmentBuilder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.location = builder.location;
        this.employees = builder.employees;
        
    }

    public static class DepartmentBuilder {
        UUID id;
        String name;
        String location;
        List<EmployeeSummaryDTO> employees;

        public DepartmentBuilder setId(UUID id) {
            this.id = id;
            return this;
        }

        public DepartmentBuilder setName(String name) {
            this.name = name;
            return this;
        }

        public DepartmentBuilder setLocation(String location) {
            this.location = location;
            return this;
        }

        public DepartmentBuilder setEmployees(List<EmployeeSummaryDTO> employees) {
            this.employees = employees;
            return this;
        }

        

        public DepartmentDTO build() {
            return new DepartmentDTO(this);
        }
    }
}
