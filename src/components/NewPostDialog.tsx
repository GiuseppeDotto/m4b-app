import { useRef, useState, FocusEvent, KeyboardEvent, ClipboardEvent } from "react";
import "./NewPostDialog.css";
import { Post } from "../classes/Post";
import MDXRenderer from "./MDXRenderer";

export default function NewPostDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const wrapSelection = (wrapper: string) => {
    const selection = window.getSelection();
    if (!selection) return;
    const range = selection.getRangeAt(0);

    if (!selection.toString()) return;

    const newText = `${wrapper}${selection.toString().trim()}${wrapper}`;
    const newTextNode = document.createTextNode(newText);
    range.deleteContents();
    range.insertNode(newTextNode);

    // move cursor at the end of inserted text
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartAfter(newTextNode);
    newRange.collapse(true);
    selection.addRange(newRange);
  };

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
    } else if (e.key === "b" && e.ctrlKey) {
      e.preventDefault();
      wrapSelection("**");
    } else if (e.key === "i" && e.ctrlKey) {
      e.preventDefault();
      wrapSelection("_");
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
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
    titleRef.current ? (titleRef.current.textContent = "") : null;
    preRef.current ? (preRef.current.textContent = "") : null;
    dialogRef.current?.close();
  };

  return (
    <>
      <button className="btn-new-post" onClick={() => dialogRef.current?.showModal()}>
        +
      </button>

      {/* DIALOG */}
      <dialog ref={dialogRef} className="new-post-dialog">
        <button className="btn-close" onClick={resetAndClose}>
          CLOSE
        </button>
        <h2>NewPost</h2>
        <div style={{ position: "relative" }}>
          <h3
            ref={titleRef}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
              setTitle((e.target as HTMLDivElement).textContent || "");
            }}
          />
          {title ? null : <h3 className="placeholder">Post Title</h3>}
        </div>
        <div className="div-controller">
          <div>
            <small>tags:</small>
            <div contentEditable suppressContentEditableWarning onBlur={calculateTags} />
          </div>
          <div>
            <small>control:</small>
            <div style={{ flexDirection: "row" }}>
              <button onClick={() => wrapSelection("**")}>Bold</button>
              <button onClick={() => wrapSelection("_")}>Italic</button>
              <button onClick={() => wrapSelection("`")}>Code</button>
              <button onClick={() => alert("still WIP")}>Blockquote</button>
            </div>
          </div>
        </div>
        <div className="new-post-body">
          <pre
            ref={preRef}
            className="new-post-section"
            style={{ userSelect: "text" }}
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            // onBlur={(e) => setContent(e.target.innerText || "")}
            onInput={(e) => setContent((e.target as HTMLPreElement).innerText || "")}
          />
          <div className="new-post-section">
            <MDXRenderer content={content} />
          </div>
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
