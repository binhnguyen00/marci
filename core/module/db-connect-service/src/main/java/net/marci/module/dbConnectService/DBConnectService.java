package net.marci.module.dbConnectService;

import jakarta.annotation.PostConstruct;
import net.marci.lib.utils.DBConnectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class DBConnectService {

  @Autowired
  private DataSource dataSource;

  protected DBConnectUtils connectUtils;

  @PostConstruct
  public void init() {
    this.connectUtils = new DBConnectUtils(dataSource);
  }
}