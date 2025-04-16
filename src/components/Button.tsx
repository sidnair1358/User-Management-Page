import { ButtonProps } from "../types";

const Button = ({
  children,
  label,
  onClick,
  type,
  disabled = false,
}: ButtonProps) => {
  let styles =
    "rounded bg-green-500 px-4 py-2 text-white disabled:opacity-50 hover:bg-green-400";
  if (label === "submit") {
    styles = "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400";
  } else if (label === "dismiss") {
    styles = "absolute right-2 top-2";
  }

  return (
    <button
      onClick={onClick}
      type={type}
      aria-label={label}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  );
};

export default Button;
