"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useLogin } from "@/component/api/querry/authQuerry";

const loginSchema = z.object({
  username: z.string().min(2, "User Name must be at least 2 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login, status } = useLogin();
  const isLoading = status === "pending";

  const onSubmit = (data: LoginFormInputs) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-[#00070B]">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username" className="block text-sm text-[#00070B]">
              User Name
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className={`w-full p-2 border rounded-lg focus:outline-none ${
                errors.username ? "border-red-500" : "border-secondary-300"
              } focus:border-secondary-500`}
              placeholder="Enter your user name"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-[#00070B]">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={`w-full p-2 border rounded-lg focus:outline-none ${
                errors.password ? "border-red-500" : "border-primary-300"
              } focus:border-primary-500`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 bg-secondary-100 text-white rounded-lg hover:bg-secondary-600 transition duration-200 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <span className="animate-spin inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"></span>
                <span>Loading...</span>
              </div>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-secondary-700">
          Don’t have an account?
          <Link
            href="/QA-task/sign-up"
            className="text-secondary-100 underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
