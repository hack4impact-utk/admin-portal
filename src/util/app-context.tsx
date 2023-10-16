import React from 'react';
import { createContext } from 'react';

export type AppContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const AppContext = createContext<AppContextType | null>(null);

type AppProviderProps = {
  initialDarkMode?: boolean;
  children: React.ReactNode;
};

const AppProvider = ({ initialDarkMode, children }: AppProviderProps) => {
  const [darkMode, setDarkMode] = React.useState<boolean>(
    initialDarkMode || false
  );

  const toggleDarkMode = () => setDarkMode((darkMode) => !darkMode);

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
