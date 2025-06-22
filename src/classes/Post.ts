import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Comment, IComment } from "./Comment";

interface IPost {
  title: string;
  content: string;
  tags: string[];
  createdAt?: Date;
}

export class Post implements IPost {
  title: string;
  content: string;
  tags: string[];
  createdAt?: Date;

  // class specific
  slug: string;
  votes: number = 0;
  views: number = 0;
  comments: Comment[] = [];

  constructor(data: IPost) {
    this.title = data.title;
    this.content = data.content;
    this.tags = data.tags;
    this.createdAt = data.createdAt || new Date();

    this.slug = data.title.trim().toLowerCase().replace(/\W/g, "-");
    this.votes = 0;
    this.views = 0;
    this.comments = [];

    setDoc(doc(db, "posts", this.slug), { ...this });
  }

  async addComment(commentData: IComment) {
    const newCommentDoc = await addDoc(collection(db, "posts", this.slug, "comments"), commentData);
    const comment = new Comment(commentData, newCommentDoc.id);
    this.comments.push(comment);
  }
}
