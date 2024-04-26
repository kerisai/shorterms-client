import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  accent?: boolean;
  danger?: boolean;
  fullRounded?: boolean;
  large?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button = ({
  label,
  onClick,
  disabled,
  accent,
  danger,
  fullRounded,
  large,
  small,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative hover:opacity-80 disabled:bg-gray-400 disabled:hover:opacity-100 disabled:cursor-not-allowed transition w-full 
            ${fullRounded ? "rounded-full" : "rounded-lg"}
            ${accent ? "bg-primary-300" : "bg-primary-600"}
            ${accent ? "text-primary-600" : "text-white"}
            ${danger && "bg-red-500"}
            
            ${(large && !small) ? "text-lg" : "text-base"}
            ${(large && !small) ? "py-2" : "py-2"}
            ${(large && !small) && "font-semibold"}

            ${(small && !large) ? "py-1" : "py-2"}
            ${(small && !large) ? "text-sm" : "text-base"}
            ${(small && !large) ? "font-light" : "font-semibold"}
        `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-2" />}
      {label}
    </button>
  );
};

export default Button;