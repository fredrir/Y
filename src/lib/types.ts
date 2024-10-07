export type PostType = {
  id: string;
  body: string;
  userId: string;
  likedBy?: {
    userIds: string[];
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

