package net.marci.module.initialization;

import jakarta.annotation.PostConstruct;
import net.binhnguyen.lib.common.Record;
import net.binhnguyen.lib.utils.DataSerializer;
import net.binhnguyen.module.excel.ExcelLogic;
import net.marci.module.account.AccountLogic;
import net.marci.module.account.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class AccountInitData {

  @Autowired
  private ExcelLogic excelLogic;

  @Autowired
  private AccountLogic accountLogic;

  @PostConstruct
  public void initData() throws IOException {
    List<Record> data = excelLogic.readWorkbook("workbooks/account.xlsx", "account");
    List<Account> accounts = new ArrayList<>();
    for (Record record : data) {
      Account account = new Account();
      account.setRole(Account.Role.fromString(record.getAsString("role")).orElse(null));
      account.setEmail(record.getAsString("email"));
      account.setUserName(record.getAsString("userName"));
      account.setDisplayName(record.getAsString("displayName"));
      account.setPassword(record.getAsString("password"));
      accounts.add(account);
    }

    accounts.forEach(accountLogic::create);
  }
}
