package net.marci.module.initialization;

import net.binhnguyen.module.excel.ExcelLogic;
import net.marci.module.employee.EmployeeLogic;
import net.marci.module.employee.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class EmployeeInitData {

  @Autowired
  private ExcelLogic excelLogic;

  @Autowired
  private EmployeeLogic employeeLogic;

  public void initData() throws IOException {
    List<Employee> data = excelLogic.readWorkbook("workbooks/employee.xlsx", "Employee", Employee.class);
    employeeLogic.saveBatch(data);
  }
}
