type Props = {
  type?: "submit" | "button";
  className?: string; // Individual
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

const Button = ({ type = "button", className, onClick, children }: Props) => {
  return (
    <button
      type={type}
      className="w-full h-12 rounded-md border-none bg-button-primary text-color-secondary text-lg font-medium mt-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-button-hover hover:text-button-primary"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
