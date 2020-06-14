import { useEffect } from 'react';

function useLoadMakes(makeStore) {
  useEffect(() => {
    if (!makeStore.makes.length) {
      makeStore.interfaceStore.toggleLoader('Loading makes...');
      makeStore.loadMakes().catch(() => {
        makeStore.interfaceStore.pushNotification({
          message: 'Fething data error!',
        });
      }).finally(() => {
        makeStore.interfaceStore.toggleLoader();
      });
    }
  });
}

export default useLoadMakes;
