package net.marci.module.account;

import lombok.extern.slf4j.Slf4j;
import net.marci.module.account.entity.Account;
import net.marci.module.account.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.List;
import java.util.Objects;

@Slf4j
@Component
public class AccountLogic {

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

  public List<Account> search() {
    return repository.search();
  }
}