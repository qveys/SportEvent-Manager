import { useState, useEffect } from 'react';

interface UseGoogleMapsOptions {
  libraries?: string[];
}

export const useGoogleMaps = (options: UseGoogleMapsOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setLoadError(new Error('Google Maps API key is missing'));
      return;
    }

    const libraries = options.libraries?.join(',') || 'places';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries}`;
    script.async = true;
    script.defer = true;

    script.addEventListener('load', () => {
      setIsLoaded(true);
    });

    script.addEventListener('error', () => {
      setLoadError(new Error('Failed to load Google Maps API'));
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [options.libraries]);

  return { isLoaded, loadError };
};