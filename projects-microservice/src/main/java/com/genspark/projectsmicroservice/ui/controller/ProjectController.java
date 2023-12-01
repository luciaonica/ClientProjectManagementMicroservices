package com.genspark.projectsmicroservice.ui.controller;

import com.genspark.projectsmicroservice.service.ProjectService;
import com.genspark.projectsmicroservice.ui.model.Project;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.concurrent.*;

@RestController
@RequestMapping("/projects")
@CrossOrigin("*")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    private final ExecutorService executorService = Executors.newFixedThreadPool(5);


    @GetMapping
    @PostAuthorize("(returnObject.size() > 0) ? principal == returnObject[0].userId : true")
    public List<Project> getProjects(Principal principal) {
        return projectService.getProjects(principal.getName());
    }

    @PostMapping
    public Project createProject(@Valid @RequestBody Project project, Principal principal) {
        project.setUserId(principal.getName());
        return projectService.createProject(project);
    }

    @PutMapping
    public Project updateProject(@Valid @RequestBody Project project, Principal principal) {
        //project.setUserId(principal.getName());
        return projectService.updateProject(project);
    }

    @GetMapping("/all")
    public List<Project> getAllProjects() throws ExecutionException, InterruptedException {
        //return projectService.getAllProjects();
        Callable<List<Project>> getAllProjectsTask = () -> projectService.getAllProjects();
        Future<List<Project>> future = executorService.submit(getAllProjectsTask);
        return future.get();
    }

    @GetMapping("/byUser/{userId}")
    public List<Project> getAllProjectsByUserId(@PathVariable String userId) throws ExecutionException, InterruptedException {
        //return projectService.getProjects(userId);
        Callable<List<Project>> getProjectsByUserIdTask = () -> projectService.getProjects(userId);
        Future<List<Project>> future = executorService.submit(getProjectsByUserIdTask);
        return future.get();
    }

    @GetMapping("/byDeveloper/{developerId}")
    public List<Project> getAllProjectsByDeveloperId(@PathVariable String developerId) throws ExecutionException, InterruptedException {
        //return projectService.getProjectsByDeveloperId(developerId);
        Callable<List<Project>> getProjectsByDeveloperIdTask = () -> projectService.getProjectsByDeveloperId(developerId);
        Future<List<Project>> future = executorService.submit(getProjectsByDeveloperIdTask);
        return future.get();
    }

    @PutMapping("/assignProjectToDeveloper/{developerId}/{projectId}")
    public String assignProjectToDeveloper(@PathVariable String developerId, @PathVariable String projectId) {
        return projectService.assignProjectToDeveloper(developerId, projectId);
    }

    @GetMapping("/new")
    public List<Project> getAllNewProjects() throws ExecutionException, InterruptedException {
        //return projectService.getAllNewProjects();
        Callable<List<Project>> getProjectsByDeveloperIdTask = () -> projectService.getAllNewProjects();
        Future<List<Project>> future = executorService.submit(getProjectsByDeveloperIdTask);
        return future.get();
    }
}
