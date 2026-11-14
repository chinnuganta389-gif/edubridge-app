import React, { useState } from 'react';
import { 
  HeartPulse, 
  Activity, 
  Pill, 
  Users, 
  FileText, 
  Bell, 
  Info, 
  PhoneCall, 
  Menu, 
  X, 
  Radio, 
  ShieldAlert,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  isLiveSimulating, 
  toggleLiveSimulation,
  unreadCount,
  onTriggerSOS
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Activity },
    { id: 'dashboard', label: 'Patient Dashboard', icon: HeartPulse },
    { id: 'medicines', label: 'Medicine Reminders', icon: Pill },
    { id: 'caregiver', label: 'Caregiver Portal', icon: Users },
    { id: 'reports', label: 'Health Reports', icon: FileText },
    { id: 'notifications', label: 'Alerts', icon: Bell, badge: unreadCount },
    { id: 'about', label: 'About Project', icon: Info },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-400 text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform duration-300">
              <HeartPulse className="w-6 h-6 animate-heartbeat" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-sky-700 via-sky-600 to-teal-600 bg-clip-text text-transparent">
                  SmartHealth
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-700 rounded-md">
                  Pro
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider bg-sky-100 text-sky-800 rounded-md border border-sky-200">
                  Batch_22
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                IoT Vitals & Medication Adherence • Batch_22
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                      isActive ? 'bg-white text-sky-600' : 'bg-rose-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Top Actions: Telemetry Switch & SOS */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live Sensor Simulation Toggle */}
            <button
              onClick={toggleLiveSimulation}
              title="Toggle Live IoT Sensor Simulation"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
                isLiveSimulating 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm' 
                  : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <span className="relative flex h-2 w-2">
                {isLiveSimulating && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isLiveSimulating ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
              </span>
              <span>{isLiveSimulating ? 'Live IoT Stream: ON' : 'Telemetry Paused'}</span>
            </button>

            {/* Notification Quick Bell */}
            <button
              onClick={() => handleNavClick('notifications')}
              className="relative p-2.5 rounded-xl border border-slate-200 bg-white/80 hover:bg-sky-50 hover:border-sky-300 text-slate-600 hover:text-sky-600 transition-colors shadow-sm"
              title="View Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Emergency SOS Button */}
            <button
              onClick={onTriggerSOS}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white text-xs font-bold shadow-md shadow-rose-500/25 hover:shadow-lg hover:shadow-rose-500/35 transition-all duration-200"
            >
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              <span>SOS Alert</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => handleNavClick('notifications')}
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl transition-all">
          <div className="space-y-1 mb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 ? (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={toggleLiveSimulation}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 text-xs font-semibold"
            >
              <Radio className="w-4 h-4 text-emerald-600" />
              <span>{isLiveSimulating ? 'Live IoT Stream (Active)' : 'Resume IoT Stream'}</span>
            </button>

            <button
              onClick={() => {
                onTriggerSOS();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-500/20"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Trigger Caregiver SOS Alert</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
