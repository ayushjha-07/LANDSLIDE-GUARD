/**
 * Landslide Guard - Canonical Map Configuration
 * Centralized single source of truth for map center, zoom levels, tile providers,
 * disclaimers, and legends across Dashboard and dedicated Monitoring Map page.
 */

// Regional center on Himachal Pradesh, covering Kangra to Kinnaur and Rohtang to Mandi
export const HIMACHAL_CENTER = [32.00, 77.15];

// Default zoom levels
export const HIMACHAL_FULL_ZOOM = 8.4;
export const HIMACHAL_DASHBOARD_ZOOM = 8.2;
export const CLUSTER_CENTER = [32.18, 77.18];
export const CLUSTER_ZOOM = 10.5;

// Real geographic basemap tile endpoints
// Real geographic basemap tile endpoints
export const MAP_TILE_PROVIDERS = {
  terrain: {
    name: 'Terrain',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 18,
    hasOverlay: false,
    attribution: 'Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, Intermap, METI/NASA'
  },
  satellite: {
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 18,
    hasOverlay: true,
    overlayUrl: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  },
  standard: {
    name: 'Map',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    maxZoom: 19,
    hasOverlay: false,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
};

// Map disclaimers
export const MAP_DISCLAIMERS = {
  dashboard: 'Prototype sensor locations',
  full: 'Real geographic basemap. Sensor locations and risk data are simulated prototype data and do not represent deployed sensors or official landslide hazard boundaries.'
};

// Compact & Full Legend items
export const MAP_LEGEND_ITEMS = [
  { label: 'Safe', color: '#10b981', bgClass: 'bg-[#10b981]', range: '0–25' },
  { label: 'Warning', color: '#f59e0b', bgClass: 'bg-[#f59e0b]', range: '>25–50' },
  { label: 'High Risk', color: '#ef4444', bgClass: 'bg-[#ef4444]', range: '>50–75' },
  { label: 'Offline', color: '#6b7280', bgClass: 'bg-[#6b7280]', range: 'No score' }
];

// Responsive container heights
export const MAP_CONTAINER_HEIGHTS = {
  dashboard: 'h-[320px] sm:h-[380px] md:h-[440px] lg:h-[480px]',
  full: 'h-[520px] sm:h-[580px] md:h-[640px] lg:h-[700px] xl:h-[740px]'
};
