package net.marci.module.department.repository;

import net.marci.module.department.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

  @Query("SELECT d FROM Department d WHERE d.name = :name")
  Department getByName(@Param("name") String name);
}