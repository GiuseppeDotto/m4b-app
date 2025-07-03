import { Link } from "react-router-dom";
import { Post } from "../classes/Post";
import "./PostCard.css";
import { useContext } from "react";
import { BlogContext } from "../App";

export default function PostCard({ post }: { post: Post }) {
  const { tags } = useContext(BlogContext);
  const PostMetadata = ({ post }: { post: Post }) => {
    return (
      <>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {post.tags.map((tag) => tags.find((t) => t.tag == tag)?.div)}
        </div>
        <div style={{ display: "flex", gap: "5px", margin: "5px 0" }}>
          <small style={{ flex: "1 0" }}>{post.createdAt.toLocaleDateString()}</small>
          <small>
            <sup>{post.votes}</sup>
          </small>
          <small>
            <sup>{post.comments.length}</sup>
          </small>
        </div>
      </>
    );
  };

  return (
    <div className="post-card">
      <Link to={`/post/${post.slug}`} style={{ color: "#333" }}>
        <div className="post-img"></div>
        <div className="post-data">
          <h3>{post.title}</h3>
          {post.description}
          <PostMetadata post={post} />
        </div>
      </Link>
    </div>
  );
}
