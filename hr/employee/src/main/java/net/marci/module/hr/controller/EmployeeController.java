package net.marci.module.hr.controller;

import net.marci.module.hr.EmployeeService;
import net.marci.module.hr.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hr/employee")
public class EmployeeController {

  @Autowired
  private EmployeeService service;

  @PostMapping("/test")
  public void test() {
    System.out.println("Call Marci Server");
  }

  @GetMapping("/{id}")
  public Employee getById(@PathVariable(value = "id") long id) {
    return service.getById(id);
  }

  @PostMapping("/create")
  @ResponseStatus(HttpStatus.CREATED)
  public Employee create(@RequestBody Employee employee) {
    return service.save(employee);
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