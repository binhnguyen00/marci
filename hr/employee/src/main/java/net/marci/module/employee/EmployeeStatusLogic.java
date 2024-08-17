package net.marci.module.employee;

import lombok.extern.slf4j.Slf4j;
import net.marci.module.employee.entity.EmployeeStatus;
import net.marci.module.employee.repository.EmployeeStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component @Slf4j
public class EmployeeStatusLogic {

  @Autowired
  private EmployeeStatusRepository repository;

  public EmployeeStatus getById(long id) {
    return repository.findById(id).orElse(null);
  }

  public EmployeeStatus save(EmployeeStatus status) {
    status.setUserInteract();
    return repository.save(status);
  }

  public void removeJob(Long jobId) {
    List<EmployeeStatus> statusList = repository.findByJobId(jobId);
    if (statusList.isEmpty()) return;
    statusList.forEach(status -> status.setJobId(null));
    repository.saveAll(statusList);
  }


}