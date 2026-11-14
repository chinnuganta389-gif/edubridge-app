import React, { useState } from 'react';
import { 
  Pill, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  Sun, 
  SunMedium, 
  Sunset, 
  Moon, 
  Filter, 
  History, 
  Trash2, 
  Sparkles,
  ChevronRight,
  Check,
  AlertTriangle
} from 'lucide-react';

export default function MedicineReminder({ 
  medicines, 
  onMarkAsTaken, 
  onMarkAsMissed, 
  onAddMedicine, 
  onDeleteMedicine,
  onNotify 
}) {
  const [activeSlotFilter, setActiveSlotFilter] = useState('all'); // 'all' | 'morning' | 'afternoon' | 'evening' | 'night'
  const [activeStatusFilter, setActiveStatusFilter] = useState('all'); // 'all' | 'pending' | 'taken' | 'missed'
  const [showAddModal, setShowAddModal] = useState(false);

  // New Medicine Form State
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    form: 'Tablet',
    category: 'General Care',
    instructions: '',
    slot: 'morning',
    scheduledTime: '08:00 AM',
    remainingDoses: 30,
    color: 'teal'
  });

  // Calculate summary metrics
  const totalMedicines = medicines.length;
  const takenCount = medicines.filter(m => m.status === 'taken').length;
  const pendingCount = medicines.filter(m => m.status === 'pending').length;
  const missedCount = medicines.filter(m => m.status === 'missed').length;
  const adherencePercent = totalMedicines > 0 ? Math.round((takenCount / totalMedicines) * 100) : 0;

  // Next reminder
  const nextMedicine = medicines.find(m => m.status === 'pending') || medicines[0];

  // Filtering
  const filteredMedicines = medicines.filter(med => {
    const matchesSlot = activeSlotFilter === 'all' || med.slot === activeSlotFilter;
    const matchesStatus = activeStatusFilter === 'all' || med.status === activeStatusFilter;
    return matchesSlot && matchesStatus;
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dosage) return;

    const newMed = {
      id: `med-${Date.now()}`,
      ...formData,
      status: 'pending',
      lastTakenTime: null
    };

    onAddMedicine(newMed);
    setShowAddModal(false);
    setFormData({
      name: '',
      dosage: '',
      form: 'Tablet',
      category: 'General Care',
      instructions: '',
      slot: 'morning',
      scheduledTime: '08:00 AM',
      remainingDoses: 30,
      color: 'teal'
    });

    if (onNotify) {
      onNotify({
        type: 'success',
        title: 'Prescription Added',
        message: `${newMed.name} (${newMed.dosage}) added to ${newMed.slot} schedule.`
      });
    }
  };

  const slotIcons = {
    morning: <Sun className="w-4 h-4 text-amber-500" />,
    afternoon: <SunMedium className="w-4 h-4 text-orange-500" />,
    evening: <Sunset className="w-4 h-4 text-indigo-500" />,
    night: <Moon className="w-4 h-4 text-sky-500" />
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner: Next Medicine Reminder & Today's Adherence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Next Medicine Hero Alert Card */}
        <div className="lg:col-span-8 rounded-3xl bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 text-white p-6 sm:p-8 shadow-soft-lg relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-teal-200" />
                Next Medication Reminder
              </span>
              <span className="text-xs font-semibold bg-emerald-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                Scheduled Today
              </span>
            </div>

            <div>
              <p className="text-white/80 text-xs font-medium">Coming up next:</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                {nextMedicine ? `${nextMedicine.name} (${nextMedicine.dosage})` : 'All Doses Completed'}
              </h2>
              <p className="text-sm text-teal-100 mt-1 max-w-xl">
                {nextMedicine?.instructions || 'Great job! You have taken all scheduled medications for today.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-semibold border border-white/20">
                <Clock className="w-4 h-4 text-teal-300" />
                <span>Scheduled: {nextMedicine ? nextMedicine.scheduledTime : 'Tomorrow 08:00 AM'}</span>
              </div>

              {nextMedicine && nextMedicine.status === 'pending' && (
                <button
                  onClick={() => onMarkAsTaken(nextMedicine.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-md transition-colors"
                >
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Mark as Taken Now</span>
                </button>
              )}
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Adherence Rate Score Meter */}
        <div className="lg:col-span-4 glass-panel p-6 sm:p-7 rounded-3xl shadow-soft border border-white flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Today's Adherence</h3>
              <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full">
                {takenCount} of {totalMedicines} Doses
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-800">{adherencePercent}%</span>
              <span className="text-xs font-semibold text-emerald-600">Compliance Rate</span>
            </div>
          </div>

          {/* Circular / Bar Adherence Indicator */}
          <div className="my-4 space-y-2">
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 h-3 rounded-full transition-all duration-700"
                style={{ width: `${adherencePercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>0% Low</span>
              <span>80% Target</span>
              <span>100% Perfect</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {takenCount} Taken
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> {pendingCount} Pending
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span> {missedCount} Missed
            </span>
          </div>
        </div>

      </div>

      {/* Control Bar: Add Medicine, Filters & Timeline Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-5 rounded-3xl shadow-soft">
        
        {/* Slot Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveSlotFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSlotFilter === 'all'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Day ({totalMedicines})
          </button>
          <button
            onClick={() => setActiveSlotFilter('morning')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSlotFilter === 'morning'
                ? 'bg-white text-amber-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Morning</span>
          </button>
          <button
            onClick={() => setActiveSlotFilter('afternoon')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSlotFilter === 'afternoon'
                ? 'bg-white text-orange-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <SunMedium className="w-3.5 h-3.5 text-orange-500" />
            <span>Afternoon</span>
          </button>
          <button
            onClick={() => setActiveSlotFilter('evening')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSlotFilter === 'evening'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sunset className="w-3.5 h-3.5 text-indigo-500" />
            <span>Evening</span>
          </button>
          <button
            onClick={() => setActiveSlotFilter('night')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSlotFilter === 'night'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-sky-500" />
            <span>Night</span>
          </button>
        </div>

        {/* Right side: Status Filter & Add Button */}
        <div className="flex items-center gap-3">
          <select
            value={activeStatusFilter}
            onChange={(e) => setActiveStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Only</option>
            <option value="taken">Taken Only</option>
            <option value="missed">Missed Only</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      {/* Upcoming Reminders Displayed in Timeline Format */}
      <div className="glass-panel p-6 rounded-3xl shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-500" />
            <span>Today's Dosage Timeline</span>
          </h3>
          <span className="text-xs text-slate-400">Sequential chronometer</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { slot: 'Morning', time: '08:00 AM - 10:00 AM', items: medicines.filter(m => m.slot === 'morning'), icon: Sun, color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200' },
            { slot: 'Afternoon', time: '01:00 PM - 02:30 PM', items: medicines.filter(m => m.slot === 'afternoon'), icon: SunMedium, color: 'text-orange-500', bg: 'bg-orange-50 border-orange-200' },
            { slot: 'Evening', time: '06:30 PM - 08:30 PM', items: medicines.filter(m => m.slot === 'evening'), icon: Sunset, color: 'text-indigo-500', bg: 'bg-indigo-50 border-indigo-200' },
            { slot: 'Night', time: '09:30 PM - 11:00 PM', items: medicines.filter(m => m.slot === 'night'), icon: Moon, color: 'text-sky-500', bg: 'bg-sky-50 border-sky-200' }
          ].map((period, idx) => {
            const Icon = period.icon;
            return (
              <div key={idx} className={`p-4 rounded-2xl border ${period.bg} space-y-3`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${period.color}`} />
                    <span className="text-xs font-bold text-slate-800">{period.slot}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{period.time}</span>
                </div>

                <div className="space-y-1.5">
                  {period.items.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No doses scheduled</p>
                  ) : (
                    period.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between text-xs bg-white/90 p-2 rounded-xl border border-slate-100 shadow-2xs">
                        <span className="font-semibold text-slate-700 truncate max-w-[120px]">{item.name}</span>
                        {item.status === 'taken' ? (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Taken</span>
                        ) : item.status === 'missed' ? (
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">Missed</span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Pending</span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Medicine Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map((med) => {
          const isTaken = med.status === 'taken';
          const isMissed = med.status === 'missed';

          return (
            <div
              key={med.id}
              className={`glass-panel p-6 rounded-3xl shadow-soft hover:shadow-soft-lg transition-all duration-300 border flex flex-col justify-between ${
                isTaken
                  ? 'border-emerald-200/80 bg-emerald-50/20'
                  : isMissed
                  ? 'border-rose-200/80 bg-rose-50/20'
                  : 'border-white hover:border-sky-200'
              }`}
            >
              <div className="space-y-4">
                
                {/* Header: Category & Status */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                    {med.category}
                  </span>

                  {isTaken ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Taken
                    </span>
                  ) : isMissed ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      Missed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Upcoming
                    </span>
                  )}
                </div>

                {/* Medicine Title & Dosage */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 shadow-sm">
                    <Pill className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-800">{med.name}</h3>
                    <p className="text-xs font-bold text-sky-600">{med.dosage} • {med.form}</p>
                  </div>
                </div>

                {/* Instructions */}
                <p className="text-xs text-slate-600 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-100">
                  {med.instructions || 'Take as indicated on prescription packaging.'}
                </p>

                {/* Schedule slot & Remaining pills info */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    {slotIcons[med.slot]}
                    <span className="capitalize">{med.slot} ({med.scheduledTime})</span>
                  </div>
                  <div className="text-right text-slate-500">
                    Stock: <span className="font-semibold text-slate-700">{med.remainingDoses} doses</span>
                  </div>
                </div>

                {med.lastTakenTime && (
                  <p className="text-[11px] text-emerald-600 font-medium">
                    Confirmed taken at {med.lastTakenTime}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                {isTaken ? (
                  <button
                    onClick={() => onMarkAsMissed(med.id)}
                    className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Reset Status
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => onMarkAsTaken(med.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all"
                    >
                      <Check className="w-4 h-4" />
                      <span>Mark as Taken</span>
                    </button>
                    <button
                      onClick={() => onMarkAsMissed(med.id)}
                      className="px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                      title="Mark as Missed"
                    >
                      Missed
                    </button>
                  </>
                )}

                <button
                  onClick={() => onDeleteMedicine(med.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Remove medication"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Add New Prescription</h3>
                  <p className="text-xs text-slate-500">Configure dosage schedule and reminder slot</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Amlodipine"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Dosage *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 mg"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Form
                  </label>
                  <select
                    value={formData.form}
                    onChange={(e) => setFormData({ ...formData, form: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup / Liquid">Syrup / Liquid</option>
                    <option value="Injection">Injection</option>
                    <option value="Drops">Eye/Ear Drops</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Blood Pressure, Diabetes"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Daily Schedule Slot
                  </label>
                  <select
                    value={formData.slot}
                    onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="morning">Morning (08:00 AM)</option>
                    <option value="afternoon">Afternoon (01:30 PM)</option>
                    <option value="evening">Evening (07:30 PM)</option>
                    <option value="night">Night (10:00 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Exact Reminder Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 08:30 AM"
                    value={formData.scheduledTime}
                    onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Instructions & Clinical Advice
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Take with food or immediately after breakfast."
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 text-white text-xs font-bold shadow-md shadow-sky-500/20"
                >
                  Save Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
