package com.fullstack.employee.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fullstack.employee.dto.DepartmentDTO;
import com.fullstack.employee.dto.EmployeeSummaryDTO;
import com.fullstack.employee.entity.Department;
import com.fullstack.employee.entity.Employee;
import com.fullstack.employee.repository.DepartmentRepo;

@Service
public class DepartmenService {

    private final DepartmentRepo departmentRepo;

    DepartmenService(DepartmentRepo departmentRepo) {
        this.departmentRepo = departmentRepo;
    }

    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepo.findAll()
            .stream()
            .map(DepartmenService::toDto)
            .toList();
    }

    private static DepartmentDTO toDto(Department department) {
        List<EmployeeSummaryDTO> employees = department.getEmployees().stream()
                                                .map(DepartmenService::toEmployeeSummaryDTO)
                                                .toList();

        DepartmentDTO departmentDTO = new DepartmentDTO.DepartmentBuilder()
            .setId(department.getId())
            .setName(department.getName())
            .setLocation(department.getLocation())
            .setEmployees(employees)
            .build();

        return departmentDTO;
    }

    private static EmployeeSummaryDTO toEmployeeSummaryDTO(Employee employee) {
        return new EmployeeSummaryDTO(
            employee.getId(),
            employee.getFirstName()
        );
    }
    
}
