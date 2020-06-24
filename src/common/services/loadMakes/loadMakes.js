export default function loadMakes(makeStore) {
  if (!makeStore.makes.length && makeStore.loadingDataStatus !== 'pending') {
    makeStore.interfaceStore.toggleLoader('Loading makes...');
    return makeStore.loadMakes().catch(() => {
      makeStore.interfaceStore.pushNotification({
        message: 'Fething data error!',
      });
    }).then(() => {
      makeStore.interfaceStore.toggleLoader();
    });
  }
  return Promise.resolve();
}
