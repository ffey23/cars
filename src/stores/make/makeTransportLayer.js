const makeTransportLayer = {
  fetchMakes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 1) {
          return resolve([
            { id: 1, name: 'BMW' },
            { id: 2, name: 'Ford' },
            { id: 3, name: 'Volkswagen' },
            { id: 4, name: 'Nissan' },
            { id: 5, name: 'Renault' },
            { id: 6, name: 'Mercedes-Benz' },
          ]);
        }
        return reject(Error());
      }, 1000);
    });
  },

};

export default makeTransportLayer;
