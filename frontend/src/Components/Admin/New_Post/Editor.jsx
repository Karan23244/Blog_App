import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import ListItem from "@tiptap/extension-list-item";
import ListKeymap from "@tiptap/extension-list-keymap";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import HardBreak from "@tiptap/extension-hard-break";
import {
  MdFormatColorFill,
  MdTextFormat,
  MdHorizontalRule,
} from "react-icons/md";
import "./styles.css";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlinePicture,
  AiOutlineStrikethrough,
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
} from "react-icons/ai";
import { BsTable, BsTrash } from "react-icons/bs";
import {
  MdAddCircleOutline,
  MdOutlineDelete,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatAlignJustify,
} from "react-icons/md";

// Toolbar Component
const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const addFlexboxNode = () => {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .insertContent({
        type: "flexbox",
        attrs: {
          items: ["Initial content for item 1", "Initial content for item 2"], // Initial content
        },
      })
      .run();
  };

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target.result;
          editor.chain().focus().setImage({ src: base64 }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    const selectedImage = editor.state.selection.$from.node();

    if (selectedImage.type.name === "editableImage") {
      editor
        .chain()
        .focus()
        .updateAttributes("editableImage", { src, alt })
        .run();
    }
    input.click();
  };

  return (
    <div className="toolbar">
      {/* Text Formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold">
        <AiOutlineBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic">
        <AiOutlineItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strikethrough">
        <AiOutlineStrikethrough />
      </button>
      {/* Text Color */}
      <button
        onClick={() => {
          const color = window.prompt(
            "Enter a text color (e.g., red, #ff0000):"
          );
          if (color) editor.chain().focus().setColor(color).run();
        }}
        title="Text Color">
        <MdTextFormat />
      </button>

      {/* Background Color */}
      <button
        onClick={() => {
          const color = window.prompt(
            "Enter a background color (e.g., yellow, #ffff00):"
          );
          if (color) editor.chain().focus().toggleHighlight({ color }).run();
        }}
        title="Background Color">
        <MdFormatColorFill />
      </button>
      {/* Headings */}
      <button
        onClick={() => {
          editor.chain().focus().setNode("heading", { level: 1 }).run();
        }}
        title="Heading 1">
        H1
      </button>
      <button
        onClick={() => {
          editor.chain().focus().setNode("heading", { level: 2 }).run();
        }}
        title="Heading 2">
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title="Heading 3">
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        title="Heading 4">
        H4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        title="Heading 5">
        H5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        title="Heading 6">
        H6
      </button>
      <button
        onClick={() => editor.chain().focus().setNode("paragraph").run()}
        title="Paragraph">
        P
      </button>
      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet List">
        <MdFormatListBulleted />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Ordered List">
        <MdFormatListNumbered />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}>
        Toggle bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().splitListItem("listItem").run()}
        disabled={!editor.can().splitListItem("listItem")}>
        Split list item
      </button>
      <button
        onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
        disabled={!editor.can().sinkListItem("listItem")}>
        Sink list item
      </button>
      <button
        onClick={() => editor.chain().focus().liftListItem("listItem").run()}
        disabled={!editor.can().liftListItem("listItem")}>
        Lift list item
      </button>
      {/* Text Alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        title="Align Left">
        <AiOutlineAlignLeft />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        title="Align Center">
        <AiOutlineAlignCenter />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        title="Align Right">
        <AiOutlineAlignRight />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        title="Justify">
        <MdFormatAlignJustify />
      </button>
      {/* Link */}
      <button
        onClick={() => {
          const url = window.prompt("Enter the URL:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        title="Add Link">
        <AiOutlineLink />
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        title="Remove Link">
        🚫🔗
      </button>

      {/* Image */}
      <button onClick={addImage} title="Add Image">
        <AiOutlinePicture />
      </button>
      {/* Horizontal Rule */}
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Insert Horizontal Rule">
        <MdHorizontalRule />
      </button>
      {/* Table Operations */}
      <button
        onClick={() =>
          editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()
        }
        title="Insert Table">
        <BsTable />
      </button>
      <button
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        title="Add Column">
        <MdAddCircleOutline />
      </button>
      <button
        onClick={() => editor.chain().focus().deleteColumn().run()}
        title="Delete Column">
        <MdOutlineDelete />
      </button>
      <button
        onClick={() => editor.chain().focus().addRowAfter().run()}
        title="Add Row">
        <MdAddCircleOutline />
      </button>
      <button
        onClick={() => editor.chain().focus().deleteRow().run()}
        title="Delete Row">
        <MdOutlineDelete />
      </button>
      <button onClick={() => editor.chain().focus().mergeCells().run()}>
        Merge cells
      </button>
      <button onClick={() => editor.chain().focus().splitCell().run()}>
        Split cell
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
        Toggle header column
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
        Toggle header row
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
        Toggle header cell
      </button>
      <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
        Merge or split
      </button>
      <button
        onClick={() =>
          editor.chain().focus().setCellAttribute("colspan", 2).run()
        }>
        Set cell attribute
      </button>
      <button onClick={() => editor.chain().focus().fixTables().run()}>
        Fix tables
      </button>
      <button onClick={() => editor.chain().focus().goToNextCell().run()}>
        Go to next cell
      </button>
      <button onClick={() => editor.chain().focus().goToPreviousCell().run()}>
        Go to previous cell
      </button>
      <button
        onClick={() => editor.chain().focus().deleteTable().run()}
        title="Delete Table">
        <BsTrash />
      </button>
    </div>
  );
};

// Main Editor Component
export default function Editor({ value, onChange, placeholder }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6], // Keep all heading levels
        },
        hardBreak: true, // Enable hard breaks
      }),

      Image.configure({
        resizable: true,
        inline: true,
      }),
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "my-custom-heading1",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      ListItem,
      ListKeymap,
      Placeholder.configure({
        placeholder: placeholder || "Start writing here...",
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, true);
    }
  }, [value, editor]);

  return (
    <div className="editor-wrapper">
      <Toolbar editor={editor} />
      <div
        className="editor-content"
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "10px",
        }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
