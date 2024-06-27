package net.marci.app.core;

import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;

public class ServerAppDeprecated {
  static ConfigurableApplicationContext context;

  static public void run(String[] args, long wait) throws Exception {
    // TODO: Replace System.out.println @Slf4j info
    StringBuilder b = new StringBuilder();
    b.append("----------------------------- \n");
    b.append("Launch ClientShell with Args: \n");
    for (String arg : args) {
      b.append("  ").append(arg).append("\n");
    }
    b.append("----------------------------- \n");
    System.out.println(b);

    context = SpringApplication.run(ServerAppConfig.class, args);
    isRunning(wait);
  }

  static public void isRunning(long waitTime) {
    boolean running = false;
    if (waitTime <= 0) waitTime = 1;
    try {
      while(!running && waitTime > 0) {
        if (context == null) running = false;
        else running = context.isRunning();
        waitTime -= 100;
        if (!running && waitTime > 0) Thread.sleep(100);
      }
    } catch(Exception ex) {
      ex.printStackTrace();
    }
  }

  static public void exit() {
    if (context != null) {
      SpringApplication.exit(context);
      context = null;
    }
  }

  public static void main(String[] args) throws Exception {
    run(args, 30000);
  }
}