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

export type UserType = {
  username: string;
  postIds: string[];
  likedPostIds: string[];
  commentIds: string[];
}

