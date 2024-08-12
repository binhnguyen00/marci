package net.marci.module.employee.controller;

import net.marci.module.employee.EmployeeService;
import net.marci.module.employee.entity.Employee;
import net.marci.module.http.controller.BaseController;
import net.marci.module.http.dto.ServerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.Callable;

@RestController
@RequestMapping("/hr/employee")
public class EmployeeController extends BaseController {

  @Autowired
  private EmployeeService service;

  @PostMapping("/save")
  @ResponseStatus(HttpStatus.OK)
  public @ResponseBody ServerResponse save(@RequestBody Employee employee) {
    Callable<Employee> executor = () -> service.save(employee);
    return this.execute("EmployeeService", "save", executor);
  }
}