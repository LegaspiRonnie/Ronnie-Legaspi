import { createContext } from 'react';

export interface UnderConstructionState {
  open: boolean;
  show: () => void;
  hide: () => void;
}

export const UnderConstructionContext = createContext<UnderConstructionState>({
  open: false,
  show: () => {},
  hide: () => {},
});

