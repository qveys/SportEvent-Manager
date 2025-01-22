import React from 'react';
import { Input, Select } from './Form';
import type { SelectOption } from './Select';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  options?: SelectOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  required,
  error,
  options,
  value,
  onChange,
  className = ''
}) => {
  return (
    <div className={className}>
      {type === 'select' && options ? (
        <Select
          label={label}
          id={name}
          name={name}
          required={required}
          error={error}
          value={value}
          onChange={onChange}
          options={options}
        />
      ) : (
        <Input
          label={label}
          id={name}
          name={name}
          type={type}
          required={required}
          error={error}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};