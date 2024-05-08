'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Create context
const ProgramOutputContext = createContext({
  programInput: "",
  programOutput: {},
  setProgramInput: () =>{},
  setProgramOutput: () =>{},
});

// Custom hook to use the program output context
export const useProgramOutput = () => useContext(ProgramOutputContext);

// Create a provider component
export const ProgramOutputProvider = ({ children }) => {
  const [programOutput, setProgramOutput] = useState({});
  const [programInput, setProgramInput] = useState("");


  useEffect(() => {
    console.log('Program Output file array changed:', programOutput);
  }, [programOutput]);

  useEffect(() => {
    console.log('Program Input file string changed:', programInput);
  }, [programInput]);

  const value = useMemo(() => ({
    programOutput,
    setProgramOutput,
    programInput,
    setProgramInput,
  }), [programOutput, programInput]);

  return (
    <ProgramOutputContext.Provider value={value}>
      {children}
    </ProgramOutputContext.Provider>
  );
};


