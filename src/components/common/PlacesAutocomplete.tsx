import React, { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useGoogleMaps } from '../../lib/googleMaps';

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

export const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  value,
  onChange,
  onPlaceSelect,
  required,
  error,
  className = ''
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useGoogleMaps({ 
    apiKey, 
    libraries: ['places']
  });

  useEffect(() => {
    if (!isLoaded || !inputRef.current || !window.google?.maps?.places) return;

    try {
      // Clean up previous instance
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }

      // Create new instance
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        fields: ['address_components', 'formatted_address', 'geometry']
      });

      // Add listener
      const listener = autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place) {
          onChange(place.formatted_address || '');
          onPlaceSelect?.(place);
        }
      });

      // Cleanup function
      return () => {
        if (listener) {
          google.maps.event.removeListener(listener);
        }
        if (autocompleteRef.current) {
          google.maps.event.clearInstanceListeners(autocompleteRef.current);
        }
      };
    } catch (error) {
      console.error('Error initializing Places Autocomplete:', error);
    }
  }, [isLoaded, onChange, onPlaceSelect]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`
          block w-full pl-10 pr-4 py-2 border rounded-lg
          ${error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
          }
          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400
          disabled:bg-gray-50 dark:disabled:bg-gray-800
          disabled:text-gray-500 dark:disabled:text-gray-400
          ${className}
        `}
        placeholder="Enter an address..."
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};