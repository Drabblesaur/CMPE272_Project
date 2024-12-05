"use client";

import React, { useState } from "react";
import { Toaster } from "./ui/toaster";
import { useToast } from "@/hooks/use-toast";

const dataTypes = ["String", "Number", "Date", "Location", "Boolean", "Array"];
const languages = ["Java", "JavaScript", "Python"];
const dbSchemas = ["SQL", "MongoDB", "PostgreSQL"];

function DataSetBuilder({ project, updateSchema, updateCode }) {
  const [columns, setColumns] = useState([
    { id: 1, title: "Column 1", type: "String" },
  ]);
  const [rowCount, setRowCount] = useState(5);
  const [selectedLanguage, setSelectedLanguage] = useState("Java");
  const [selectedDBSchema, setSelectedDBSchema] = useState("SQL");
  const [apiResponse, setApiResponse] = useState({ success: false, code: "" });
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateSampleData = () => {
    const sampleRows = [];
    for (let i = 0; i < rowCount; i++) {
      const row = {};
      columns.forEach((col) => {
        switch (col.type) {
          case "String":
            row[col.title] = `Text ${i + 1}`;
            break;
          case "Number":
            row[col.title] = Math.floor(Math.random() * 100);
            break;
          case "Date":
            row[col.title] = new Date().toISOString().split("T")[0];
            break;
          case "Location":
            row[col.title] = `Lat: ${Math.random().toFixed(
              2
            )}, Long: ${Math.random().toFixed(2)}`;
            break;
          case "Boolean":
            row[col.title] = Math.random() > 0.5 ? "True" : "False";
            break;
          case "Array":
            row[col.title] = `[${Math.floor(Math.random() * 10)}, ${Math.floor(
              Math.random() * 10
            )}]`;
            break;
          default:
            row[col.title] = "N/A";
        }
      });
      sampleRows.push(row);
    }
    return sampleRows;
  };

  const handleAddColumn = () => {
    setColumns((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: `Column ${prev.length + 1}`,
        type: "String",
      },
    ]);
  };

  const handleRemoveColumn = (id) => {
    setColumns((prev) => prev.filter((col) => col.id !== id));
  };

  const handleColumnChange = (id, key, value) => {
    setColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, [key]: value } : col))
    );
  };

  const updateProjectCode = async (newCode) => {
    const projectUrl = `https://backend.codegenner.net/prj/project/${project._id}`;
    const response = await fetch(projectUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: newCode }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Project code updated successfully:", data);
    } else {
      const error = await response.json();
      console.error("Error updating project code:", error);
    }
  };

  const updateProjectSchema = async (newSchema) => {
    const projectUrl = `https://backend.codegenner.net/prj/project/${project._id}/schema`;
    const response = await fetch(projectUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ schema: newSchema }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Project schema updated successfully:", data);
    } else {
      const error = await response.json();
      console.error("Error updating project schema:", error);
    }
  };

  const handleGenerateAPI = async () => {
    setIsGenerating(true);
    toast({
      title: "Generating API",
      description: "Please wait while the API is being generated...",
    });
    try {
      const schema = columns
        .map((col) => `${col.title}(${col.type})`)
        .join(",");

      const apiUrl = `https://backend.codegenner.net/ai/generateCRUD?schema=${schema}&language=${selectedLanguage}&database=${selectedDBSchema}`;
      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.success) {
        // Update state with the response data (success and code)
        setApiResponse({
          success: responseData.success,
          code: responseData.code,
        });
        // Save the generated code to the project
        updateProjectCode(responseData.code);
        // Save the schema to the project
        updateProjectSchema(schema);

        // Update the schema in the parent component
        updateSchema(schema);
        // Update the code in the parent component
        updateCode(responseData.code);

        // Optionally, you can also display the success checkpoints or any other data.
        console.log("API Response:", responseData);

        // alert("API generated successfully! Check the console for details.");
      } else {
        throw new Error("API generation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error generating API:", error);
      // alert("An error occurred while generating the API. Check the console for details.");
      toast({
        variant: "destructive",
        title: "Error generating API",
        description:
          "An error occurred while generating the API. Check the console for details.",
      });
    } finally {
      setIsGenerating(false);
      toast({
        title: "API generated successfully",
        description: "API has been generated successfully.",
      });
    }
  };

  const sampleData = generateSampleData();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Dataset Builder</h1>
      <p style={styles.description}>
        Customize your dataset, choose a programming language, and select a
        database schema. It will generate CRUD API code for your dataset.
      </p>
      {/* Language and DB Schema Selection */}
      <div style={styles.selectionContainer}>
        <div>
          <h3 style={styles.sectionHeader}>Select Language</h3>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              style={{
                ...styles.selectButton,
                backgroundColor:
                  selectedLanguage === lang ? "#27ae60" : "#f4f4f4",
              }}
            >
              {lang}
            </button>
          ))}
        </div>
        <div>
          <h3 style={styles.sectionHeader}>Select DB Schema</h3>
          {dbSchemas.map((db) => (
            <button
              key={db}
              onClick={() => setSelectedDBSchema(db)}
              style={{
                ...styles.selectButton,
                backgroundColor:
                  selectedDBSchema === db ? "#0096FF" : "#f4f4f4",
              }}
            >
              {db}
            </button>
          ))}
        </div>
      </div>

      {/* API Response */}
      <div style={styles.codeContainer}>
        {apiResponse.success && (
          <div>
            <h3>Generated API Code:</h3>
            <pre style={styles.codeBlock}>{apiResponse.code}</pre>
          </div>
        )}
      </div>

      {/* Columns Configuration */}
      <div style={styles.formContainer}>
        {columns.map((col) => (
          <div key={col.id} style={styles.columnRow}>
            <input
              type="text"
              value={col.title}
              onChange={(e) =>
                handleColumnChange(col.id, "title", e.target.value)
              }
              placeholder="Column Name"
              style={styles.input}
            />
            <select
              value={col.type}
              onChange={(e) =>
                handleColumnChange(col.id, "type", e.target.value)
              }
              style={styles.select}
            >
              {dataTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleRemoveColumn(col.id)}
              style={styles.removeButton}
            >
              ✖
            </button>
          </div>
        ))}
        <button onClick={handleAddColumn} style={styles.addButton}>
          ➕ Add Column
        </button>
        <div style={styles.rowControl}>
          <label style={styles.label}>Number of Rows:</label>
          <input
            type="number"
            value={rowCount}
            onChange={(e) => setRowCount(e.target.value)}
            style={styles.numberInput}
            min="1"
          />
        </div>
        <button
          onClick={handleGenerateAPI}
          style={styles.generateButton}
          disabled={!selectedLanguage || !selectedDBSchema || isGenerating}
        >
          {isGenerating ? "Generating..." : "🚀 Generate API"}
        </button>
      </div>

      {/* Live Table Preview */}
      <div style={styles.tableContainer}>
        <h2 style={styles.tableHeader}>Live Table Preview</h2>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.id} style={styles.tableHeaderCell}>
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row, rowIndex) => (
                <tr key={rowIndex} style={styles.rowHover}>
                  {columns.map((col) => (
                    <td key={col.id} style={styles.tableCell}>
                      {row[col.title]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    width: "100%",
    margin: "30px auto",
    padding: "25px",
    backgroundColor: "#fdfdfd",
    borderRadius: "12px",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
    border: "1px solid #f3f4f6",
  },
  description: {
    textAlign: "left",
    fontSize: "16px",
    color: "#666",
    marginBottom: "30px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "5px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  promptInput: {
    flex: 1,
    padding: "10px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  promptButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  chatResponse: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#e9f7df",
    borderRadius: "5px",
    border: "1px solid #c3e6cb",
    color: "#155724",
  },
  header: {
    textAlign: "left",
    fontSize: "32px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "15px",
  },

  selectionContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sectionHeader: { fontSize: "18px", marginBottom: "10px" },
  selectButton: {
    padding: "10px 20px",
    margin: "5px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    cursor: "pointer",
  },
  formContainer: { marginTop: "20px" },
  columnRow: { display: "flex", alignItems: "center", marginBottom: "10px" },
  input: {
    marginRight: "10px",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  select: {
    padding: "5px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  removeButton: {
    color: "#ff4d4f",
    cursor: "pointer",
    background: "none",
    border: "none",
  },
  addButton: {
    padding: "10px 20px",
    marginTop: "10px",
    borderRadius: "5px",
    backgroundColor: "#27ae60",
    color: "white",
    cursor: "pointer",
  },
  generateButton: {
    padding: "10px 20px",
    marginTop: "20px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    width: "100%",
  },
  tableContainer: { marginTop: "30px" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  tableHeader: { textAlign: "center", fontSize: "20px", marginBottom: "10px" },
  tableHeaderCell: {
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#f4f4f4",
    borderBottom: "2px solid #ddd",
  },
  tableCell: { padding: "10px", borderBottom: "1px solid #ddd" },
  rowHover: { backgroundColor: "white" },

  // New code styles added
  codeContainer: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "5px",
  },
  codeBlock: {
    whiteSpace: "pre-wrap", // Allows code to wrap within the block
    wordBreak: "break-word",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    maxHeight: "400px",
    overflowY: "scroll", // Enables scrolling if content overflows
  },
};

export default DataSetBuilder;
