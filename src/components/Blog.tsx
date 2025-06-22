import BlogSearchBar from "./BlogSearchBar";

export default function Blog() {
  //   const [postList, setPostList] = useState([]);
  const tagList = ["python", "pym4b", "dynamo"];

  return (
    <>
      <h1>Blog</h1>
      <p>
        Welcome to the blog page, find below the whole list of posts and use the custom function
        below to quickly find one specific.
      </p>
      <BlogSearchBar tagList={tagList} displayModes={["grid", "table"]} />
    </>
  );
}
