import { PostType } from "./types";
import { CommentType } from "./types";

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

export const usersMock = [
  {
    username: "mock user1",
    postIds: ["1"],
    likedPostIds: ["1", "2"],
    commentIds: ["1", "2"],
  },
  {
    username: "mock user2",
    postIds: ["2"],
    likedPostIds: ["1"],
    commentIds: ["1", "2"],
  },
  {
    username: "mock user",
    postIds: ["3"],
    likedPostIds: ["1", "2"],
    commentIds: ["1", "2"],
  },
];
