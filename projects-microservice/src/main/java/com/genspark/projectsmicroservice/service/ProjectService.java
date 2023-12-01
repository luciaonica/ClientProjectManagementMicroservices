package com.genspark.projectsmicroservice.service;

import com.genspark.projectsmicroservice.ui.model.Project;

import java.util.List;

public interface ProjectService {

    List<Project> getProjects(String userId);
    Project createProject(Project project);

    Project updateProject(Project project);

    List<Project> getAllProjects();

    List<Project> getProjectsByDeveloperId(String developerId);

    String assignProjectToDeveloper(String developerId, String projectId);

    List<Project> getAllNewProjects();
}
