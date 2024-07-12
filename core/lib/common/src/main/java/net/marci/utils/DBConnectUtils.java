package net.marci.utils;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Collection;
import java.util.Map;

/**
 * @author Bình Nguyễn
 * @Email jackjack2000.kahp@gmail.com
 */

@Slf4j
@Getter
public class DBConnectUtils {

  private final Connection connection;

  public DBConnectUtils(DataSource dataSource) {
    try {
      this.connection = dataSource.getConnection();
    } catch (SQLException e) {
      log.error("Failed to connect to database", e);
      throw new RuntimeException(e.getMessage());
    }
  }

  public DBConnectUtils(Connection connection) {
    this.connection = connection;
  }

  public void commit()  {
    try {
      connection.commit();
    } catch (SQLException e) {
      log.error("Can't Commit", e);
      throw new RuntimeException(e.getMessage());
    }
  }

  public void rollback()  {
    try {
      connection.rollback();
    } catch (SQLException e) {
      log.error("Can't Rollback", e);
      throw new RuntimeException(e.getMessage());
    }
  }

  public void close()  {
    try {
      connection.close();
    } catch (SQLException e) {
      log.error("Can't Close connection", e);
      throw new RuntimeException(e.getMessage());
    }
  }

  public void execute(String sql) {
    try {
      Statement statement = connection.createStatement();
      statement.execute(sql);
    } catch (SQLException e) {
      log.error("Can't Execute Query", e);
      throw new RuntimeException(e.getMessage());
    }
  }

  public int executeUpdate(String sql, Map<String, Object> keyValues) {
    sql = assignSqlHolderWithValue(sql, keyValues);
    return executeUpdate(sql);
  }

  public int executeUpdate(String sql) {
    try {
      Statement statement = connection.createStatement();
      return statement.executeUpdate(sql);
    } catch (SQLException e) {
      log.error("Can't Execute Update Query", e);
      throw new RuntimeException(e.getMessage());
    }
  }

  private String assignSqlHolderWithValue(String QUERY, Map<String, Object> keyValues) {
    for (Map.Entry<String, Object> entry : keyValues.entrySet()) {
      String key = entry.getKey();
      Object value = entry.getValue();
      String formatValue ;
      if (value instanceof Collection) {
        formatValue = StringUtils.collectionToCommaDelimitedString((Collection<?>) value);
      } else if(value instanceof Object[]) {
        formatValue = StringUtils.arrayToCommaDelimitedString((Object[]) value);
      } else {
        formatValue = value.toString();
      }
      QUERY = QUERY.replace(":" + key, formatValue);
    }
    return QUERY;
  }
}