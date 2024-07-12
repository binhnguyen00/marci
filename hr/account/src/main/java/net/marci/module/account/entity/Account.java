package net.marci.module.account.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.marci.common.BaseEntity;

@Table(
  name = "account",
  uniqueConstraints = {
    @UniqueConstraint(
      name = "user_name_email",
      columnNames = {
        "user_name", "email"
      }
    )
  }
)
@Getter
@Setter
@NoArgsConstructor
public class Account extends BaseEntity {

  @NotNull
  @Column(name = "user_name", updatable = false)
  private String userName;

  @Column(nullable = false)
  private String password;

  private String email;

  @Column(name = "phone_number", length = 12)
  private String phoneNumber;
}