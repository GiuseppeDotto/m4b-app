import { Post } from "./Post";

export const samplePostList = [
  new Post({ title: "post1", content: "body post 1, how's life?", tags: ["dev-environment"] }),
  new Post({
    title: "post2",
    content: "body post 2, hope it is more interesting",
    tags: ["dev-environment"],
  }),
  new Post({
    title: "post3",
    content: "body post 3, blablabla",
    tags: ["dev-environment", "wording"],
  }),
];
