import { facilities } from './facilities';

export const powerByFacility = facilities.map((facility) => ({
  facility: facility.name,
  facilityId: facility.id,
  itLoadKw: Math.round(facility.powerKw / facility.pue),
  facilityKw: facility.powerKw,
  pue: facility.pue,
  coolingUtil: Math.min(
    98,
    Math.round(facility.utilization * 0.92 + (facility.status === 'degraded' ? 8 : 0)),
  ),
}));

export const pueTrend7d = {
  labels: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'],
  series: [
    {
      name: 'Fleet PUE',
      color: '#30AFFF',
      values: [1.31, 1.29, 1.28, 1.27, 1.26, 1.27, 1.26],
    },
    {
      name: 'Target',
      color: '#0b78c4',
      values: [1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3],
    },
  ],
};
