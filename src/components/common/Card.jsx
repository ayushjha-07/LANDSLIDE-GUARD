import React from 'react';

export const Card = ({ children, className = "", title, action, subtitle, ...rest }) => {
  return (
    <div {...rest} className={`bg-white dark:bg-[#1A202C] rounded-2xl border border-[#E2E8F0] dark:border-[#2D3748] shadow-soft p-4 sm:p-5 md:p-6 transition-colors duration-200 w-full min-w-0 box-border overflow-hidden ${className}`}>
      {(title || action) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#EDF2F7] dark:border-[#2D3748]/60 min-w-0">
          <div className="min-w-0 flex-1">
            {title && (
              <h3 className="text-base sm:text-lg font-semibold font-heading text-[#1A202C] dark:text-white truncate">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[#718096] dark:text-slate-400 mt-0.5 line-clamp-2">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex-shrink-0 self-start sm:self-center">{action}</div>}
        </div>
      )}
      <div className="w-full min-w-0">
        {children}
      </div>
    </div>
  );
};

export default Card;
