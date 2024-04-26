export type ButtonProps = {
  disabled?: boolean;
  type?: "submit" | "button";
  className?: string; // Individual
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

const Button = ({
  type = "button",
  className,
  onClick,
  children,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`rounded-md border-none text-lg font-medium transition-all duration-300 ease-in-out ${
        className ? className : ""
      } ${
        disabled
          ? "bg-button-hover text-button-primary cursor-not-allowed"
          : "bg-button-primary text-color-secondary cursor-pointer hover:bg-button-hover hover:text-button-primary"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
