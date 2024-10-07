import { useEffect, useState } from "react";
import { PostType } from "../../lib/post.Interface";
import { CommentType } from "../../lib/comment.Interface";

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
        <h1>{User.username}</h1>
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
