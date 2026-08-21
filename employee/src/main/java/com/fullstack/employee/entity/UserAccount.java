package com.fullstack.employee.entity;

import java.util.UUID;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "USER_ACCOUNT")
public class UserAccount {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String userName;
    private String passwordHash;
    private String role;

    @OneToOne
    @JoinColumn(name = "employee_id", unique = true)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Employee employee;
}
