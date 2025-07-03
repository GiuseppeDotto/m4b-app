// import { useContext } from "react";
// import ObjectToTable from "./ObjectToTable";
// import { BlogContext } from "../App";
import PostTable from "./PostTable";

export default function Home() {
  // const { posts } = useContext(BlogContext);

  return (
    <>
      <h1>Macro4BIM</h1>
      <h2>blog home page</h2>
      <PostTable />
    </>
  );
}
