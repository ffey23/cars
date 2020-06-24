import { useEffect } from 'react';

function useResetForm(viewStore) {
  useEffect(() => () => {
    viewStore.initForm();
  }, [viewStore]);
}

export default useResetForm;
