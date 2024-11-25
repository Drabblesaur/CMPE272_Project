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
import React from "react";
import { UserProfileMenu } from "@/components/UserProfileMenu";
import { UserProjects } from "@/components/UserProjects";
import { Header } from "./Header";
import { NewProjectDialog } from "./NewProjectDialog";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  userProjects: [
    {
      name: "Personal Blog",
      url: "#",
      icon: Pencil,
    },
    {
      name: "E-commerce App",
      url: "#",
      icon: ShoppingCart,
    },
    {
      name: "Task Manager",
      url: "#",
      icon: CheckSquare,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = React.useState(null);

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
          <UserProjects
            projects={data.userProjects}
            setSelectedProject={setSelectedProject}
          />
        </SidebarContent>

        <SidebarFooter>
          <UserProfileMenu user={data.user} />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <Header selectedProject={selectedProject} />
        {/* Main content goes here*/}

        <NewProjectDialog />
      </SidebarInset>
    </SidebarProvider>
  );
}
