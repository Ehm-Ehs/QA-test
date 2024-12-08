"use client";
import React, { useState } from "react";
import Link from "next/link";
import { deleteItem, getItem } from "@/component/api/querry/item";
import { Item } from "@/component/type";
import Modal from "../modal";
import AddItem from "./addItem";
import { useRouter } from "next/navigation";
import Auth_API from "@/component/api/apis/auth";

const AllItem = () => {
  const router = useRouter();
  const { data: items, error, isLoading, refetch } = getItem();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<"update" | "delete" | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);

  const openModal = (type: "update" | "delete", item: Item) => {
    setModalContent(type);
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
    setSelectedItem(undefined);
  };

  const { mutate: deleteMutate } = deleteItem(() => refetch());
  const handleDelete = (id: string) => {
    deleteMutate(id);
    closeModal();
  };
  const handleLogout = () => {
    Auth_API.logout();

    router.push("/");
  };

  if (isLoading) {
    return (
      <div data-cy="loading-indicator" className="loading-container">
        <p className="loading-animation">QA Test Loading ...</p>
      </div>
    );
  }

  if (error)
    return <p data-cy="error-message">Error fetching items: {error.message}</p>;

  return (
    <div className="bg-white text-secondary-900 h-screen p-10 relative">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Items</h1>
        <Link
          href="/QA-task/item/create-item"
          className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create New Item
        </Link>
      </div>

      {items && items.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {items.map((item: Item) => (
            <div
              data-cy="item"
              key={item.id}
              className="flex flex-col p-4 border rounded shadow hover:shadow-lg transition w-full sm:w-1/2 lg:w-1/3"
            >
              <h2 data-cy="item-name" className="font-semibold text-lg">
                {item.name}
              </h2>
              <p data-cy="item-description">{item.description}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => openModal("update", item)}
                  className="inline-block px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Update
                </button>
                <button
                  onClick={() => openModal("delete", item)}
                  className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500 mt-8">
          No items found. Please create a new item.
        </p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent === "delete" && (
          <div>
            <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
            <p>Are you sure you want to delete {selectedItem?.name}?</p>
            <button
              onClick={() => selectedItem && handleDelete(selectedItem.id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Confirm
            </button>
          </div>
        )}
        {modalContent === "update" && selectedItem && (
          <AddItem
            selectedItem={selectedItem}
            closeModal={closeModal}
            refetch={refetch}
          />
        )}
      </Modal>

      <button
        onClick={handleLogout}
        className="absolute bottom-4 right-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Log out
      </button>
    </div>
  );
};

export default AllItem;
