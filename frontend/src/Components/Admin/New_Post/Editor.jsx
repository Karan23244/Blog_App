import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import quillConfig from "./quilConfig";
import "./styles.css";

Quill.register("modules/imageResize", ImageResize);

class Editor extends Component {
  state = { editorHtml: "" };

  // Handle content change from the editor
  handleChange = (html) => {
    this.setState({ editorHtml: html });
    this.props.onChange(html); // Pass the content to the parent component
  };

  // Handle image upload functionality
  handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        const editor = this.refs.editor.getEditor();
        let range = editor.getSelection();
  
        // If there is no selection, place the cursor at the end
        if (!range) {
          range = { index: editor.getLength() };
        }
  
        editor.insertEmbed(range.index, 'image', base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update the local editor state when props.content changes
  componentDidUpdate(prevProps) {
    // Only update the editorHtml state if the content prop has changed
    if (this.props.value !== prevProps.value) {
      this.setState({ editorHtml: this.props.value });
    }
  }

  render() {
    return (
      <div>
        <ReactQuill
          ref="editor"
          theme="snow"
          onChange={this.handleChange}
          value={this.state.editorHtml} // Bind the state to the editor content
          modules={quillConfig.modules}
          formats={quillConfig.formats}
          placeholder={this.props.placeholder}
        />
        {/* Image upload button */}
        <input
          type="file"
          onChange={this.handleImageUpload}
          style={{ marginTop: "10px" }}
        />
      </div>
    );
  }
}

export default Editor;
