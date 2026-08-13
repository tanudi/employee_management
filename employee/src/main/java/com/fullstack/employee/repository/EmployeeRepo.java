package com.fullstack.employee.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fullstack.employee.entity.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, UUID> {

    @Query("SELECT e FROM Employee e WHERE "+
     "LOWER(e.firstName) LIKE LOWER(CONCAT('%',:searchText,'%')) OR "+
     "LOWER(e.lastName) LIKE LOWER(CONCAT('%',:searchText,'%')) OR "+
     "LOWER(e.email) LIKE LOWER(CONCAT('%',:searchText,'%')) OR "+
     "LOWER(e.status) LIKE LOWER(CONCAT('%',:searchText,'%')) OR "+
     "LOWER(e.department.name) LIKE LOWER(CONCAT('%',:searchText,'%')) OR "+
     "LOWER(e.role.title) LIKE LOWER(CONCAT('%',:searchText,'%')) OR "+
     "LOWER(e.role.level) LIKE LOWER(CONCAT('%',:searchText,'%')) "
    )
    List<Employee> searchEmployeesByText(@Param("searchText") String searchText);
    
}
