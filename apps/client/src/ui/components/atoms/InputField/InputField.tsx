import { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLInputElement> {
  id: string;
  type: string;
  name: string;
  placeholder?: string;
  maxLength?: number;
  value?: string;
  className?: string;
}

const InputField = ({ className, ...props }: Props) => {
  return (
    <input
      {...props}
      className={`w-full h-16 border rounded-lg px-4 py-2 border-border focus:outline-none focus:border-border-focus ${
        className ?? ""
      }`}
    />
  );
};

export default InputField;
