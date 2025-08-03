import React from "react";
import ReactMarkdown from "react-markdown";

// This component now receives props from Body.jsx
export default function ClaudeRecipe(props) {
  return (
    <section className="recipe-container">
      {props.isGenerating && <p>Generating your recipe...</p>}
      {props.recipe && !props.isGenerating && (
        <ReactMarkdown>{props.recipe}</ReactMarkdown>
      )}
    </section>
  );
}