package net.marci.module.department;

import net.marci.lib.common.Record;
import net.marci.module.department.entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("DepartmentService")
public class DepartmentService {

  @Autowired
  private DepartmentLogic logic;

  @Transactional
  public Department getById(Long id) {
    return logic.getById(id);
  }

  @Transactional
  public Department create(Department department) {
    return logic.create(department);
  }

  @Transactional
  public Department save(Department department) {
    return logic.save(department);
  }

  @Transactional
  public int deleteByIds(List<Long> targetIds) {
    return logic.deleteByIds(targetIds);
  }

  @Transactional
  public List<Record> search(Record sqlArgs) {
    return logic.search(sqlArgs);
  }
}