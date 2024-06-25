package net.marci.hr.controller;

import net.marci.hr.EmployeeService;
import net.marci.hr.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/hr/employee")
public class EmployeeController {

  @Autowired
  private EmployeeService service;

  @GetMapping("/{id}")
  public Employee getById(@PathVariable(value = "id") long id) {
    return service.getById(id);
  }

  @PostMapping("/create")
  public Employee create(@RequestBody Employee employee) {
    return service.save(employee);
  }
}