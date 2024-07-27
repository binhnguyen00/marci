package net.marci.module.hr;

import lombok.extern.slf4j.Slf4j;
import net.marci.lib.common.Record;
import net.marci.module.account.AccountLogic;
import net.marci.module.account.entity.Account;
import net.marci.module.hr.dto.ModelCreateEmployee;
import net.marci.module.hr.entity.Employee;
import net.marci.module.hr.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Slf4j
@Component
public class EmployeeLogic {

  @Autowired
  private AccountLogic accountLogic;

  @Autowired
  private EmployeeRepository repository;

  public Employee getById(Long id) {
    return repository.getReferenceById(id);
  }

  public Employee getByAccountId(Long accountId) {
    return repository.getByAccountId(accountId);
  }

  public Employee getByUserName(String userName) {
    final Account accountInDb = accountLogic.getByUserName(userName);
    if (Objects.isNull(accountInDb)) {
      log.error("User {} not found", userName);
      throw new RuntimeException("User not found");
    }
    return getByAccountId(accountInDb.getId());
  }

  public Employee getByEmail(String email) {
    final Account accountInDb = accountLogic.getByEmail(email);
    if (Objects.isNull(accountInDb)) {
      log.error("User with email {} not found", email);
      throw new RuntimeException("User not found");
    }
    return getByAccountId(accountInDb.getId());
  }

  public Employee create(ModelCreateEmployee model) {
    Account accountInDb = accountLogic.getByUserName(model.getUserName());
    if (Objects.nonNull(accountInDb)) {
      log.error("User Name {} is already used", model.getUserName());
      throw new RuntimeException("User already exists");
    }
    Employee employeeInDb = getByEmail(model.getEmail());
    if (Objects.nonNull(employeeInDb)) {
      log.error("Email {} is already used", model.getEmail());
      throw new RuntimeException("User already exists");
    }

    Account account = new Account();
    account.setUserName(model.getEmail());
    account.setPassword(model.getPassword());
    account.setCityCode(model.getCityCode());
    account.setCountryCode(model.getCountryCode());
    account.setStateCode(model.getStateCode());
    account.setAddress(model.getAddress());
    account.setUserName(model.getUserName());
    accountLogic.create(account);

    Employee employee = new Employee();
    employee.delegateToAccount(account);
    employee.setFullName(model.getFullName());
    employee.setNickName(model.getNickName());
    employee.setEmail(model.getEmail());
    employee.setPhoneNumber(model.getPhoneNumber());
    employee.setDateOfBirth(model.getDateOfBirth());
    employee.setUserInteract();
    employee = repository.save(employee);

    return employee;
  }

  public Employee save(Employee employee) {
    employee.setUserInteract();
    return repository.save(employee);
  }

  public void deleteById(long id) {
    repository.deleteById(id);
  }

  public List<Employee> findAll() {
    return repository.findAll();
  }

  public List<Employee> search(Record params) {
    final String fullName = params.getAsString("fullName");
    return repository.search(fullName);
  }
}