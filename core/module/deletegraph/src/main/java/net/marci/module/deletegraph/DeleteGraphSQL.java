package net.marci.module.deletegraph;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import net.marci.utils.DBConnectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Getter
@Setter
public class DeleteGraphSQL {
  private String deleteQuery;
  /**
   * In a Query, there are variables highlighted by `:`. e.g :key1, :key2.
   *
   * @see DBConnectUtils#assignSqlHolderWithValue(String, Map)  How to replace those variables with actual values?
   */
  private Map<String, Object> sqlKeyValueMap;

  private List<DeleteGraphSQL> preDeleteChildren;
  private List<DeleteGraphSQL> postDeleteChildren;

  public DeleteGraphSQL(String delQuery, Map<String, Object> sqlKeyValueMap) {
    this.deleteQuery = delQuery;
    this.sqlKeyValueMap = sqlKeyValueMap;
  }

  public void addPreDelete(DeleteGraphSQL child) {
    if (Objects.isNull(preDeleteChildren)) preDeleteChildren = new ArrayList<>();
    preDeleteChildren.add(child);
  }

  public void addPostDelete(DeleteGraphSQL child) {
    if (Objects.isNull(postDeleteChildren)) postDeleteChildren = new ArrayList<>();
    postDeleteChildren.add(child);
  }

  public int executeDelete(DBConnectUtils connUtils) {
    if (Objects.nonNull(preDeleteChildren)) {
      for (DeleteGraphSQL child : preDeleteChildren) {
        if (Objects.nonNull(child)) child.executeDelete(connUtils);
      }
    }

    int count = connUtils.executeUpdate(deleteQuery, sqlKeyValueMap);
    log.info("DELETE GRAPH QUERY:\n  {} => {}", deleteQuery, count);
    connUtils.commit();

    if (Objects.nonNull(postDeleteChildren)) {
      for (DeleteGraphSQL child : postDeleteChildren) {
        if (Objects.nonNull(child)) child.executeDelete(connUtils);
      }
    }
    return count;
  }

  public void dumpSql() {
    if (Objects.nonNull(preDeleteChildren)) {
      for (DeleteGraphSQL child : preDeleteChildren) {
        if (Objects.nonNull(child)) child.dumpSql();
      }
    }
    System.out.println(deleteQuery);

    if (Objects.nonNull(postDeleteChildren)) {
      for (DeleteGraphSQL child : postDeleteChildren) {
        if (Objects.nonNull(child)) child.dumpSql();
      }
    }
  }
}