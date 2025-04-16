export type User = {
  id: number;
  name: string;
  email: string;
  status: string;
};

export type UserFormModalProps = {
  formData: User;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<User>>;
};

export type ButtonProps = {
  onClick?: () => void;
  label: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
};

export type AppContextType = {
  userData: User[];
  setUserData: React.Dispatch<React.SetStateAction<User[]>>;
};
