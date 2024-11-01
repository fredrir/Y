import { Cog6ToothIcon as SettingsIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import Avatar from "../Avatar";
import { Switch } from "@/components/ui/switch";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export const Sidebar = () => {
  const { logout, user } = useAuth();

  const login = () => {
    window.location.href = "/project2/user";
  };

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedTheme = window.localStorage.getItem("theme");
      return storedTheme ? storedTheme : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");

    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="fixed top-0 z-20 flex flex-grow min-w-72 flex-col gap-16 pl-3 h-full">
      <a
        href="/"
        className="relative m-2 mb-5 mt-1 h-20 w-20 items-center justify-center"
      >
        <div className="absolute left-6 top-1 flex h-16 w-16 items-center justify-center rounded-lg border border-gray-950/80 bg-gray-100/80 dark:border-gray-100/80 dark:bg-gray-950/80">
          <span className="text-3xl font-bold">Y</span>
        </div>
        <div className="absolute left-1 top-6 flex h-16 w-16 items-center justify-center rounded-lg border border-gray-950/80 bg-gray-100/80 dark:border-gray-100/80 dark:bg-gray-950/80">
          <span className="text-3xl font-bold">Y</span>
        </div>
      </a>
      <div className="hidden sm:flex sm:flex-col sm:gap-5 sm:flex-grow">
        {/* <ThemeToggle /> */}
        {user && (
            <div className="flex items-center gap-2">
            <Avatar username={user.username} navbar />
            <h3>@{user.username}</h3>
          </div>
        )}
        <Switch
          onCheckedChange={toggleTheme}
          defaultChecked={theme === "dark"}
          checkedIcon={<SunIcon className="text-orange-400" />}
          uncheckedIcon={<MoonIcon className="text-slate-700" />}
        />
      </div>
      <div className="hidden sm:bottom-3 sm:block sm:items-center sm:absolute">
        {user ? (
          <button
            onClick={logout}
            className="flex items-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Settings <SettingsIcon className="h-5 w-5" />
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
