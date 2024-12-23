import React, { useState, useEffect } from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import "./styles.css";

const FlexboxComponent = ({ editor, node }) => {
  const [item1, setItem1] = useState(node.attrs.items[0] || ""); // Default content or empty
  const [item2, setItem2] = useState(node.attrs.items[1] || ""); // Default content or empty

  // Effect to sync node changes with the state
  useEffect(() => {
    setItem1(node.attrs.items[0]);
    setItem2(node.attrs.items[1]);
  }, [node]);

  // Save changes to the node when content is edited
  const handleInputChange = (e, index) => {
    const value = e.target.textContent;
    if (index === 0) {
      setItem1(value);
      node.attrs.items[0] = value;
    } else {
      setItem2(value);
      node.attrs.items[1] = value;
    }

    // Trigger editor update
    editor?.commands.updateAttributes(node.id, { items: node.attrs.items });
  };

  return (
    <NodeViewWrapper className="my-node-view">
      <div className="custom-flexbox">
        <div
          className="flex-item"
          contentEditable
          onInput={(e) => handleInputChange(e, 0)}
          suppressContentEditableWarning
        >
          {item1}
        </div>
        <div
          className="flex-item"
          contentEditable
          onInput={(e) => handleInputChange(e, 1)}
          suppressContentEditableWarning
        >
          {item2}
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default FlexboxComponent;
