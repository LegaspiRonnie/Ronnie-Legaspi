import { useCallback, useContext, useEffect } from 'react';
import { UnderConstructionContext } from './components/UnderConstructionContext.ts';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

// Returns a click/submit handler that opens the under-construction modal.
export function useUnderConstruction() {
  const { show } = useContext(UnderConstructionContext);

  return useCallback(
    (event?: { preventDefault?: () => void }) => {
      event?.preventDefault?.();
      show();
    },
    [show],
  );
}

