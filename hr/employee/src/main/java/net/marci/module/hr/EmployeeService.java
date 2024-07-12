package net.marci.module.hr;

import lombok.extern.slf4j.Slf4j;
import net.marci.module.hr.entity.Employee;
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
  public void deleteById(long id) {
    logic.deleteById(id);
  }

  @Transactional
  public List<Employee> findAll() {
    return logic.findAll();
  }

  public String helloWorld() {
    log.info("Welcome to Marci Server");
    return "Welcome to Marci Server";
  }
}