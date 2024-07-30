package net.marci.module.education;

import lombok.extern.slf4j.Slf4j;
import net.marci.module.education.entity.Education;
import net.marci.module.education.repository.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Slf4j
@Component
public class EducationLogic {

  @Autowired
  private EducationRepository repository;

  public Education save(Education education) {
    education.setUserInteract();
    return repository.save(education);
  }

  public void deleteByIds(List<Long> targetIds) {
    if (Objects.isNull(targetIds) || targetIds.isEmpty()) {
      log.error("targetIds is null or empty");
      return;
    }
    repository.deleteAllById(targetIds);
  }
}