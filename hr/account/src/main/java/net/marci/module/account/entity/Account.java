package net.marci.module.account.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import net.binhnguyen.common.BaseEntity;
import net.binhnguyen.module.deletegraph.DeleteGraph;
import net.binhnguyen.module.deletegraph.DeleteGraphJoinType;
import net.binhnguyen.module.deletegraph.DeleteGraphs;

import java.util.Optional;

@Slf4j
@Entity
@Table(
  name = Account.TABLE_NAME,
  uniqueConstraints = {
    @UniqueConstraint(
      name = "account_user_name",
      columnNames = {
        "user_name"
      }
    ),
    @UniqueConstraint(
      name = "account_email",
      columnNames = {
        "email"
      }
    )
  }
)
@Getter
@Setter
@NoArgsConstructor
@DeleteGraphs({
  @DeleteGraph(table = "employee", joinField = "account_id", joinType = DeleteGraphJoinType.OneToOne)
})
public class Account extends BaseEntity {

  public static final String TABLE_NAME = "account";

  @Enumerated(EnumType.STRING)
  private Role role = Role.USER;

  @Email
  @NotNull
  @Column(name = "email")
  private String email;

  @NotNull
  @Column(name = "user_name", updatable = false)
  private String userName;

  @Column(name = "display_name")
  private String displayName;

  @NotNull
  private String password;

  @Column(name = "country_code")
  private String countryCode;

  @Column(name = "country_name")
  private String countryName;

  @Column(name = "state_code")
  private String stateCode;

  @Column(name = "state_name")
  private String stateName;

  @Column(name = "city_code")
  private String cityCode;

  @Column(name = "city_name")
  private String cityName;

  @Column(name = "address")
  private String address;

  public enum Role {
    ADMIN, USER;

    public static Optional<Role> fromString(String role) {
      if (role == null) return Optional.empty();
      try {
        return Optional.of(Role.valueOf(role.toUpperCase()));
      } catch (IllegalArgumentException e) {
        log.error("Invalid role: {}", role);
        return Optional.empty();
      }
    }
  }
}