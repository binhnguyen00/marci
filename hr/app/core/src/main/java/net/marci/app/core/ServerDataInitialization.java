package net.marci.app.core;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * @author Bình Nguyễn
 * @Email jackjack2000.kahp@gmail.com
 */
@Slf4j
@Profile("initial-data")
@ComponentScan(
  basePackages = {
    "net.marci.module.initialization",
  }
)
@Configuration
public class ServerDataInitialization {
}
