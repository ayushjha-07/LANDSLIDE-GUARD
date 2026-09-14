import node01 from './node_01_north_slope.jpg';
import node02 from './node_02_east_ridge.jpg';
import node03 from './node_03_mountain_zone_b.jpg';
import node04 from './node_04_south_slope.jpg';
import node05 from './node_05_mountain_zone_c.jpg';
import node06 from './node_06_west_ridge.jpg';
import node07 from './node_07_central_slope.jpg';
import node08 from './node_08_north_ridge.jpg';

export const NODE_FIELD_IMAGES = {
  'NODE-01': node01,
  'NODE-02': node02,
  'NODE-03': node03,
  'NODE-04': node04,
  'NODE-05': node05,
  'NODE-06': node06,
  'NODE-07': node07,
  'NODE-08': node08,
};

export const NODE_LOCATION_NAMES = {
  'NODE-01': 'North Slope',
  'NODE-02': 'East Ridge',
  'NODE-03': 'Mountain Zone B',
  'NODE-04': 'South Slope',
  'NODE-05': 'Mountain Zone C',
  'NODE-06': 'West Ridge',
  'NODE-07': 'Central Slope',
  'NODE-08': 'North Ridge',
};

export const getNodeFieldImage = (nodeId) => {
  if (!nodeId) return node05;
  const normalized = nodeId.toUpperCase().trim();
  return NODE_FIELD_IMAGES[normalized] || node05;
};

export const getNodeLocationName = (nodeId) => {
  if (!nodeId) return 'Mountain Zone C';
  const normalized = nodeId.toUpperCase().trim();
  return NODE_LOCATION_NAMES[normalized] || 'Mountain Slope';
};
