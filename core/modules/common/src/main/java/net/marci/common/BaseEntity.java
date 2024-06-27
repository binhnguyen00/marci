package net.marci.common;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@MappedSuperclass
@Getter @Setter @NoArgsConstructor
abstract public class BaseEntity extends Persistable<Long> {

  @Column(name = "creator")
  protected String creator;

  @Column(name = "created_time")
  protected Date createdTime;

  @Column(name = "modified_by")
  protected String modifiedBy;

  @Column(name = "modified_time")
  protected Date modifiedTime;

  @Override
  public String toString() {
    return String.format("Entity of type %s with id: %s", this.getClass().getName(), getId());
  }
}