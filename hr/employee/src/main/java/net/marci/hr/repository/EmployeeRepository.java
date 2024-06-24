package net.marci.hr.repository;

import net.marci.hr.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;

public interface EmployeeRepository extends JpaRepository<Employee, Serializable> {
}