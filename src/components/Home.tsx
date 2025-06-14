import ObjectToTable from "./ObjectToTable";

export default function Home() {
  const posts = [{ title: "qwerty", votes: 10, thumb: "/thumbs/post1.png" }];

  return (
    <>
      <h1>Macro4BIM</h1>
      <h2>blog home page</h2>
      <h3>post list</h3>
      <ObjectToTable obj={posts} />
    </>
  );
}
