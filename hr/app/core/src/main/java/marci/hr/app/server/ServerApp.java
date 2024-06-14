package marci.hr.app.server;

import org.slf4j.bridge.SLF4JBridgeHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;

import java.util.logging.Level;

public class ServerApp {
  static ConfigurableApplicationContext context;

  static public ApplicationContext run(String[] args, long wait) {
    // TODO: replace System.out.println() with log.info()
    System.out.println("Launch ClientShell with args");
    StringBuilder b = new StringBuilder();
    b.append("Args: \n");
    for (String arg : args) {
      b.append("  ").append(arg).append("\n");
    }
    System.out.println(b);

    context = SpringApplication.run(ServerAppConfig.class, args);
    isRunning(wait);
    return context;
  }

  static public boolean isRunning(long waitTime) {
    boolean running = false;
    if (waitTime <= 0) waitTime = 1;
    try {
      while (!running && waitTime > 0) {
        if(context == null) running = false;
        else running = context.isRunning();
        waitTime -= 100;
        if (!running && waitTime > 0) Thread.sleep(100);
      }
    } catch(Exception ex) {
      ex.printStackTrace();
    }
    return running;
  }

  static public void exit() {
    if (context != null) {
      SpringApplication.exit(context);
      context = null;
    }
  }

  public static void main(String[] args) throws Exception {
    SLF4JBridgeHandler.install();
    java.util.logging.LogManager.getLogManager().getLogger("").setLevel( Level.INFO);
    run(args, 30000);
  }
}