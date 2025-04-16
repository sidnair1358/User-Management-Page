import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUsers } from "../getUsers";
import { type User } from "../types";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import { TiUserAdd } from "react-icons/ti";
import { usePagination } from "../hooks/usePagination";
import { useWindowResize } from "../hooks/useWindowResize";
import { useSorting, SortOrder } from "../hooks/useSorting";
import UserDetails from "./UserDetails";
import { useAppContext } from "../hooks/useAppContext";
import UserFormModal from "./UserFormModal";
import Button from "./Button";
import IconButton from "./IconButton";

export const Users = () => {
  const [userInput, setUserInput] = useState("");
  const [paginatedUsers, setPaginatedUsers] = useState<{
    mobile: User[];
    desktop: User[];
  }>({
    mobile: [],
    desktop: [],
  });
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<User>({
    id: 0,
    name: "",
    email: "",
    status: "",
  });

  const { userData, setUserData } = useAppContext();
  const { isLoading, data } = useQuery<User[]>(["users"], getUsers);
  const { chunkSize, isMobile } = useWindowResize();

  useEffect(() => {
    if (data && !userData?.length) {
      setUserData(data);
    }
  }, [data]);

  const { sortOrder, toggleSortOrder } = useSorting();

  const { chunkedData, currentPage, nextPage, prevPage, setCurrentPage } =
    usePagination(userData || [], chunkSize, sortOrder);

  useEffect(() => {
    setCurrentPage(0);
  }, [isMobile]);

  const updatePaginatedUsers = (filteredResults: User[] | null) => {
    const mobileData =
      filteredResults || chunkedData.slice(0, currentPage + 1).flat();

    const desktopData = filteredResults || chunkedData[currentPage];

    setPaginatedUsers({ mobile: mobileData, desktop: desktopData });
  };

  useEffect(() => {
    updatePaginatedUsers(null);
  }, [userData, isMobile, currentPage, sortOrder]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);

    const filteredResults = input
      ? userData.filter((user) =>
          user.name.toLowerCase().includes(input.toLowerCase()),
        )
      : null;

    updatePaginatedUsers(filteredResults);
  };

  const userDisplay = isMobile ? paginatedUsers.mobile : paginatedUsers.desktop;

  return (
    <div className="m-auto h-full w-full lg:w-4/5">
      {isLoading ? (
        <p className="m-auto flex justify-center text-center lg:h-4/5">
          Please wait... Loading results
        </p>
      ) : (
        <div className="flex h-full flex-col px-5 lg:p-5">
          <div className="flex flex-col justify-center py-5">
            <div className="flex items-center justify-center lg:w-full lg:justify-center">
              <div className="relative w-3/5">
                <input
                  type="text"
                  className="h-10 w-full rounded-md border border-slate-300 pl-10"
                  placeholder="Search by name"
                  onChange={handleSearchChange}
                  value={userInput}
                />
                <FaMagnifyingGlass
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                  aria-label="search icon"
                />
              </div>
              <IconButton
                label="Add User"
                type="button"
                onClick={() => setOpenModal(true)}
              >
                <TiUserAdd
                  className="h-11 w-11 text-black transition-colors duration-300 hover:text-green-600"
                  aria-label="Add User"
                />
              </IconButton>
              <IconButton
                label={
                  sortOrder === SortOrder.Ascending
                    ? "Sort Descending"
                    : "Sort Ascending"
                }
                type="button"
                onClick={toggleSortOrder}
              >
                {sortOrder === SortOrder.Ascending ? (
                  <HiSortAscending className="h-11 w-11" />
                ) : (
                  <HiSortDescending className="h-11 w-11" />
                )}
              </IconButton>
            </div>
            <div className="flex h-auto flex-col gap-3 py-5 lg:max-h-[80vh] lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-5 lg:overflow-auto">
              {userDisplay?.length ? (
                userDisplay.map((user, id) => (
                  <UserDetails user={user} key={id} />
                ))
              ) : (
                <p>No user found</p>
              )}
            </div>
            {!isMobile ? (
              <div className="mt-4 flex justify-evenly">
                <Button
                  label="Previous Page"
                  type="button"
                  disabled={currentPage === 0}
                  onClick={prevPage}
                >
                  Previous
                </Button>
                <Button
                  label="Next Page"
                  type="button"
                  disabled={currentPage === chunkedData?.length - 1}
                  onClick={nextPage}
                >
                  Next
                </Button>
              </div>
            ) : (
              <div className="mt-2 flex justify-center">
                <Button label="Show more" type="button" onClick={nextPage}>
                  Show More
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {openModal && (
        <UserFormModal
          formData={formData}
          setOpenModal={setOpenModal}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};
