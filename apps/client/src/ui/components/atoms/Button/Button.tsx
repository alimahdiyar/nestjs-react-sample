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
      className={`w-full rounded-md border-none bg-button-primary text-color-secondary text-lg font-medium cursor-pointer transition-all duration-300 ease-in-out hover:bg-button-hover hover:text-button-primary ${
        disabled ? "bg-button-hover text-button-primary cursor-not-allowed" : ""
      } ${className ?? ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
