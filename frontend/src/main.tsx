import HomePage from "@/App.tsx";
import { AuthProvider } from "@/components/AuthContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar.tsx";
import "@/globals.css";
import { client } from "@/lib/apolloClient";
import PostPage from "@/pages/PostPage.tsx";
import Profile from "@/pages/Profile";
import SearchPage from "@/pages/Search.tsx";
import UserPage from "@/pages/UserPage";
import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Searchbar } from "./components/Searchbar/Searchbar";

const router = createBrowserRouter([
  {
    path: "/project2",
    element: <HomePage />,
  },
  {
    path: "/project2/user/:username",
    element: <Profile />,
  },
  {
    path: "/project2/user",
    element: <UserPage />,
  },
  {
    path: "/project2/search/",
    element: <SearchPage />,
  },
  {
    path: "/project2/post/:id",
    element: <PostPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <Toaster />
        {/* Small screen */}
        <div className="flex flex-col w-full bg-gray-100 dark:bg-gray-800 sm:hidden">
          <Navbar />
          <div className="mb-4 flex-grow flex items-start">
            <Sidebar />
            <RouterProvider router={router} />
          </div>
          <Footer />
        </div>
        {/* Medium screen */}
        <div className="hidden sm:flex lg:hidden flex-col w-full bg-gray-100 dark:bg-gray-800">
          <Navbar />
          <div className="mb-4 flex w-full">
            <div className="w-1/6">
              <Sidebar />
            </div>
            <div className="flex flex-grow justify-center items-center left-1/6 w-2/6 m-auto">
              <RouterProvider router={router} />
            </div>
          </div>
          <Footer />
        </div>
        {/* Large screen */}
        <div className="hidden lg:flex flex-col w-full bg-gray-100 dark:bg-gray-800 min-h-screen">
          <div className="mb-4 flex w-full flex-grow">
            <div className="w-1/4">
              <Sidebar />
            </div>
            <div className="h-max w-2/4">
              <RouterProvider router={router} />
            </div>
            <div className="w-1/4">
              <Searchbar />
            </div>
          </div>
          <div className=" ">
            <Footer/>
          </div>
        </div>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
);
