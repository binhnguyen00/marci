package net.marci.app.core;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;

import java.io.*;
import java.net.URL;

/**
 * @author Bình Nguyễn
 * @Email jackjack2000.kahp@gmail.com
 */

@Slf4j
@SpringBootApplication
public class ServerApp {
  static ConfigurableApplicationContext context;

  static public void run(String[] args) {
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
    };

    SpringApplication springApp = new SpringApplication(source);
    customizeBanner(springApp);

    Runtime runtime = Runtime.getRuntime();
    log.info("Heap size: {}", runtime.totalMemory() / 1024 / 1024);
    log.info("Maximum size of Heap: {}", runtime.maxMemory() / 1024 / 1024);
    log.info("Available processors: {}", runtime.availableProcessors());
    context = springApp.run(args);
    isRunning(30000);
  }

  static private void isRunning(long waitTime) {
    boolean running = false;
    if (waitTime <= 0) waitTime = 1;
    try {
      while (!running && waitTime > 0) {
        if (context == null) running = false;
        else running = context.isRunning();
        waitTime -= 100;
        if (!running && waitTime > 0) Thread.sleep(100);
      }
    } catch (Exception ex) {
      log.error(ex.getMessage());
    }
  }

  public static void main(String[] args) throws Exception {
    run(args);
  }

  private static void customizeBanner(SpringApplication springApp) {
    final String fileName = "/signature.txt";
    URL resource = ServerApp.class.getResource(fileName);
    StringBuilder sb = new StringBuilder();
    if (resource == null) {
      throw new IllegalArgumentException("File not found! " + fileName);
    } else {
      try (
        InputStream inputStream = resource.openStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))
      ) {
        String line;
        while ((line = reader.readLine()) != null) {
          sb.append(line).append("\n");
        }
      } catch (IOException e) {
        log.error("Error reading file: ", e);
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