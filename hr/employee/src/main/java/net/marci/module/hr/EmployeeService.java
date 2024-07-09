package net.marci.module.hr;

import lombok.extern.slf4j.Slf4j;
import net.marci.module.hr.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service("EmployeeService")
public class EmployeeService {

  @Autowired
  private EmployeeLogic logic;

  public Employee getById(Long id) {
    return logic.getById(id);
  }

  public Employee save(Employee employee) {
    return logic.save(employee);
  }

  public void deleteById(long id) {
    logic.deleteById(id);
  }

  public List<Employee> getAll() {
    return logic.getAll();
  }

  public String helloWorld() {
    log.info("Welcome to Marci Server");
    return "Welcome to Marci Server";
  }
}