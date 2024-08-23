package net.marci.module.account.repository;

import net.marci.module.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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

  @Modifying
  @Query("UPDATE Account SET storageState = 'ACTIVE' WHERE id IN (:ids)")
  void active(@Param("ids") List<Long> ids);

  @Modifying
  @Query("UPDATE Account SET storageState = 'ARCHIVED' WHERE id IN (:ids)")
  void archive(@Param("ids") List<Long> ids);
}