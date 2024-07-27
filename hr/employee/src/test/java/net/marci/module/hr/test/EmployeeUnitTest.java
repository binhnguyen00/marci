package net.marci.module.hr.test;

import net.marci.lib.utils.DBConnectUtils;
import net.marci.module.config.AccountModuleConfig;
import net.marci.module.config.DeleteGraphModuleConfig;
import net.marci.module.config.EmployeeModuleConfig;
import net.marci.module.config.HttpModuleConfig;
import net.marci.module.deletegraph.DeleteGraphBuilder;
import net.marci.module.hr.EmployeeLogic;
import net.marci.module.hr.entity.Employee;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import javax.sql.DataSource;
import java.time.LocalDate;
import java.util.List;

@SpringBootTest(
  webEnvironment= SpringBootTest.WebEnvironment.NONE,
  classes = {
    DeleteGraphModuleConfig.class, AccountModuleConfig.class, EmployeeModuleConfig.class, HttpModuleConfig.class
  },
  properties = {
    "spring.config.location=classpath:config/application.yaml",
    "logging.level.net.marci=DEBUG",
  }
)
@EnableAutoConfiguration(
  exclude= {
    SecurityAutoConfiguration.class
  }
)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class EmployeeUnitTest {

  @Autowired
  private DataSource dataSource;

  @Autowired
  private EmployeeLogic employeeLogic;

  @Test @Tag("unit")
  public void allTest() {
    Employee employee = new Employee();
    employee.setFullName("Nguyen Nang Binh");
    employee.setDateOfBirth(LocalDate.of(2000, 3, 28));
    employee.setNickName("jack-jack");
    employee = employeeLogic.save(employee);
    Assertions.assertNotNull(employee);

    Employee employeeInDb = employeeLogic.getById(employee.getId());
    Assertions.assertNotNull(employeeInDb);

    DBConnectUtils connectUtils = new DBConnectUtils(dataSource);
    DeleteGraphBuilder deleteGraphBuilder = new DeleteGraphBuilder(connectUtils, Employee.class, List.of(employeeInDb.getId()));
    int target = deleteGraphBuilder.doDelete();
    Assertions.assertEquals(1, target);
  }
}