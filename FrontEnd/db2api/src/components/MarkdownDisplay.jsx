import React from "react";
import ReactMarkdown from "react-markdown";
import remarkCodeBlocks from "remark-code-blocks";

const MarkdownDisplay = ({ content }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Previous Code Generation</h1>
      <ReactMarkdown remarkPlugins={remarkCodeBlocks}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;

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
};
