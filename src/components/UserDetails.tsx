import _ from "lodash";
import { type User } from "../types";
import { MdDeleteForever } from "react-icons/md";
import { useAppContext } from "../hooks/useAppContext";
import IconButton from "./IconButton";

type userProp = {
  user: User;
};

const UserDetails = ({ user }: userProp) => {
  const { userData, setUserData } = useAppContext();
  const status = _.capitalize(user.status);

  const handleDelete = (id: number) => {
    const updatedUserData = userData.filter((user) => user.id !== id);
    setUserData(updatedUserData);
  };

  return (
    <div className="relative flex flex-grow transform flex-col rounded-lg bg-white p-5 shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-2xl lg:h-fit lg:w-2/5 lg:flex-none lg:gap-2">
      <div className="flex justify-between">
        <p data-testid={`user-name-${user.id}`} className="text-lg font-bold">{user.name}</p>
        <IconButton
          label="Delete User"
          type="button"
          onClick={() => handleDelete(user.id)}
        >
          <MdDeleteForever
            className="absolute right-0 top-2 h-11 w-11 text-black transition-colors duration-300 lg:hover:text-red-600"
            aria-label="Add User"
          />
        </IconButton>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-zinc-500">{user.email}</p>
        <p>Status: {status}</p>
      </div>
    </div>
  );
};

export default UserDetails;
