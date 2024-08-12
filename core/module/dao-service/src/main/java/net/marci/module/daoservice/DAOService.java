package net.marci.lib.common;

import net.marci.lib.utils.DBConnectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class DAOService {
  @Autowired
  private DataSource dataSource;

  protected DBConnectUtils connectUtils = new DBConnectUtils(dataSource);
}