export default function loadModels(modelStore) {
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
}
