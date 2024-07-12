package net.marci.module.account.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.marci.common.BaseEntity;

@Entity
@Table(
  name = Account.TABLE_NAME,
  uniqueConstraints = {
    @UniqueConstraint(
      name = "account_user_name_email",
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

  public static final String TABLE_NAME = "account";

  @NotNull
  @Column(name = "user_name", updatable = false)
  private String userName;

  @Column(nullable = false)
  private String password;

  private String email;

  @Column(name = "phone_number", length = 12)
  private String phoneNumber;
}