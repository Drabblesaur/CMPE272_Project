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

export const UserProjects = ({ projects, setSelectedProject }) => {
  const [projectList, setProjectList] = useState(projects);

  const handleDelete = (projectId) => {
    setProjectList(projectList.filter((project) => project.id !== projectId));
  };

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
        {projectList.map((project) => (
          <SidebarMenuItem key={project.id}>
            <SidebarMenuButton
              asChild
              onClick={() => setSelectedProject(project.name)}
            >
              <span>{project.name}</span>
            </SidebarMenuButton>
            <ProjectMenu projectId={project.id} onDelete={handleDelete} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
