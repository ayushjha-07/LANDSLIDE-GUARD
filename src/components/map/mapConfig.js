/**
 * Landslide Guard - Canonical Map Configuration
 * Centralized single source of truth for map center, zoom levels, tile providers,
 * disclaimers, and legends across Dashboard and dedicated Monitoring Map page.
 */

// Default region: Himachal Pradesh, focused closely on the Kullu–Manali / Beas Valley corridor (closer natural aerial viewpoint)
export const HIMACHAL_CENTER = [32.22, 77.185];

// Default zoom levels - closer natural high-altitude aerial perspective showing forests, riverbed, and slopes
export const HIMACHAL_FULL_ZOOM = 12.2;
export const HIMACHAL_DASHBOARD_ZOOM = 12.0;
export const CLUSTER_CENTER = [32.2417, 77.1892];
export const CLUSTER_ZOOM = 13.2;

// Real geographic basemap tile endpoints (100% legitimate natural map tiles)
export const MAP_TILE_PROVIDERS = {
  satellite: {
    id: 'satellite',
    name: 'Satellite',
    title: 'Himalayan Aerial Satellite (Natural Top-Down Photographic View)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 18,
    hasOverlay: true,
    overlayUrl: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  },
  terrain: {
    id: 'terrain',
    name: 'Terrain',
    title: 'Topographic Terrain (Esri World Topo)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 18,
    hasOverlay: false,
    attribution: 'Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, Intermap, METI/NASA'
  },
  standard: {
    id: 'standard',
    name: 'Map',
    title: 'Standard OpenStreetMap (Roads, Rivers & Towns)',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    maxZoom: 19,
    hasOverlay: false,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
};

// Map disclaimers - exact required wording
export const MAP_DISCLAIMERS = {
  dashboard: 'Real geographic basemap. Sensor locations and risk data are simulated prototype data and do not represent deployed sensors or official landslide hazard boundaries.',
  full: 'Real geographic basemap. Sensor locations and risk data are simulated prototype data and do not represent deployed sensors or official landslide hazard boundaries.',
  short: 'Real basemap • Simulated prototype data'
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
  dashboard: 'h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px]',
  full: 'h-[520px] sm:h-[580px] md:h-[640px] lg:h-[700px] xl:h-[740px]'
};
