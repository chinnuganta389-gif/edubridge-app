import React, { useState } from 'react';
import { 
  Users, 
  HeartPulse, 
  Pill, 
  AlertTriangle, 
  CheckCircle2, 
  Phone, 
  Mail, 
  ShieldAlert, 
  Activity, 
  Clock, 
  FileText, 
  Calendar, 
  UserCheck, 
  BellRing,
  Send,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { PATIENT_PROFILES, CAREGIVER_ACTIVITY_LOG } from '../data/mockData';

export default function CaregiverDashboard({ 
  selectedPatient, 
  setSelectedPatient, 
  vitals, 
  medicines, 
  onNotify 
}) {
  const [activePatientId, setActivePatientId] = useState(selectedPatient.id);
  const [quickNote, setQuickNote] = useState('');
  const [activityList, setActivityList] = useState(CAREGIVER_ACTIVITY_LOG);

  const currentPatient = PATIENT_PROFILES.find(p => p.id === activePatientId) || selectedPatient;

  // Patient switch handler
  const handleSelectPatient = (p) => {
    setActivePatientId(p.id);
    setSelectedPatient(p);
    if (onNotify) {
      onNotify({
        type: 'info',
        title: 'Active Patient Switched',
        message: `Now viewing caregiver telemetry for ${p.name}.`
      });
    }
  };

  const handleSimulateAlert = () => {
    if (onNotify) {
      onNotify({
        type: 'warning',
        title: 'Caregiver Tele-Warning Dispatched',
        message: `High heart rate alert transmitted to ${currentPatient.caregiver.name} (+1 555-382-9014).`
      });
    }
  };

  const handleCallPatient = () => {
    if (onNotify) {
      onNotify({
        type: 'info',
        title: 'Connecting Voice Line...',
        message: `Dialing patient ${currentPatient.name} directly via simulated VoIP.`
      });
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!quickNote.trim()) return;

    const newAct = {
      id: `act-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today',
      action: 'Caregiver Note Logged',
      details: quickNote,
      badge: 'Observation',
      badgeColor: 'sky'
    };

    setActivityList([newAct, ...activityList]);
    setQuickNote('');
    if (onNotify) {
      onNotify({
        type: 'success',
        title: 'Caregiver Note Recorded',
        message: 'Observation saved to patient telemetry log.'
      });
    }
  };

  const missedMeds = medicines.filter(m => m.status === 'missed');
  const takenMeds = medicines.filter(m => m.status === 'taken');
  const adherenceRate = Math.round((takenMeds.length / (medicines.length || 1)) * 100);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner: Caregiver Role Overview & Patient Switcher */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-soft border border-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
            <Users className="w-4 h-4" />
            <span>Caregiver Command Center</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            <span className="text-slate-400 font-normal">Remote Telehealth Station</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Patient Telemetry & Caregiver Sync
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Real-time biometric surveillance, medication compliance monitoring, and instant medical dispatch.
          </p>
        </div>

        {/* Patient Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-1">Switch Patient:</span>
          {PATIENT_PROFILES.map((p) => {
            const isSelected = p.id === activePatientId;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPatient(p)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <img src={p.avatar} alt={p.name} className="w-6 h-6 rounded-full object-cover" />
                <span>{p.name.split(' ')[0]}</span>
                <span className={`w-2 h-2 rounded-full ${p.statusType === 'safe' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: Patient Info Card & Health Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Patient Detailed Card */}
        <div className="lg:col-span-4 glass-panel p-6 sm:p-7 rounded-3xl shadow-soft border border-white space-y-6">
          <div className="text-center space-y-3 pb-6 border-b border-slate-100">
            <div className="relative inline-block">
              <img 
                src={currentPatient.avatar} 
                alt={currentPatient.name} 
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-sky-400/30 mx-auto shadow-md"
              />
              <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                currentPatient.statusType === 'safe' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}></span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">{currentPatient.name}</h2>
              <p className="text-xs text-slate-500">{currentPatient.id} • Room: {currentPatient.room}</p>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              currentPatient.statusType === 'safe' 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              {currentPatient.status}
            </span>
          </div>

          {/* Demographic Parameters */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Age & Gender</span>
              <span className="font-bold text-slate-800">{currentPatient.age} yrs • {currentPatient.gender}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Blood Group</span>
              <span className="font-bold text-slate-800">{currentPatient.bloodGroup}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Weight / Height</span>
              <span className="font-bold text-slate-800">{currentPatient.weight} • {currentPatient.height}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Insurance Policy</span>
              <span className="font-bold text-slate-800">{currentPatient.insuranceId}</span>
            </div>
          </div>

          {/* Primary Condition */}
          <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-100 text-xs">
            <span className="text-sky-700 font-bold block mb-0.5">Primary Clinical Diagnosis:</span>
            <p className="text-slate-700">{currentPatient.primaryCondition}</p>
          </div>

          {/* Caregiver Emergency Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleCallPatient}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Voice Call Patient Directly</span>
            </button>

            <button
              onClick={handleSimulateAlert}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-colors"
            >
              <BellRing className="w-4 h-4" />
              <span>Simulate Caregiver Emergency Warning</span>
            </button>
          </div>
        </div>

        {/* Right: Telemetry Vitals, Adherence Status & Warnings */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Live Telemetry Snapshot for Selected Patient */}
          <div className="glass-panel p-6 rounded-3xl shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-sky-500" />
                  <span>Real-time Telemetry Snapshot</span>
                </h3>
                <p className="text-xs text-slate-500">Live wearable feed synchronized with hospital server</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Sensor Sync Active
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-white border border-rose-100">
                <span className="text-[11px] font-bold text-rose-600 uppercase">Heart Rate</span>
                <p className="text-2xl font-black text-slate-800 mt-1">{vitals.heartRate} <span className="text-xs font-medium text-slate-400">BPM</span></p>
                <span className="text-[10px] text-emerald-600 font-semibold">Normal sinus</span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-white border border-sky-100">
                <span className="text-[11px] font-bold text-sky-600 uppercase">Blood SpO2</span>
                <p className="text-2xl font-black text-slate-800 mt-1">{vitals.spo2} <span className="text-xs font-medium text-slate-400">%</span></p>
                <span className="text-[10px] text-emerald-600 font-semibold">Healthy Range</span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-100">
                <span className="text-[11px] font-bold text-teal-600 uppercase">Body Temp</span>
                <p className="text-2xl font-black text-slate-800 mt-1">{vitals.temp} <span className="text-xs font-medium text-slate-400">°C</span></p>
                <span className="text-[10px] text-emerald-600 font-semibold">Afebrile</span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
                <span className="text-[11px] font-bold text-indigo-600 uppercase">Blood Pressure</span>
                <p className="text-2xl font-black text-slate-800 mt-1">{vitals.bloodPressure || '118/78'}</p>
                <span className="text-[10px] text-emerald-600 font-semibold">Normotensive</span>
              </div>
            </div>
          </div>

          {/* Medicine Adherence & Missed Medicine Warnings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Adherence Card */}
            <div className="glass-panel p-6 rounded-3xl shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Pill className="w-4 h-4 text-teal-500" />
                  <span>Medicine Adherence</span>
                </h4>
                <span className="text-xs font-extrabold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full">
                  {adherenceRate}% Score
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${adherenceRate}%` }}
                ></div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {takenMeds.length} of {medicines.length} doses logged. Patient is maintaining above 90% required clinical adherence threshold.
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Compliance Level: <strong>Optimal</strong></span>
                <span className="text-emerald-600 font-bold">No Critical Gap</span>
              </div>
            </div>

            {/* Abnormal Vital & Missed Medicine Warnings */}
            <div className="glass-panel p-6 rounded-3xl shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Clinical Alerts & Warnings</span>
                </h4>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                  {missedMeds.length > 0 ? `${missedMeds.length} Active` : '0 Active Alerts'}
                </span>
              </div>

              {missedMeds.length > 0 ? (
                <div className="space-y-2">
                  {missedMeds.map(m => (
                    <div key={m.id} className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs flex items-center justify-between">
                      <div>
                        <p className="font-bold text-rose-800">Missed: {m.name} ({m.dosage})</p>
                        <p className="text-rose-600 text-[11px]">Scheduled for {m.slot} ({m.scheduledTime})</p>
                      </div>
                      <span className="text-xs font-bold text-rose-700 bg-white px-2 py-1 rounded-lg shadow-2xs">
                        Delayed
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold">No Missed Medications</p>
                    <p className="text-emerald-700 text-[11px]">All doses are taken or pending upcoming slots.</p>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <span>Abnormal Vital Reading: <strong>None</strong></span>
                <span className="text-emerald-600 font-semibold">ECG Stabilized</span>
              </div>
            </div>

          </div>

          {/* Caregiver & Doctor Contact Information Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-sky-500" /> Primary Caregiver
                </span>
                <span className="text-teal-600 font-normal">{currentPatient.caregiver.relation}</span>
              </div>
              <p className="text-sm font-extrabold text-slate-900">{currentPatient.caregiver.name}</p>
              <div className="text-xs text-slate-500 space-y-0.5">
                <p>Phone: <span className="font-mono text-slate-700">{currentPatient.caregiver.phone}</span></p>
                <p>Email: <span className="font-mono text-slate-700">{currentPatient.caregiver.email}</span></p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-teal-500" /> Attending Physician
                </span>
                <span className="text-sky-600 font-normal">{currentPatient.doctor.specialty.split(',')[0]}</span>
              </div>
              <p className="text-sm font-extrabold text-slate-900">{currentPatient.doctor.name}</p>
              <div className="text-xs text-slate-500 space-y-0.5">
                <p>Hospital: <span className="text-slate-700">{currentPatient.doctor.hospital}</span></p>
                <p>Hotline: <span className="font-mono text-slate-700">{currentPatient.doctor.phone}</span></p>
              </div>
            </div>
          </div>

          {/* Recent Patient Activity Stream */}
          <div className="glass-panel p-6 rounded-3xl shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-500" />
                <span>Recent Patient Activity & Telemetry Audit Log</span>
              </h3>
              <span className="text-xs text-slate-400">Timestamped feed</span>
            </div>

            <div className="space-y-3">
              {activityList.map((item) => (
                <div key={item.id} className="flex items-start justify-between p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:border-sky-200 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{item.action}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-50 text-teal-700">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{item.details}</p>
                  </div>
                  <div className="text-right text-[11px] text-slate-400 shrink-0 font-mono">
                    <p>{item.time}</p>
                    <p>{item.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Note Input for Caregiver */}
            <form onSubmit={handleAddNote} className="pt-3 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                placeholder="Log a clinical caregiver observation (e.g., patient completed evening walk)..."
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Log Note</span>
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
