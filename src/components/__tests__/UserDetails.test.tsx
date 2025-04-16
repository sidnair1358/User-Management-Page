import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import UserDetails from "../UserDetails";
import { User } from "../../types";

const mockSetUserData = jest.fn();

jest.mock("../../hooks/useAppContext", () => ({
  useAppContext: jest.fn(() => ({
    userData: [
      { id: 1, name: "Thor", email: "thor@odinson.com", status: "active" },
      { id: 2, name: "Hulk", email: "bruce@banner.com", status: "active" },
    ],
    setUserData: mockSetUserData,
  })),
}));

describe("UserDetails", () => {
  it("Should call handleDelete and updates userData when delete button is clicked", async () => {
    const user: User = {
      id: 1,
      name: "Thor",
      email: "thor@odinson.com",
      status: "active",
    };

    const { getByLabelText } = render(<UserDetails user={user} />);

    const deleteButton = getByLabelText("Delete User");
    expect(deleteButton).toBeVisible();

    fireEvent.click(deleteButton);

    expect(mockSetUserData).toHaveBeenCalledWith([
      { id: 2, name: "Hulk", email: "bruce@banner.com", status: "active" },
    ]);
  });
});
