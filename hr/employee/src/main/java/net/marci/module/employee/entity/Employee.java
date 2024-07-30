package net.marci.module.employee.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import net.marci.common.BaseEntity;
import net.marci.module.account.entity.Account;
import net.marci.module.deletegraph.DeleteGraph;
import net.marci.module.deletegraph.DeleteGraphJoinType;
import net.marci.module.deletegraph.DeleteGraphs;
import net.marci.module.education.entity.Education;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(
  name = Employee.TABLE_NAME,
  uniqueConstraints = {
    @UniqueConstraint(
      name = "employee_account_id",
      columnNames = {
        "account_id"
      }
    ),
  }
)
@DeleteGraphs({
  @DeleteGraph(target = Education.class, joinField = "employee_id", joinType = DeleteGraphJoinType.OneToMany)
})
@NoArgsConstructor @Getter @Setter
public class Employee extends BaseEntity {

  public static final String TABLE_NAME = "employee";

  @Column(name = "full_name")
  private String fullName;

  @Column(name = "nick_name")
  private String nickName;

  @Column(name = "date_of_birth")
  private LocalDate dateOfBirth;

  @Column(name = "phone_number")
  private String phoneNumber;

  @NonNull
  @JoinColumn(name = "account_id", table = Account.TABLE_NAME, referencedColumnName = "id")
  private Long accountId;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "employee_id", referencedColumnName = "id")
  private List<Education> educations = new ArrayList<>();


  public Long delegateToAccount(Account account) {
    this.accountId = Objects.requireNonNull(account.getId());
    return getAccountId();
  }

  public List<Education> getEducations() {
    if (Objects.isNull(educations)) educations = new ArrayList<>();
    return educations;
  }

  public void setEducations(List<Education> educations) {
    if (Objects.isNull(this.educations)) this.educations = new ArrayList<>();
    this.educations.clear();
    if (Objects.nonNull(educations)) this.educations.addAll(educations);
  }

  public List<Education> appendEducation(@NonNull Education ... educations) {
    for (Education education : educations) {
      getEducations().add(education);
    }
    return getEducations();
  }
}