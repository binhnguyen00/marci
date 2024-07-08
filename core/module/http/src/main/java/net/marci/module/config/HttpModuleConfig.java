package net.marci.module.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan(
  basePackages = {
    "net.marci.module.model",
    "net.marci.module.http",
  }
)
@EnableConfigurationProperties
@EnableTransactionManagement
public class HttpModuleConfig {
}