package net.marci.module.account;

import lombok.extern.slf4j.Slf4j;
import net.marci.module.account.entity.Account;
import net.marci.module.account.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Slf4j
@Component
public class AccountLogic {

  @Autowired
  private AccountRepository repository;

  public Account create(Account target) {
    Account accountInDb = repository.getByUserName(target.getUserName());
    if (Objects.nonNull(accountInDb)) {
      log.error("User {} already exists", target.getUserName());
      throw new RuntimeException("User already exists");
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
}