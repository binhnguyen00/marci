package net.marci.server;

import net.marci.hr.app.ServerApp;
import org.junit.jupiter.api.Test;

import java.util.concurrent.TimeUnit;

public class TestLaunchServer {

  @Test
  public void start() throws Exception {
    String[] args = new String[] {
      "--spring.config.location=src/main/resources/application.yml",
      "--app.home=./build/app"
    };
    ServerApp.run(args, TimeUnit.MINUTES.toMillis(30));
    Thread.currentThread().join();
  }
}