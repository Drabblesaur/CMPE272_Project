import React, { useState } from "react";
import { toast, useToast } from "@/hooks/use-toast";

export const NewProjectDialog = ({ user, onProjectCreated }) => {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("https://backend.codegenner.net/prj/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: user._id, // Replace with actual GitHub ID
        name: projectName,
        schema: "none", // Add schema if needed
        code: "none", // Add code if needed
      }),
    });

    const result = await response.json();
    if (response.ok) {
      document.getElementById("new-project-form").close();
      onProjectCreated(result);
    } else {
      console.error(result);
    }
  };

  return (
    <dialog id="new-project-form" className="p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Create New Project</h2>
      <form method="dialog" className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="project-name"
            className="block text-sm font-medium text-gray-700 w-full"
          >
            Project Name
          </label>
          <input
            type="text"
            id="project-name"
            name="project-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => document.getElementById("new-project-form").close()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </button>
        </div>
      </form>
    </dialog>
  );
};
