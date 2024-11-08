import HomePage from "@/App.tsx";
import { AuthProvider } from "@/components/AuthContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar.tsx";
import "@/globals.css";
import client from "@/lib/apolloClient";
import PostPage from "@/pages/PostPage.tsx";
import Profile from "@/pages/Profile";
import SearchPage from "@/pages/Search.tsx";
import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Searchbar } from "./components/Searchbar/Searchbar";

const router = createBrowserRouter([
  {
    path: "/project2",
    element: <HomePage />,
  },
  {
    path: "/project2/login",
    element: <LoginForm view="login" />,
  },
  {
    path: "/project2/register",
    element: <LoginForm view="register" />,
  },
  {
    path: "/project2/user",
    element: <Profile />,
  },
  {
    path: "/project2/user/:username",
    element: <Profile />,
  },
  {
    path: "/project2/user/:username/:view",
    element: <Profile />,
  },
  {
    path: "/project2/search/",
    element: <SearchPage />,
  },
  {
    path: "/project2/post/:id/:edit?",
    element: <PostPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <Toaster />
        {/* Small screen */}
        <div className="flex w-full flex-col bg-gray-100 dark:bg-gray-800 sm:hidden">
          <Navbar />
          <div className="mb-4 flex flex-grow items-start">
            <Sidebar />
            <RouterProvider router={router} />
          </div>
          <Footer />
        </div>
        {/* Medium screen */}
        <div className="hidden w-full flex-col bg-gray-100 dark:bg-gray-800 sm:flex lg:hidden">
          <Navbar />
          <div className="mb-4 flex w-full">
            <div className="w-1/6">
              <Sidebar />
            </div>
            <div className="left-1/6 m-auto flex w-2/6 flex-grow items-center justify-center">
              <RouterProvider router={router} />
            </div>
          </div>
          <Footer />
        </div>
        {/* Large screen */}
        <div className="hidden min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-800 lg:flex">
          <div className="mb-4 flex w-full flex-grow">
            <div className="w-1/4 sticky top-0 h-screen">
              <Sidebar />
            </div>
            <div className="min-h-screen w-2/4">
              <RouterProvider router={router} />
            </div>
            <div className="w-1/4 sticky top-0 h-screen overflow-y-auto">
              <Searchbar />
            </div>
          </div>
          <div className=" ">
            <Footer />
          </div>
        </div>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
);
