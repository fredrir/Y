import { DropdownMenu } from "@/components/Navbar/DropdownMenu";
import { useState } from "react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigateSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `/project2/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <>
      <nav className="fixed z-10 flex h-24 w-full items-center justify-between bg-gray-200/40 px-5 py-5 backdrop-blur-sm dark:bg-gray-950/80">

        <div className="mx-4 flex flex-1 w-dvw items-center justify-center gap-2">
          <form onSubmit={navigateSearch} className="max-w-xs">
            <input
              type="search"
              id="search"
              maxLength={40}
              placeholder="Search here..."
              className="w-full rounded-md bg-gray-100 p-2 outline-none dark:bg-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        <div className="block sm:hidden">
          <DropdownMenu />
        </div>
      </nav>
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
