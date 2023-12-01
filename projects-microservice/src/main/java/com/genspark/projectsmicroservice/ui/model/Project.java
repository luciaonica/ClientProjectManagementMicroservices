package com.genspark.projectsmicroservice.ui.model;

public class Project {
    private String userId;
    private String projectId;
    private String title;
    private String developerId;
    private String status;

    public Project() {
    }

    public Project(String userId, String projectId, String title, String developerId, String status) {
        this.userId = userId;
        this.projectId = projectId;
        this.title = title;
        this.developerId = developerId;
        this.status = status;
    }

    public String getUserId() {
        return userId;
    }

    public String getProjectId() {
        return projectId;
    }

    public String getTitle() {
        return title;
    }


    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDeveloperId() {
        return developerId;
    }

    public void setDeveloperId(String developerId) {
        this.developerId = developerId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
