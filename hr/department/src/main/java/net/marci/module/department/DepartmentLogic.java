package net.marci.module.department;

import lombok.extern.slf4j.Slf4j;
import net.marci.lib.common.Record;
import net.marci.module.dbConnectService.DBConnectService;
import net.marci.module.department.entity.Department;
import net.marci.module.department.repository.DepartmentRepository;
import net.marci.module.employee.EmployeeLogic;
import net.marci.module.employee.entity.relation.EmployeeDepartment;
import net.marci.module.employee.repository.EmployeeDepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Component
public class DepartmentLogic extends DBConnectService {

  @Autowired
  private DepartmentRepository repository;

  @Autowired
  private EmployeeDepartmentRepository empDeptRepository;

  @Autowired
  private EmployeeLogic employeeLogic;

  public Department getById(long id) {
    return repository.getReferenceById(id);
  }

  public Department create(Department department) {
    Department parent = null;
    final Long parentId = department.getParentId();
    if (Objects.nonNull(parentId)) parent = repository.getReferenceById(parentId);
    if (Objects.nonNull(parent)) department.delegateToParent(parent);
    department.setUserInteract();
    return repository.save(department);
  }

  public Department save(Department department) {
    if (department.isNew()) return create(department);
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
        AND (dept.storage_state IS NULL OR dept.storage_state IN (:storageState))
        AND (dept.modified_time >= COALESCE(:modifiedTime, dept.modified_time))
    """;
    return this.search(SQL_QUERY, sqlArgs);
  }

  public Long delegateEmployee(long departmentId, long employeeId) {
    EmployeeDepartment rel = empDeptRepository.getByEmployee(employeeId, departmentId);
    if (Objects.isNull(rel)) {
      rel = new EmployeeDepartment();
      rel.setEmployeeId(employeeId);
      rel.setDepartmentId(departmentId);
    } else {
      rel.setDepartmentId(departmentId);
    }
    rel = empDeptRepository.save(rel);
    return rel.getId();
  }

  public List<Long> delegateEmployees(long departmentId, List<Long> employeeIds) {
    List<Long> success = new ArrayList<>();
    employeeIds.forEach(id -> {
      Long relationId = delegateEmployee(departmentId, id);
      if (Objects.nonNull(relationId)) success.add(relationId);
    });
    return success;
  }

  public Long removeEmployee(long departmentId, long employeeId) {
    EmployeeDepartment rel = empDeptRepository.getByEmployee(employeeId, departmentId);
    if (Objects.isNull(rel)) return null;
    empDeptRepository.deleteById(Objects.requireNonNull(rel.getId()));
    return employeeId;
  }

  public List<Long> removeEmployees(long departmentId, List<Long> employeeIds) {
    employeeIds.forEach(id -> removeEmployee(departmentId, id));
    return employeeIds;
  }
}