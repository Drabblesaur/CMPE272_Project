import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkCodeBlocks from "remark-code-blocks";
import { Toaster } from "./ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function CustomAPIGen({ project }) {
  const [code, setCode] = useState("");
  const [pLanguage, setPLanguage] = useState("");
  const [Database, setDatabase] = useState("");
  const [apiPrompt, setApiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  var schema = project.schema;
  var projectCode = project.code;

  const generateCode = async () => {
    if (!pLanguage || !Database || !apiPrompt) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Please select a programming language, database type, and enter an API prompt",
      });
      return;
    }
    if (schema === "none") {
      toast({
        variant: "destructive",
        title: "No schema found",
        description:
          "Seems like there is no schema associated with this project. Please add a schema to generate API code",
      });
      return;
    }
    toast({
      title: "Generating Custom Route",
      description: "Please wait while the route is being generated...",
    });
    try {
      setIsGenerating(true);
      const apiUrl = `https://backend.codegenner.net/ai/generateCustom?schema=${encodeURIComponent(
        schema
      )}&language=${encodeURIComponent(
        pLanguage
      )}&database=${encodeURIComponent(Database)}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: apiPrompt,
        }),
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Failed to generate API code",
          description: "Please try again later",
        });
        throw new Error("Failed to generate API code");
      }

      const result = await response.json();
      setCode(result.code || "No code generated");
    } catch (error) {
      console.error("Error generating API code:", error);
      toast({
        variant: "destructive",
        title: "Failed to generate API code",
        description: "Please try again later",
      });
    } finally {
      setIsGenerating(false);
      toast({
        title: "Custom Route Generated",
        description: "The custom route has been generated successfully",
      });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Custom API Generation</h1>
      <p style={styles.description}>
        Generate a custom API for your database schema.
      </p>
      <h2>Programming Language</h2>
      <div style={styles.buttonContainer}>
        <button
          onClick={() => setPLanguage("Java")}
          style={pLanguage === "Java" ? styles.activeButton : styles.button}
        >
          Java
        </button>
        <button
          onClick={() => setPLanguage("Javascript")}
          style={
            pLanguage === "Javascript" ? styles.activeButton : styles.button
          }
        >
          Javascript
        </button>
        <button
          onClick={() => setPLanguage("Python")}
          style={pLanguage === "Python" ? styles.activeButton : styles.button}
        >
          Python
        </button>
      </div>
      <h2>Database Type</h2>
      <div style={styles.buttonContainer}>
        <button
          onClick={() => setDatabase("SQL")}
          style={Database === "SQL" ? styles.activeButton : styles.button}
        >
          SQL
        </button>
        <button
          onClick={() => setDatabase("MongoDB")}
          style={Database === "MongoDB" ? styles.activeButton : styles.button}
        >
          MongoDB
        </button>
        <button
          onClick={() => setDatabase("PostgreSQL")}
          style={
            Database === "PostgreSQL" ? styles.activeButton : styles.button
          }
        >
          PostgreSQL
        </button>
      </div>
      <h2>Schema</h2>
      <div style={styles.schema}>{schema}</div>
      <h2>API</h2>
      <p>Generate custom API routes for your schema</p>
      <input
        style={styles.input}
        type="text"
        value={apiPrompt}
        onChange={(e) => setApiPrompt(e.target.value)}
        placeholder="API Prompt"
      />
      <button
        onClick={generateCode}
        style={styles.button}
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate API"}
      </button>
      <h2>Generated Code</h2>
      <div style={styles.code}>
        <ReactMarkdown remarkPlugins={remarkCodeBlocks}>{code}</ReactMarkdown>
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
  header: {
    textAlign: "left",
    fontSize: "32px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "15px",
  },
  description: {
    textAlign: "left",
    fontSize: "16px",
    color: "#666",
    marginBottom: "30px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1em",
    cursor: "pointer",
    backgroundColor: "#e0e0e0",
    border: "none",
    borderRadius: "5px",
  },
  activeButton: {
    padding: "10px 20px",
    fontSize: "1em",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  schema: {
    fontSize: "14px",
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    marginBottom: "10px",
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  code: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
  },
};
