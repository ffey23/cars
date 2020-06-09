import { useEffect } from 'react';

function useLoadMakes(makeStore) {
  useEffect(() => {
    if (!makeStore.makes.length) makeStore.loadMakes();
  });
}

export default useLoadMakes;
