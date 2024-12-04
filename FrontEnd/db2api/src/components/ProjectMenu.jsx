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
        `https://backend.codegenner.net/prj/project/${projectId}`,
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
      console.error(err);
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
        <DropdownMenuItem
          onClick={handleDelete}
          disabled={isLoading}
          className="text-red-600 hover:!text-red-600 hover:!bg-red-100"
        >
          <Trash2 className="text-muted-foreground text-red-500" />
          <span>{isLoading ? "Deleting..." : "Delete Project"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </DropdownMenu>
  );
};
