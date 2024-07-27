package net.marci.module.account.repository;

import net.marci.module.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Serializable> {

  @Query("SELECT account FROM Account account WHERE account.userName = :userName")
  Account getByUserName(@Param("userName") String userName);

  @Query("SELECT account FROM Account account WHERE account.email = :email")
  Account getByEmail(@Param("email") String email);

  @Query("""
    SELECT acc from Account acc
    WHERE acc.userName IS NOT NULL
  """)
  List<Account> search();
}