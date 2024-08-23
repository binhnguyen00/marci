package net.marci.module.department;

import net.binhnguyen.lib.common.Record;
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
  public Department getById(long id) {
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

  @Transactional
  public List<Long> delegateEmployees(long departmentId, List<Long> employeeIds) {
    return logic.delegateEmployees(departmentId, employeeIds);
  }

  @Transactional
  public List<Long> removeEmployees(long departmentId, List<Long> employeeIds) {
    return logic.removeEmployees(departmentId, employeeIds);
  }
}