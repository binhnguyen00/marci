package net.marci.module.employee;

import lombok.extern.slf4j.Slf4j;
import net.marci.lib.common.Record;
import net.marci.module.account.AccountLogic;
import net.marci.module.account.entity.Account;
import net.marci.module.employee.dto.ModelCreateEmployee;
import net.marci.module.employee.entity.Employee;
import net.marci.module.employee.repository.EmployeeRepository;
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
      log.error("Username {} not found", userName);
      throw new RuntimeException("Employee not found");
    }
    return getByAccountId(accountInDb.getId());
  }

  public Employee getByEmail(String email) {
    final Account accountInDb = accountLogic.getByEmail(email);
    if (Objects.isNull(accountInDb)) {
      log.error("Email {} not found", email);
      throw new RuntimeException("Employee not found");
    }
    return getByAccountId(accountInDb.getId());
  }

  public Employee create(ModelCreateEmployee model) {
    Account accountByUserName = accountLogic.getByUserName(model.getUserName());
    if (Objects.nonNull(accountByUserName)) {
      log.error("Username {} already exists", model.getUserName());
      throw new RuntimeException("Username already exists");
    }
    Account accountByEmail = accountLogic.getByEmail(model.getEmail());
    if (Objects.nonNull(accountByEmail)) {
      log.error("Email {} already exists", model.getEmail());
      throw new RuntimeException("Email already exists");
    }

    Account account = new Account();
    account.setEmail(model.getEmail());
    account.setUserName(model.getUserName());
    account.setPassword(model.getPassword());
    account.setCityCode(model.getCityCode());
    account.setCountryCode(model.getCountryCode());
    account.setStateCode(model.getStateCode());
    account.setAddress(model.getAddress());
    accountLogic.create(account);

    Employee employee = new Employee();
    employee.delegateToAccount(account);
    employee.setFullName(model.getFullName());
    employee.setNickName(model.getNickName());
    employee.setPhoneNumber(model.getPhoneNumber());
    employee.setDateOfBirth(model.getDateOfBirth());
    employee.setEducations(model.getEducations());
    employee = save(employee);

    return employee;
  }

  public Employee save(Employee employee) {
    employee.setUserInteract();
    return repository.save(employee);
  }

  public void deleteById(long id) {
    repository.deleteById(id);
  }

  public void deleteByIds(List<Long> ids) {
    ids.forEach(this::deleteById);
  }

  public List<Employee> findAll() {
    return repository.findAll();
  }

  public List<Employee> search(Record sqlArgs) {
    final String filterValue = sqlArgs.getAsString("filterValue");
    return repository.search(filterValue);
  }
}