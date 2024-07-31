package net.marci.module.employee.repository;

import net.marci.module.employee.entity.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface EmployeeStatusRepository extends JpaRepository<EmployeeStatus, Serializable> {

  List<EmployeeStatus> findByJobId(Long jobId);

  List<EmployeeStatus> findByEmployeeId(Long employeeId);

  List<EmployeeStatus> findByManagerId(Long managerId);
}