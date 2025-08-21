import { useState, type ChangeEvent, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  id: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  icon?: ReactNode;
  labelIcon?: ReactNode;
  value?: string;
  validate?: boolean;
  minLength?: number;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Input({
  id,
  type,
  placeholder,
  icon,
  required,
  label,
  value = "",
  onChange,
  validate,
  minLength,
  labelIcon,
  readOnly,
}: Props) {
  const [showPass, setShowPass] = useState(false);

  const isPassword = type === "password";

  const inputType = isPassword ? (showPass ? "text" : "password") : type;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 font-medium flex items-center gap-2"
        >
          {labelIcon} {label}
        </label>
      )}

      <label
        className={`input flex items-center gap-2 focus-within:outline-none w-full ${
          validate ? "validator" : ""
        }`}
      >
        {icon}
        <input
          type={inputType}
          id={id}
          placeholder={placeholder}
          required={required}
          className="grow bg-transparent w-full"
          value={value}
          onChange={onChange}
          minLength={minLength}
          readOnly={readOnly}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="cursor-pointer"
          >
            {showPass ? (
              <EyeOff className="w-5 h-5 text-base-content/40" />
            ) : (
              <Eye className="w-5 h-5 text-base-content/40" />
            )}
          </button>
        )}
      </label>

      {type === "email" && (
        <div className="validator-hint hidden">Enter a valid email address</div>
      )}

      {type === "password" && (
        <div className="validator-hint hidden">
          Password must be at least 6 characters long
        </div>
      )}
    </div>
  );
}

export default Input;
