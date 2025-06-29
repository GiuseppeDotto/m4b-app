import { useContext } from "react";
import BlogSearchBar from "./BlogSearchBar";
import NewPostDialog from "./NewPostDialog";
import { PostsContext, UserContext } from "../App";
import PostTable from "./PostTable";

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
      <BlogSearchBar tagList={tagList} displayModes={["grid", "table"]} />
      {user?.uid == import.meta.env.VITE_ADMIN_UID ? (
        <>
          <NewPostDialog />
          <PostTable />
        </>
      ) : null}

      <ul>
        {postList.map((post) => {
          return <li key={post.slug}>{post.title}</li>;
        })}
      </ul>
    </>
  );
}
