import campaigns from '../data/campaigns.json';
import audiences from '../data/audiences.json';

export function findCampaign(id) {
  return campaigns.find((item) => item.id === id) || campaigns[0];
}

export function campaignOptions() {
  return audiences.map((item) => ({ value: item.id, label: item.name }));
}
