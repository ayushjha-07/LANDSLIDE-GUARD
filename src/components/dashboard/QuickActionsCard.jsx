import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  BrainCircuit, 
  Compass, 
  AlertTriangle, 
  FileText, 
  ChevronRight 
} from 'lucide-react';
import Card from '../common/Card';
import controlRoomImg from '../../assets/control_room_center.jpg';

export const QuickActionsCard = () => {
  return (
    <Card 
      title="Quick Actions" 
      subtitle="Fast operational navigation"
      className="min-w-0 flex flex-col"
    >
      <div className="space-y-3 pt-1 text-xs">
        {/* Disaster & Environmental Monitoring Control Room Banner - Equal aspect-video ratio */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xs border border-stone-200/70 dark:border-forest-900/60 group bg-stone-100 dark:bg-[#0c1813]">
          <img 
            src={controlRoomImg} 
            alt="Environmental monitoring and disaster management control room" 
            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" />
          
          {/* Operations Command Center Tag */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-medium text-white border border-white/15 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-400 dark:bg-nature-400 animate-pulse" />
            <span>Operations Command Center</span>
          </div>
        </div>

        {/* 5 Operational Quick Action Buttons */}
        <div className="space-y-1.5 text-xs">
          <Link
            to="/sensors"
            className="min-h-[40px] sm:min-h-[42px] w-full px-3 py-2 rounded-xl bg-forest-50 dark:bg-forest-950/70 hover:bg-forest-100 dark:hover:bg-forest-900/60 border border-forest-200/80 dark:border-forest-800/80 text-forest-800 dark:text-nature-300 font-semibold flex items-center justify-between transition-colors group/btn"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Activity className="w-4 h-4 text-forest-600 dark:text-nature-400 flex-shrink-0 group-hover/btn:scale-110 transition-transform" />
              <span className="text-[11px] sm:text-xs font-semibold leading-tight">Live Sensors</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 flex-shrink-0 ml-1" />
          </Link>

          <Link
            to="/risk-analysis"
            className="min-h-[40px] sm:min-h-[42px] w-full px-3 py-2 rounded-xl bg-forest-50 dark:bg-forest-950/70 hover:bg-forest-100 dark:hover:bg-forest-900/60 border border-forest-200/80 dark:border-forest-800/80 text-forest-800 dark:text-nature-300 font-semibold flex items-center justify-between transition-colors group/btn"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <BrainCircuit className="w-4 h-4 text-forest-600 dark:text-nature-400 flex-shrink-0 group-hover/btn:scale-110 transition-transform" />
              <span className="text-[11px] sm:text-xs font-semibold leading-tight">Analyze Risk</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 flex-shrink-0 ml-1" />
          </Link>

          <Link
            to="/map"
            className="min-h-[40px] sm:min-h-[42px] w-full px-3 py-2 rounded-xl bg-forest-50 dark:bg-forest-950/70 hover:bg-forest-100 dark:hover:bg-forest-900/60 border border-forest-200/80 dark:border-forest-800/80 text-forest-800 dark:text-nature-300 font-semibold flex items-center justify-between transition-colors group/btn"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Compass className="w-4 h-4 text-forest-600 dark:text-nature-400 flex-shrink-0 group-hover/btn:scale-110 transition-transform" />
              <span className="text-[11px] sm:text-xs font-semibold leading-tight">Monitoring Map</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 flex-shrink-0 ml-1" />
          </Link>

          <Link
            to="/alerts"
            className="min-h-[40px] sm:min-h-[42px] w-full px-3 py-2 rounded-xl bg-forest-50 dark:bg-forest-950/70 hover:bg-forest-100 dark:hover:bg-forest-900/60 border border-forest-200/80 dark:border-forest-800/80 text-forest-800 dark:text-nature-300 font-semibold flex items-center justify-between transition-colors group/btn"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 group-hover/btn:scale-110 transition-transform" />
              <span className="text-[11px] sm:text-xs font-semibold leading-tight">View Alerts</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 flex-shrink-0 ml-1" />
          </Link>

          <Link
            to="/reports"
            className="min-h-[40px] sm:min-h-[42px] w-full px-3 py-2 rounded-xl bg-forest-50 dark:bg-forest-950/70 hover:bg-forest-100 dark:hover:bg-forest-900/60 border border-forest-200/80 dark:border-forest-800/80 text-forest-800 dark:text-nature-300 font-semibold flex items-center justify-between transition-colors group/btn"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText className="w-4 h-4 text-forest-600 dark:text-nature-400 flex-shrink-0 group-hover/btn:scale-110 transition-transform" />
              <span className="text-[11px] sm:text-xs font-semibold leading-tight">Generate Report</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 flex-shrink-0 ml-1" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default QuickActionsCard;

