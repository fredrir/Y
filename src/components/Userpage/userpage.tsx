import { useEffect, useState } from "react";
import { Post } from "../../lib/post.Interface";
import { User } from "../../lib/user.Interface";

export const Userpage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts([]);
  });

  useEffect(() => {
    setLikedPosts([]);
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
