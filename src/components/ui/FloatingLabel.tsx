import { ReactNode } from 'react';

// Types de base pour les composants FloatingLabel
export interface FloatingLabelBaseProps {
  label: string;
  error?: string;
  icon?: ReactNode;
  className?: string;
  required?: boolean;
  id?: string;
}

// Styles partagés pour le conteneur
export const containerStyles = 'relative';

// Styles partagés pour le label flottant
export const getLabelStyles = (isFloating: boolean, hasIcon: boolean, error?: string) => `
  absolute ${hasIcon ? (isFloating ? 'left-3' : 'left-10') : 'left-3'} top-2.5 text-gray-600 dark:text-gray-400
  transition-all duration-200
  ${isFloating 
    ? '-translate-y-[1.4rem] scale-75 text-blue-600 dark:text-blue-400' 
    : 'translate-y-0 scale-100'
  }
  ${error ? '!text-red-500' : ''}
  peer-focus:-translate-y-[1.4rem] peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400
  peer-focus:bg-white dark:peer-focus:bg-transparent peer-focus:px-1
  pointer-events-none origin-[0] z-5
`;

// Styles partagés pour les champs de saisie
export const getInputStyles = (hasIcon: boolean, error?: string) => `
  peer block w-full rounded-lg border bg-white dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-white
  ${hasIcon ? 'pl-10' : ''}
  ${error 
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
  }
  focus:outline-none focus:ring-2 focus:ring-opacity-50
  transition-all duration-200
`;

// Styles partagés pour l'icône
export const iconStyles = 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none';

// Styles partagés pour le message d'erreur
export const errorStyles = 'mt-1 text-sm text-red-600 dark:text-red-400';

// Composant pour l'icône
export const IconElement = ({ icon }: { icon?: ReactNode }) => {
  if (!icon) return null;
  return (
    <div className={iconStyles}>
      {icon}
    </div>
  );
};

// Composant pour le message d'erreur
export const ErrorMessage = ({ id, error }: { id?: string; error?: string }) => {
  if (!error) return null;
  return (
    <p 
      id={`${id}-error`}
      className={errorStyles}
      role="alert"
    >
      {error}
    </p>
  );
};

// Composant pour le label
export const FloatingLabel = ({ 
  label, 
  required, 
  isFloating, 
  hasIcon, 
  error,
  id 
}: FloatingLabelBaseProps & { 
  isFloating: boolean; 
  hasIcon: boolean;
}) => {
  return (
    <label
      htmlFor={id}
      className={getLabelStyles(isFloating, hasIcon, error)}
    >
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};