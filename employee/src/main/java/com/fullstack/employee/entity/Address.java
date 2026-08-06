package com.fullstack.employee.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "ADDRESS")
public class Address {

    @Id
    @Column(name = "employee_id")
    private UUID id;

    private String street;
    private String city;
    private String country;

    @OneToOne
    @MapsId
    @JoinColumn(name = "employee_id")
    @EqualsAndHashCode.Exclude
    private Employee employee;
}
