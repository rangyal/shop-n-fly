import { ReactNode, createContext, useContext } from "react";

import useLayers from "./useLayers";

type UseLayersReturnType = ReturnType<typeof useLayers>;

const LayersStoreContext = createContext<UseLayersReturnType | null>(null);

export const LayersProvider = ({ children }: { children: ReactNode }) => {
  const value = useLayers();

  return (
    <LayersStoreContext.Provider value={value}>
      {children}
    </LayersStoreContext.Provider>
  );
};

export const useLayersContext = () => {
  const context = useContext(LayersStoreContext);

  if (!context) {
    throw new Error("useLayersContext must be used within a LayersProvider");
  }

  return context;
};
