import React from "react";
import Button from "./Button";
import { IoMdCloseCircle } from "react-icons/io";
import { type User, type UserFormModalProps } from "../types";
import { useAppContext } from "../hooks/useAppContext";

const UserFormModal = ({
  formData,
  setOpenModal,
  setFormData,
}: UserFormModalProps) => {
  const { setUserData } = useAppContext();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      ...formData,
      id: Math.floor(Math.random() * 100),
    };

    setUserData((prevData) => [...prevData, newUser]);
    setOpenModal(false);
    setFormData({
      id: 0,
      name: "",
      email: "",
      status: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="relative mx-5 w-full rounded-lg bg-white p-6 lg:w-1/3">
        <Button
          type="button"
          label="dismiss"
          onClick={() => setOpenModal(false)}
        >
          <IoMdCloseCircle className="h-11 w-11 transition-colors duration-300 lg:hover:text-red-600" />
        </Button>
        <h2 className="mb-4 text-center text-xl font-bold">Add User</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded border p-2"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded border p-2"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status:</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={handleFormChange}
                />
                <span className="ml-2">Active</span>
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === "inactive"}
                  onChange={handleFormChange}
                />
                <span className="ml-2">Inactive</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="expired"
                  checked={formData.status === "expired"}
                  onChange={handleFormChange}
                />
                <span className="ml-2">Expired</span>
              </label>
            </div>
          </div>
          <Button type="submit" label="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
