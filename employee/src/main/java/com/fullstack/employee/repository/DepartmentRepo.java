package com.fullstack.employee.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fullstack.employee.entity.Department;

public interface DepartmentRepo extends JpaRepository<Department, UUID> {
    
}
