import { PostType } from "./post.Interface";
import { CommentType } from "./post.Interface";

export const mockData: PostType[] = [
  {
    id: "1",
    body: "mock body1",
    userId: "mock user1",
    likedBy: {
      users: ["mock user1", "mock user2"],
    },
  },
  {
    id: "2",
    body: "mock body2",
    userId: "mock user2",
    likedBy: {
      users: ["mock user1"],
    },
  },
  {
    id: "3",
    body: "mock body3",
    userId: "mock user",
    likedBy: {
      users: ["mock user1", "mock user2"],
    },
  },
];

export const commentsMock: CommentType[] = [
  {
    id: "1",
    body: "mock comment",
    userId: "mock user",
    likedBy: {
      users: ["mock user1", "mock user2"],
    },
    parentID: "1",
  },
  {
    id: "2",
    body: "mock comment",
    userId: "mock user",
    likedBy: {
      users: ["mock user1", "mock user2"],
    },
    parentID: "1",
  },
];
