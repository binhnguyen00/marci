package net.marci.module.employee;

import lombok.extern.slf4j.Slf4j;
import net.marci.lib.common.Record;
import net.marci.module.employee.dto.ModelCreateEmployee;
import net.marci.module.employee.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service("EmployeeService")
public class EmployeeService {

  @Autowired
  private EmployeeLogic logic;

  @Transactional
  public Employee getById(Long id) {
    return logic.getById(id);
  }

  @Transactional
  public Employee getByAccountId(Long accountId) {
    return logic.getByAccountId(accountId);
  }

  @Transactional
  public Employee getByUserName(String userName) {
    return logic.getByUserName(userName);
  }

  @Transactional
  public Employee getByEmail(String email) {
    return logic.getByEmail(email);
  }

  @Transactional
  public Employee save(Employee employee) {
    return logic.save(employee);
  }

  @Transactional
  public Employee create(ModelCreateEmployee model) {
    return logic.create(model);
  }

  @Transactional
  public void deleteById(long id) {
    logic.deleteById(id);
  }

  @Transactional
  public void deleteByIds(List<Long> ids) {
    logic.deleteByIds(ids);
  }

  @Transactional
  public List<Employee> findAll() {
    return logic.findAll();
  }

  @Transactional
  public List<Employee> search(Record params) {
    return logic.search(params);
  }

  public String helloWorld() {
    log.info("Welcome to Marci Server");
    return "Welcome to Marci Server";
  }
}