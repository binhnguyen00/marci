package net.marci.module.department.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import net.binhnguyen.common.BaseEntity;

import java.util.Objects;

@Entity
@Table(
  name = Department.TABLE_NAME
)
@Getter @Setter @NoArgsConstructor
public class Department extends BaseEntity {

  public static final String TABLE_NAME = "department";

  @Column
  private String name;

  @Column(name = "parent_id")
  private Long parentId;

  /**
   * Works like tree folder but has 1 branch only. From root -> child.
   * @Example: 1/2/3/4
  */
  @Column(name = "family_tree")
  private String familyTree;

  @Column
  private String description;

  public void delegateToParent(@NonNull Department parent) {
    this.parentId = parent.getId();
    growFamilyTree(parent);
  }

  public void growFamilyTree(@NonNull Department parent) {
    if (Objects.isNull(parent.getFamilyTree())) {
      this.familyTree = String.valueOf(parent.getId());
    } else {
      this.familyTree = parent.getFamilyTree() + "/" + parent.getId();
    }
  }
}