package net.marci.module.account;

import lombok.extern.slf4j.Slf4j;
import net.binhnguyen.lib.common.Record;
import net.marci.module.account.entity.Account;
import net.marci.module.account.repository.AccountRepository;
import net.binhnguyen.module.dbConnectService.DBConnectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.List;
import java.util.Objects;

@Slf4j
@Component
public class AccountLogic extends DBConnectService {

  @Autowired
  private DataSource dataSource;

  @Autowired
  private AccountRepository repository;

  public Account create(Account target) {
    Account byUserName = getByUserName(target.getUserName());
    if (Objects.nonNull(byUserName)) {
      log.error("Username {} already exists", target.getUserName());
      throw new RuntimeException("Username already exists");
    }
    Account byEmail = getByEmail(target.getEmail());
    if (Objects.nonNull(byEmail)) {
      log.error("Email {} already exists", target.getEmail());
      throw new RuntimeException("Email already exists");
    }
    target.setUserInteract();
    target = repository.save(target);
    return target;
  }

  public Account save(Account target) {
    if (target.isNew()) return create(target);
    else {
      target.setUserInteract();
      return repository.save(target);
    }
  }

  public Account getById(Long id) {
    return repository.getReferenceById(id);
  }

  public Account getByUserName(String userName) {
    return repository.getByUserName(userName);
  }

  public Account getByEmail(String email) {
    return repository.getByEmail(email);
  }

  public List<Account> findAll() {
    return repository.findAll();
  }

  public List<Record> search(Record sqlArgs) {
    final String SQL_QUERY = """
      SELECT
        acc.id                    AS "id",
        acc.user_name             AS "userName",
        acc.display_name          AS "displayName",
        acc.email                 AS "email",
        acc.country_name          AS "countryName",
        acc.city_name             AS "cityName",
        acc.state_name            AS "stateName",
        acc.address               AS "address"
      FROM
        account acc
      WHERE
        ( acc.user_name ILIKE '%' || COALESCE(:pattern, acc.user_name) || '%' OR
          acc.email ILIKE '%' || COALESCE(:pattern, acc.email) || '%'
        )
        AND (acc.storage_state IS NULL OR acc.storage_state IN (:storageState))
        AND (acc.modified_time >= COALESCE(:modifiedTime, acc.modified_time))
    """;
    return this.search(SQL_QUERY, sqlArgs);
  }

  public List<Long> active(List<Long> targetIds) {
    if (targetIds.isEmpty()) return List.of();
    repository.active(targetIds);
    return targetIds;
  }

  public List<Long> archive(List<Long> targetIds) {
    if (targetIds.isEmpty()) return List.of();
    repository.archive(targetIds);
    return targetIds;
  }
}