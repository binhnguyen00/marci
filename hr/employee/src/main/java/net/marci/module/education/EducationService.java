package net.marci.module.education;

import net.marci.module.education.entity.Education;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("EducationService")
public class EducationService {

  @Autowired
  private EducationLogic logic;

  public Education save(Education education) {
    return logic.save(education);
  }

  public void deleteByIds(List<Long> targetIds) {
    logic.deleteByIds(targetIds);
  }
}