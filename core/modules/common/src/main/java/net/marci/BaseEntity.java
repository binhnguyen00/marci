package net.marci;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter @Getter
@NoArgsConstructor
abstract public class BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  protected Long id;

  @Column(name = "creator")
  protected String creator;

  @Column(name = "created_time")
  protected Date createdTime;

  @Column(name = "modified_by")
  protected String modifiedBy;

  @Column(name = "modified_time")
  protected Date modifiedTime;
}