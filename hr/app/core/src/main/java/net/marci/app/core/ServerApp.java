package net.marci.app.core;

import lombok.extern.slf4j.Slf4j;
import net.marci.module.config.EmployeeModuleConfig;
import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.io.IOException;
import java.io.PrintStream;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

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
    final String fileName = "/signature.txt";
    URL resource = ServerApp.class.getResource(fileName);
    StringBuilder sb = new StringBuilder();
    if (resource == null) {
      throw new IllegalArgumentException("file not found! " + fileName);
    } else {
      try {
        List<String> lines = Files.readAllLines(Paths.get(resource.toURI()));
        for (String line : lines) {
          sb.append(line).append("\n");
        }
      } catch (IOException | URISyntaxException e) {
        e.printStackTrace();
      }
    }
    Banner banner = new Banner() {
      @Override
      public void printBanner(Environment environment, Class<?> sourceClass, PrintStream out) {
        out.println(sb);
      }
    };
    springApp.setBanner(banner);
  }
}