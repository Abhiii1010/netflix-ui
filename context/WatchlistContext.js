import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist on app start
  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    const data = await AsyncStorage.getItem('WATCHLIST');
    if (data) setWatchlist(JSON.parse(data));
  };

  const saveWatchlist = async (list) => {
    setWatchlist(list);
    await AsyncStorage.setItem('WATCHLIST', JSON.stringify(list));
  };

  const addToWatchlist = (movie) => {
    if (watchlist.find(item => item.id === movie.id)) return;
    saveWatchlist([...watchlist, movie]);
  };

  const removeFromWatchlist = (id) => {
    saveWatchlist(watchlist.filter(item => item.id !== id));
  };

  const isInWatchlist = (id) => {
    return watchlist.some(item => item.id === id);
  };

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist
    }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
