import React, { useState } from "react";

export default function CustomAPIGen({ project }) {
  const [code, setCode] = useState("");

  var schema = project.schema;

  const generateCode = async () => {
    try {
      //const response = await fetch("http://);
      alert("API code generated");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Custom API Generation</h1>
      <p style={styles.description}>
        Generate a custom API for your database schema.
      </p>
      <h2>Schema</h2>
      <div style={styles.schema}>{schema}</div>
      <h2>API</h2>
      <p>Generate API code for your schema.</p>
      <input type="text" placeholder="API Prompt" style={styles.input} />
      <button onClick={generateCode} style={styles.button}>
        Generate API
      </button>
      <div style={styles.code}>{code}</div>
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
  },
  button: {
    padding: "10px 20px",
    fontSize: "14px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  code: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
  },
};
