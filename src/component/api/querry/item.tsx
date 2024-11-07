import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import Item_API from "../apis/items";
import { Item, ItemUpdate, ItemValue } from "@/component/type";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function getItem() {
  const { data, error, isLoading, refetch }: UseQueryResult<Item[], Error> =
    useQuery<Item[], Error>({
      queryKey: ["item"],
      queryFn: async (): Promise<Item[]> => {
        const result = await Item_API.getItems();
        return result;
      },
    });

  return { data, error, isLoading, refetch };
}

export function useCreateItem() {
  return useMutation({
    mutationFn: async (data: ItemValue) => {
      const response = await Item_API.createItem(data);
      return response;
    },
    onSuccess: () => {
      toast.success("Item created successfully!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        style: { backgroundColor: "white", color: "#6623d1" },
      });
      window.location.href = "/QA-task/item";
    },
    onError: (error: any) => {
      toast.error("Item creation failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        style: { backgroundColor: "#F04438", color: "white" },
      });
      console.error("Creation failed:", error);
    },
  });
}

export const useUpdateItem = (id?: string) => {
  return useMutation({
    mutationFn: async (data: ItemUpdate) => {
      if (!id) {
        throw new Error("ID is required for updating the item");
      }

      const response = await Item_API.updateItems(id, data);
      return response;
    },
    onSuccess: () => {
      toast.success("Item updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        style: { backgroundColor: "white", color: "#6623d1" },
      });
    },
    onError: (error: any) => {
      toast.error("Item update failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        style: { backgroundColor: "#F04438", color: "white" },
      });
      console.error("Update failed:", error);
    },
  });
};

export function deleteItem(refetch?: () => void) {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await Item_API.deleteItems(id);
      return response;
    },
    onSuccess: (variables) => {
      toast.success(`Item with ID ${variables} deleted successfully!`, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        style: { backgroundColor: "white", color: "#6623d1" },
      });
      if (refetch) {
        refetch();
      }
    },
    onError: (error: any) => {
      toast.error("Item deletion failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        style: { backgroundColor: "#F04438", color: "white" },
      });
      console.error("Deletion failed:", error);
    },
  });
}
