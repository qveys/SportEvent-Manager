import React, { useState } from 'react';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  error,
  icon,
  value,
  onChange,
  type = 'text',
  required,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const isFloating = isFocused || value || type === 'date';

  return (
    <div className="relative">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...props}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            peer block w-full rounded-md border bg-white dark:bg-gray-800 px-3 py-2.5 text-gray-900 dark:text-white
            ${icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
            }
            placeholder-transparent
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            transition-all duration-200
          `}
          placeholder={label}
        />
        <label
          className={`
            absolute ${icon ? (isFloating ? 'left-3' : 'left-10') : 'left-3'} top-2.5 text-gray-600 dark:text-gray-400
            transition-all duration-200
            ${isFloating 
              ? '-translate-y-[1.25rem] scale-75 text-blue-600 dark:text-blue-400' 
              : 'translate-y-0 scale-100'
            }
            ${error ? '!text-red-500' : ''}
            peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
            peer-focus:-translate-y-[1.25rem] peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400
            peer-focus:bg-white dark:peer-focus:bg-gray-800 peer-focus:px-1
            pointer-events-none origin-[0] z-10
          `}
        >
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FloatingLabelInput;