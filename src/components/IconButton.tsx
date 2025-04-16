import { ButtonProps } from "../types";

const IconButton = ({ children, label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="mx-2 flex h-11 w-11 cursor-pointer items-center justify-center"
    >
      {children}
    </button>
  );
};

export default IconButton;
