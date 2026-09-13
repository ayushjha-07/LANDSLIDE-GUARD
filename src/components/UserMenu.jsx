import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const UserMenu = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const displayName = user?.name || "Ayush Jha";
  const displayRole = user?.role || "Project Administrator";
  const displayInitials = user?.initials || "AJ";

  // Handle outside clicks and Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSignOut = () => {
    setIsOpen(false);
    logout();
    toast.info('Signed out successfully', 'Session Ended');
    navigate('/login');
  };

  return (
    <div className="relative pl-1 sm:pl-2 border-l border-[#E2E8F0] dark:border-[#2D3748]" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="min-w-[44px] min-h-[44px] flex items-center gap-2 p-1 sm:px-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-forest-500/40"
        aria-label="User profile and session menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-[#10233F] dark:bg-[#1a2e4c] text-white flex items-center justify-center font-bold text-xs shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 flex-shrink-0">
          {displayInitials}
        </div>
        <div className="hidden lg:block text-left pr-1 min-w-0">
          <div className="text-xs font-semibold text-[#1A202C] dark:text-slate-100 truncate">
            {displayName}
          </div>
          <div className="text-[10.5px] text-[#718096] dark:text-slate-400 font-normal truncate">
            {displayRole}
          </div>
        </div>
        <ChevronDown className={`hidden lg:block w-3.5 h-3.5 text-[#718096] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/20 sm:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div 
            className="fixed sm:absolute right-4 sm:right-0 top-16 sm:top-full sm:mt-2 w-[calc(100vw-32px)] sm:w-64 rounded-2xl bg-white dark:bg-[#1A202C] border border-[#E2E8F0] dark:border-[#2D3748] shadow-xl z-50 p-2 text-xs divide-y divide-stone-100 dark:divide-forest-900/60"
            role="menu"
            aria-orientation="vertical"
          >
            {/* Header info */}
            <div className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-nature-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-forest-600 dark:text-nature-400">
                  Active Session
                </span>
              </div>
              <p className="font-bold text-sm text-[#1A202C] dark:text-white truncate">
                {displayName}
              </p>
              <p className="text-[11px] text-[#718096] dark:text-slate-400 font-medium truncate">
                {displayRole}
              </p>
              <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-forest-50 dark:bg-forest-950/80 border border-forest-200 dark:border-forest-800 text-[10px] text-forest-700 dark:text-nature-400 font-mono">
                <Shield className="w-3 h-3 text-forest-600 dark:text-nature-400" />
                <span>Prototype Account</span>
              </div>
            </div>

            {/* Menu options */}
            <div className="py-1.5 space-y-0.5">
              <Link 
                to="/settings" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 min-h-[40px] px-3 rounded-xl text-[#2D3748] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors font-medium"
                role="menuitem"
              >
                <User className="w-4 h-4 text-stone-400" />
                <span>Profile</span>
              </Link>
              <Link 
                to="/settings" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 min-h-[40px] px-3 rounded-xl text-[#2D3748] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors font-medium"
                role="menuitem"
              >
                <Settings className="w-4 h-4 text-stone-400" />
                <span>Settings</span>
              </Link>
            </div>

            {/* Sign Out Action */}
            <div className="pt-1.5">
              <button 
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 min-h-[40px] px-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors font-semibold text-left"
                role="menuitem"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
