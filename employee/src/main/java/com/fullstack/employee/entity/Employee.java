package com.fullstack.employee.entity;

import java.sql.Date;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "EMPLOYEE")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private Date dateOfHire;
    private String status;

    @ManyToOne
    @JoinColumn(name = "dept_id", nullable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Department department;

    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Address address;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Role role;

}
