package net.marci.server;

import net.marci.app.core.ServerApp;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

/** Reminder
 * @Change @Tag to "unit" if you want to run the test. Details are in build.gradle.
 * @Change @Tag back to "test" when finished testing.
 */

public class TestLaunchServer {

  @Test
  // @Tag("skip")
  @Tag("unit")
  public void start() throws Exception {
    String[] args = new String[]{
      "--spring.config.location=src/test/resources/application.yaml",
      "--app.home=./build/app"
    };
    ServerApp.run(args);
    Thread.currentThread().join();
  }
}