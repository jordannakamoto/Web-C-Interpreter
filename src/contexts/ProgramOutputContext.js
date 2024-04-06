'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Create context
const ProgramOutputContext = createContext({
  programOutput: {},
  setProgramOutput: () =>{},
});

// Custom hook to use the program output context
export const useProgramOutput = () => useContext(ProgramOutputContext);

// Create a provider component
export const ProgramOutputProvider = ({ children }) => {
  const [programOutput, setProgramOutput] = useState({});

  useEffect(() => {
    console.log('Program Output file array changed:', programOutput);
  }, [programOutput]);

  const value = useMemo(() => ({
    programOutput,
    setProgramOutput,
  }), [programOutput]);

  return (
    <ProgramOutputContext.Provider value={value}>
      {children}
    </ProgramOutputContext.Provider>
  );
};


