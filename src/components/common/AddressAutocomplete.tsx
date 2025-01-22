import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import {
  FloatingLabel,
  containerStyles,
  getInputStyles,
  IconElement,
  ErrorMessage
} from '../ui/FloatingLabel';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onAddressSelect: (address: {
    formatted: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  }) => void;
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  onAddressSelect,
  label = 'Adresse',
  required,
  error,
  className = ''
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const { isLoaded, loadError } = useGoogleMaps();

  useEffect(() => {
    if (!isLoaded || !window.google?.maps?.places) return;

    autocompleteService.current = new google.maps.places.AutocompleteService();
    
    // Create a dummy div for PlacesService (required)
    const dummyDiv = document.createElement('div');
    placesService.current = new google.maps.places.PlacesService(dummyDiv);
  }, [isLoaded]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchSuggestions = async () => {
      if (!autocompleteService.current || value.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const request = {
          input: value,
          componentRestrictions: { country: 'BE' }, // Limiter à la Belgique
          types: ['address']
        };

        const { predictions } = await new Promise<google.maps.places.AutocompletePredictionsResponse>(
          (resolve, reject) => {
            autocompleteService.current?.getPlacePredictions(
              request,
              (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                  resolve({ predictions: results });
                } else {
                  reject(status);
                }
              }
            );
          }
        );

        setSuggestions(predictions || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };

    if (value.length >= 3) {
      timeoutId = setTimeout(fetchSuggestions, 300);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [value]);

  const handleSuggestionSelect = async (placeId: string) => {
    if (!placesService.current) return;

    try {
      const place = await new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
        placesService.current?.getDetails(
          {
            placeId,
            fields: ['formatted_address', 'address_components', 'geometry']
          },
          (result, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && result) {
              resolve(result);
            } else {
              reject(status);
            }
          }
        );
      });

      const getAddressComponent = (type: string) => {
        return place.address_components?.find(component => 
          component.types.includes(type)
        )?.long_name || '';
      };

      const streetNumber = getAddressComponent('street_number');
      const route = getAddressComponent('route');
      const street = streetNumber && route ? `${streetNumber} ${route}` : route;

      const addressData = {
        formatted: place.formatted_address || '',
        street,
        city: getAddressComponent('locality'),
        postalCode: getAddressComponent('postal_code'),
        country: getAddressComponent('country'),
        coordinates: {
          lat: place.geometry?.location?.lat() || 0,
          lng: place.geometry?.location?.lng() || 0
        }
      };

      onChange(addressData.formatted);
      onAddressSelect(addressData);
      setShowSuggestions(false);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  if (loadError) {
    return (
      <div className="text-red-600 dark:text-red-400">
        Erreur de chargement de Google Maps
      </div>
    );
  }

  return (
    <div className="relative">
      <div className={containerStyles}>
        <IconElement icon={<MapPin className="h-5 w-5" />} />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsFocused(false);
              setShowSuggestions(false);
            }, 200);
          }}
          required={required}
          className={`
            ${getInputStyles(true, error)}
            placeholder-transparent
            ${className}
          `}
          placeholder={label}
          aria-label={label}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'address-error' : undefined}
        />
        <FloatingLabel
          label={label}
          required={required}
          isFloating={isFocused || !!value}
          hasIcon={true}
          error={error}
        />
        {error && (
          <ErrorMessage id="address-error" error={error} />
        )}
      </div>

      {/* Suggestions List */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-900 dark:text-white"
              onClick={() => handleSuggestionSelect(suggestion.place_id)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};