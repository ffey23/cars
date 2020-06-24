const makeList = [
  { id: 1, name: 'BMW' },
  { id: 2, name: 'Ford' },
  { id: 3, name: 'Volkswagen' },
  { id: 4, name: 'Nissan' },
  { id: 5, name: 'Renault' },
  { id: 6, name: 'Mercedes-Benz' },
];

const makeApi = {
  fetchMakes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 1) {
          return resolve(makeList);
        }
        return reject(Error());
      }, 1000);
    });
  },

  updateMake(json) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 1) {
          return resolve(
            { id: json.id, name: json.name },
          );
        }
        return reject(Error());
      }, 1000);
    });
  },

  addMake(json) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 1) {
          const returnValue = { id: makeList.length + 1, name: json.name };
          makeList.push(returnValue);
          return resolve(
            returnValue,
          );
        }
        return reject(Error());
      }, 1000);
    });
  },

};

export default makeApi;
