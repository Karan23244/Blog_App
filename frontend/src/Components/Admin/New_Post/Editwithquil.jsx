import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";
import "quill/dist/quill.snow.css";
import "./styles.css";

const Editor = () => {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} },
  });

  useEffect(() => {
    if (Quill && !quill) {
      Quill.register("modules/blotFormatter", BlotFormatter);
    }

    if (quill) {
      quill.on("text-change", (delta, oldContents) => {
        const currentContents = quill.getContents();
      });
    }
  }, [quill, Quill]);

  return <div ref={quillRef} />;
};

export default Editor;
