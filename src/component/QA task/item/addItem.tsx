"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AddItemProps, ItemUpdate, ItemValue } from "@/component/type";
import { useCreateItem, useUpdateItem } from "@/component/api/querry/item";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

const AddItem = ({ selectedItem, closeModal, refetch }: AddItemProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ItemValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: selectedItem?.name || "",
      description: selectedItem?.description || "",
    },
  });

  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem(selectedItem?.id);

  const onSubmit = (data: ItemValue) => {
    if (selectedItem) {
      const updateData: ItemUpdate = { ...data, id: selectedItem.id };
      updateMutation.mutate(updateData, {
        onSuccess: () => {
          if (refetch) {
            refetch();
          }
          closeModal?.();
        },
      });
    } else {
      createMutation.mutate(data);
    }

    reset();
  };

  useEffect(() => {
    if (selectedItem) {
      reset({ name: selectedItem.name, description: selectedItem.description });
    }
  }, [selectedItem, reset]);

  const handleBackClick = () => {
    console.log("triggered");
    router.push("/QA-task/item/");
  };

  const handleCancelClick = () => {
    closeModal?.();
  };
  const isLoading =
    createMutation.status === "pending" || updateMutation.status === "pending";

  return (
    <div
      className={`p-4 bg-white text-secondary-900 ${selectedItem ? "" : ""}`}
    >
      <h1 className="text-2xl font-bold mb-4">
        {selectedItem ? "Update Item" : "Create Item"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Name:</label>
          <input
            data-cy="name"
            type="text"
            {...register("name")}
            className="p-2 border rounded w-full text-secondary-900"
          />
          {errors.name && (
            <p data-cy="name-error" className="text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            data-cy="description"
            {...register("description")}
            className="p-2 border rounded w-full text-secondary-900"
          />
          {errors.description && (
            <p data-cy="description-error" className="text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="flex space-x-4">
          {selectedItem ? (
            <button
              data-cy="cancel-button"
              type="button"
              onClick={handleCancelClick}
              className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          ) : (
            <button
              data-cy="back-button"
              type="button"
              onClick={handleBackClick}
              className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition"
            >
              Back
            </button>
          )}
          <button
            data-cy="submit-button"
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 text-white ${
              isLoading ? "bg-gray-400" : "bg-blue-500"
            } rounded hover:bg-blue-600 transition`}
          >
            {isLoading
              ? "Processing..."
              : selectedItem
              ? "Update Item"
              : "Create Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
