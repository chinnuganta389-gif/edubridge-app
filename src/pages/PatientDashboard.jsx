import React, { useState } from 'react';
import { 
  HeartPulse, 
  Activity, 
  Thermometer, 
  ShieldCheck, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Download, 
  RefreshCw, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Droplets, 
  Moon, 
  Footprints, 
  FileText,
  Radio,
  Share2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { HOURLY_VITALS_DATA, WEEKLY_VITALS_DATA } from '../data/mockData';
import { generateHealthReportPDF } from '../utils/pdfGenerator';

export default function PatientDashboard({ 
  patient, 
  vitals, 
  medicines, 
  isLiveSimulating, 
  toggleLiveSimulation, 
  triggerLiveTick,
  onNotify 
}) {
  const [activeMetric, setActiveMetric] = useState('heartRate'); // 'heartRate' | 'spo2' | 'temp' | 'bp'
  const [timeRange, setTimeRange] = useState('day'); // 'day' | 'week'
  const [showManualLogModal, setShowManualLogModal] = useState(false);
  const [manualForm, setManualForm] = useState({
    heartRate: vitals.heartRate,
    spo2: vitals.spo2,
    temp: vitals.temp,
    bloodPressure: vitals.bloodPressure || '120/80'
  });

  const chartData = timeRange === 'day' ? HOURLY_VITALS_DATA : WEEKLY_VITALS_DATA;

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <p className="font-semibold text-slate-300">{timeRange === 'day' ? `Time: ${label}` : `Day: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} className="flex items-center gap-2 font-bold" style={{ color: entry.color }}>
              <span>{entry.name}:</span>
              <span>{entry.value} {activeMetric === 'temp' ? '°C' : activeMetric === 'spo2' ? '%' : 'BPM'}</span>
            </p>
          ))}
          <p className="text-[10px] text-emerald-400">Clinical Normal Range</p>
        </div>
      );
    }
    return null;
  };

  const handleDownloadPDF = () => {
    generateHealthReportPDF(patient, vitals, medicines, 94);
    if (onNotify) {
      onNotify({
        type: 'success',
        title: 'Report Downloaded',
        message: `Clinical summary PDF generated for ${patient.name}.`
      });
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (triggerLiveTick) {
      triggerLiveTick({
        heartRate: Number(manualForm.heartRate),
        spo2: Number(manualForm.spo2),
        temp: Number(manualForm.temp),
        bloodPressure: manualForm.bloodPressure
      });
    }
    setShowManualLogModal(false);
    if (onNotify) {
      onNotify({
        type: 'success',
        title: 'Vitals Logged Manually',
        message: `Updated to HR: ${manualForm.heartRate} BPM, SpO2: ${manualForm.spo2}%, Temp: ${manualForm.temp}°C.`
      });
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Dashboard Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl shadow-soft">
        <div className="flex items-center gap-4">
          <img 
            src={patient.avatar} 
            alt={patient.name} 
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-sky-400/30 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">{patient.name}</h1>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
                {patient.id}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {patient.age} yrs • {patient.gender} • Blood Group <span className="font-semibold text-slate-700">{patient.bloodGroup}</span> • {patient.primaryCondition}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Overall Health: Optimal & Normal
              </span>
              <span className="text-xs text-slate-400">
                Assigned: {patient.doctor.name}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowManualLogModal(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition-colors"
          >
            + Log Vitals Manually
          </button>

          <button
            onClick={toggleLiveSimulation}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              isLiveSimulating
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-500/25'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <Radio className={`w-4 h-4 ${isLiveSimulating ? 'animate-pulse' : ''}`} />
            <span>{isLiveSimulating ? 'IoT Stream (Simulating)' : 'Simulate Live Stream'}</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Clinical PDF</span>
          </button>
        </div>
      </div>

      {/* 4 Required Health Monitoring Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. Heart Rate (BPM) */}
        <div className="glass-panel p-6 rounded-3xl shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-white hover:border-rose-200 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Heart Rate</span>
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <HeartPulse className="w-5 h-5 animate-heartbeat" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{vitals.heartRate}</span>
            <span className="text-sm font-semibold text-rose-500">BPM</span>
          </div>

          {/* Animated Mini ECG Line Simulation */}
          <div className="h-9 my-3 w-full flex items-center">
            <svg className="w-full h-8" viewBox="0 0 160 30" fill="none">
              <path
                d="M0 15 L30 15 L40 5 L50 25 L60 2 L70 28 L80 15 L160 15"
                stroke="#F43F5E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-ecg"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="text-slate-500">Normal: 60 - 100</span>
            <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Normal Sinus
            </span>
          </div>
        </div>

        {/* 2. Blood Oxygen (SpO2 %) */}
        <div className="glass-panel p-6 rounded-3xl shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-white hover:border-sky-200 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Blood Oxygen</span>
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{vitals.spo2}</span>
            <span className="text-sm font-semibold text-sky-500">% SpO2</span>
          </div>

          {/* Bar Gauge Progress */}
          <div className="my-4 space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-sky-400 to-teal-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${vitals.spo2}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="text-slate-500">Threshold: &ge; 95%</span>
            <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Optimal
            </span>
          </div>
        </div>

        {/* 3. Body Temperature (°C) */}
        <div className="glass-panel p-6 rounded-3xl shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-white hover:border-teal-200 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Body Temperature</span>
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <Thermometer className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{vitals.temp}</span>
            <span className="text-sm font-semibold text-teal-600">°C</span>
            <span className="text-xs text-slate-400">({((vitals.temp * 9/5) + 32).toFixed(1)} °F)</span>
          </div>

          {/* Range Visualizer */}
          <div className="my-4 flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
            <span>Sensor: Digital Skin Thermistor</span>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="text-slate-500">Normal: 36.1 - 37.2</span>
            <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Afebrile
            </span>
          </div>
        </div>

        {/* 4. Overall Health Status */}
        <div className="glass-panel p-6 rounded-3xl shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-white hover:border-emerald-200 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall Health Status</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Normal & Good</span>
          </div>

          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            All biometrics are within safe physiological limits over the last 24-hour monitoring epoch.
          </p>

          <div className="flex items-center justify-between text-xs pt-3 mt-3 border-t border-slate-100">
            <span className="text-slate-500">Risk Assessment</span>
            <span className="text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-md">
              Low Risk (Grade 1)
            </span>
          </div>
        </div>

      </div>

      {/* Health Analytics Interactive Graphs */}
      <div className="glass-panel p-7 rounded-3xl shadow-soft space-y-6">
        
        {/* Chart Header & Toggles */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
              <Activity className="w-5 h-5 text-sky-500" />
              <span>Health Analytics & Dynamic Waveforms</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Sample sensor readings graphed over time with clinical reference thresholds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Metric Selector Buttons */}
            <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1">
              <button
                onClick={() => setActiveMetric('heartRate')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeMetric === 'heartRate'
                    ? 'bg-white text-rose-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Heart Rate (BPM)
              </button>
              <button
                onClick={() => setActiveMetric('spo2')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeMetric === 'spo2'
                    ? 'bg-white text-sky-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                SpO2 (%)
              </button>
              <button
                onClick={() => setActiveMetric('temp')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeMetric === 'temp'
                    ? 'bg-white text-teal-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Temperature (°C)
              </button>
            </div>

            {/* Timeframe Switcher */}
            <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1">
              <button
                onClick={() => setTimeRange('day')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  timeRange === 'day'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Today (24h)
              </button>
              <button
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  timeRange === 'week'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Weekly Trend
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Recharts Chart */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeMetric === 'heartRate' ? (
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey={timeRange === 'day' ? 'time' : 'day'} 
                  stroke="#94A3B8" 
                  fontSize={12} 
                  tickLine={false} 
                />
                <YAxis 
                  domain={timeRange === 'day' ? [55, 95] : [55, 100]} 
                  stroke="#94A3B8" 
                  fontSize={12} 
                  tickLine={false} 
                  unit=" bpm" 
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey={timeRange === 'day' ? 'heartRate' : 'avgBpm'} 
                  name="Heart Rate" 
                  stroke="#F43F5E" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorHeart)" 
                />
                {timeRange === 'week' && (
                  <Line 
                    type="monotone" 
                    dataKey="maxBpm" 
                    name="Peak BPM" 
                    stroke="#FB7185" 
                    strokeDasharray="4 4" 
                    dot={false} 
                  />
                )}
              </AreaChart>
            ) : activeMetric === 'spo2' ? (
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey={timeRange === 'day' ? 'time' : 'day'} 
                  stroke="#94A3B8" 
                  fontSize={12} 
                  tickLine={false} 
                />
                <YAxis 
                  domain={[90, 100]} 
                  stroke="#94A3B8" 
                  fontSize={12} 
                  tickLine={false} 
                  unit="%" 
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="spo2" 
                  name="Blood Oxygen" 
                  stroke="#0EA5E9" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorSpo2)" 
                />
              </AreaChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey={timeRange === 'day' ? 'time' : 'day'} 
                  stroke="#94A3B8" 
                  fontSize={12} 
                  tickLine={false} 
                />
                <YAxis 
                  domain={[35.5, 38.0]} 
                  stroke="#94A3B8" 
                  fontSize={12} 
                  tickLine={false} 
                  unit="°C" 
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  name="Body Temp" 
                  stroke="#14B8A6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#14B8A6' }} 
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Graph Insights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>24h Peak Heart Rate: <strong className="text-slate-800">84 BPM</strong> (10:00 AM)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
            <span>SpO2 Stability: <strong className="text-slate-800">98.2% Avg</strong> (Optimal)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
            <span>Baseline Variance: <strong className="text-slate-800">&plusmn; 0.4°C</strong> (Within Limits)</span>
          </div>
        </div>

      </div>

      {/* Daily & Weekly Health Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Hydration Widget */}
        <div className="glass-panel p-6 rounded-3xl shadow-soft border border-white space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Hydration Today</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800">1.8</span>
            <span className="text-sm font-semibold text-slate-500">/ 2.5 Liters</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-sky-500 h-2 rounded-full" style={{ width: '72%' }}></div>
          </div>
          <p className="text-xs text-slate-500">72% of recommended fluid intake reached.</p>
        </div>

        {/* Sleep Quality */}
        <div className="glass-panel p-6 rounded-3xl shadow-soft border border-white space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Resting Sleep</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800">7h 45m</span>
            <span className="text-sm font-semibold text-emerald-600">Deep & Restful</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '88%' }}></div>
          </div>
          <p className="text-xs text-slate-500">88% sleep efficiency recorded last night.</p>
        </div>

        {/* Medication Compliance Today */}
        <div className="glass-panel p-6 rounded-3xl shadow-soft border border-white space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Doses Taken Today</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800">
              {medicines.filter(m => m.status === 'taken').length} / {medicines.length}
            </span>
            <span className="text-sm font-semibold text-teal-600">On Track</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div 
              className="bg-teal-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(medicines.filter(m => m.status === 'taken').length / medicines.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500">Next dose: Evening Atorvastatin 20mg.</p>
        </div>

      </div>

      {/* Manual Vitals Log Modal */}
      {showManualLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Log Vitals Manually</h3>
                <p className="text-xs text-slate-500">Simulate manual device or cuff input</p>
              </div>
              <button 
                onClick={() => setShowManualLogModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Heart Rate (BPM)
                </label>
                <input
                  type="number"
                  min="40"
                  max="180"
                  value={manualForm.heartRate}
                  onChange={(e) => setManualForm({ ...manualForm, heartRate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Blood Oxygen SpO2 (%)
                </label>
                <input
                  type="number"
                  min="75"
                  max="100"
                  value={manualForm.spo2}
                  onChange={(e) => setManualForm({ ...manualForm, spo2: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Body Temperature (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="34"
                  max="42"
                  value={manualForm.temp}
                  onChange={(e) => setManualForm({ ...manualForm, temp: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Blood Pressure (mmHg)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 120/80"
                  value={manualForm.bloodPressure}
                  onChange={(e) => setManualForm({ ...manualForm, bloodPressure: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowManualLogModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md shadow-sky-500/20"
                >
                  Update Vitals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
