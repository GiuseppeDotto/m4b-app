import { useContext } from "react";
import { BlogContext } from "../App";
import { useParams } from "react-router-dom";
import MDXRenderer from "./MDXRenderer";

export default function PostPage() {
  const { posts, tags } = useContext(BlogContext);
  let params = useParams();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return <h1>Error 404: post missing</h1>;

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div>
          <small>tags:</small>
          <div style={{ display: "flex", gap: "5px" }}>
            {post.tags.map((tag) => tags.find((x) => x.tag === tag)?.div)}
          </div>
        </div>
        <div>
          <small>ceratedAt:</small>
          <div>{post.createdAt.toLocaleDateString()}</div>
        </div>
      </header>
      <MDXRenderer content={post.content} />
    </>
  );
}
