import React, { useState, useMemo } from 'react';
import MapHeader from '../components/map/MapHeader';
import MapSearchBar from '../components/map/MapSearchBar';
import MonitoringMap from '../components/map/MonitoringMap';
import MapNodeDetailsPanel from '../components/map/MapNodeDetailsPanel';
import MapBottomSummary from '../components/map/MapBottomSummary';
import { useSensorContext } from '../context/SensorContext';
import { getOnlineNodeCount } from '../utils/dataSelectors';
import { filterMapNodes } from '../utils/mapFilterUtils';
import { HIMACHAL_CENTER, HIMACHAL_FULL_ZOOM } from '../components/map/mapConfig';

export const MonitoringMapPage = () => {
  const { 
    nodes, 
    lastUpdatedText, 
    isRefreshing, 
    manualRefresh 
  } = useSensorContext();

  // Default to elevated NODE-05 (High Risk) matching reference image
  const [selectedNodeId, setSelectedNodeId] = useState('NODE-05');
  const [nodeFilter, setNodeFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentLayer, setCurrentLayer] = useState('satellite');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState(null);

  // Selected node object derived from live state (updates in real-time)
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return nodes.find(n => n.id === selectedNodeId) || null;
  }, [nodes, selectedNodeId]);

  // Combined filtered nodes based on Node, Risk, and Status filters (boolean AND)
  const filteredNodes = useMemo(() => {
    return filterMapNodes(nodes, {
      nodeFilter,
      riskFilter,
      statusFilter
    });
  }, [nodes, nodeFilter, riskFilter, statusFilter]);

  const handleNodeFilterChange = (val) => {
    setNodeFilter(val);
    if (val !== 'all') {
      setSelectedNodeId(val);
      const target = nodes.find(n => n.id === val);
      if (target) {
        const lat = target.latitude ?? target.location?.latitude ?? 32.2417;
        const lng = target.longitude ?? target.location?.longitude ?? 77.1892;
        // Offset latitude slightly north (+0.02) so popup stays comfortably below top toolbar
        setSearchTarget({ lat: lat + 0.02, lng, zoom: 12.8 });
      }
    } else {
      setSelectedNodeId(null);
      setSearchTarget({ lat: HIMACHAL_CENTER[0], lng: HIMACHAL_CENTER[1], zoom: HIMACHAL_FULL_ZOOM });
    }
  };

  const handleReset = () => {
    setNodeFilter('all');
    setRiskFilter('all');
    setStatusFilter('all');
    setCurrentLayer('satellite');
    setSelectedNodeId(null);
    setSearchQuery('');
    setSearchTarget({ lat: HIMACHAL_CENTER[0], lng: HIMACHAL_CENTER[1], zoom: HIMACHAL_FULL_ZOOM });
  };

  const handleSelectPlace = (place) => {
    setSearchTarget({ lat: place.lat, lng: place.lng, zoom: 12.5 });
    setSearchQuery(place.name);
  };

  const handleSelectNodeById = (id) => {
    const target = nodes.find(n => n.id.toLowerCase() === id.toLowerCase());
    if (target) {
      handleNodeFilterChange(target.id);
    }
  };

  const handleSelectNode = (node) => {
    if (!node) {
      setSelectedNodeId(null);
      return;
    }
    setSelectedNodeId(node.id);
    const lat = node.latitude ?? node.location?.latitude ?? 32.2417;
    const lng = node.longitude ?? node.location?.longitude ?? 77.1892;
    setSearchTarget({ lat: lat + 0.02, lng, zoom: 12.8 });
  };

  const onlineCount = getOnlineNodeCount(nodes);
  const totalCount = nodes.length;
  const offlineCount = totalCount - onlineCount;

  // Node with highest risk (NODE-05)
  const highestRiskNode = useMemo(() => {
    return [...nodes].sort((a, b) => (b.risk?.score || 0) - (a.risk?.score || 0))[0] || nodes[4];
  }, [nodes]);

  return (
    <div className="space-y-4 max-w-[1560px] mx-auto pb-10 w-full min-w-0">
      
      {/* 1. Page Header */}
      <MapHeader 
        onlineCount={onlineCount}
        totalCount={totalCount}
        lastUpdatedText={lastUpdatedText}
        isRefreshing={isRefreshing}
        onRefresh={manualRefresh}
      />

      {/* 2. Top Search Bar matching reference image */}
      <MapSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectPlace={handleSelectPlace}
        onSelectNodeById={handleSelectNodeById}
      />

      {/* 3. Main Map & Selected Node Panel Layout (Desktop: 2-column, Mobile: Stacked) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full min-w-0 items-start">
        
        {/* Real Himalayan Leaflet Map with Floating Top Toolbar & Controls */}
        <div className="lg:col-span-9 xl:col-span-9 w-full min-w-0">
          <MonitoringMap
            layer={currentLayer}
            onLayerChange={setCurrentLayer}
            nodes={filteredNodes}
            selectedNode={selectedNode}
            onSelectNode={handleSelectNode}
            nodeFilter={nodeFilter}
            onNodeFilterChange={handleNodeFilterChange}
            riskFilter={riskFilter}
            onRiskFilterChange={setRiskFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onResetView={handleReset}
            searchTarget={searchTarget}
          />
        </div>

        {/* Right-side Selected Node Panel */}
        <div className="lg:col-span-3 xl:col-span-3 w-full min-w-0">
          <MapNodeDetailsPanel
            node={selectedNode}
            onClose={() => setSelectedNodeId(null)}
          />
        </div>

      </div>

      {/* 4. Bottom Monitoring Summary Bar matching reference image */}
      <MapBottomSummary
        totalCount={totalCount}
        onlineCount={onlineCount}
        offlineCount={offlineCount}
        highestRiskNode={highestRiskNode}
      />

    </div>
  );
};

export default MonitoringMapPage;
