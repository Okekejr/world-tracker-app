import { useState } from "react";

export interface initalT {
  username: string;
  password: string;
  color: string;
}

const initalState: initalT = {
  username: "",
  password: "",
  color: "",
};

export const useAuthForm = () => {
  const [formData, setFormData] = useState(initalState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearForm = () => {
    setFormData(initalState);
  };

  return { formData, setFormData, handleInputChange, clearForm };
};
