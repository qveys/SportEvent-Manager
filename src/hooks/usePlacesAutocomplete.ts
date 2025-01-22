import { useState, useCallback } from 'react';

interface AddressComponents {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export const usePlacesAutocomplete = () => {
  const [address, setAddress] = useState('');
  const [addressComponents, setAddressComponents] = useState<AddressComponents>({
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handlePlaceSelect = useCallback((place: google.maps.places.PlaceResult) => {
    if (!place.address_components) return;

    const getComponent = (type: string) => {
      return place.address_components?.find(component => 
        component.types.includes(type)
      )?.long_name || '';
    };

    const streetNumber = getComponent('street_number');
    const route = getComponent('route');
    const street = streetNumber && route ? `${streetNumber} ${route}` : route;

    setAddressComponents({
      street,
      city: getComponent('locality'),
      postalCode: getComponent('postal_code'),
      country: getComponent('country')
    });
  }, []);

  return {
    address,
    setAddress,
    addressComponents,
    handlePlaceSelect
  };
};