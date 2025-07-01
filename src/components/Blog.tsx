import { useContext, useEffect, useState } from "react";
import BlogSearchBar from "./BlogSearchBar";
import NewPostDialog from "./NewPostDialog";
import { PostsContext, UserContext } from "../App";
import PostTable from "./PostTable";
import PostCard from "./PostCard";
import { Post } from "../classes/Post";
import PostCardRow from "./PostCardRow";

export default function Blog() {
  const user = useContext(UserContext);
  const postList = useContext(PostsContext);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([...postList]);
  useEffect(() => setVisiblePosts([...postList]), [postList]); // CHECK IF REALLY USEFUL
  const tagList = postList.reduce((acc: string[], curr) => {
    curr.tags.map((tag) => (acc.includes(tag) || !tag ? null : acc.push(tag)));
    return acc;
  }, []);
  const displayModes = ["grid", "table"];
  const [mode, setMode] = useState(displayModes[0]);

  const updatePostVisible = (t: string) => {
    setVisiblePosts(postList.filter((p) => p.title.toLowerCase().includes(t.toLowerCase())));
  };

  return (
    <>
      <h1>Blog</h1>
      <p>
        Welcome to the blog page, find below the whole list of posts and use the custom function
        below to quickly find one specific.
      </p>
      <h2>Posts</h2>
      {/* ADMIN PANEL */}
      {user?.uid == import.meta.env.VITE_ADMIN_UID ? <NewPostDialog /> : null}

      <BlogSearchBar
        tagList={tagList}
        displayModes={displayModes}
        onSearching={updatePostVisible}
        onDisplayMode={(m) => setMode(m)}
      />

      {mode === displayModes[0] ? (
        <div
          style={{
            margin: "1rem 0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "10px",
          }}
        >
          {visiblePosts.map((post) => (
            <PostCard post={post} key={post.slug} />
          ))}
        </div>
      ) : (
        <div>
          {visiblePosts.map((post) => (
            <PostCardRow post={post} key={post.slug} />
          ))}
        </div>
      )}
    </>
  );
}
