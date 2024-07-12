package net.marci.module.hr.controller;

import lombok.extern.slf4j.Slf4j;
import net.marci.module.hr.EmployeeService;
import net.marci.module.hr.entity.Employee;
import net.marci.module.http.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/hr/employee")
public class EmployeeController extends BaseController {

  @Autowired
  private EmployeeService service;

  @PostMapping("/hello")
  @ResponseBody
  public String hello() {
    return service.helloWorld();
  }
}