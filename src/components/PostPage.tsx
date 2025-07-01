import { useContext } from "react";
import { PostsContext } from "../App";
import { useParams } from "react-router-dom";
import MDXRenderer from "./MDXRenderer";

export default function PostPage() {
  const postList = useContext(PostsContext);
  let params = useParams();
  const post = postList.find((p) => p.slug === params.slug);
  if (!post) return <h1>Error 404: post missing</h1>;

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginTop: "75px",
        }}
      >
        <div>
          <small>tags:</small>
          {post.tags.map((tag) => (
            <div className="tag-div">{tag}</div>
          ))}
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
