package net.marci.core.common;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
@NoArgsConstructor
abstract public class Persistable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  protected Long id;
}