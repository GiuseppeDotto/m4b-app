import { useRef, useState, FocusEvent, KeyboardEvent, ClipboardEvent } from "react";
import "./NewPostDialog.css";
import { Post } from "../classes/Post";

export default function NewPostDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] =
    useState<string>(`Lorem ipsum dolor sit amet consectetur adipisicing elit.
## the issue
## how to
## Curiosity
Curiosity killed the cat, satisfaction brought it back.`);
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Insert a line break at the cursor position
      const selection = window.getSelection();
      if (!selection) return;
      const range = selection.getRangeAt(0);

      // Create a text node with a newline character
      const lineBreak = document.createTextNode("\n");
      range.insertNode(lineBreak);

      // Move cursor after the inserted line break
      range.setStartAfter(lineBreak);
      range.setEndAfter(lineBreak);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();

    const text = e.clipboardData.getData("text/plain");

    console.log(getSelection(), getSelection()?.rangeCount, getSelection()?.getRangeAt(0));

    const range = getSelection()?.getRangeAt(0);
    if (!range) return;
    range.insertNode(document.createTextNode(text));
    range.collapse(false);
  };

  const calculateTags = (e: FocusEvent) => {
    const content = (e.target as HTMLDivElement).textContent;
    setTags(content?.split(",").map((tag) => tag.trim().toLowerCase()) || []);
  };

  const createPost = async () => {
    const post = new Post({ title, content, tags });
    await post.addToDB();
    resetAndClose();
  };

  const resetAndClose = () => {
    setTitle("");
    setContent("");
    dialogRef.current?.close();
  };

  return (
    <>
      <button
        style={{
          margin: "auto",
          borderRadius: "50%",
          height: "35px",
          aspectRatio: "1 / 1",
          backgroundColor: "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2em",
          lineHeight: "0",
          color: "white",
        }}
        onClick={() => dialogRef.current?.showModal()}
      >
        +
      </button>

      {/* DIALOG */}
      <dialog ref={dialogRef} className="new-post-dialog">
        <button className="btn-close" onClick={resetAndClose}>
          CLOSE
        </button>
        <h2>NewPost</h2>
        <h3
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setTitle((e.target as HTMLHeadingElement).textContent || "")}
          style={{ color: `${title ? "" : "#ddd"}` }}
        >
          {title ? title : "Post Title"}
        </h3>
        <small>tags:</small>
        <div contentEditable suppressContentEditableWarning onBlur={calculateTags} />
        <div className="new-post-body">
          <pre
            ref={preRef}
            className="new-post-section"
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onBlur={(e) => setContent(e.target.innerText || "")}
          >
            {content}
          </pre>
          <div className="new-post-section">{content}</div>
        </div>
        <div className="button-control">
          <button className="btn-primary" onClick={createPost}>
            SUBMIT
          </button>
        </div>
      </dialog>
    </>
  );
}
