"use client";
import { Boxes } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { UserProfileMenu } from "@/components/UserProfileMenu";
import { UserProjects } from "@/components/UserProjects";
import { Header } from "./Header";
import { NewProjectDialog } from "./NewProjectDialog";
import ProjectContainer from "./ProjectContainer";
import { Toaster } from "./ui/toaster";
import { useToast } from "@/hooks/use-toast";

const EmptyData = {
  data: [
    {
      user: {
        _id: "12345",
        githubID: "2",
        profileData: {
          name: "John Doe",
          email: "john.doe@example.com",
          avatar_url: "https://example.com/avatar.jpg",
        },
      },
      userProjects: [],
    },
  ],
};

export default function Dashboard({ userId }) {
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [userData, setUserData] = React.useState(EmptyData);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { toast } = useToast();
  //Delete this line and replace with actual user ID

  // API call to get user data
  const getUserData = async () => {
    try {
      const response = await fetch(
        `https://backend.codegenner.net/db/userData/${userId}`
      );
      const data = await response.json();
      console.log(data);
      setUserData(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      setUserData(EmptyData);
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error fetching data",
        description: "Please try again later",
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleProjectCreated = (newProject) => {
    console.log("new project", newProject.data[0]);
    const prevData = userData;
    const updatedData = {
      ...prevData,
      data: [
        {
          ...prevData.data[0],
          userProjects: [...prevData.data[0].userProjects, newProject.data[0]],
        },
      ],
    };

    console.log("updatedData", updatedData);
    setUserData(updatedData);
    toast({
      title: "Project created successfully",
      description: "Project has been created successfully.",
    });
  };
  const handleDelete = (projectId) => {
    //console.log("Delete project with id: " + projectId);
    //console.log(selectedProject._id);
    toast({
      variant: "destructive",
      title: "Project deleted successfully",
      description: "Project has been deleted successfully.",
    });
    if (selectedProject === null || selectedProject._id === projectId) {
      setSelectedProject(null);
    }
    setUserData((prevData) => ({
      ...prevData,
      data: [
        {
          ...prevData.data[0],
          userProjects: prevData.data[0].userProjects.filter(
            (project) => project._id !== projectId
          ),
        },
      ],
    }));
  };

  const updateSchema = (newSchema) => {
    // get selected project
    const project = selectedProject;
    // update schema for selected project
    project.schema = newSchema;
    // update selected project
    setSelectedProject(project);
    console.log(selectedProject);
  };

  const updateCode = (newCode) => {
    // get selected project
    const project = selectedProject;
    // update code for selected project
    project.code = newCode;
    // update selected project
    setSelectedProject(project);
    console.log(selectedProject);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Boxes className="h-6 w-6" />
                    <span className="text-lg font-semibold">Db2api</span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarRail />
          {userData.data && userData.data.length > 0 && (
            <UserProjects
              projects={userData.data[0].userProjects}
              setSelectedProject={setSelectedProject}
              handleDelete={handleDelete}
            />
          )}
        </SidebarContent>

        <SidebarFooter>
          {userData.data && userData.data.length > 0 && (
            <UserProfileMenu user={userData.data[0].user} />
          )}
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <Header selectedProject={selectedProject} />
        {/* Show DataSetBuilder when a project is selected*/}
        {selectedProject ? (
          <ProjectContainer
            project={selectedProject}
            updateSchema={updateSchema}
            updateCode={updateCode}
          />
        ) : null}

        <Toaster />
        {userData.data && userData.data.length > 0 && (
          <NewProjectDialog
            user={userData.data[0].user}
            onProjectCreated={handleProjectCreated}
          />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
