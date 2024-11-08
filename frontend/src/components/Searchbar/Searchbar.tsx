import { useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";
import { UserType } from "@/lib/types";
import { GET_USERS } from "@/queries/user";
import Avatar from "@/components/Profile/Avatar";
import { useAuth } from "@/components/AuthContext";
import FollowButton from "@/components/FollowButton";
// import { useQuery } from "@apollo/client";
// import { SEARCH_POSTS } from "@/queries/search";
// import Post from "@/components/Post/Post";
// import ProfileCard from "@/components/ProfileCard";
// import { PostType, UserType } from "@/lib/types";
// import { FilterIcon } from "lucide-react";

export const Searchbar = () => {
  const params = new URLSearchParams(location.search);
  const currentQuery = params.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(currentQuery);
  const { user } = useAuth();
//   const [filterType, setFilterType] = useState<"all" | "post" | "user">("all");


  const navigateSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    window.location.href = `/project2/search?q=${encodeURIComponent(searchQuery)}`;
  };

//   const { data, loading, error } = useQuery<{
//     searchAll: (PostType | UserType)[];
//   }>(SEARCH_POSTS, {
//     variables: { query: searchQuery },
//     skip: !searchQuery,
//   });

//   const searchResult = () => {
//     if (!searchQuery) return null;
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;

//     const filteredResults =
//       data?.searchAll.filter((item) => {
//         if (filterType === "post") return item.__typename === "Post";
//         if (filterType === "user") return item.__typename === "User";
//         return true;
//       }) || [];

//     return (
//       <div className="mt-5 flex w-full max-w-xs flex-col rounded-xl bg-gray-200 p-2 dark:bg-zinc-900">
//         <h1 className="m-auto text-xl">Search results for: {searchQuery}</h1>
//         <div className="m-2 mb-4 flex items-center justify-center gap-2">
//           <select
//             value={filterType}
//             onChange={(e) =>
//               setFilterType(e.target.value as "all" | "post" | "user")
//             }
//             className="rounded border border-gray-300 bg-white p-2 outline-none dark:bg-gray-800"
//           >
//             <option value="all">All</option>
//             <option value="post">Posts</option>
//             <option value="user">Users</option>
//           </select>
//           <FilterIcon className="text-gray-800 dark:text-gray-200" />
//         </div>
//         <div className="flex flex-col gap-2 p-2">
//           {filteredResults.length > 0 ? (
//             filteredResults.map((item) =>
//               item.__typename === "Post" ? (
//                 <Post key={item.id} post={item as PostType} />
//               ) : (
//                 <ProfileCard key={item.id} user={item as UserType} />
//               ),
//             )
//           ) : (
//             <p>No results found.</p>
//           )}
//         </div>
//       </div>
//     );
//   };

const { data: usersData, error: usersError } = useQuery<{
  getUsers: UserType[];
}>(GET_USERS, {
  variables: { page: 1, limit: 1 },
});

  return (
    <div className="sticky w-full h-screen bottom-0 overflow-y-scroll p-4">
      {/* <form onSubmit={(e) => e.preventDefault()} className="max-w-xs"> */}
      <form onSubmit={navigateSearch} className="max-w-xs pt-10">
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
      {/* {searchResult()} */}
      <aside className="hidden w-full max-w-64 py-8 lg:flex">
        <div className="flex w-full flex-col items-center gap-5">
          <h1 className="text-3xl">People to follow</h1>
          {usersData?.getUsers.map((recommendedUser) => (
            <a
              key={recommendedUser.id}
              href={`/project2/user/${recommendedUser.username}`}
              className="bg-white-100 flex w-full flex-col items-center gap-2 rounded-lg border px-2 py-6 shadow-lg hover:scale-105 dark:border-gray-700 dark:bg-gray-900/50"
            >
              <div className="flex w-fit flex-row items-center gap-2">
                <Avatar user={recommendedUser} noHref />
                <h1>{recommendedUser.username}</h1>
              </div>
              {user?.username !== recommendedUser.username && (
                <FollowButton targetUsername={recommendedUser.username} />
              )}
            </a>
          ))}
          {/* TODO make a search user page */}
          {/* <a
            href={`/project2/users`}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Users className="mr-2 h-5 w-5" aria-hidden="true" />
            <span>View All Users</span>
          </a> */}
        </div>
      </aside>
    </div>
  );
};
