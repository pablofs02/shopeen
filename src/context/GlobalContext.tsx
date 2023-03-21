import { createContext, ReactNode, useContext, useState } from "react";

type GlobalProviderProps = {
  children: ReactNode;
};

type GlobalContext = {
  setFilter: (s: string) => void;
  getSearchBarValue: () => string;
};

const GlobalContext = createContext({} as GlobalContext);

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [searchBarValue, setSearchBarValue] = useState("");

  function setFilter(s: string) {
    setSearchBarValue(s);
  }

  function getSearchBarValue() {
    return searchBarValue;
  }

  return (
    <GlobalContext.Provider value={{ setFilter, getSearchBarValue }}>
      {children}
    </GlobalContext.Provider>
  );
}
