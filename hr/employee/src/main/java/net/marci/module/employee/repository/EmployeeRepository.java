package net.marci.module.employee.repository;

import net.marci.module.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Serializable> {

  @Query("SELECT employee FROM Employee employee WHERE employee.accountId = :accountId")
  Employee getByAccountId(@Param("accountId") Long accountId);
}