"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Settings, ChevronDown, ChevronUp } from "lucide-react";

type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true, // Default to true for better UX, user can opt-out
    marketing: true,
  });

  useEffect(() => {
    // Check if user has already accepted cookies
    const storedConsent = localStorage.getItem("mednova-cookie-consent");
    if (!storedConsent) {
      // Small delay to make the entrance smoother
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
        // If they have saved preferences, we could load them here if we had a settings page
        // const parsed = JSON.parse(storedConsent);
        // setPreferences(parsed);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    saveConsent(allAccepted);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem("mednova-cookie-consent", JSON.stringify({
      ...prefs,
      timestamp: new Date().toISOString(),
    }));
    // Provide backwards compatibility or just a simple flag for simple checks
    localStorage.setItem("mednova-policy-agreed", "true"); 
    
    setIsVisible(false);
    setShowPreferences(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Cannot toggle essential
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible && !showPreferences) return null;

  // Render the Preferences Modal
  if (showPreferences) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">Cookie Preferences</h2>
            <button 
              onClick={() => setShowPreferences(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            <p className="text-sm text-gray-600">
              Manage your cookie preferences here. Essential cookies are necessary for the website to function properly.
            </p>

            {/* Essential */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Essential Cookies</h3>
                <p className="text-xs text-gray-500">Required for basic site functionality.</p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary/40 cursor-not-allowed">
                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Analytics Cookies</h3>
                <p className="text-xs text-gray-500">Help us understand how visitors interact with our website.</p>
              </div>
              <button 
                onClick={() => togglePreference('analytics')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${preferences.analytics ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <span className={`${preferences.analytics ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
              </button>
            </div>

            {/* Marketing */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Marketing Cookies</h3>
                <p className="text-xs text-gray-500">Used to deliver relevant advertisements and track performance.</p>
              </div>
              <button 
                onClick={() => togglePreference('marketing')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${preferences.marketing ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <span className={`${preferences.marketing ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
              </button>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-3 justify-end">
             <button
              onClick={() => setShowPreferences(false)}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePreferences}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render the Main Banner
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-7xl flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <div className="flex-1 text-sm text-gray-600 leading-relaxed md:text-base text-center lg:text-left">
          <p>
            We use cookies to enhance your experience. By continuing to visit this site, you agree to our{" "}
            <Link href="/terms" className="text-primary font-medium hover:underline underline-offset-2">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary font-medium hover:underline underline-offset-2">
              Privacy Policy
            </Link>.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
          <button
            onClick={() => setShowPreferences(true)}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all whitespace-nowrap"
          >
            Manage Preferences
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-8 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 active:scale-95 whitespace-nowrap"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
