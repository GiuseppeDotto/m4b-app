import { useContext } from "react";
import BlogSearchBar from "./BlogSearchBar";
import NewPostDialog from "./NewPostDialog";
import { PostsContext, UserContext } from "../App";
import PostTable from "./PostTable";
import PostCard from "./PostCard";

export default function Blog() {
  const user = useContext(UserContext);
  const postList = useContext(PostsContext);
  const tagList = postList.reduce((acc: string[], curr) => {
    curr.tags.map((tag) => (acc.includes(tag) || !tag ? null : acc.push(tag)));
    return acc;
  }, []);

  return (
    <>
      <h1>Blog</h1>
      <p>
        Welcome to the blog page, find below the whole list of posts and use the custom function
        below to quickly find one specific.
      </p>
      <h2>Posts</h2>
      <BlogSearchBar tagList={tagList} displayModes={["grid", "table"]} />

      <div
        style={{
          margin: "1rem 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
        }}
      >
        {postList.map((post) => {
          return <PostCard post={post} key={post.slug} />;
        })}
      </div>

      {/* ADMIN PANEL */}
      {user?.uid == import.meta.env.VITE_ADMIN_UID ? (
        <>
          <NewPostDialog />
          <PostTable />
        </>
      ) : null}
    </>
  );
}
