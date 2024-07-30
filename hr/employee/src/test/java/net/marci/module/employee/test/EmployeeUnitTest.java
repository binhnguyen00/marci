package net.marci.module.employee.test;

import net.marci.lib.utils.DBConnectUtils;
import net.marci.module.config.AccountModuleConfig;
import net.marci.module.config.DeleteGraphModuleConfig;
import net.marci.module.config.EmployeeModuleConfig;
import net.marci.module.config.HttpModuleConfig;
import net.marci.module.deletegraph.DeleteGraphBuilder;
import net.marci.module.employee.EmployeeLogic;
import net.marci.module.employee.dto.ModelCreateEmployee;
import net.marci.module.employee.entity.Employee;
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
  public void testAll() {
    createEmployee();
    getEmployee();
    deleteEmployee();
  }

  @Test @Tag("unit")
  public void createEmployee() {
    ModelCreateEmployee model = new ModelCreateEmployee();
    model.setUserName("_jackjack68");
    model.setPassword("123456");

    model.setNickName("Jack");
    model.setFullName("Nguyen Nang Binh");
    model.setEmail("jacjack2000.kahp@gmail.com");
    model.setPhoneNumber("0942659016");
    model.setDateOfBirth(LocalDate.of(2000, 3, 28));

    Employee employee = employeeLogic.create(model);
    Assertions.assertNotNull(employee);
  }

  @Test @Tag("unit")
  public void getEmployee() {
    Employee employeeInDb = employeeLogic.getByUserName("_jackjack68");
    Assertions.assertNotNull(employeeInDb);

    employeeInDb = employeeLogic.getByEmail("jacjack2000.kahp@gmail.com");
    Assertions.assertNotNull(employeeInDb);

    employeeInDb = employeeLogic.getById(1L);
    Assertions.assertNotNull(employeeInDb);
  }

  @Test @Tag("unit")
  public void deleteEmployee() {
    Employee employeeInDb = employeeLogic.getByUserName("_jackjack68");
    DBConnectUtils connectUtils = new DBConnectUtils(dataSource);
    DeleteGraphBuilder deleteGraphBuilder = new DeleteGraphBuilder(connectUtils, Employee.class, List.of(employeeInDb.getId()));
    int target = deleteGraphBuilder.doDelete();
    Assertions.assertEquals(1, target);
  }
}