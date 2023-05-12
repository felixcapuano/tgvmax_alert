const storageKey = 'store';
const defaultStore = { travel: {} };
const storage = localStorage.get(storageKey) || defaultStore;

const saveDateTime = () => {};

const addDeparture = (departure) => {
  storage.travel[departure] = [];
  localStorage.setItem(storage);
};

const removeDeparture = (departure) => {
  delete storage.travel[departure];
  localStorage.setItem(storage);
};

const addArrival = (departure, arrival) => {
  storage.travel[departure].push(arrival);
  localStorage.setItem(storage);
};

const removeArrival = (departure, arrival) => {
  storage.travel[departure].pop(arrival);
  localStorage.setItem(storage);
};
