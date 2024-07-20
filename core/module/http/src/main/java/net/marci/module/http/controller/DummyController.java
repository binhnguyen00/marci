package net.marci.module.http.controller;

import net.marci.module.http.dto.ServerResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.Callable;

@RestController
@RequestMapping("/dummy")
public class DummyController extends BaseController {

  @PostMapping("/hello")
  @ResponseStatus(HttpStatus.OK)
  public @ResponseBody ServerResponse hello() {
    Callable<String> executor = () -> "Welcome to Marci Server";
    return this.execute("dummy", "hello", executor);
  }
}