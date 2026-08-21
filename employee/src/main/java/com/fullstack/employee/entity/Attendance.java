package com.fullstack.employee.entity;

import java.sql.Date;
import java.sql.Time;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "ATTENDANCE")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private Date date;
    private Time checkIn;
    private Time checkOut;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Employee employee;
    
}
