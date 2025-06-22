import { useRef, useState } from "react";
import "./NewPostDialog.css";

export default function NewPostDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState("Post Title");
  const [postContent, setPostContent] =
    useState(`Lorem ipsum dolor sit amet consectetur adipisicing elit.
      
      ## the issue
      
      ## how to
      
      ## Curiosity
      Curiosity killed the cat, satisfaction brought it back.`);

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
        <h2>NewPost</h2>
        <h3
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setTitle((e.target as HTMLHeadingElement).textContent || "")}
        >
          {title}
        </h3>
        <div className="new-post-body">
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setPostContent(e.target.textContent || "")}
          >
            {postContent}
          </div>
          <div></div>
        </div>
        <div className="button-control">
          <button>DELETE ALL</button>
          <button className="btn-primary">SUBMIT</button>
        </div>
      </dialog>
    </>
  );
}
