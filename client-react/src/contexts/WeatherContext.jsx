import React, { useState, useContext, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import useJawaWeather from '@/hooks/useJawaWeather';
import { usePrefsData } from '@/contexts/PrefsContext';
import { PLACES_STORAGE_KEY, DEFAULT_PLACES } from '@/constants/constants';

// if localStorage, otherwise use default places
const getPlaces = () => {
  const places = localStorage.getItem(PLACES_STORAGE_KEY);
  return places ? JSON.parse(places) : DEFAULT_PLACES;
};

const WeatherDataContext = React.createContext();

// break out API so consumers that strictly use context setters won't re-render when context state changes
const WeatherAPIContext = React.createContext();

export function useWeatherData() {
  const context = useContext(WeatherDataContext);
  if (context === undefined) {
    throw new Error('useWeatherData is being called outside of its Provider');
  }
  return context;
}

export function useWeatherAPI() {
  const context = useContext(WeatherAPIContext);
  if (context === undefined) {
    throw new Error('useWeatherAPI is being called outside of its Provider');
  }
  return context;
}
export default function WeatherProvider({ children }) {
  console.log('WeatherProvider rendered!');
  const [places, setPlaces] = useState(getPlaces());
  const [placesWeatherData, setPlacesWeatherData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState([]);
  const [searchWeatherData, setSearchWeatherData] = useState([]);
  const [selectedWeatherId, setSelectedWeatherId] = useState({
    id: places[0].id,
    belongsTo: 'places',
  });
  console.log('WeatherProvider: selectedWeatherId: ', selectedWeatherId);

  const { units, lang } = usePrefsData();

  // to minimize API calls, only fetch places weather when places change, not for search
  const options = isSearch ? { search, units, lang } : { places, units, lang };
  const [weatherData, isLoading, isError] = useJawaWeather(options);

  // blur page when loading
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('blur');
    } else {
      document.body.classList.remove('blur');
    }
  }, [isLoading]);

  // update state when weatherData changes
  useEffect(() => {
    if (isSearch) {
      setSearchWeatherData(weatherData);
      // TODO: set isSearch to false here?
      setIsSearch(false);
    } else {
      setPlacesWeatherData(weatherData);
    }
  }, [weatherData, isSearch]);

  // keep localStorage in sync with state
  useEffect(() => {
    localStorage.setItem(PLACES_STORAGE_KEY, JSON.stringify(places));
  }, [places]);

  const memoDataContext = useMemo(() => {
    return {
      places,
      placesWeatherData,
      isSearch,
      search,
      searchWeatherData,
      selectedWeatherId,
      isLoading,
      isError,
    };
  }, [
    places,
    placesWeatherData,
    isSearch,
    search,
    searchWeatherData,
    selectedWeatherId,
    isLoading,
    isError,
  ]);

  const memoApiContext = useMemo(() => {
    return { setPlaces, setIsSearch, setSearch, setSelectedWeatherId };
  }, [setPlaces, setIsSearch, setSearch, setSelectedWeatherId]);

  return (
    <WeatherDataContext.Provider value={memoDataContext}>
      <WeatherAPIContext.Provider value={memoApiContext}>
        {children}
      </WeatherAPIContext.Provider>
    </WeatherDataContext.Provider>
  );
}

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
