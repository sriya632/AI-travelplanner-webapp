import { Loader } from '@googlemaps/js-api-loader';

let googleMapsPromise = null;

export const loadGoogleMaps = () => {
  if (!googleMapsPromise) {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
    
    if (!apiKey) {
      return Promise.reject(new Error('Google Maps API key is missing. Please check your .env file.'));
    }

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places']
    });

    googleMapsPromise = loader.load();
  }

  return googleMapsPromise;
};