import { useState } from "react";

export enum SortOrder {
  Ascending = "asc",
  Descending = "desc",
}

export const useSorting = () => {
  const [sortOrder, setSortOrder] = useState(SortOrder.Ascending);

  const toggleSortOrder = () =>
    setSortOrder((prevOrder) =>
      prevOrder === SortOrder.Ascending
        ? SortOrder.Descending
        : SortOrder.Ascending,
    );
  return { sortOrder, toggleSortOrder };
};
