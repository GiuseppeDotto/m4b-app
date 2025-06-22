import { useContext } from "react";
import BlogSearchBar from "./BlogSearchBar";
import NewPostDialog from "./NewPostDialog";
import { UserContext } from "../App";

export default function Blog() {
  //   const [postList, setPostList] = useState([]);
  const tagList = ["python", "pym4b", "dynamo"];
  const user = useContext(UserContext);

  return (
    <>
      <h1>Blog</h1>
      <p>
        Welcome to the blog page, find below the whole list of posts and use the custom function
        below to quickly find one specific.
      </p>
      <BlogSearchBar tagList={tagList} displayModes={["grid", "table"]} />
      {user?.uid == import.meta.env.VITE_ADMIN_UID ? <NewPostDialog /> : null}
    </>
  );
}
