import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import PatientDashboard from './pages/PatientDashboard';
import MedicineReminder from './pages/MedicineReminder';
import CaregiverDashboard from './pages/CaregiverDashboard';
import HealthReports from './pages/HealthReports';
import NotificationsCenter from './pages/NotificationsCenter';
import AboutProject from './pages/AboutProject';
import ContactPage from './pages/ContactPage';

import { 
  PATIENT_PROFILES, 
  INITIAL_MEDICINES, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';

import { 
  Activity, 
  Zap, 
  RotateCcw, 
  AlertTriangle, 
  Pill, 
  HeartPulse, 
  ShieldAlert,
  Sliders,
  X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [patient, setPatient] = useState(PATIENT_PROFILES[0]);
  
  // Real-time Vitals State
  const [vitals, setVitals] = useState({
    heartRate: 74,
    spo2: 98,
    temp: 36.6,
    bloodPressure: '118/78'
  });

  const [isLiveSimulating, setIsLiveSimulating] = useState(true);
  const [showDemoControls, setShowDemoControls] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);

  // Medicines State with localStorage persistence
  const [medicines, setMedicines] = useState(() => {
    try {
      const saved = localStorage.getItem('shp_medicines');
      return saved ? JSON.parse(saved) : INITIAL_MEDICINES;
    } catch {
      return INITIAL_MEDICINES;
    }
  });

  // Notifications State with localStorage persistence
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('shp_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Floating Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = ({ type = 'info', title, message }) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('shp_medicines', JSON.stringify(medicines));
    } catch (e) {
      console.error(e);
    }
  }, [medicines]);

  useEffect(() => {
    try {
      localStorage.setItem('shp_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  // Live IoT Simulation Loop
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      setVitals(prev => {
        // Natural subtle fluctuations
        const hrDelta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const spo2Delta = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const tempDelta = (Math.floor(Math.random() * 3) - 1) * 0.1; // -0.1 to +0.1

        const newHr = Math.min(88, Math.max(65, prev.heartRate + hrDelta));
        const newSpo2 = Math.min(100, Math.max(96, prev.spo2 + spo2Delta));
        const newTemp = Number(Math.min(37.3, Math.max(36.3, prev.temp + tempDelta)).toFixed(1));

        return {
          ...prev,
          heartRate: newHr,
          spo2: newSpo2,
          temp: newTemp
        };
      });
    }, 3800);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  // Medicine Actions
  const handleMarkAsTaken = (medId) => {
    const updated = medicines.map(med => {
      if (med.id === medId) {
        return {
          ...med,
          status: 'taken',
          lastTakenTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today'
        };
      }
      return med;
    });
    setMedicines(updated);
    const target = medicines.find(m => m.id === medId);
    addToast({
      type: 'success',
      title: 'Medication Confirmed',
      message: `${target?.name || 'Medicine'} marked as TAKEN. Adherence score updated.`
    });
  };

  const handleMarkAsMissed = (medId) => {
    const updated = medicines.map(med => {
      if (med.id === medId) {
        return {
          ...med,
          status: med.status === 'taken' ? 'pending' : 'missed',
          lastTakenTime: null
        };
      }
      return med;
    });
    setMedicines(updated);
    addToast({
      type: 'warning',
      title: 'Medication Status Changed',
      message: 'Status was updated. Caregiver will be notified of deviations.'
    });
  };

  const handleAddMedicine = (newMed) => {
    setMedicines([newMed, ...medicines]);
  };

  const handleDeleteMedicine = (medId) => {
    setMedicines(medicines.filter(m => m.id !== medId));
    addToast({
      type: 'info',
      title: 'Prescription Removed',
      message: 'Medication archived from schedule.'
    });
  };

  // Notification Actions
  const handleMarkAsRead = (notifId) => {
    setNotifications(notifications.map(n => n.id === notifId ? { ...n, unread: false } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    addToast({
      type: 'info',
      title: 'All Alerts Marked as Read',
      message: 'Notification inbox refreshed.'
    });
  };

  const handleDeleteNotification = (notifId) => {
    setNotifications(notifications.filter(n => n.id !== notifId));
  };

  const handleSimulateNotification = (type) => {
    if (type === 'medicine') {
      const newNotif = {
        id: `notif-${Date.now()}`,
        type: 'medicine',
        category: 'Live Dose Alarm',
        title: 'Reminder: Lisinopril 10mg Due Now',
        message: 'Scheduled morning blood pressure dose is awaiting patient confirmation.',
        time: 'Just now',
        unread: true,
        severity: 'info'
      };
      setNotifications([newNotif, ...notifications]);
      addToast({
        type: 'info',
        title: 'Simulated Medicine Alert',
        message: 'Lisinopril 10mg reminder alert triggered.'
      });
    } else if (type === 'vital') {
      setVitals({
        heartRate: 104,
        spo2: 95,
        temp: 37.8,
        bloodPressure: '142/92'
      });
      const newNotif = {
        id: `notif-${Date.now()}`,
        type: 'vital',
        category: 'Elevated Vital Alert',
        title: 'Tachycardia Warning: 104 BPM Detected',
        message: 'Heart rate exceeded normal resting boundary (>100 BPM). Caregiver pinged.',
        time: 'Just now',
        unread: true,
        severity: 'error'
      };
      setNotifications([newNotif, ...notifications]);
      addToast({
        type: 'error',
        title: 'Abnormal Vital Spike Simulated',
        message: 'Heart rate surged to 104 BPM! Alert sent to caregiver portal.'
      });
    }
  };

  const handleTriggerSOS = () => {
    setShowSosModal(true);
  };

  const confirmSosDispatch = () => {
    setShowSosModal(false);
    addToast({
      type: 'error',
      title: 'EMERGENCY SOS DISPATCHED',
      message: `Emergency distress signal broadcast to Marcus Vance (+1 555-382-9014) and Dr. Priya Sharma.`
    });
    const sosNotif = {
      id: `notif-${Date.now()}`,
      type: 'alert',
      category: 'CRITICAL SOS ALERT',
      title: 'Emergency SOS Broadcast by Patient',
      message: `Patient triggered immediate assistance beacon from ${patient.room}. Location: Lat 40.7128, Long -74.0060.`,
      time: 'Just now',
      unread: true,
      severity: 'error'
    };
    setNotifications([sosNotif, ...notifications]);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50/40 via-white to-slate-50 relative selection:bg-teal-500 selection:text-white">
      
      {/* Toast Notification Layer */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Global Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isLiveSimulating={isLiveSimulating}
        toggleLiveSimulation={() => setIsLiveSimulating(!isLiveSimulating)}
        unreadCount={unreadCount}
        onTriggerSOS={handleTriggerSOS}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <HomePage 
            setActiveTab={setActiveTab} 
            vitals={vitals} 
            patient={patient} 
            medicines={medicines} 
          />
        )}

        {activeTab === 'dashboard' && (
          <PatientDashboard 
            patient={patient}
            vitals={vitals}
            medicines={medicines}
            isLiveSimulating={isLiveSimulating}
            toggleLiveSimulation={() => setIsLiveSimulating(!isLiveSimulating)}
            triggerLiveTick={(newVitals) => setVitals(prev => ({ ...prev, ...newVitals }))}
            onNotify={addToast}
          />
        )}

        {activeTab === 'medicines' && (
          <MedicineReminder 
            medicines={medicines}
            onMarkAsTaken={handleMarkAsTaken}
            onMarkAsMissed={handleMarkAsMissed}
            onAddMedicine={handleAddMedicine}
            onDeleteMedicine={handleDeleteMedicine}
            onNotify={addToast}
          />
        )}

        {activeTab === 'caregiver' && (
          <CaregiverDashboard 
            selectedPatient={patient}
            setSelectedPatient={setPatient}
            vitals={vitals}
            medicines={medicines}
            onNotify={addToast}
          />
        )}

        {activeTab === 'reports' && (
          <HealthReports 
            patient={patient}
            vitals={vitals}
            medicines={medicines}
            onNotify={addToast}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationsCenter 
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onDeleteNotification={handleDeleteNotification}
            onSimulateNotification={handleSimulateNotification}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'about' && (
          <AboutProject setActiveTab={setActiveTab} />
        )}

        {activeTab === 'contact' && (
          <ContactPage onNotify={addToast} />
        )}
      </main>

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating Presentation Demo Toolbar (Bottom-Left Pill) */}
      <div className="fixed bottom-5 left-5 z-40">
        {showDemoControls ? (
          <div className="glass-panel p-4 rounded-3xl shadow-2xl border border-sky-300 w-72 space-y-3 backdrop-blur-xl animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Sliders className="w-4 h-4 text-sky-500" />
                <span>Viva Demo Controls</span>
              </div>
              <button 
                onClick={() => setShowDemoControls(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-500">
              Quickly trigger simulated scenarios during project viva / demonstration:
            </p>

            <div className="space-y-1.5">
              <button
                onClick={() => handleSimulateNotification('vital')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors"
              >
                <span>Spike Heart Rate (104 BPM)</span>
                <HeartPulse className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleSimulateNotification('medicine')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold transition-colors"
              >
                <span>Trigger Medicine Alarm</span>
                <Pill className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setVitals({ heartRate: 74, spo2: 98, temp: 36.6, bloodPressure: '118/78' });
                  addToast({ type: 'success', title: 'Vitals Normalized', message: 'Heart Rate reset to 74 BPM baseline.' });
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                <span>Reset to Baseline (74 BPM)</span>
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDemoControls(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border border-sky-300 text-slate-700 hover:text-sky-600 text-xs font-bold shadow-lg hover:shadow-xl transition-all"
            title="Open Live Demonstration Controls"
          >
            <Sliders className="w-4 h-4 text-sky-500 animate-spin-slow" />
            <span>Demo Controls</span>
          </button>
        )}
      </div>

      {/* Emergency SOS Confirmation Modal */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-200 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner animate-pulse">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-slate-900">Trigger Emergency SOS Alert?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                This will immediately broadcast an urgent telemetry distress beacon with the patient's vital signs to 
                <strong className="text-slate-800"> Marcus Vance (Caregiver)</strong> and attending physician <strong className="text-slate-800">Dr. Priya Sharma</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 text-left space-y-1">
              <p>• Patient: <strong>{patient.name}</strong> ({patient.room})</p>
              <p>• Current Vitals: HR <strong>{vitals.heartRate} BPM</strong>, SpO2 <strong>{vitals.spo2}%</strong>, Temp <strong>{vitals.temp}°C</strong></p>
              <p>• Simulated VoIP Dispatch Line: <strong>911 / Medical Rapid Response</strong></p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSosModal(false)}
                className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSosDispatch}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 text-white text-xs font-bold shadow-lg shadow-rose-600/30 hover:from-rose-700 hover:to-red-700 transition-all"
              >
                Confirm SOS
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
