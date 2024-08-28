package net.marci.module.initialization;

import jakarta.annotation.PostConstruct;
import net.binhnguyen.lib.common.Record;
import net.binhnguyen.lib.utils.DateUtils;
import net.binhnguyen.module.excel.ExcelLogic;
import net.marci.module.account.AccountLogic;
import net.marci.module.account.entity.Account;
import net.marci.module.employee.EmployeeLogic;
import net.marci.module.employee.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class EmployeeInitData {

  @Autowired
  private ExcelLogic excelLogic;

  @Autowired
  private AccountLogic accountLogic;

  @Autowired
  private EmployeeLogic employeeLogic;

  @PostConstruct
  public void initData() throws IOException {
    List<Record> data = excelLogic.readWorkbook("workbooks/employee.xlsx", "Employee");
    List<Employee> employees = new ArrayList<>();
    for (Record record : data) {
      Account account = accountLogic.getByUserName(record.getAsString("userName"));
      Employee employee = new Employee();
      employee.setAccountId(Objects.requireNonNull(account.getId()));
      employee.setFullName(record.getAsString("fullName"));
      employee.setNickName(record.getAsString("nickName"));
      employee.setGender(Employee.Gender.fromString(record.getAsString("gender")).orElse(null));
      employee.setDateOfBirth(DateUtils.toLocalDate(record.getAsString("dateOfBirth")));
      employee.setPhoneNumber(record.getAsString("phoneNumber"));
      employees.add(employee);
    }
    employeeLogic.saveBatch(employees);
  }
}
