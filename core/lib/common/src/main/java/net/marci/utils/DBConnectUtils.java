package net.marci.utils;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;

import javax.sql.DataSource;
import java.sql.*;
import java.util.*;

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

  public void commit() {
    try {
      connection.commit();
    } catch (SQLException e) {
      log.error("Can't Commit", e);
      throw new RuntimeException(e.getMessage());
    }
  }

  public void rollback() {
    try {
      connection.rollback();
    } catch (SQLException e) {
      log.error("Can't Rollback", e);
      throw new RuntimeException(e.getMessage());
    }
  }

  public void close() {
    try {
      connection.close();
    } catch (SQLException e) {
      log.error("Can't Close connection", e);
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

  public void execute(String SQL_QUERY) {
    try {
      Statement statement = connection.createStatement();
      statement.execute(SQL_QUERY);
    } catch (SQLException e) {
      log.error("Can't Execute Query", e);
      throw new RuntimeException(e.getMessage());
    }
  }

  public List<Map<String, Object>> execute(String SQL_QUERY_TEMPLATE, Map<String, Object> keyValues) {
    final String SQL_QUERY = assignSqlHolderWithValue(SQL_QUERY_TEMPLATE, keyValues);
    List<Map<String, Object>> results;
    try {
      Statement stmt = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);
      ResultSet resultSet = stmt.executeQuery(SQL_QUERY);
      results = extractResults(resultSet);
    } catch(SQLException e) {
      log.error("Can't Execute Query", e);
      throw new RuntimeException(e.getMessage());
    }
    return results;
  }

  private List<Map<String, Object>> extractResults(ResultSet resultSet) throws SQLException {
    List<Map<String, Object>> objects = new ArrayList<>();
    ResultSetMetaData metaData = resultSet.getMetaData();
    int columnCount = metaData.getColumnCount();

    while (resultSet.next()) {
      Map<String, Object> row = new HashMap<>();
      for (int i = 1; i <= columnCount; i++) {
        String columnName = metaData.getColumnName(i);
        Object columnValue = resultSet.getObject(i);
        row.put(columnName, columnValue);
      }
      objects.add(row);
    }
    return objects;
  }

  /**
   * @param SQL_QUERY Template SQL with keys that defined as `:keyName`
   * @param keyValues A Map of `:keyName` and its value
   * @return A fully SQL with actual values
   */
  public String assignSqlHolderWithValue(String SQL_QUERY, Map<String, Object> keyValues) {
    for (Map.Entry<String, Object> entry : keyValues.entrySet()) {
      String key = entry.getKey();
      Object value = entry.getValue();
      String formatValue;
      if (value instanceof Collection) {
        formatValue = StringUtils.collectionToCommaDelimitedString((Collection<?>) value);
      } else if (value instanceof Object[]) {
        formatValue = StringUtils.arrayToCommaDelimitedString((Object[]) value);
      } else {
        formatValue = value.toString();
      }
      SQL_QUERY = SQL_QUERY.replace(":" + key, formatValue);
    }
    return SQL_QUERY;
  }
}