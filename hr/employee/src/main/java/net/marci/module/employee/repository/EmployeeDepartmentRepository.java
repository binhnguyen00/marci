package net.marci.module.employee.repository;

import net.marci.module.employee.entity.EmployeeDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository
public interface EmplyeeDepartmentRepository extends JpaRepository<EmployeeDepartment, Serializable> {
}