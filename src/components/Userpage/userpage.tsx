import { useEffect, useState } from "react";
import { mockData, commentsMock, userMock } from "../../lib/mockupData";
import { PostType, CommentType } from "../../lib/types";

export const Userpage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [likedPosts, setLikedPosts] = useState<PostType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    setPosts([]);
  });

  useEffect(() => {
    setLikedPosts([]);
  });

  useEffect(() => {
    setComments([]);
  });

  return (
    <div>
      <div> {/* Header  */}
        <h1>{userMock.username}</h1>
      </div>
      {/* Body  */}
      <div>
        {posts.map((post) => {
          return (
            <div>
              <p>{post.body}</p>
              <p>{post.user}</p>
              <p>{post.likedBy?.users}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
