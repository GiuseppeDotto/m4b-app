import { Link } from "react-router-dom";
import { Post } from "../classes/Post";
import "./PostCard.css";

export default function PostCard({ post }: { post: Post }) {
  const PostMetadata = ({ post }: { post: Post }) => {
    return (
      <>
        <div style={{ display: "flex", gap: "5px" }}>
          {post.tags.map((tag) => (
            <span key={post.slug + tag}>{tag}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
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
