package net.marci.hr;

import net.marci.hr.entity.Employee;
import net.marci.hr.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmployeeLogic {

  @Autowired
  private EmployeeRepository repository;

  public Employee getById(long id) {
    return repository.getReferenceById(id);
  }

  public Employee save(Employee employee) {
    return repository.save(employee);
  }

  public void deleteById(long id) {
    repository.deleteById(id);
  }

  public List<Employee> getAll() {
    return repository.findAll();
  }
}