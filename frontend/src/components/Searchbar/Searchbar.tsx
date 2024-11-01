import { useState } from "react";

export const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigateSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `/project2/search?q=${encodeURIComponent(searchQuery)}`;
  };
  return (
    <div className="flex flex-col items-center justify-center pt-10 ">
      <form onSubmit={navigateSearch} className="max-w-xs">
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
      <div className="flex flex-col bg-gray-200 dark:bg-zinc-900 mt-5 rounded-xl w-full max-w-xs p-2">
        <h1 className="m-auto text-xl">Who to follow</h1><hr/>
        <div className="p-2 flex flex-col gap-2">
            <p>Someone</p>
            <p>Someone</p>
            <p>Someone</p>
        </div>
      </div>
    </div>
  );
};
