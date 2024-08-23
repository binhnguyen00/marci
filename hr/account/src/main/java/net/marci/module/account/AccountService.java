package net.marci.module.account;

import net.binhnguyen.lib.common.Record;
import net.marci.module.account.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("AccountService")
public class AccountService {

  @Autowired
  private AccountLogic logic;

  @Transactional
  public Account getById(Long id) {
    return logic.getById(id);
  }

  @Transactional
  public Account getByUserName(String userName) {
    return logic.getByUserName(userName);
  }

  @Transactional
  public Account getByEmail(String email) {
    return logic.getByEmail(email);
  }

  @Transactional
  public Account create(Account account) {
    return logic.create(account);
  }

  @Transactional
  public Account save(Account account) {
    return logic.save(account);
  }

  @Transactional
  public List<Account> findAll() {
    return logic.findAll();
  }

  @Transactional
  public List<Record> search(Record sqlArgs) {
    return logic.search(sqlArgs);
  }

  @Transactional
  public List<Long> active(List<Long> targetIds) {
    return logic.active(targetIds);
  }

  @Transactional
  public List<Long> archive(List<Long> targetIds) {
    return logic.archive(targetIds);
  }
}