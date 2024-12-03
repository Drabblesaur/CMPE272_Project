"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ProjectMenu } from "./ProjectMenu";

export const UserProjects = ({
  projects,
  setSelectedProject,
  handleDelete,
}) => {
  const handleLocalDelete = (projectId) => {
    handleDelete(projectId);
  };

  //console.log("UserProjects", projects);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() =>
              document.getElementById("new-project-form").showModal()
            }
          >
            <Plus className="text-sidebar-foreground/70" />
            <span>New Blank Project</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {projects.map((project) => (
          <SidebarMenuItem key={project._id}>
            <SidebarMenuButton
              asChild
              onClick={() => setSelectedProject(project)}
            >
              <span>{project.name}</span>
            </SidebarMenuButton>
            <ProjectMenu projectId={project._id} onDelete={handleLocalDelete} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
