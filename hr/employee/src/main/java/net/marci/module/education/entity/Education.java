package net.marci.module.education.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.marci.common.BaseEntity;

import java.time.LocalDate;

@Entity
@Table(
  name = Education.TABLE_NAME
)
@NoArgsConstructor @Getter @Setter
public class Education extends BaseEntity {

  public static final String TABLE_NAME = "education";

  private String university;
  private String field;

  @Enumerated(EnumType.STRING)
  private Degree degree;

  @Column
  private LocalDate fromDate;

  @Column
  private LocalDate toDate;

  @Column
  private String description;

  public enum Degree {
    Elementary,   // Sơ cấp
    Intermediate, // Trung cấp
    Associate,    // Cao đẳng
    Bachelor,     // Đại học
    Master,       // Thạc sĩ
    PhD,          // Tiến sĩ
  }
}