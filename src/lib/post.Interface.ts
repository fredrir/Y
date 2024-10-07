export type PostType = {
  id: string;
  body: string;
  userId: string;
  likedBy?: {
    users: string[];
  };
}

export type CommentType  = PostType & {
  parentID: string;
}
