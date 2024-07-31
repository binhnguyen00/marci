package net.marci.module.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan(
  basePackages = {
    "net.marci.module.education",
    "net.marci.module.job",
    "net.marci.module.employee",
  }
)
@EnableJpaRepositories(
  basePackages = {
    "net.marci.module.education.repository",
    "net.marci.module.job.repository",
    "net.marci.module.employee.repository",
  }
)
@EntityScan(
  basePackages = {
    "net.marci.module.employee.education",
    "net.marci.module.employee.job",
    "net.marci.module.employee.entity",
  }
)
@EnableConfigurationProperties
@EnableTransactionManagement
public class EmployeeModuleConfig {
}