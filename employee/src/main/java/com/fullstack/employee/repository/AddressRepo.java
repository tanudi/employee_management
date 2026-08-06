 package com.fullstack.employee.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fullstack.employee.entity.Address;

public interface AddressRepo extends JpaRepository<Address, UUID> {

    
}