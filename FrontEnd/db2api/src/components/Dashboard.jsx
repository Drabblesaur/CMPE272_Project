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
import DataSetBuilder from "./apigen";
import MarkdownDisplay from "./MarkdownDisplay";
import Link from "next/link";

const actualData = {
  message: "User data retrieved successfully",
  data: [
    {
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar_url: "https://example.com/avatar.jpg",
      },
      projects: ["6746a1f7822e63b5b51b06e5"],
      userProjects: [
        {
          _id: "6746a1f7822e63b5b51b06e5",
          githubID: 2,
          name: "Customer Analytics Dashboard",
          schema: "User(id,name,email)",
          code: "```javascript\nconst express = require('express');\nconst router = express.Router(); \nconst mongoose = require('mongoose'); \n\n// defining the user schema\nconst User = mongoose.model('User', new mongoose.Schema({\n    name: {\n        type: String,\n        required: true,\n        minlength: 5,\n        maxlength: 50\n    },\n    email: {\n        type: String,\n        required: true,\n        minlength: 5,\n        maxlength: 255,\n        unique: true\n    }\n})); \n\n// POST operation\nrouter.post('/', async (req, res) => {\n    const { error } = validateUser(req.body); \n    if (error) return res.status(400).send(error.details[0].message);\n\n    let user = new User({\n        name: req.body.name,\n        email: req.body.email\n    });\n    user = await user.save();\n    res.send(user);\n});\n\n// GET all operation\nrouter.get('/', async (req, res) => {\n    const users = await User.find().sort('name');\n    res.send(users);\n});\n\n// GET one operation\nrouter.get('/:id', async (req, res) => {\n    const user = await User.findById(req.params.id);\n    if (!user) return res.status(404).send('The user with the given ID was not found.');\n    res.send(user);\n}); \n\n// PUT operation\nrouter.put('/:id', async (req, res) => {\n    const { error } = validateUser(req.body); \n    if (error) return res.status(400).send(error.details[0].message);\n\n    const user = await User.findByIdAndUpdate(req.params.id, {\n        name: req.body.name,\n        email: req.body.email\n    }, { new: true });\n\n    if (!user) return res.status(404).send('The user with the given ID was not found.');\n\n    res.send(user);\n}); \n\n// DELETE operation\nrouter.delete('/:id', async (req, res) => {\n    const user = await User.findByIdAndRemove(req.params.id);\n    if (!user) return res.status(404).send('The user with the given ID was not found.');\n\n    res.send(user);\n}); \n\nfunction validateUser(user) {\n    const schema = Joi.object({\n        name: Joi.string().min(5).max(50).required(),\n        email: Joi.string().min(5).max(255).required().email()\n    });\n    return schema.validate(user);\n}\n\nmodule.exports = router; \n```",
        },
      ],
    },
  ],
};

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [userData, setUserData] = React.useState(null);

  // API call to get user data
  const getUserData = async () => {
    const response = await fetch("http://127.0.0.1:8080/db/userData/2");
    const data = await response.json();
    console.log(data);
    setUserData(data);
    //
  };

  useEffect(() => {
    getUserData();
  }, []);

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
            projects={actualData.data[0].userProjects}
            setSelectedProject={setSelectedProject}
          />
        </SidebarContent>

        <SidebarFooter>
          <UserProfileMenu user={actualData.data[0].user} />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <Header selectedProject={selectedProject} />
        {/* Show DataSetBuilder when a project is selected*/}
        {selectedProject ? <DataSetBuilder project={selectedProject} /> : null}
        {selectedProject ? (
          <MarkdownDisplay content={selectedProject.code} />
        ) : null}
        <NewProjectDialog />
      </SidebarInset>
    </SidebarProvider>
  );
}
