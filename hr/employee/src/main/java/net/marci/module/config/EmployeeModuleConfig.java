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
    "net.marci.module.hr",
  }
)
@EnableJpaRepositories(
  basePackages = {
    "net.marci.module.hr.repository",
  }
)
@EntityScan(
  basePackages = "net.marci.module.hr.entity"
)
@EnableConfigurationProperties
@EnableTransactionManagement
public class EmployeeModuleConfig {
}