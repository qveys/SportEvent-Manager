import { forwardRef, useState, useCallback, useMemo, InputHTMLAttributes, ReactNode } from 'react';

interface FloatingLabelInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: string;
  icon?: ReactNode;
  className?: string;
  required?: boolean;
}

export const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInputProps>(({
  label,
  error,
  icon,
  value,
  onChange,
  type = 'text',
  required,
  className = '',
  onFocus,
  onBlur,
  id,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value || type === 'date';

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  const IconElement = useMemo(() => 
    icon ? (
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
        {icon}
      </div>
    ) : null
  , [icon]);

  return (
    <div className="relative">
      {IconElement}
      <input
        ref={ref}
        {...props}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-required={required ? 'true' : undefined}
        className={`
          peer block w-full rounded-lg border bg-white dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-white
          ${icon ? 'pl-10' : ''}
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
          }
          placeholder-transparent
          focus:outline-none focus:ring-2 focus:ring-opacity-50
          transition-all duration-200
          ${className}
        `}
        placeholder={label}
      />
      <label
        htmlFor={id}
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
          peer-focus:bg-white dark:peer-focus:bg-gray-700 peer-focus:px-1
          pointer-events-none origin-[0] z-10
        `}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {error && (
        <p 
          id={`${id}-error`}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

FloatingLabelInput.displayName = 'FloatingLabelInput';