package net.marci.module.job.repository;

import net.marci.module.job.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Serializable> {

  @Query("""
    SELECT j
    FROM Job j
    WHERE
      j.name ILIKE COALESCE(:name, j.name)
  """)
  List<Job> search(@Param("name") String name);
}