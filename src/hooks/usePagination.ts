import { useState, useMemo } from "react";
import _ from "lodash";
import { User } from "../types";
import { SortOrder } from "./useSorting";

export const usePagination = (
  data: User[],
  chunkSize: number,
  sortOrder: SortOrder,
) => {
  const [currentPage, setCurrentPage] = useState(0);

  const chunkedData = useMemo(() => {
    if (data) {
      data = data.sort((a, b) => {
        if (sortOrder === SortOrder.Ascending) {
          return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
      });
    }

    return _.chunk(data, chunkSize);
  }, [data, chunkSize, sortOrder]);

  const nextPage = () => {
    if (currentPage < chunkedData.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return { chunkedData, currentPage, nextPage, prevPage, setCurrentPage };
};
