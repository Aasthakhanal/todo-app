interface TodoInputProps {
  name: string;
  placeholder: string;
  onChange: (e: string) => void;
  value: string;
  required?: boolean;
}

export default function TodoInput({ name, placeholder, onChange, value, required= true }: TodoInputProps) {
  return (
    <input
      required={required}
      type="text"
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}