package com.fullstack.employee.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.employee.dto.EmployeeDTO;
import com.fullstack.employee.service.EmployeeService;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    EmployeeController(EmployeeService employeeService){
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<EmployeeDTO> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public EmployeeDTO getEmployee(@PathVariable UUID id) throws NotFoundException {
        return employeeService.getEmployee(id);
    }

    @GetMapping("/search")
    public List<EmployeeDTO> searchEmployees(@RequestParam String searchText) {
        return employeeService.searchEmployees(searchText);
    }

}
