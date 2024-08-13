package net.marci.module.dbConnectService;

import jakarta.annotation.PostConstruct;
import net.marci.lib.common.Record;
import net.marci.lib.utils.DBConnectUtils;
import net.marci.module.deletegraph.DeleteGraphBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.List;

@Component
public class DBConnectService {

  @Autowired
  private DataSource dataSource;

  private DBConnectUtils connectUtils;

  @PostConstruct
  public void init() {
    this.connectUtils = new DBConnectUtils(dataSource);
  }

  public List<Record> search(String SEARCH_QUERY, Record sqlArgs) {
    return connectUtils.execute(SEARCH_QUERY, sqlArgs);
  }

  public int deleteByIds(Class<?> clazz, List<Long> ids) {
    DeleteGraphBuilder deleteGraphBuilder = new DeleteGraphBuilder(this.connectUtils, clazz, ids);
    int target = deleteGraphBuilder.doDelete();
    if (ids.size() != target) throw new RuntimeException("There were some problems while deleting");
    else return target;
  }
}