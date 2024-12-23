import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import FlexboxComponent from "./FlexBoxComponent";

const FlexboxNode = Node.create({
  name: "flexbox",

  group: "block",
  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[class=custom-flexbox]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { ...HTMLAttributes, class: "custom-flexbox" }, 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FlexboxComponent);
  },

  // Default attributes for the flexbox node
  addAttributes() {
    return {
      items: {
        default: ["", ""], // Default content for the items
      },
    };
  },
});

export default FlexboxNode;
