package net.marci.server;

import net.marci.app.core.ServerApp;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

public class TestLaunchServer {

  @Test @Tag("unit")
  public void start() throws Exception {
    String[] args = new String[] {
      "--spring.config.location=src/main/resources/application.yaml",
      "--app.home=./build/app"
    };
    ServerApp.run(args);
    Thread.currentThread().join();
  }
}