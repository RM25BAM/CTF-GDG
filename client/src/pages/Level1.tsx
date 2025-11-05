import React from "react";

const Level1: React.FC = () => {
  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* This block injects an actual HTML comment into the page source */}
      <div
        aria-hidden="true"
        dangerouslySetInnerHTML={{
          __html: "<!-- FLAG: GGCAMP{level1_view_source} -->",
        }}
      />

      <h1>Level 1 — View Source</h1>
      <p>
        Welcome to the first challenge! Somewhere in this page’s HTML, the flag
        is hidden.
      </p>
      <p>
        Hint: developers sometimes leave notes in the HTML. Try using{" "}
        <strong>View Page Source</strong> or <strong>Inspect Element</strong>.
      </p>
    </main>
  );
};

export default Level1;
