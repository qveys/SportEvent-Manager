import { forwardRef, useState, useCallback, SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  FloatingLabelBaseProps,
  containerStyles,
  getInputStyles,
  IconElement,
  ErrorMessage,
  FloatingLabel
} from './FloatingLabel';

interface SelectOption {
  value: string;
  label: string;
}

interface FloatingLabelSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'>, FloatingLabelBaseProps {
  options: SelectOption[];
}

export const FloatingLabelSelect = forwardRef<HTMLSelectElement, FloatingLabelSelectProps>(({
  label,
  error,
  icon,
  options,
  value,
  onChange,
  required,
  className = '',
  onFocus,
  onBlur,
  id,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value;

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  return (
    <div className={containerStyles}>
      <IconElement icon={icon} />
      <select
        ref={ref}
        {...props}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-required={required ? 'true' : undefined}
        className={`
          ${getInputStyles(!!icon, error)}
          appearance-none
          ${className}
        `}
      >
        <option value="" disabled hidden>{label}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FloatingLabel
        label={label}
        required={required}
        isFloating={isFloating}
        hasIcon={!!icon}
        error={error}
        id={id}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-500">
        <ChevronDown className="h-5 w-5" />
      </div>
      <ErrorMessage id={id} error={error} />
    </div>
  );
});

FloatingLabelSelect.displayName = 'FloatingLabelSelect';