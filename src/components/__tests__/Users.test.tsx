import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Users } from "../Users";
import { AppContextProvider } from "../../utils/AppContextProvider";

const queryClient = new QueryClient();

jest.mock("../../getUsers", () => ({
  getUsers: jest.fn(() => [
    {
      id: 1,
      name: "Ironman",
      email: "tony@starkindustries.com",
      status: "active",
    },
    { id: 2, name: "Hulk", email: "bruce@banner.com", status: "active" },
  ]),
}));

const renderComponent = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>{component}</AppContextProvider>
    </QueryClientProvider>,
  );
};

describe("Users", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should display users once loaded", async () => {
    renderComponent(<Users />);

    await waitFor(() => {
      expect(screen.getByTestId("user-name-1")).toHaveTextContent("Ironman");
      expect(screen.getByTestId("user-name-2")).toHaveTextContent("Hulk");
    });
  });
});
