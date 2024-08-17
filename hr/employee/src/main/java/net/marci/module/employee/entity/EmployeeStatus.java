package net.marci.module.employee.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.marci.common.BaseEntity;

import java.time.LocalDate;

@Entity
@Table(name = EmployeeStatus.TABLE_NAME)
@NoArgsConstructor @Getter @Setter
public class EmployeeStatus extends BaseEntity {

  public static final String TABLE_NAME = "employee_status";

  @Column(name = "employee_id")
  private Long employeeId;

  @Column(name = "job_id")
  private Long jobId;

  @Column(name = "salary_id")
  private Long salaryId;

  @Column(name = "start_date")
  private LocalDate startDate;

  @Column(name = "end_date")
  private LocalDate endDate;

  @Column(name = "department_relation_id")
  private Long departmentRelationId;

  @Column
  private String description;
}