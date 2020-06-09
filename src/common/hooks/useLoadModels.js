import { useEffect } from 'react';

function useLoadModels(modelStore) {
  useEffect(() => {
    if (!modelStore.models.length) modelStore.loadModels();
  });
}

export default useLoadModels;
