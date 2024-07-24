package net.marci.app.core;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/*
 * @author Bình Nguyễn
 * @Email jackjack2000.kahp@gmail.com
 */

@Slf4j
@ComponentScan(
  basePackages = {
    "net.marci.module.config",
  }
)
@Configuration
public class ServerAppConfig {
  /*
  @Bean
  public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
    return args -> {
      String[] beanNames = ctx.getBeanDefinitionNames();
      Arrays.sort(beanNames);
      log.info("Let's inspect the beans provided by Spring Boot:\n {}", DataSerializer.JSON.toString(beanNames));
    };
  } */
}