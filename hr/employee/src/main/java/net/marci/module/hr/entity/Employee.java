package net.marci.module.hr.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
@Getter
@Setter
@NoArgsConstructor
public class Employee extends BaseEntity {

  public static final String TABLE_NAME = "employee";

  @Column(name = "full_name")
  private String fullName;

  @Column(name = "nick_name")
  private String nickName;

  @Column(name = "date_of_birth")
  private LocalDate dateOfBirth;

  @JoinColumn(name = "account_id", table = Account.TABLE_NAME, referencedColumnName = "id")
  private Long accountId;
}