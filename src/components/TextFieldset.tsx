"use client";

import { maskify } from "@/lib/maskify";

type Props = {
  className?: string;
  label: string;
  inputName: string;
  maxlength?: number;
  placeholder?: string;
  mask?: string;
  required?: boolean;
  defaultValue?: string;
};

export function TextFieldset({
  className = "",
  label,
  inputName,
  maxlength,
  placeholder = "",
  mask = "",
  defaultValue = "",
  required = false,
}: Props) {
  return (
    <fieldset className={`space-y-2 ${className}`}>
      <label
        htmlFor={inputName}
        className="block w-fit text-sm font-medium text-gray-900 leading-none"
      >
        {label}
      </label>

      <input
        defaultValue={defaultValue}
        onChange={(e) => (e.target.value = maskify(e.target.value, mask))}
        type="text"
        name={inputName}
        id={inputName}
        placeholder={placeholder}
        className="block w-full border border-neutral-300 rounded-md px-3 py-1 shadow-sm placeholder:text-neutral-400 placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50;"
        maxLength={maxlength}
        required={required}
      />
    </fieldset>
  );
}
