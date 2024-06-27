package net.marci.common;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@MappedSuperclass
@Getter @Setter @NoArgsConstructor
abstract public class Persistable<PK extends Serializable> implements org.springframework.data.domain.Persistable<PK> {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  protected PK id;

  @Override
  public boolean isNew() {
    return null == getId();
  }
}