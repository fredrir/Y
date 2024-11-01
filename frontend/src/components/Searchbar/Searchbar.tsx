import { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_ALL } from "@/queries/search";
import Post from "@/components/Post/Post";
import ProfileCard from "@/components/ProfileCard";
import { PostType, UserType } from "@/lib/types";
import { FilterIcon } from "lucide-react";

export const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "post" | "user">("all");

  const { data, loading, error } = useQuery<{ searchAll: (PostType | UserType)[] }>(
    SEARCH_ALL,
    {
      variables: { query: searchQuery },
      skip: !searchQuery,
    },
  );

  const seatchResult = () => {
    if (!searchQuery) return null;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const filteredResults = data?.searchAll.filter((item) => {
      if (filterType === "post") return item.__typename === "Post";
      if (filterType === "user") return item.__typename === "User";
      return true;
    }) || [];

    return (
      <div className="flex flex-col bg-gray-200 dark:bg-zinc-900 mt-5 rounded-xl w-full max-w-xs p-2">
        <h1 className="m-auto text-xl">Search results for: {searchQuery}</h1>
        <div className="mb-4 flex items-center justify-center gap-2 m-2">
          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as "all" | "post" | "user")
            }
            className="rounded border border-gray-300 bg-white p-2 outline-none dark:bg-gray-800"
          >
            <option value="all">All</option>
            <option value="post">Posts</option>
            <option value="user">Users</option>
          </select>
          <FilterIcon className="text-gray-800 dark:text-gray-200" />
        </div>
        <div className="p-2 flex flex-col gap-2">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) =>
              item.__typename === "Post" ? (
                <Post key={item.id} post={item as PostType} />
              ) : (
                <ProfileCard key={item.id} user={item as UserType} />
              )
            )
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <form onSubmit={(e) => e.preventDefault()} className="max-w-xs">
        <input
          type="search"
          id="search"
          maxLength={40}
          placeholder="Search here..."
          className="w-full rounded-md bg-gray-200 p-2 outline-none dark:bg-zinc-900"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      {seatchResult()}
    </div>
  );
};
