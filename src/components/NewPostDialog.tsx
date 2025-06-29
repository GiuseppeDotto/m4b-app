import { useRef, useState, FocusEvent, KeyboardEvent, ClipboardEvent, createContext } from "react";
import "./NewPostDialog.css";
import { Post } from "../classes/Post";

export default function NewPostDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const defaultTitle = "Post Title";
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] =
    useState<string>(`Lorem ipsum dolor sit amet consectetur adipisicing elit.
## the issue
## how to
## Curiosity
Curiosity killed the cat, satisfaction brought it back.`);
  const [tags, setTags] = useState<string[]>([]);

  const wrapSelection = (wrapper: string) => {
    const selection = window.getSelection();
    if (!selection) return;
    const range = selection.getRangeAt(0);
    console.log(range, range.toString(), selection.toString());

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
        <h3
          className="h3-post-name"
          contentEditable
          suppressContentEditableWarning
          // onBlur={(e) => setTitle((e.target as HTMLHeadingElement).textContent || "")}
          onInput={(e) => setTitle((e.target as HTMLHeadingElement).textContent || "")}
          style={{ color: `${title === defaultTitle ? "#ddd" : ""}` }}
        >
          {title == defaultTitle ? defaultTitle : null}
        </h3>
        <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
          <div style={{ flex: "1", borderBottom: "1px solid #ddd" }}>
            <small>tags:</small>
            <div contentEditable suppressContentEditableWarning onBlur={calculateTags} />
          </div>
          <div>
            <small>control:</small>
            <div>
              <button>Bold</button>
              <button>Italic</button>
              <button>Code</button>
              <button>Blockquote</button>
            </div>
          </div>
        </div>
        <div className="new-post-body">
          <pre
            ref={preRef}
            className="new-post-section"
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            // onBlur={(e) => setContent(e.target.innerText || "")}
            onInput={(e) => setContent((e.target as HTMLPreElement).innerText || "")}
          >
            {content === "" ? null : "placeholder text"}
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
