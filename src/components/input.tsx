import React from "react";

interface CustomInputProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  icon?: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  value,
  type = "text",
  icon,
  onChange,
  required = false,
}) => {
  return (
    <div
      style={{
        marginBottom: "10px",
        display: "flex",
        gap: "8px",
        alignItems: "center",
      }}>
      <label htmlFor={name}>{label}</label>
      <div className="input-wrapper">
        {icon && <img className="input-icon" src={icon} alt="" />}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      </div>
    </div>
  );
};
