let id = 0;

function nextId() {
  return ++id;
}

const omni = (() => this)();

if (typeof omni.__nextId !== 'function') {
  omni.__nextId = nextId;
}

function generateId(sig = 'uid') {
  return `${sig}-${omni.__nextId()}`;
}

export default generateId;