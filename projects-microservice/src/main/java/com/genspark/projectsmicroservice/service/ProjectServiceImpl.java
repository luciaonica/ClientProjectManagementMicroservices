package com.genspark.projectsmicroservice.service;

import com.genspark.projectsmicroservice.data.ProjectEntity;
import com.genspark.projectsmicroservice.data.ProjectRepository;
import com.genspark.projectsmicroservice.ui.model.Project;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProjectServiceImpl implements ProjectService{

    @Autowired
    ProjectRepository projectRepository;
    @Override
    public List<Project> getProjects(String userId) {
        List<ProjectEntity> projectEntities = (List<ProjectEntity>) projectRepository.findAllByUserId(userId);

        if (projectEntities == null || projectEntities.isEmpty())
            return new ArrayList<>();

        Type listType = new TypeToken<List<Project>>() {
        }.getType();

        return new ModelMapper().map(projectEntities, listType);
    }

    @Override
    public Project createProject(Project project) {
        project.setProjectId(UUID.randomUUID().toString());
        project.setStatus("NEW");

        ProjectEntity projectEntity = new ProjectEntity();
        BeanUtils.copyProperties(project, projectEntity);

        ProjectEntity storedProjectEntity = projectRepository.save(projectEntity);

        Project returnValue = new Project();
        BeanUtils.copyProperties(storedProjectEntity, returnValue);

        return returnValue;
    }

    @Override
    public Project updateProject(Project project) {
        ProjectEntity projectEntity = projectRepository.findByProjectId(project.getProjectId());
        projectEntity.setTitle(project.getTitle());
        ProjectEntity savedProjectEntity = projectRepository.save(projectEntity);
        Project returnValue = new Project();
        BeanUtils.copyProperties(savedProjectEntity, returnValue);

        return returnValue;
    }

    @Override
    public List<Project> getAllProjects() {
        List<ProjectEntity> projectEntities = (List<ProjectEntity>) projectRepository.findAll();

        if (projectEntities == null || projectEntities.isEmpty())
            return new ArrayList<>();

        Type listType = new TypeToken<List<Project>>() {
        }.getType();

        return new ModelMapper().map(projectEntities, listType);
    }

    @Override
    public List<Project> getProjectsByDeveloperId(String developerId) {
        List<ProjectEntity> projectEntities = (List<ProjectEntity>) projectRepository.findAllByDeveloperId(developerId);

        if (projectEntities == null || projectEntities.isEmpty())
            return new ArrayList<>();

        Type listType = new TypeToken<List<Project>>() {
        }.getType();

        return new ModelMapper().map(projectEntities, listType);
    }

    @Override
    public String assignProjectToDeveloper(String developerId, String projectId) {
        ProjectEntity projectEntity = projectRepository.findByProjectId(projectId);
        projectEntity.setDeveloperId(developerId);
        projectEntity.setStatus("ASSIGNED");
        projectRepository.save(projectEntity);
        return "Project assigned successfully";
    }

    @Override
    public List<Project> getAllNewProjects() {
        List<ProjectEntity> projectEntities = (List<ProjectEntity>) projectRepository.findAllNewProjects();

        if (projectEntities == null || projectEntities.isEmpty())
            return new ArrayList<>();

        Type listType = new TypeToken<List<Project>>() {
        }.getType();

        return new ModelMapper().map(projectEntities, listType);
    }

}
