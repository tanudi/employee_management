package com.fullstack.employee.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fullstack.employee.entity.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, UUID> {
    
}
