type Props = {
  id: string;
  type: string;
  name: string;
  placeholder?: string;
  maxLength?: number;
  value?: string;
};

const InputField = ({
  id,
  type,
  name,
  placeholder,
  maxLength,
  value,
}: Props) => {
  return (
    <input
      className="w-full h-16 border rounded-lg px-4 py-2 border-border focus:outline-none focus:border-border-focus"
      type={type}
      name={name}
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
    />
  );
};

export default InputField;
