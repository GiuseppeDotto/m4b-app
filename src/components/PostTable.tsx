import { useContext } from "react";
import { BlogContext, UserContext } from "../App";
import { Post } from "../classes/Post";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function PostTable() {
  const user = useContext(UserContext);
  const { posts, tags } = useContext(BlogContext);

  const header = ["title", "createdAt", "votes", "views", "comments", "tags"];
  return (
    <>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            {header.map((h) => (
              <th key={h}>{h}</th>
            ))}
            <th>operations</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr key={post.slug}>
                {header.map((k, i) => {
                  let value = post[k as keyof Post];
                  return (
                    <td key={String(value) + i}>
                      {k == "createdAt" ? (
                        value.toLocaleString()
                      ) : Array.isArray(value) && k == "tags" ? (
                        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                          {value.map((t) => tags.find((x) => x.tag == t)?.div)}
                        </div>
                      ) : Array.isArray(value) ? (
                        value.length
                      ) : (
                        String(value)
                      )}
                    </td>
                  );
                })}

                {user?.uid == import.meta.env.VITE_ADMIN_UID ? (
                  <td style={{ display: "flex", gap: "5px" }}>
                    <button>EDIT</button>
                    <button onClick={() => deleteDoc(doc(db, "posts", post.slug))}>DELETE</button>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
