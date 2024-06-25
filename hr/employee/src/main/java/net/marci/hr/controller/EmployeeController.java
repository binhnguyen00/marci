package net.marci.hr.controller;

import net.marci.hr.EmployeeService;
import net.marci.hr.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/hr/employee")
public class EmployeeController {

  @Autowired
  private EmployeeService service;

  @GetMapping("/{id}")
  public Employee getById(@PathVariable(value = "id") long id) {
    return service.getById(id);
  }

  @PostMapping("/save")
  public Employee save(@RequestBody Employee employee) {
    return service.save(employee);
  }

  @DeleteMapping("/delete/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteById(@PathVariable(value = "id") long id) {
    service.deleteById(id);
  }

  @GetMapping("/all")
  public List<Employee> getAll() {
    return service.getAll();
  }
}