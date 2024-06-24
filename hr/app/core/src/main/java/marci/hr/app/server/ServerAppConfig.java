package marci.hr.app.server;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan(
  basePackages = {
    "net.datatp.module.config",
    "net.datatp.server.http",
  }
)
@EnableConfigurationProperties

@SpringBootApplication(
  exclude = { SecurityAutoConfiguration.class  }
)
@Import(value = {
  /* TODO: implement
  WebSecurityConfig.class,
  WebResourceConfig.class,
  WebSocketConfig.class */
})
public class ServerAppConfig {
  /* TODO: implement
  @Bean("DataInitService")
  DataInitService dataInitService() {
    return new DataInitService();
  } */
}