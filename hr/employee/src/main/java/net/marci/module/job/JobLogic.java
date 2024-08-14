package net.marci.module.job;

import net.marci.lib.common.Record;
import net.marci.module.dbConnectService.DBConnectService;
import net.marci.module.employee.EmployeeStatusLogic;
import net.marci.module.job.entity.Job;
import net.marci.module.job.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JobLogic extends DBConnectService {

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

  public List<Record> search(Record sqlArgs) {
    final String SQL_QUERY = """
      SELECT
        job.id              AS "id",
        job.name            AS "name",
        job.description     AS "description"
      FROM job
      WHERE
        (job.full_name ILIKE '%' || COALESCE(:pattern, job.full_name) || '%')
        AND (job.storage_state IS NULL OR job.storage_state IN (:storageState))
        AND (job.modified_time >= COALESCE(:modifiedTime, job.modified_time))
    """;
    return this.search(SQL_QUERY, sqlArgs);
  }
}