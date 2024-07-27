package net.marci.module.hr;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import net.marci.lib.common.Record;
import net.marci.module.account.AccountLogic;
import net.marci.module.account.entity.Account;
import net.marci.module.hr.dto.ModelCreateEmployee;
import net.marci.module.hr.dto.ModelCreateEmployee.CreateMethod;
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
    Employee employee = new Employee();

    if (CreateMethod.EMAIL.equals(model.getMode())) {
      Employee employeeInDb = getByEmail(model.getEmail());
      if (Objects.nonNull(employeeInDb)) {
        log.warn("Employee with email {} already exists", model.getEmail());
        throw new RuntimeException("Email already exists");
      } else {
        Account account = new Account();
        account.setUserName(model.getEmail());
        account.setEmail(model.getEmail());
        account.setPhoneNumber(model.getPhoneNumber());
        account.setCityCode(model.getCityCode());
        account.setCountryCode(model.getCountryCode());
        account.setStateCode(model.getStateCode());
        account.setAddress(model.getAddress());
        accountLogic.save(account);

        employee.delegateToAccount(account);
        employee.setFullName(model.getFullName());
        employee.setNickName(model.getNickName());
        employee.setDateOfBirth(model.getDateOfBirth());
      }
    } else if (CreateMethod.PHONE.equals(model.getMode())) {
      // TODO
    }

    return employee;
  }

  public Employee createFromAccount(@NonNull Account account) {
    if (account.isNew()) {
      log.error("Account {} not found", account.getId());
      throw new RuntimeException("Account not found");
    }

    Employee employee = new Employee();
    employee.delegateToAccount(account);

    return null;
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