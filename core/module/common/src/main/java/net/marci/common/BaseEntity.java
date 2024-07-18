package net.marci.common;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Objects;

@MappedSuperclass
@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor @Getter @Setter
abstract public class BaseEntity extends Persistable<Long> {

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
    if (this.isNew() && Objects.isNull(createdTime)) setCreatedTime(time);
    setModifiedTime(time);
  }

  public enum StorageState {
    ACTIVE, ARCHIVED
  }
}