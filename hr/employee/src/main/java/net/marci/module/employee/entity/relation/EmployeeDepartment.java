package net.marci.module.employee.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import net.marci.common.BaseEntity;

@Entity
@Table(name = EmployeeDepartment.TABLE_NAME)
public class EmployeeDepartment extends BaseEntity {

  public static final String TABLE_NAME = "employee_department";

  @Column(name = "employee_id")
  private Long employeeId;

  @Column(name = "manager_id")
  private Long managerId;

  @Column(name = "department_id")
  private Long departmentId;

  @Column(name = "job_id")
  private Long jobId;
}