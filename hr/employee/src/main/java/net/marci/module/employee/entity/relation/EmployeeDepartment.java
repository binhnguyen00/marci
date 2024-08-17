package net.marci.module.employee.entity.relation;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.marci.common.BaseEntity;

@Entity
@Table(
  name = EmployeeDepartment.TABLE_NAME
  /* uniqueConstraints = {
    @UniqueConstraint(
      name = "employee_department",
      columnNames = {
        "employee_id", "department_id",
      }
    )
  } */
)
@Getter @Setter @NoArgsConstructor
public class EmployeeDepartment extends BaseEntity {

  public static final String TABLE_NAME = "employee_department_rel";

  @Column(name = "employee_id")
  private Long employeeId;

  @Column(name = "manager_id")
  private Long managerId;

  @Column(name = "department_id")
  private Long departmentId;

  @Column(name = "job_id")
  private Long jobId;
}