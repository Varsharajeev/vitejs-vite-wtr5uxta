import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useStore } from './useStore';

export function useInitSeed() {
  const { blueprints, contracts, loadAll, seedIfEmpty } = useStore((s) => s);

  // load existing on mount
  useEffect(() => {
    loadAll();
    // seed if empty with friendly sample
    seedIfEmpty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
