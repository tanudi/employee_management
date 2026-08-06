package com.fullstack.employee.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fullstack.employee.entity.Role;

public interface RoleRepo extends JpaRepository<Role, UUID> {
    
}
