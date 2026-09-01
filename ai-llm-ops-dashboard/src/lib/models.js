import models from '../data/models.json';

export function findModel(id) {
  return models.find((item) => item.id === id) || models[0];
}

export const modelOptions = models.map((item) => ({ value: item.id, label: item.name }));
