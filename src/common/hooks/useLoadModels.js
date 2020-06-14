import { useEffect } from 'react';

function useLoadModels(modelStore) {
  useEffect(() => {
    if (!modelStore.models.length) {
      modelStore.loadModels().catch(() => {
        modelStore.interfaceStore.pushNotification({
          message: 'Fething data error!',
        });
      });
    }
  });
}

export default useLoadModels;
