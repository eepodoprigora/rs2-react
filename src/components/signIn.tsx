import { useState } from "react";
import { CustomInput } from "./input";
import { SignInFormData } from "../types";

interface SignInProps {
  onSubmit: (data: SignInFormData) => void;
}

export const SignIn: React.FC<SignInProps> = ({ onSubmit }) => {
  const initialFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState<SignInFormData>(initialFormData);

  const handleChange = (key: keyof SignInFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        label="E-mail"
        name="email"
        value={formData.email}
        onChange={(value) => handleChange("email", value)}
        required
      />
      <CustomInput
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={(value) => handleChange("password", value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};
