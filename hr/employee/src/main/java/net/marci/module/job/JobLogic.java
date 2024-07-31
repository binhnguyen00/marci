package net.marci.module.job;

import net.marci.lib.common.Record;
import net.marci.module.employee.EmployeeStatusLogic;
import net.marci.module.job.entity.Job;
import net.marci.module.job.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JobLogic {

  @Autowired
  private JobRepository jobRepository;

  @Autowired
  private EmployeeStatusLogic employeeStatusLogic;

  public Job save(Job job) {
    job.setUserInteract();
    return jobRepository.save(job);
  }

  public Job getById(Long id) {
    return jobRepository.getReferenceById(id);
  }

  public int deleteByIds(List<Long> targetIds) {
    targetIds.forEach(id -> employeeStatusLogic.removeJob(id));
    jobRepository.deleteAllById(targetIds);
    return targetIds.size();
  }

  public List<Job> search(Record sqlArgs) {
    final String name = sqlArgs.getAsString("name");
    return jobRepository.search(name);
  }
}