"use client";

import React, { useState } from "react";

const dataTypes = ["String", "Number", "Date", "Location", "Boolean", "Array"];

function DataSetBuilder({ project }) {
  const [columns, setColumns] = useState([
    { id: 1, title: "Column 1", type: "String" },
  ]);
  const [rowCount, setRowCount] = useState(5);

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

  const handleGenerateAPI = () => {
    const apiPreview = {
      columns,
      rows: rowCount,
      data: generateSampleData(),
    };
    console.log("Generated API:", apiPreview);
    alert("API generated! Check console for details.");
  };

  const sampleData = generateSampleData();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Dataset Builder</h1>
      <p style={styles.description}>
        Design your dataset by configuring columns and preview the generated
        table.
      </p>
      <p style={styles.description}>
        {/*display project details */}
        Project Name: {project.name}
        <br />
        Project ID: {project._id}
        <br />
        Project Schema: {project.schema}
      </p>
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
        <button onClick={handleGenerateAPI} style={styles.generateButton}>
          🚀 Generate API
        </button>
      </div>
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
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
  },
  columnRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  input: {
    flex: "2",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  select: {
    flex: "1",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
    backgroundColor: "#f9f9f9",
  },
  removeButton: {
    padding: "10px",
    backgroundColor: "#e63946",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  addButton: {
    padding: "12px",
    backgroundColor: "#0096FF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "transform 0.2s",
  },
  rowControl: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px",
  },
  label: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#333",
  },
  numberInput: {
    width: "80px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  generateButton: {
    padding: "14px",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s, transform 0.2s",
  },
  tableContainer: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.08)",
  },
  tableHeader: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  tableHeaderCell: {
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
    backgroundColor: "#f3f4f6",
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  rowHover: {
    transition: "background-color 0.2s",
    cursor: "pointer",
  },
};

export default DataSetBuilder;
