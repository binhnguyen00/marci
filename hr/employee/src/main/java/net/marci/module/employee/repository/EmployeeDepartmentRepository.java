package net.marci.module.employee.repository;

import net.marci.module.employee.entity.relation.EmployeeDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository
public interface EmployeeDepartmentRepository extends JpaRepository<EmployeeDepartment, Serializable> {

  @Query("SELECT ed FROM EmployeeDepartment ed WHERE ed.employeeId = :employeeId AND ed.departmentId = :departmentId")
  EmployeeDepartment getByEmployee(@Param("employeeId") Long employeeId, @Param("departmentId") Long departmentId);
}