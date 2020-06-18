export default function loadModels(modelStore) {
  if (!modelStore.models.length && modelStore.loadingDataStatus !== 'pending') {
    modelStore.interfaceStore.toggleLoader('Loading models...');
    return modelStore.loadModels().catch(() => {
      modelStore.interfaceStore.pushNotification({
        message: 'Fething data error!',
      });
    }).then(() => {
      modelStore.interfaceStore.toggleLoader();
    });
  }
  return Promise.resolve();
}
