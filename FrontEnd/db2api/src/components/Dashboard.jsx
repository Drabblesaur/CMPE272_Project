"use client";
import {
  Boxes,
  Pencil,
  ShoppingCart,
  CheckSquare,
  Frame,
  PieChart,
  Map,
  MessageSquareCode,
} from "lucide-react";
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
import ErrorAlert from "./alert";
import Link from "next/link";

const EmptyData = {
  data: [
    {
      user: {
        id: 0,
        name: "User",
        email: "email.com",
      },
      userProjects: [],
    },
  ],
};

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [userData, setUserData] = React.useState(EmptyData);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // API call to get user data
  const getUserData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/db/userData/2");
      const data = await response.json();
      console.log(data);
      setUserData(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      setUserData(EmptyData);
      setLoading(false);
      setError(<ErrorAlert description="Error fetching data" />);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleProjectCreated = (newProject) => {
    console.log("new project", newProject);
    setUserData((prevData) => ({
      ...prevData,
      data: [
        {
          ...prevData.data[0],
          userProjects: [...prevData.data[0].userProjects, newProject],
        },
      ],
    }));
  };
  const handleDelete = (projectId) => {
    //console.log("Delete project with id: " + projectId);
    //console.log(selectedProject._id);
    if (selectedProject._id === projectId) {
      setSelectedProject(null);
    }
    setUserData((prevData) => ({
      ...prevData,
      data: [
        {
          ...prevData.data[0],
          userProjects: prevData.data[0].userProjects.filter(
            (project) => project.id !== projectId
          ),
        },
      ],
    }));
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
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/chat">
                <SidebarMenuButton>
                  <MessageSquareCode />
                  <span>Chat</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
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
          <ProjectContainer project={selectedProject} />
        ) : null}

        {error}
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
