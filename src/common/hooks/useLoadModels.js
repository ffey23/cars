import { useEffect } from 'react';

function useLoadModels(modelStore) {
  useEffect(() => {
    if (!modelStore.models.length && modelStore.loadingDataStatus !== 'pending') {
      modelStore.interfaceStore.toggleLoader('Loading models...');
      modelStore.loadModels().catch(() => {
        modelStore.interfaceStore.pushNotification({
          message: 'Fething data error!',
        });
      }).finally(() => {
        modelStore.interfaceStore.toggleLoader();
      });
    }
  }, [modelStore]);
}

export default useLoadModels;
