import FormField from "@/form/FormField";
import { useAuth } from "@/hooks/AuthContext";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "@/queries/user";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  view: "login" | "register";
}
const LoginForm = ({ view }: LoginFormProps) => {
  const currentView = view ?? "login";
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ confirmPassword?: string }>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginMutation, { loading: loginLoading }] =
    useMutation(LOGIN_MUTATION);
  const [registerMutation, { loading: registerLoading }] =
    useMutation(REGISTER_MUTATION);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginMutation({
        variables: {
          username: formData.username,
          password: formData.password,
        },
      });
      if (data.login) {
        login(data.login);
        toast.success("Logged in successfully!");
        navigate(`/`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error logging in: ${error.message}`);
      } else {
        toast.error("Error logging in");
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const { data } = await registerMutation({
        variables: {
          username: formData.username.trim(),
          password: formData.password,
        },
      });
      if (data.register) {
        login(data.register); // Update AuthContext
        toast.success("Registered and logged in successfully!");
        navigate(`/user/${formData.username}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error registering: ${error.message}`);
      } else {
        toast.error("Error registering");
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 self-center">
      <h1 className="w-fit bg-gradient-to-r from-indigo-950 to-indigo-700 bg-clip-text text-4xl font-extrabold text-transparent dark:from-indigo-200 dark:to-indigo-500 sm:text-6xl md:text-7xl">
        Welcome to Y
      </h1>
      <div className="flex w-full justify-center">
        <div className="w-96 rounded-lg bg-gray-50 p-8 shadow-md dark:bg-gray-900">
          <h2 className="mb-6 text-center text-2xl font-bold text-black dark:text-white">
            {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
          </h2>
          <form
            onSubmit={currentView === "login" ? handleLogin : handleRegister}
            className="space-y-4"
          >
            <FormField
              label="Username"
              id="username"
              autocomplete="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
            />
            <FormField
              label="Password"
              id="password"
              autocomplete="current-password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {currentView === "register" && (
              <FormField
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            <button
              type="submit"
              disabled={loginLoading || registerLoading}
              className={`flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                (loginLoading || registerLoading) &&
                "cursor-not-allowed opacity-50"
              }`}
            >
              {currentView === "login"
                ? loginLoading
                  ? "Logging in..."
                  : "Login"
                : registerLoading
                  ? "Registering..."
                  : "Register"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                window.location.href =
                  currentView === "login" ? "/register" : "/login";
              }}
              className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {currentView === "login"
                ? "Need an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
