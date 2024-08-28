package net.marci.module.department.initialization;

import jakarta.annotation.PostConstruct;
import net.binhnguyen.lib.common.Record;
import net.binhnguyen.lib.utils.DataSerializer;
import net.binhnguyen.module.excel.ExcelLogic;
import net.marci.module.department.DepartmentLogic;
import net.marci.module.department.entity.Department;
import net.marci.module.department.repository.DepartmentRepository;
import net.marci.module.employee.EmployeeLogic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class DepartmentInitData {

  @Autowired
  private ExcelLogic excelLogic;

  @Autowired
  private EmployeeLogic employeeLogic;

  @Autowired
  private DepartmentRepository departmentRepository;

  @PostConstruct
  public void init() throws IOException {
    List<Record> data = excelLogic.readWorkbook("workbooks/department.xlsx", "department");
    
    for (Record record : data) {
      // check if parent exists
      Department parentDept = null;
      final String deptParentName = record.getAsString("parentName");
      if (Objects.nonNull(deptParentName)) {
        parentDept = departmentRepository.getByName(deptParentName);
      }
      
      Department department = new Department();
      if (Objects.nonNull(parentDept)) department.delegateToParent(parentDept);
      department.setName(record.getAsString("name"));
      department.setDisplayName(record.getAsString("displayName"));
      department.setDescription(record.getAsString("description"));

      department.setUserInteract();
      departmentRepository.save(department);
    }
  }
}
