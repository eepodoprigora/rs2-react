import React, { useState } from "react";
import { CustomInput } from "./input";

import { SignUpFormData } from "../types";

interface SignUpProps {
  onSubmit: (data: SignUpFormData) => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSubmit }) => {
  const initialFormData = {
    name: "",
    nickname: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        label="Имя"
        name="name"
        value={formData.name}
        onChange={(value) => handleChange("name", value)}
        required
      />
      <CustomInput
        label="Ник"
        name="nickname"
        value={formData.nickname}
        icon="https://img.icons8.com/material-sharp/24/email.png"
        onChange={(value) => handleChange("nickname", value)}
        required
      />
      <CustomInput
        label="Почта"
        type="email"
        name="email"
        value={formData.email}
        onChange={(value) => handleChange("email", value)}
        required
      />
      <CustomInput
        label="Пароль"
        type="password"
        name="password"
        value={formData.password}
        onChange={(value) => handleChange("password", value)}
        required
      />
      <CustomInput
        label="Повторить пароль"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={(value) => handleChange("confirmPassword", value)}
        required
      />
      <div style={{ marginBottom: "10px" }}>
        <span>Пол:</span>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={() => handleChange("gender", "male")}
            checked={formData.gender === "male"}
          />
          Мужской
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={() => handleChange("gender", "female")}
            checked={formData.gender === "female"}
          />
          Женский
        </label>
      </div>

      <button type="submit">Регистрация</button>
    </form>
  );
};
