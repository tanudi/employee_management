package com.fullstack.employee.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.employee.dto.DepartmentDTO;
import com.fullstack.employee.service.DepartmenService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmenService departmenService;

    DepartmentController(DepartmenService  departmenService) {
        this.departmenService = departmenService;
    }

    @GetMapping
    public List<DepartmentDTO> getAllDepartments() {
        return departmenService.getAllDepartments();
    }
    
    
}
