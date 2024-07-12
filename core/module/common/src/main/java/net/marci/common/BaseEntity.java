package net.marci.common;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Objects;

@MappedSuperclass
@Getter @Setter @NoArgsConstructor
abstract public class BaseEntity extends Persistable<Long> {

  public enum StorageState {
    ACTIVE, ARCHIVED
  }

  @Column(name = "creator")
  protected String creator;

  @Column(name = "created_time")
  protected Date createdTime;

  @Column(name = "modifier")
  protected String modifier;

  @Column(name = "modified_time")
  protected Date modifiedTime;

  @Column(name = "storage_state")
  @Enumerated(EnumType.STRING)
  protected StorageState storageState = StorageState.ACTIVE;

  @Override
  public String toString() {
    return String.format("Entity of type %s with id: %s", this.getClass().getName(), getId());
  }

  /**
   * Update modifier, modified time.
   * If the record is new, set creator, created time.
   */
  public void setUserInteract(/* Client */) {
    // TODO: setCreator(), setModifier()
    this.setMilestone(new Date());
  }

  public void setMilestone(Date time) {
    if (this.isNew()) {
      if (Objects.isNull(createdTime)) setCreatedTime(time);
    }
    setModifiedTime(time);
  }
}