import { useEffect } from 'react';

function useLoadModels(viewStore) {
  useEffect(() => () => {
    viewStore.setWasLoading(false);
  }, [viewStore]);
}

export default useLoadModels;
