import { useContext, useEffect } from "react";
import ObjectToTable from "./ObjectToTable";
import { PostsContext } from "../App";

export default function Home() {
  const postList = useContext(PostsContext);

  console.log(postList);

  return (
    <>
      <h1>Macro4BIM</h1>
      <h2>blog home page</h2>
      <h3>post list</h3>
      <ObjectToTable obj={postList} />
    </>
  );
}
