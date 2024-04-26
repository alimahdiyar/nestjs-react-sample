import { HTMLProps } from "react";

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  disabled?: boolean;
  type?: "submit" | "button";
  className?: string; // Individual
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const Button = ({ type = "button", className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`rounded-md border-none text-lg font-medium transition-all duration-300 ease-in-out ${
        className ? className : ""
      } ${
        props.disabled
          ? "bg-button-hover text-button-primary cursor-not-allowed"
          : "bg-button-primary text-color-secondary cursor-pointer hover:bg-button-hover hover:text-button-primary"
      }`}
    />
  );
};

export default Button;
