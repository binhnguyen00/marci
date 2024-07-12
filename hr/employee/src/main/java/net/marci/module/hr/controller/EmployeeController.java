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

  @GetMapping("/{id}")
  @ResponseBody
  public Employee getById(@PathVariable(value = "id") Long id) {
    return service.getById(id);
  }

  @PostMapping("/save")
  @ResponseBody
  public Employee save(@RequestBody Employee employee) {
    return service.save(employee);
  }

  @DeleteMapping("/delete/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteById(@PathVariable(value = "id") long id) {
    service.deleteById(id);
  }

  @GetMapping("/all")
  @ResponseBody
  public List<Employee> findAll() {
    return service.findAll();
  }
}