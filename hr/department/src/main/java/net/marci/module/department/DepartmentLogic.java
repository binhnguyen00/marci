package net.marci.module.department;

import lombok.extern.slf4j.Slf4j;
import net.marci.lib.common.Record;
import net.marci.module.dbConnectService.DBConnectService;
import net.marci.module.department.entity.Department;
import net.marci.module.department.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Slf4j
@Component
public class DepartmentLogic extends DBConnectService {

  @Autowired
  private DepartmentRepository repository;

  public Department getById(Long id) {
    Department target = repository.findById(id).orElse(null);
    if (Objects.isNull(target)) {
      log.error("Department with id: {} is not found", id);
    }
    return target;
  }

  public Department create(Department department) {
    Department parent = repository.findById(department.getParentId()).orElse(null);
    if (Objects.nonNull(parent)) department.delegateToParent(parent);
    department.setUserInteract();
    return repository.save(department);
  }

  public Department save(Department department) {
    department.setUserInteract();
    return repository.save(department);
  }

  public int deleteByIds(List<Long> targetIds) {
    return this.deleteByIds(Department.class, targetIds);
  }

  public List<Record> search(Record sqlArgs) {
    final String SQL_QUERY = """
      SELECT
        dept.id                      AS "id",
        dept."name"                  AS "name",
        dept.parent_id               AS "parentId",
        dept.family_tree             AS "familyTree",
        dept.description             AS "description",
        \s
        dept.created_time            AS "createdTime",
        dept.creator                 AS "creator",
        dept.modified_time           AS "modifiedTime",
        dept.modifier                AS "modifier",
        dept.storage_state           AS "storageState"
        \s
      FROM department dept
      WHERE
        (dept.name ILIKE '%' || COALESCE(:pattern, dept.name) || '%')
        AND (dept.storage_state IS NULL
          OR dept.storage_state IN (:storageState)
        )
        AND dept.modified_time >= COALESCE(:modifiedTime, dept.modified_time)
    """;
    return this.search(SQL_QUERY, sqlArgs);
  }
}