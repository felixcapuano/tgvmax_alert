const setDeparturesStorage = (newDepartures) => {
  localStorage.setItem('departures', JSON.stringify(newDepartures));
};

const removeArrivalStorage = (keyToRemove) => {
  localStorage.removeItem(keyToRemove);
};

export { setDeparturesStorage, removeArrivalStorage };
