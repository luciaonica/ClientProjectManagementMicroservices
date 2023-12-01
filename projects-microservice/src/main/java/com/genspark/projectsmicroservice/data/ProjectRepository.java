package com.genspark.projectsmicroservice.data;

import com.genspark.projectsmicroservice.ui.model.Project;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProjectRepository extends CrudRepository<ProjectEntity, Long> {

    List<ProjectEntity> findAllByUserId(String userId);

    List<ProjectEntity> findAllByDeveloperId(String developerId);

    ProjectEntity findByProjectId(String projectId);

    @Query("select p from ProjectEntity p where p.status = 'NEW'")
    List<ProjectEntity> findAllNewProjects();
}
