import { useEffect, useRef, useState } from 'react';

let isLoading = false;
let isLoaded = false;
const callbacks: (() => void)[] = [];

interface GoogleMapsConfig {
  apiKey: string;
  libraries?: string[];
}

export const loadGoogleMaps = (config: GoogleMapsConfig): Promise<void> => {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (isLoaded && window.google) {
      resolve();
      return;
    }

    // If loading, add to callback queue
    if (isLoading) {
      callbacks.push(() => resolve());
      return;
    }

    // Start loading
    isLoading = true;

    // Remove any existing Google Maps scripts
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.remove();
      isLoaded = false;
    }

    // Create script element
    const script = document.createElement('script');
    const libraries = config.libraries?.join(',') || '';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.apiKey}${libraries ? `&libraries=${libraries}` : ''}`;
    script.async = true;
    script.defer = true;

    // Handle script load
    script.onload = () => {
      isLoaded = true;
      isLoading = false;
      callbacks.forEach(cb => cb());
      callbacks.length = 0;
      resolve();
    };

    // Handle script error
    script.onerror = () => {
      isLoading = false;
      callbacks.length = 0;
      reject(new Error('Failed to load Google Maps API'));
    };

    // Add script to document
    document.head.appendChild(script);
  });
};

export const useGoogleMaps = (config: GoogleMapsConfig) => {
  const [isReady, setIsReady] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      loadGoogleMaps(config)
        .then(() => setIsReady(true))
        .catch(console.error);
    }
  }, [config]);

  return { isLoaded: isReady };
};