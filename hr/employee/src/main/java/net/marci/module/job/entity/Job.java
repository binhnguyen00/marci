package net.marci.module.job.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.binhnguyen.common.BaseEntity;

@Entity
@Table(name = Job.TABLE_NAME)
@NoArgsConstructor @Getter @Setter
public class Job extends BaseEntity {
  public static final String TABLE_NAME = "job";

  @Column
  private String name;

  @Column
  private String description;
}