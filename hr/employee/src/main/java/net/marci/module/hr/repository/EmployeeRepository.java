package net.marci.module.hr.repository;

import net.marci.module.hr.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Serializable> {

  @Query("SELECT employee FROM Employee employee WHERE employee.accountId = :accountId")
  Employee getByAccountId(@Param("accountId") Long accountId);

  @Query("""
    SELECT e
    FROM Employee e
    WHERE
      e.fullName ILIKE COALESCE(:fullName, e.fullName)
  """)
  List<Employee> search(@Param("fullName") String fullName);
}