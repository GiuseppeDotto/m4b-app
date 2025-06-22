import { useContext } from "react";
import { PostsContext } from "../App";
import { Post } from "../classes/Post";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function PostTable() {
  const postList = useContext(PostsContext);
  const header = ["title", "createdAt", "votes", "views", "comments", "tags"];
  return (
    <>
      <h2>POST ADMIN TABLE</h2>
      <table>
        <thead>
          <tr>
            {header.map((h) => (
              <th key={h}>{h}</th>
            ))}
            <th>operations</th>
          </tr>
        </thead>
        <tbody>
          {postList.map((post) => {
            return (
              <tr key={post.slug}>
                {header.map((k, i) => {
                  let value = post[k as keyof Post];
                  value = value instanceof Date ? value.toLocaleDateString() : String(value);
                  return <td key={value + i}>{value}</td>;
                })}
                <td style={{ display: "flex", gap: "5px" }}>
                  <button>EDIT</button>
                  <button onClick={() => deleteDoc(doc(db, "posts", post.slug))}>DELETE</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
