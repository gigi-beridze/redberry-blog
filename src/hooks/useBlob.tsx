// useSharedBlobState.tsx
import { useState, createContext, useContext, ReactNode } from 'react';

// Define the type for the shared state
interface SharedBlobState {
  sharedBlob: Blob | null;
  updateSharedBlob: (newBlob: Blob | null) => void;
}

const SharedBlobStateContext = createContext<SharedBlobState | undefined>(undefined);

interface SharedBlobStateProviderProps {
  children: ReactNode;
}

export const SharedBlobStateProvider: React.FC<SharedBlobStateProviderProps> = ({ children }) => {
  const [sharedBlob, setSharedBlob] = useState<Blob | null>(null);

  const updateSharedBlob = (newBlob: Blob | null) => {
    setSharedBlob(newBlob);
  };

  const value: SharedBlobState = { sharedBlob, updateSharedBlob };

  return (
    <SharedBlobStateContext.Provider value={value}>
      {children}
    </SharedBlobStateContext.Provider>
  );
};

export const useSharedBlobState = (): SharedBlobState => {
  const context = useContext(SharedBlobStateContext);
  if (!context) {
    throw new Error('useSharedBlobState must be used within a SharedBlobStateProvider');
  }
  return context;
};
