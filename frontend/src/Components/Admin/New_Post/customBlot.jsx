import Quill from "quill";

// Import the BlockEmbed blot
const BlockEmbed = Quill.import("blots/block/embed");

class FlexboxBlot extends BlockEmbed {
  static create(value) {
    const node = super.create(); // Create a base node
    node.setAttribute("style", "display: flex; gap: 10px; margin: 10px 0;");
    node.innerHTML = `
      <div style="flex: 1; border: 1px solid #ccc; padding: 10px;">Column 1</div>
      <div style="flex: 1; border: 1px solid #ccc; padding: 10px;">Column 2</div>
    `;
    return node;
  }

  static value(node) {
    return node.getAttribute("style"); // Return the style as the value
  }
}

FlexboxBlot.blotName = "flexbox"; // Define the blot name
FlexboxBlot.tagName = "div";      // Use "div" as the tag name

Quill.register("formats/flexbox", FlexboxBlot); // Correctly register the custom blot
