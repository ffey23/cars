import { useEffect } from 'react';

function useResetErrorMessage(viewStore) {
  useEffect(() => () => {
    viewStore.setWasLoading(false);
  }, [viewStore]);
}

export default useResetErrorMessage;
