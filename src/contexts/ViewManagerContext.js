
'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Create context
const ViewManagerContext = createContext({
// first pair, left and right panels.
// second pair, top and bottom sidebar panels
layoutPercentages : [40, 60, 70, 30],
    setLayoutPercentages: () =>{},
});

// Custom hook to use the program output context
export const useViewManager = () => useContext(ViewManagerContext);

// Create a provider component
export const ViewManagerProvider = ({ children }) => {
  const [layoutPercentages, setLayoutPercentages] = useState([40, 60, 70, 30]);

  useEffect(() => {
    console.log('Layout Percentages array changed:', layoutPercentages);
  }, [layoutPercentages]);

  const value = useMemo(() => ({
    layoutPercentages,
    setLayoutPercentages,
  }), [layoutPercentages]);

  return (
    <ViewManagerContext.Provider value={value}>
      {children}
    </ViewManagerContext.Provider>
  );
};



