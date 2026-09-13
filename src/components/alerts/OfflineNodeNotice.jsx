import React from 'react';
import { WifiOff, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import { OFFLINE_NODE_NOTICE } from '../../data/mockAlerts';

export const OfflineNodeNotice = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 rounded-2xl border border-stone-300 dark:border-stone-700/70 bg-stone-100/70 dark:bg-forest-950/40 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Device Offline Alert Info */}
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-stone-200 dark:bg-forest-900 flex items-center justify-center text-stone-600 dark:text-stone-300 flex-shrink-0 mt-0.5">
            <WifiOff className="w-4 h-4" />
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Network Telemetry Status
              </span>
              <span className="text-stone-300 dark:text-stone-600">&bull;</span>
              <StatusBadge status="System Warning" label="SYSTEM WARNING" />
            </div>

            <h4 className="text-sm sm:text-base font-bold font-heading text-stone-900 dark:text-white">
              {OFFLINE_NODE_NOTICE.title}: {OFFLINE_NODE_NOTICE.node} — {OFFLINE_NODE_NOTICE.location}
            </h4>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {OFFLINE_NODE_NOTICE.details} Last communication was <strong className="font-mono">{OFFLINE_NODE_NOTICE.lastCommunication}</strong>.
            </p>

            <div className="p-2 rounded-lg bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mt-1">
              <Info className="w-3.5 h-3.5 flex-shrink-0" />
              <span>
                <strong>System distinction:</strong> This station is isolated due to RF link loss; it does not indicate a geotechnical slope failure.
              </span>
            </div>
          </div>
        </div>

        {/* Right: Inspect Station Action */}
        <div className="flex-shrink-0 self-start sm:self-center">
          <button
            type="button"
            onClick={() => navigate('/sensors')}
            className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-forest-900 hover:bg-stone-50 dark:hover:bg-forest-800 border border-stone-200 dark:border-forest-700 text-stone-800 dark:text-stone-200 transition-colors flex items-center justify-center gap-1.5 shadow-xs w-full sm:w-auto"
          >
            <span>Inspect in Sensors</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflineNodeNotice;
