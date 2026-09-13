import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Mountain,
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Building2, 
  Loader2, 
  Sparkles, 
  AlertCircle,
  Home,
  CheckCircle2,
  ShieldCheck,
  Compass
} from 'lucide-react';
import ThemeToggle from '../components/layout/ThemeToggle';
import { useAuth, DEMO_CREDENTIALS } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import himalayasBg from '../assets/himalayas.jpg';
import BrandLogo, { BrandIcon } from '../components/common/BrandLogo';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const { toast } = useToast();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already authenticated, redirect to dashboard or return destination
  useEffect(() => {
    if (isAuthenticated) {
      const destination = location.state?.from?.pathname || '/dashboard';
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleFillDemo = () => {
    setUsername(DEMO_CREDENTIALS.username);
    setPassword(DEMO_CREDENTIALS.password);
    setErrorMessage('');
    toast.info('Default demo credentials applied: admin / admin123', 'Demo Credentials');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    toast.info('Password recovery is not connected in this prototype.', 'Prototype Notice');
  };

  const handleOrgLogin = (e) => {
    e.preventDefault();
    toast.info('Organization authentication will be connected in a future backend stage.', 'Prototype Notice');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    // Brief deterministic delay for professional feedback
    await new Promise((resolve) => setTimeout(resolve, 350));

    const result = await login(username, password, rememberMe);

    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}`, 'Signed in successfully');
      const destination = location.state?.from?.pathname || '/dashboard';
      navigate(destination, { replace: true });
    } else {
      setErrorMessage(result.error || 'Authentication failed. Please check credentials.');
      toast.error(result.error || 'Invalid credentials', 'Sign In Failed');
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full max-w-full overflow-x-hidden relative flex flex-col justify-between text-stone-100 transition-colors duration-300 box-border bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${himalayasBg})`
      }}
    >
      {/* 
        Subtle Natural Gradient Overlay:
        - Enhances contrast and text readability while keeping the majestic snow-covered peaks, 
          golden morning light, and forested slopes clearly visible.
      */}
      <div 
        className="absolute inset-0 pointer-events-none transition-colors duration-300 bg-gradient-to-r from-stone-950/80 via-forest-950/50 to-stone-950/75 dark:from-stone-950/90 dark:via-forest-950/65 dark:to-stone-950/85"
        aria-hidden="true"
      />

      {/* TOP HEADER */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 flex items-center justify-between min-w-0">
        {/* Left: Home / Landing Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-xs font-semibold text-stone-200 hover:text-white backdrop-blur-md transition-all shadow-xs"
        >
          <Home className="w-3.5 h-3.5 text-nature-400" />
          <span>Landing Page</span>
        </Link>

        {/* Right: Top-Right Micro Label + Single Central Theme Toggle */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Micro Label: RESILIENT MOUNTAINS • STRONGER TOMORROWS */}
          <div className="hidden md:flex flex-col text-right font-mono tracking-widest text-[10px] text-stone-300/80 uppercase font-semibold leading-tight select-none">
            <span>RESILIENT MOUNTAINS</span>
            <span className="text-nature-300">STRONGER TOMORROWS</span>
          </div>

          <div className="h-4 w-px bg-white/20 hidden md:block" />

          {/* EXACT ONE THEME TOGGLE */}
          <div className="p-1 rounded-2xl bg-black/40 border border-white/20 backdrop-blur-md shadow-xs">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA: 2-Column Responsive Layout */}
      <main className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-w-0">
        
        {/* LEFT COLUMN: Landslide Guard Branding & Environmental Mission */}
        <div className="lg:col-span-6 xl:col-span-7 space-y-6 text-left">
          
          {/* Brand Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-900/60 border border-[#39B86A]/30 text-[#86efac] text-xs font-semibold backdrop-blur-md shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#39B86A]" />
              <span>Autonomous Geotechnical Early Warning</span>
            </div>

            <BrandLogo 
              variant="horizontal" 
              theme="dark" 
              size="xl" 
              showTagline={true} 
            />

            <p className="text-xs sm:text-sm text-stone-300 font-medium">
              AI-Powered Landslide Early Warning System Using Real-Time IoT Telemetry
            </p>
          </div>

          {/* Brand Environmental Message */}
          <div className="pt-2 sm:pt-4 space-y-3">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-white leading-tight drop-shadow-sm max-w-xl">
              Protecting Communities Before the Ground Moves
            </h3>

            <p className="text-xs sm:text-sm lg:text-base text-stone-200/90 leading-relaxed max-w-lg drop-shadow-xs">
              Monitor environmental conditions, analyze ground stability and identify changing landslide risk through connected IoT sensing and intelligent analysis.
            </p>

            {/* Environmental Tagline */}
            <div className="pt-1">
              <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-nature-300/95 bg-black/30 px-3 py-1 rounded-full border border-nature-500/20 backdrop-blur-xs inline-block">
                PEOPLE &bull; MOUNTAINS &bull; SAFER COMMUNITIES
              </span>
            </div>
          </div>

          {/* Geographic Location Reference (Clearly Labeled as Prototype) */}
          <div className="pt-4 flex items-center gap-2.5 text-xs text-stone-300/90 font-mono">
            <div className="w-2 h-2 rounded-full bg-nature-400 animate-pulse flex-shrink-0" />
            <div>
              <strong className="text-white font-semibold block font-sans text-xs">
                Himalayan Monitoring Region
              </strong>
              <span className="text-[11px] text-stone-300/80">
                Environmental monitoring prototype (illustrative simulation)
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Modern Glass-Style Login Card */}
        <div className="lg:col-span-6 xl:col-span-5 w-full flex justify-center lg:justify-end min-w-0">
          <div className="w-full max-w-md rounded-3xl bg-[#0c1c13]/85 dark:bg-[#07130c]/90 backdrop-blur-md sm:backdrop-blur-xl border border-white/15 dark:border-forest-700/40 shadow-2xl shadow-black/70 p-6 sm:p-8 text-white min-w-0">
            
            {/* Login Card Header */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <BrandIcon mode="dark" className="w-9 h-10" />
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] text-[#86efac] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#39B86A]" />
                  <span>Operator Console</span>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Welcome Back
              </h2>
              <p className="text-xs sm:text-sm text-stone-300/90 mt-1">
                Sign in to access Landslide Guard
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div 
                role="alert"
                className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 flex items-start gap-2.5 text-xs animate-shake"
              >
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Username / Email Field (52-56px height) */}
              <div>
                <label 
                  htmlFor="username-input" 
                  className="block text-stone-200 font-semibold mb-1.5 text-xs"
                >
                  Username / Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="username-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    autoComplete="username"
                    className="min-h-[52px] sm:min-h-[54px] w-full pl-11 pr-4 py-3 rounded-2xl bg-black/40 border border-white/15 focus:border-nature-400 text-white placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-nature-500/40 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Field (52-56px height) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label 
                    htmlFor="password-input" 
                    className="block text-stone-200 font-semibold text-xs"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] text-nature-300 hover:text-nature-200 hover:underline font-medium focus:outline-none"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="min-h-[52px] sm:min-h-[54px] w-full pl-11 pr-11 py-3 rounded-2xl bg-black/40 border border-white/15 focus:border-nature-400 text-white placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-nature-500/40 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="min-h-[44px] min-w-[44px] absolute right-1 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white flex items-center justify-center focus:outline-none transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-nature-600 focus:ring-nature-500 border-white/20 bg-black/40 cursor-pointer"
                  />
                  <span className="text-stone-300 font-medium text-xs">
                    Remember me
                  </span>
                </label>
              </div>

              {/* Primary Sign In Button (52-56px height, natural green accent) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="min-h-[52px] sm:min-h-[54px] w-full mt-2 py-3.5 rounded-2xl bg-nature-600 hover:bg-nature-500 disabled:bg-nature-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-nature-600/30 transition-all cursor-pointer disabled:cursor-wait"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* OR Divider */}
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <span className="relative px-3 bg-[#0c1c13] dark:bg-[#07130c] text-[10px] font-mono uppercase tracking-wider text-stone-400">
                  OR
                </span>
              </div>

              {/* Organization Login Button */}
              <button
                type="button"
                onClick={handleOrgLogin}
                className="min-h-[48px] w-full py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-stone-200 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4 text-stone-300" />
                <span>Continue with Organization Login</span>
              </button>
            </form>

            {/* Subtle Demo Credentials Access Panel */}
            <div className="mt-5 p-3 rounded-2xl bg-black/30 border border-white/10 text-xs">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 font-bold text-nature-300 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-nature-400" />
                  <span>Prototype Access</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-[10px] font-bold text-nature-300 hover:text-nature-200 hover:underline px-2 py-0.5 rounded bg-nature-500/20 border border-nature-500/30"
                >
                  Auto-fill Demo
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-stone-300 mt-1.5 p-2 rounded-xl bg-black/40 border border-white/10">
                <div>
                  <span className="text-stone-400 text-[10px] block uppercase font-sans font-bold">Username</span>
                  <span className="font-semibold text-white">admin</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] block uppercase font-sans font-bold">Password</span>
                  <span className="font-semibold text-white">admin123</span>
                </div>
              </div>

              <p className="text-[10px] text-stone-400 mt-1.5">
                Demo credentials &mdash; frontend prototype only.
              </p>
            </div>

            {/* Prototype Notice */}
            <div className="mt-4 pt-3 border-t border-white/10 text-center">
              <span className="block text-[11px] font-bold text-stone-300 font-sans">
                Prototype Authentication
              </span>
              <p className="text-[10px] text-stone-400 leading-relaxed mt-0.5">
                This interface demonstrates frontend access control for the Landslide Guard project. Production authentication is not connected.
              </p>
            </div>

          </div>
        </div>

      </main>

      {/* FOOTER BAR WITH BOTTOM-RIGHT MICRO LABEL */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left min-w-0">
        <div className="text-[11px] text-stone-300/80">
          Landslide Guard &bull; Autonomous Geotechnical Early Warning
        </div>

        {/* Bottom-Right Micro Label */}
        <div className="font-mono tracking-widest text-[10px] sm:text-[11px] text-stone-300/80 uppercase font-semibold">
          EARLY WARNING &bull; SMARTER DECISIONS &bull; SAFER COMMUNITIES
        </div>
      </footer>

    </div>
  );
};

export default Login;
