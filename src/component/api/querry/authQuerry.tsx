import { useMutation } from "@tanstack/react-query";
import Auth_API from "../apis/auth";
import Auth from "../axios/Auth.Module";
import { AuthFormValues } from "@/component/type";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useSignup() {
  return useMutation({
    mutationFn: async (data: AuthFormValues) => {
      const response = await Auth_API.signUp(data);
      Auth.authenticateUser({
        accessToken: response.accessToken,
        data: response.data,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Sign-up successful!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        style: { backgroundColor: "white", color: "#6623d1" },
      });
      window.location.href = "/QA-task/login";
    },
    onError: (error: any) => {
      toast.error("Sign-up failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        style: { backgroundColor: "#F04438", color: "white" },
      });
      console.error("Sign-up failed:", error);
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: AuthFormValues) => {
      const response = await Auth_API.login(data);
      Auth.authenticateUser({
        accessToken: response.accessToken,
        data: response.data,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        style: { backgroundColor: "white", color: "#6623d1" },
      });
      if (Auth.isUserAuthenticated()) {
        window.location.href = "/QA-task/item";
      }
    },
    onError: (error: any) => {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        style: { backgroundColor: "#F04438", color: "white" },
      });
      console.error("Login failed:", error);
    },
  });
}
