export interface IComment {
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: Date;
}

export class Comment implements IComment {
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: Date;

  id: string;

  constructor(data: IComment, id = "") {
    this.authorName = data.authorName;
    this.authorEmail = data.authorEmail;
    this.content = data.content;
    this.createdAt = new Date();

    this.id = id;
  }
}
