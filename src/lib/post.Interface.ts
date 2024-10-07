export interface Post {
  id: string;
  body: string;
  userId: string;
  likedBy?: {
    users: string[];
  };
}

export interface Comment extends Post {
  parentID: string;
}
