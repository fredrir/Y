// import { Cog6ToothIcon as SettingsIcon } from "@heroicons/react/24/outline";
// import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import Avatar from "@/components/Profile/Avatar";
import ThemeToggle from "@/components/Navbar/ThemeToggle";
// import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export const Sidebar = () => {
  const { logout, user } = useAuth();

  const login = () => {
    window.location.href = "/project2/login";
  };

  //   const [theme, setTheme] = useState(() => {
  //     if (typeof window !== "undefined" && window.localStorage) {
  //       const storedTheme = window.localStorage.getItem("theme");
  //       return storedTheme ? storedTheme : "light";
  //     }
  //     return "light";
  //   });

  //   useEffect(() => {
  //     const root = document.documentElement;
  //     root.classList.toggle("dark", theme === "dark");

  //     if (typeof window !== "undefined" && window.localStorage) {
  //       window.localStorage.setItem("theme", theme);
  //     }
  //   }, [theme]);

  //   const toggleTheme = () => {
  //     setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  //   };

  return (
    <div className="fixed top-0 z-10 flex h-full flex-grow flex-col gap-16 pl-3">
      <a
        href="/"
        className="xs:block relative m-2 mb-5 mt-1 hidden h-20 w-20 items-center justify-center"
      >
        <div className="absolute left-5 top-1 flex h-16 w-16 items-center justify-center rounded-lg border border-gray-950/80 bg-gray-100/80 dark:border-gray-100/80 dark:bg-gray-950/80">
          <span className="text-3xl font-bold">Y</span>
        </div>
        <div className="absolute left-1 top-5 flex h-16 w-16 items-center justify-center rounded-lg border border-gray-950/80 bg-gray-100/80 dark:border-gray-100/80 dark:bg-gray-950/80">
          <span className="text-3xl font-bold">Y</span>
        </div>
      </a>
      <div className="hidden sm:flex sm:flex-grow sm:flex-col sm:gap-5">
        <ThemeToggle type={1} />
        {user && (
          <div className="flex items-center gap-2">
            <Avatar username={user.username} />
            <h3>@{user.username}</h3>
          </div>
        )}
        {/* <Switch
          onCheckedChange={toggleTheme}
          defaultChecked={theme === "dark"}
          checkedIcon={<SunIcon className="text-orange-400" />}
          uncheckedIcon={<MoonIcon className="text-slate-700" />}
        /> */}
      </div>
      <div className="hidden sm:absolute sm:bottom-3 sm:block sm:items-center">
        {user ? (
          <button
            onClick={logout}
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Log Out
            {/* <button
            onClick={logout}
            className="flex items-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Settings <SettingsIcon className="h-5 w-5" /> */}
          </button>
        ) : (
          <button
            onClick={login}
            className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
};
