import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  name: string;
}

export function Input({ placeholder, name, id, ...props }: InputProps) {
  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        name={name}
        id={inputId}
        className="bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4
        peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none"
        {...props}
        placeholder=" "
      />

      <label
        htmlFor={inputId}
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700
        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base transition-all"
      >
        {placeholder}
      </label>
    </div>
  );
}
