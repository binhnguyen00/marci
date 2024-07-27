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
import net.marci.module.deletegraph.DeleteGraph;
import net.marci.module.deletegraph.DeleteGraphJoinType;
import net.marci.module.deletegraph.DeleteGraphs;

@Entity
@Table(
  name = Account.TABLE_NAME,
  uniqueConstraints = {
    @UniqueConstraint(
      name = "account_user_name_email",
      columnNames = {
        "user_name", "email"
      }
    ),
    @UniqueConstraint(
      name = "account_user_name_phone_number",
      columnNames = {
        "user_name", "phone_number"
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

  @NotNull
  @Column(name = "user_name", updatable = false)
  private String userName;

  @NotNull
  private String password;

  @Column(name = "email", updatable = false)
  private String email;

  @Column(name = "phone_number", length = 12)
  private String phoneNumber;

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
}