package net.marci.core.common;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter @Getter
@NoArgsConstructor
abstract public class BaseEntity extends Persistable {

  @Column(name = "created_by")
  protected String createdBy;

  @Column(name = "created_time")
  protected Date createdTime;

  @Column(name = "modified_by")
  protected String modifiedBy;

  @Column(name = "modified_time")
  protected Date modifiedTime;
}