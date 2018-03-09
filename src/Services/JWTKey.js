import uuid from 'uuid/v4';

let key = uuid();
let dateKeySet = new Date(Date.now());

const getKey = function() {
  const d = new Date(Date.now());
  if (d.getDate() != dateKeySet.getDate()) {
    key = uuid();
  }
  return key;
};

export { getKey };
