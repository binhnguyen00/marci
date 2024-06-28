package net.marci.module.hr.controller;

import lombok.extern.slf4j.Slf4j;
import net.marci.module.hr.EmployeeService;
import net.marci.module.hr.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/hr/employee")
public class EmployeeController {

  @Autowired
  private EmployeeService service;

  @PostMapping("/hello")
  public String test() {
    log.info("Welcome to Marci Server");
    return "Welcome to Marci Server";
  }

  @GetMapping("/{id}")
  public Employee getById(@PathVariable(value = "id") long id) {
    return service.getById(id);
  }

  @PutMapping("/save")
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