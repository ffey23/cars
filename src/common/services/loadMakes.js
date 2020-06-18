export default function loadMakes(makeStore) {
  if (!makeStore.makes.length && makeStore.loadingDataStatus !== 'pending') {
    makeStore.interfaceStore.toggleLoader('Loading makes...');
    makeStore.loadMakes().catch(() => {
      makeStore.interfaceStore.pushNotification({
        message: 'Fething data error!',
      });
    }).finally(() => {
      makeStore.interfaceStore.toggleLoader();
    });
  }
}
