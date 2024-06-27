package net.marci.module.hr.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.marci.common.BaseEntity;

import java.time.LocalDate;

@Entity
@Table(name = "employee")
@Getter @Setter
@NoArgsConstructor
public class Employee extends BaseEntity {

  @Column(name = "full_name")
  private String fullName;

  @Column(name = "nick_name")
  private String nickName;

  @Column(name = "date_of_birth")
  private LocalDate dateOfBirth;

  @Column(name = "account_id")
  private Long accountId;
}