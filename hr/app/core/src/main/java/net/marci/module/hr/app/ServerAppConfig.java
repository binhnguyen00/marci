package net.marci.module.hr.app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import java.util.Arrays;

@Configuration
@EnableConfigurationProperties
/*
@ComponentScan(
  basePackages = {
    "net.marci.module.config",
    // "net.marci.server.http",
  }
)
@SpringBootApplication(
  exclude = { SecurityAutoConfiguration.class  }
)
@Import(value = {
  TODO: Implement these classes
  WebSecurityConfig.class,
  WebResourceConfig.class,
  WebSocketConfig.class
})
 */
@ComponentScan
@SpringBootApplication
public class ServerAppConfig {
  @Bean
  public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
    return args -> {
      System.out.println("Let's inspect the beans provided by Spring Boot:");
      String[] beanNames = ctx.getBeanDefinitionNames();
      Arrays.sort(beanNames);
      for (String beanName : beanNames) {
        System.out.println(beanName);
      }
    };
  }
}