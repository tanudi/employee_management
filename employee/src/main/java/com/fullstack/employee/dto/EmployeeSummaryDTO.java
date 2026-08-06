package com.fullstack.employee.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class EmployeeSummaryDTO {
    UUID employeeId;
    String employeeName;

    public EmployeeSummaryDTO(UUID id, String name) {
        this.employeeId = id;
        this.employeeName = name;
    }
}
