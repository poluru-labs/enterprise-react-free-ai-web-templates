import inventory from '../data/inventory.json';

export function findModel(id) {
  return inventory.find((item) => item.id === id) || inventory[0];
}

export const modelOptions = inventory.map((item) => ({ value: item.id, label: item.name }));
