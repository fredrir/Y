import BackButton from "@/components/BackButton";
import Divider from "@/components/ui/Divider";
import { UserType } from "@/lib/types";
import { GET_USERS } from "@/queries/user";
import { NetworkStatus, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProfileCard from "@/components/ProfileCard";

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserType[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, error, fetchMore, networkStatus } = useQuery<{
    getUsers: UserType[];
  }>(GET_USERS, {
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data && data.getUsers && page === 1) {
      setUsers(data.getUsers);
      setHasMore(data.getUsers.length > 0);
    }
  }, [data, page]);

  const loadMoreUsers = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      const nextPage = page + 1;
      const { data: fetchMoreData } = await fetchMore({
        variables: { page: nextPage },
      });

      if (fetchMoreData?.getUsers) {
        setUsers((prevUsers) => [...prevUsers, ...fetchMoreData.getUsers]);
        setHasMore(fetchMoreData.getUsers.length > 0);
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      toast.error(`Failed to load more users: ${(error as Error).message}`);
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
        loadMoreUsers();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreUsers, hasMore, networkStatus]);

  if (loading && networkStatus === 1) {
    return <p className="mt-4 text-center">Loading users...</p>;
  }

  if (error) {
    return (
      <p className="mt-4 text-center text-red-500">
        Error loading users: {error.message}
      </p>
    );
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-screen-xl px-5">
      <BackButton />
      <main className="flex w-full flex-col items-center justify-center">
        <h1 className="my-4 text-3xl font-bold">All users</h1>
        <Divider />
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {users.map((user) => (
            <ProfileCard user={user} key={user.id} large={true} />
          ))}
        </div>

        {loading && networkStatus === 3 && (
          <p className="mt-4 text-center">Loading more users...</p>
        )}
        {!hasMore && (
          <p className="mt-4 text-center text-gray-500">
            You've reached the end of the users.
          </p>
        )}
        {users.length === 0 && !loading && (
          <p className="mt-4 text-center text-gray-500">No users available</p>
        )}
      </main>
    </div>
  );
};

export default UsersPage;