package net.marci.module.hr;

import net.marci.module.hr.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("EmployeeService")
public class EmployeeService {

  @Autowired
  private EmployeeLogic logic;

  public Employee getById(long id) {
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
}