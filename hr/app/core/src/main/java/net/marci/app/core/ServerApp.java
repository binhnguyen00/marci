package net.marci.app.core;

import lombok.extern.slf4j.Slf4j;
import net.marci.module.config.EmployeeModuleConfig;
import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.io.PrintStream;

@Slf4j
@Configuration
@EnableConfigurationProperties
@SpringBootApplication
public class ServerApp {

  static public void run(String[] args) throws Exception {
    StringBuilder b = new StringBuilder();
    b.append("----------------------------- \n");
    b.append("Launch ClientShell with Args: \n");
    for (String arg : args) {
      b.append("  ").append(arg).append("\n");
    }
    b.append("----------------------------- \n");
    System.out.println(b);

    final Class<?>[] source = {
      ServerApp.class,
      ServerAppConfig.class,
      EmployeeModuleConfig.class
    };

    SpringApplication springApp = new SpringApplication(source);
    customizeBanner(springApp);

    Runtime runtime = Runtime.getRuntime();
    log.info("Heap size: {}", runtime.totalMemory()/1024/1024);
    log.info("Maximum size of Heap: {}", runtime.maxMemory()/1024/1024);
    log.info("Available processors: {}", runtime.availableProcessors());
    springApp.run(args);
  }

  public static void main(String[] args) throws Exception {
    run(args);
  }

  private static void customizeBanner(SpringApplication springApp) {
    Banner banner = new Banner() {
      @Override
      public void printBanner(Environment environment, Class<?> sourceClass, PrintStream out) {
        out.println(
          """
            888b     d888        d8888 8888888b.   .d8888b. 8888888\s
            8888b   d8888       d88888 888   Y88b d88P  Y88b  888  \s
            88888b.d88888      d88P888 888    888 888    888  888  \s
            888Y88888P888     d88P 888 888   d88P 888         888  \s
            888 Y888P 888    d88P  888 8888888P"  888         888  \s
            888  Y8P  888   d88P   888 888 T88b   888    888  888  \s
            888   "   888  d8888888888 888  T88b  Y88b  d88P  888  \s
            888       888 d88P     888 888   T88b  "Y8888P" 8888888
          """
        );
      }
    };
    springApp.setBanner(banner);
  }
}