import { useAuth } from "@/components/AuthContext";
import CreatePostField from "@/components/CreatePostField";
import FollowButton from "@/components/FollowButton";
import Post from "@/components/Post/Post";
import Avatar from "@/components/Profile/Avatar";
import Divider from "@/components/ui/Divider";
import { PostType, UserType } from "@/lib/types";
import { CREATE_POST, GET_POSTS } from "@/queries/posts";
import { GET_USERS } from "@/queries/user";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { Users } from "lucide-react";

const PAGE_SIZE = 10;

const HomePage = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [postBody, setPostBody] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const { data, loading, error, fetchMore, networkStatus } = useQuery<{
    getPosts: PostType[];
  }>(GET_POSTS, {
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const { data: usersData, error: usersError } = useQuery<{
    getUsers: UserType[];
  }>(GET_USERS, {
    variables: { page: 1 },
  });

  const [createPost, { loading: createLoading }] = useMutation<
    { createPost: PostType },
    { body: string; file: File | null }
  >(CREATE_POST, {
    context: {
      headers: {
        "x-apollo-operation-name": "createPost",
      },
    },
    onError: (err) => {
      console.error("Error creating post:", err);
      toast.error(`Error adding post: ${err.message}`);
    },
    onCompleted: () => {
      setPostBody("");
      setFile(null);
      toast.success("Post added successfully!");
    },
    refetchQueries: [{ query: GET_POSTS, variables: { page: 1 } }],
  });

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (postBody.trim() === "" && file === null) {
      toast.error("Post content cannot be empty.");
      return;
    }

    try {
      await createPost({
        variables: {
          body: postBody,
          file: file,
        },
      });
    } catch (error) {
      toast.error(`Error adding post: ${(error as Error).message}`);
    }
  };

  // Infinite scroll to load more posts
  const loadMorePosts = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      const { data: fetchMoreData } = await fetchMore({
        variables: { page: page + 1 },
      });

      if (fetchMoreData?.getPosts) {
        if (fetchMoreData.getPosts.length < PAGE_SIZE) {
          setHasMore(false);
        }
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      toast.error(`Failed to load more posts: ${(error as Error).message}`);
    }
  }, [fetchMore, hasMore, loading, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        networkStatus !== NetworkStatus.fetchMore &&
        hasMore
      ) {
        loadMorePosts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, hasMore, networkStatus, loadMorePosts]);

  if (networkStatus === NetworkStatus.loading)
    return <p className="mt-4 text-center">Loading...</p>;

  if (error || usersError)
    return (
      <p className="mt-4 text-center text-red-500">
        Error loading posts:{" "}
        {(error?.message ?? usersError?.message) || "Unknown error"}
      </p>
    );

  return (
    <div className="max-w-screen-3xl mx-auto flex w-full justify-center px-5 py-5 lg:justify-evenly lg:gap-4">
      <main className="w-fit justify-self-center">
        <div className="w-full max-w-xl">
          <form
            className="flex w-full items-center gap-2"
            onSubmit={handleAddPost}
          >
            <CreatePostField
              placeholder="What's on your mind?"
              value={postBody}
              setValue={setPostBody}
              file={file}
              setFile={setFile}
              loading={createLoading}
              className={
                postBody && user
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "cursor-not-allowed bg-gray-400 dark:bg-gray-600"
              }
            />
          </form>
        </div>
        <Divider />
        <div className="flex flex-col gap-4">
          {data?.getPosts.map((post) => <Post key={post.id} post={post} />)}
        </div>

        {!hasMore && (
          <p className="mt-4 justify-self-center text-gray-500 dark:text-gray-400">
            You've reached the end of the posts.
          </p>
        )}

        {!loading && data?.getPosts.length === 0 && (
          <p className="mt-4">No posts available.</p>
        )}
      </main>
    </div>
  );
};

export default HomePage;
