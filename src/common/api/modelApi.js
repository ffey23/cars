import { v4 } from 'uuid';

const modelApi = {
  fetchModels() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 1) {
          return resolve([
            { id: '1', makeId: 1, name: '325e' },
            { id: '2', makeId: 4, name: 'Pickup' },
            { id: '3', makeId: 6, name: 'CL550' },
            { id: '4', makeId: 3, name: 'Beetle' },
            { id: '5', makeId: 2, name: 'Bronco' },
            { id: '6', makeId: 5, name: 'Fuego' },
            { id: '7', makeId: 2, name: 'Escape' },
            { id: '8', makeId: 1, name: '640i' },
            { id: '9', makeId: 6, name: '400SE' },
            { id: '10', makeId: 3, name: 'Fox' },
            { id: '11', makeId: 5, name: '18i' },
            { id: '12', makeId: 4, name: 'Rogue' },
            { id: '13', makeId: 1, name: '750i' },
            { id: '14', makeId: 4, name: 'Quest' },
            { id: '15', makeId: 5, name: 'Sportwagon' },
            { id: '16', makeId: 2, name: 'Contour' },
            { id: '17', makeId: 6, name: '300SL' },
            { id: '18', makeId: 3, name: 'Golf' },
          ]);
        }
        return reject(Error());
      }, 2000);
    });
  },

  updateModel(json) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 1) {
          return resolve(
            { id: json.id, makeId: json.makeId, name: json.name },
          );
        }
        return reject(Error());
      }, 1000);
    });
  },

  addModel(json) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 1) {
          return resolve(
            { id: v4(), makeId: json.makeId, name: json.name },
          );
        }
        return reject(Error());
      }, 2000);
    });
  },

};

export default modelApi;
