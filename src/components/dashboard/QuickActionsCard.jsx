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

export const QuickActionsCard = () => {
  return (
    <Card 
      title="Quick Actions" 
      subtitle="Fast operational navigation"
      className="min-w-0 flex flex-col justify-between"
    >
      <div className="space-y-2 pt-1 text-xs">
        <Link
          to="/sensors"
          className="min-h-[44px] w-full px-3.5 py-2.5 rounded-xl bg-forest-50 dark:bg-forest-950/70 hover:bg-forest-100 dark:hover:bg-forest-900/60 border border-forest-200 dark:border-forest-800/80 text-forest-800 dark:text-nature-300 font-semibold flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-forest-600 dark:text-nature-400" />
            <span>Live Sensors</span>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </Link>

        <Link
          to="/risk-analysis"
          className="min-h-[44px] w-full px-3.5 py-2.5 rounded-xl bg-forest-50 dark:bg-forest-950/70 hover:bg-forest-100 dark:hover:bg-forest-900/60 border border-forest-200 dark:border-forest-800/80 text-forest-800 dark:text-nature-300 font-semibold flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <BrainCircuit className="w-4 h-4 text-forest-600 dark:text-nature-400" />
            <span>Analyze Risk</span>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </Link>

        <Link
          to="/map"
          className="min-h-[44px] w-full px-3.5 py-2.5 rounded-xl bg-forest-50 dark:bg-forest-950/70 hover:bg-forest-100 dark:hover:bg-forest-900/60 border border-forest-200 dark:border-forest-800/80 text-forest-800 dark:text-nature-300 font-semibold flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Compass className="w-4 h-4 text-forest-600 dark:text-nature-400" />
            <span>Monitoring Map</span>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </Link>

        <Link
          to="/alerts"
          className="min-h-[44px] w-full px-3.5 py-2.5 rounded-xl bg-forest-50 dark:bg-forest-950/70 hover:bg-forest-100 dark:hover:bg-forest-900/60 border border-forest-200 dark:border-forest-800/80 text-forest-800 dark:text-nature-300 font-semibold flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span>View Alerts</span>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </Link>

        <Link
          to="/reports"
          className="min-h-[44px] w-full px-3.5 py-2.5 rounded-xl bg-forest-50 dark:bg-forest-950/70 hover:bg-forest-100 dark:hover:bg-forest-900/60 border border-forest-200 dark:border-forest-800/80 text-forest-800 dark:text-nature-300 font-semibold flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-forest-600 dark:text-nature-400" />
            <span>Generate Report</span>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </Link>
      </div>
    </Card>
  );
};

export default QuickActionsCard;
