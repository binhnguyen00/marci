package net.marci.hr.app;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan(
  basePackages = {
    "net.marci.module.config",
    "net.marci.server.http",
  }
)
@EnableConfigurationProperties
@SpringBootApplication(
  exclude = { SecurityAutoConfiguration.class  }
)
@Import(value = {
  /* TODO: Implement these classes
  WebSecurityConfig.class,
  WebResourceConfig.class,
  WebSocketConfig.class
   */
})
public class ServerAppConfig {
}