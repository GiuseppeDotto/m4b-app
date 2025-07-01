import { Link } from "react-router-dom";
import { Post } from "../classes/Post";
import "./PostCardRow.css";

export default function PostCardRow({ post }: { post: Post }) {
  return (
    <Link to={`/post/${post.slug}`} style={{ color: "#333", textDecoration: "none" }}>
      <div className="post-card-row">
        <div></div>
        <div>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <small>{post.createdAt.toLocaleDateString()}</small>
        </div>
        <div>
          <sup>{post.votes}</sup>
          <sup>{post.views}</sup>
          <sup>{post.comments.length}</sup>
        </div>
      </div>
    </Link>
  );
}
