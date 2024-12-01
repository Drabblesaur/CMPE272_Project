import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Folder, MoreHorizontal, Trash2 } from "lucide-react";
import { SidebarMenuAction } from "@/components/ui/sidebar";

export const ProjectMenu = ({ projectId, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8080/prj/project/${projectId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the project");
      }

      const result = await response.json();
      console.log(result.message);

      // Call the onDelete callback to update the UI

      onDelete(projectId);

      //alert("Delete project with id: " + projectId);
      //onDelete(projectId);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction showOnHover>
          <MoreHorizontal />
          <span className="sr-only">More</span>
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48 rounded-lg"
        side="right"
        align="start"
      >
        <DropdownMenuItem>
          <Folder className="text-muted-foreground" />
          <span>View Project</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} disabled={isLoading}>
          <Trash2 className="text-muted-foreground" />
          <span>{isLoading ? "Deleting..." : "Delete Project"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </DropdownMenu>
  );
};
