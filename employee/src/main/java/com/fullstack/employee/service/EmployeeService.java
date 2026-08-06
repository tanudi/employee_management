package com.fullstack.employee.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.fullstack.employee.dto.AddressDTO;
import com.fullstack.employee.dto.EmployeeDTO;
import com.fullstack.employee.dto.RoleDTO;
import com.fullstack.employee.entity.Address;
import com.fullstack.employee.entity.Department;
import com.fullstack.employee.entity.Employee;
import com.fullstack.employee.entity.Role;
import com.fullstack.employee.repository.EmployeeRepo;

@Service
public class EmployeeService {

    private final EmployeeRepo employeeRepo;

    EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepo.findAll()
                .stream()
                .map(EmployeeService::toDTO)
                .toList();
    }

    public EmployeeDTO getEmployee(UUID id) throws NotFoundException {
        Optional<Employee> employee = employeeRepo.findById(id);
        return employee.map(EmployeeService::toDTO).orElseThrow(NotFoundException::new);
    }

    private static EmployeeDTO toDTO(Employee employee) {
        Department department = employee.getDepartment();
        AddressDTO addressDTO = EmployeeService.toAddressDTO(employee.getAddress());
        RoleDTO roleDTO = EmployeeService.toRoleDTO(employee.getRole());
        EmployeeDTO employeeDTO = new EmployeeDTO.EmployeeBuilder()
            .setDateOfFire(employee.getDateOfHire())
            .setid(employee.getId())
            .setFirstName(employee.getFirstName())
            .setLastName(employee.getLastName())
            .setEmail(employee.getEmail())
            .setStatus(employee.getStatus())
            .setDepartmentId(department != null ? department.getId():null)
            .setDepartmenName(department != null ? department.getName():null)
            .setAddress(addressDTO)
            .setRole(roleDTO)
            .build();
        return employeeDTO;
    }

    private static AddressDTO toAddressDTO(Address address) {
        return new AddressDTO.AddressBuilder()
        .setStreet(address.getStreet())
        .setCity(address.getCity())
        .setCountry(address.getCountry())
        .build();
    }

    private static RoleDTO toRoleDTO(Role role) {
        return new RoleDTO.RoleBuilder()
        .setLevel(role.getLevel())
        .setTitle(role.getTitle())
        .build();
    }
}
