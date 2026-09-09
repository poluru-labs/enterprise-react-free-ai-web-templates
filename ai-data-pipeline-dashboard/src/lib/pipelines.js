import pipelines from '../data/pipelines.json';

export function findPipeline(id) {
  return pipelines.find((item) => item.id === id) || pipelines[0];
}

export function pipelineOptions() {
  return pipelines.map((item) => ({ value: item.id, label: item.name }));
}
