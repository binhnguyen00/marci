package net.marci.module.hr.controller;

import lombok.extern.slf4j.Slf4j;
import net.marci.module.hr.EmployeeService;
import net.marci.module.hr.entity.Employee;
import net.marci.module.http.controller.BaseController;
import net.marci.module.http.dto.ServerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.Callable;

@RestController
@RequestMapping("/hr/employee")
public class EmployeeController extends BaseController {

  @Autowired
  private EmployeeService service;

  @PostMapping("/find-all")
  public @ResponseBody ServerResponse hello() {
    Callable<List<Employee>> executor = () -> service.findAll();
    return this.execute("EmployeeService", "findAll", executor);
  }

  @PostMapping("/save")
  @ResponseStatus(HttpStatus.OK)
  public @ResponseBody ServerResponse save(@RequestBody Employee employee) {
    Callable<Employee> executor = () -> service.save(employee);
    return this.execute("EmployeeService", "save", executor);
  }
}