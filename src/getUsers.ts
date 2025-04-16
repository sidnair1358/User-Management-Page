import { type User } from "./types";

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(
      "https://tech-interview-api-ultramed.vercel.app/users",
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
}
