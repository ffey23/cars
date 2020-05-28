import { v4 } from 'uuid';

const modelTransportLayer = {
  fetchModels() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 1) {
          return resolve([
            { id: v4(), makeId: 1, name: '325e' },
            { id: v4(), makeId: 4, name: 'Pickup' },
            { id: v4(), makeId: 6, name: 'CL550' },
            { id: v4(), makeId: 3, name: 'Beetle' },
            { id: v4(), makeId: 2, name: 'Bronco' },
            { id: v4(), makeId: 5, name: 'Fuego' },
            { id: v4(), makeId: 2, name: 'Escape' },
            { id: v4(), makeId: 1, name: '640i' },
            { id: v4(), makeId: 6, name: '400SE' },
            { id: v4(), makeId: 3, name: 'Fox' },
            { id: v4(), makeId: 5, name: '18i' },
            { id: v4(), makeId: 4, name: 'Rogue' },
            { id: v4(), makeId: 1, name: '750i' },
            { id: v4(), makeId: 4, name: 'Quest' },
            { id: v4(), makeId: 5, name: 'Sportwagon' },
            { id: v4(), makeId: 2, name: 'Contour' },
            { id: v4(), makeId: 6, name: '300SL' },
            { id: v4(), makeId: 3, name: 'Golf' },
          ]);
        }
        return reject(Error());
      }, 1000);
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
      }, 5000);
    });
  },

};

export default modelTransportLayer;
