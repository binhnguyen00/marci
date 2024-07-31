package net.marci.module.job;

import net.marci.lib.common.Record;
import net.marci.module.job.entity.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("JobService")
public class JobService {

  @Autowired
  private JobLogic jobLogic;

  public Job save(Job job) {
    return jobLogic.save(job);
  }

  public Job getById(Long id) {
    return jobLogic.getById(id);
  }

  public int deleteByIds(List<Long> targetIds) {
    return jobLogic.deleteByIds(targetIds);
  }

  public List<Job> search(Record sqlArgs) {
    return jobLogic.search(sqlArgs);
  }
}