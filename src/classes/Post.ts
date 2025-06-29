import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { Comment, IComment } from "./Comment";

export interface IPost {
  title: string;
  content: string;
  tags: string[];
  createdAt?: Date;
  slug?: string;
  votes?: number;
  views?: number;
  comments?: Comment[];
}

export class Post implements IPost {
  title: string;
  content: string;
  tags: string[];

  createdAt: Date;
  slug: string;
  votes: number;
  views: number;
  comments: Comment[];

  constructor(data: IPost) {
    this.title = data.title;
    this.content = data.content;
    this.tags = data.tags;
    if (data.createdAt instanceof Timestamp) {
      this.createdAt = data.createdAt.toDate();
    } else if (data.createdAt instanceof Date) {
      this.createdAt = data.createdAt;
    } else {
      this.createdAt = new Date();
    }

    this.slug = data.title.trim().toLowerCase().replace(/\W/g, "-");
    this.votes = data.votes || 0;
    this.views = data.views || 0;
    this.comments = data.comments || [];
  }

  async addToDB() {
    await setDoc(doc(db, "posts", this.slug), { ...this });
    return this;
  }

  async addComment(commentData: IComment) {
    const newCommentDoc = await addDoc(collection(db, "posts", this.slug, "comments"), commentData);
    const comment = new Comment(commentData, newCommentDoc.id);
    this.comments.push(comment);
    return this.comments;
  }
}
