import React, { useState } from 'react';
import { 
  Bell, 
  Pill, 
  HeartPulse, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  CheckCheck, 
  Clock, 
  Sparkles,
  Zap,
  Filter
} from 'lucide-react';

export default function NotificationsCenter({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onDeleteNotification, 
  onSimulateNotification,
  setActiveTab 
}) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'medicine' | 'vital' | 'caregiver' | 'alert'

  const filtered = notifications.filter(n => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  const typeConfig = {
    medicine: {
      icon: Pill,
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      text: 'text-teal-700',
      iconColor: 'text-teal-600',
      badge: 'Medicine Reminder'
    },
    vital: {
      icon: HeartPulse,
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-700',
      iconColor: 'text-rose-600',
      badge: 'Vital Reading'
    },
    caregiver: {
      icon: Users,
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      text: 'text-sky-700',
      iconColor: 'text-sky-600',
      badge: 'Caregiver Tele-Sync'
    },
    alert: {
      icon: AlertTriangle,
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      iconColor: 'text-amber-600',
      badge: 'Missed Dose Alert'
    },
    checkup: {
      icon: Clock,
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-700',
      iconColor: 'text-indigo-600',
      badge: 'Daily Health Check'
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Bar */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-soft border border-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
            <Bell className="w-4 h-4" />
            <span>Alerts & Real-Time Telemetry Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            System Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Stay informed with medication alarms, clinical vital fluctuations, and caregiver updates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onSimulateNotification('medicine')}
            className="px-3.5 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Simulate reminder for demonstration"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Simulate Dose Alarm</span>
          </button>

          <button
            onClick={() => onSimulateNotification('vital')}
            className="px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Simulate vital spike for demonstration"
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Simulate Vital Alert</span>
          </button>

          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
            >
              <CheckCheck className="w-4 h-4 text-teal-400" />
              <span>Mark All as Read ({unreadCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 glass-panel p-3 rounded-2xl shadow-soft">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterType === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Notifications ({notifications.length})
        </button>

        <button
          onClick={() => setFilterType('medicine')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterType === 'medicine'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Medicine Reminders
        </button>

        <button
          onClick={() => setFilterType('vital')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterType === 'vital'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Vital Readings
        </button>

        <button
          onClick={() => setFilterType('caregiver')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterType === 'caregiver'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Caregiver Sync
        </button>

        <button
          onClick={() => setFilterType('alert')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterType === 'alert'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Missed Dose Alerts
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">Inbox Clean & Up to Date</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No notifications matching this filter category. Use the simulation buttons above to preview live alerts during your demonstration!
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const conf = typeConfig[item.type] || typeConfig.checkup;
            const Icon = conf.icon;

            return (
              <div
                key={item.id}
                className={`glass-panel p-5 sm:p-6 rounded-3xl border transition-all duration-200 flex flex-col sm:flex-row items-start justify-between gap-4 ${
                  item.unread
                    ? 'border-sky-300 bg-sky-50/20 shadow-soft'
                    : 'border-white opacity-85 hover:opacity-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${conf.bg} ${conf.text} flex items-center justify-center shrink-0 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${conf.bg} ${conf.text} border ${conf.border}`}>
                        {item.category || conf.badge}
                      </span>
                      {item.unread && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                      )}
                      <span className="text-xs text-slate-400 font-mono">{item.time}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-800">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {item.type === 'medicine' && (
                    <button
                      onClick={() => { setActiveTab('medicines'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold transition-colors"
                    >
                      Open Schedule
                    </button>
                  )}

                  {item.unread && (
                    <button
                      onClick={() => onMarkAsRead(item.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    >
                      Mark Read
                    </button>
                  )}

                  <button
                    onClick={() => onDeleteNotification(item.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Dismiss"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
