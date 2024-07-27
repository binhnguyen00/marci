package net.marci.module.hr.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import net.marci.common.BaseEntity;
import net.marci.module.account.entity.Account;

import java.time.LocalDate;

@Entity
@Table(
  name = Employee.TABLE_NAME,
  uniqueConstraints = {
    @UniqueConstraint(
      name = "employee_account_id",
      columnNames = {
        "account_id"
      }
    )
  }
)
@NoArgsConstructor @Getter @Setter
public class Employee extends BaseEntity {

  public static final String TABLE_NAME = "employee";

  // Information
  @Column(name = "full_name")
  private String fullName;

  @Column(name = "nick_name")
  private String nickName;

  @Column(name = "date_of_birth")
  private LocalDate dateOfBirth;

  @NonNull
  @JoinColumn(name = "account_id", table = Account.TABLE_NAME, referencedColumnName = "id")
  private Long accountId;

  // Position
  @Column(name = "department_code")
  private String departmentCode;

  @Column(name = "position_code")
  private String positionCode;

  public Long delegateToAccount(@NonNull Account account) {
    this.accountId = account.getId();
    return this.accountId;
  }
}