import React from 'react';
import { 
  HeartPulse, 
  Activity, 
  Pill, 
  Users, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Bell, 
  Clock, 
  TrendingUp, 
  Zap,
  Globe2,
  Smile,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

export default function HomePage({ setActiveTab, vitals, patient, medicines }) {
  const stats = [
    { label: "Active Vitals Tracked", value: "24/7", suffix: "Live", icon: Activity, color: "text-sky-500", bg: "bg-sky-50" },
    { label: "Medication Adherence", value: "94.2%", suffix: "+18% avg", icon: Pill, color: "text-teal-500", bg: "bg-teal-50" },
    { label: "Alert Dispatch Latency", value: "< 500", suffix: "ms", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Caregiver Tele-Sync", value: "100%", suffix: "Uptime", icon: Users, color: "text-emerald-500", bg: "bg-emerald-50" }
  ];

  const features = [
    {
      title: "Real-Time Vitals Telemetry",
      description: "Continuously tracks Heart Rate (BPM), SpO2 Oxygenation, Body Temperature, and Blood Pressure with dynamic visual waveforms and threshold alerts.",
      icon: HeartPulse,
      gradient: "from-sky-500 to-blue-600",
      target: "dashboard"
    },
    {
      title: "Intelligent Medicine Reminders",
      description: "Multi-slot dosage scheduling (Morning, Afternoon, Evening, Night) with countdown clocks, pill tracking, one-click taken confirmations, and adherence scoring.",
      icon: Pill,
      gradient: "from-teal-500 to-emerald-600",
      target: "medicines"
    },
    {
      title: "Caregiver & Family Sync Portal",
      description: "Dedicated view for guardians and healthcare workers with missed-dose notifications, abnormal vital alarms, patient status logs, and instant call routing.",
      icon: Users,
      gradient: "from-indigo-500 to-sky-600",
      target: "caregiver"
    },
    {
      title: "Clinical-Grade PDF Health Reports",
      description: "Generate structured, printable PDF discharge and telemetry reports with one click, complete with physician notes, vital tables, and adherence analytics.",
      icon: FileText,
      gradient: "from-emerald-500 to-teal-600",
      target: "reports"
    },
    {
      title: "Emergency Caregiver SOS",
      description: "Immediate one-touch alert dispatch to primary contacts and attending physicians during abnormal physiological fluctuations or emergencies.",
      icon: ShieldAlert,
      gradient: "from-rose-500 to-red-600",
      target: "dashboard"
    },
    {
      title: "Rural & Elderly Accessibility",
      description: "Engineered with large intuitive touch targets, high contrast legibility, color-coded status badges, and lightweight telemetry suited for rural tele-health.",
      icon: Globe2,
      gradient: "from-cyan-500 to-blue-500",
      target: "about"
    }
  ];

  const nextUpcomingMedicine = medicines.find(m => m.status === 'pending') || medicines[0];

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-200/40 via-teal-100/40 to-emerald-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-sky-200/30 rounded-full blur-2xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-sky-200/80 shadow-sm text-sky-700 text-xs sm:text-sm font-semibold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-teal-500" />
                <span>Next-Gen IoT Healthcare & Telemetry Ecosystem</span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold text-xs">Batch_22</span>
              </div>

              {/* Exact Requested Heading & Subtitle */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Your Health, <br />
                <span className="bg-gradient-to-r from-sky-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
                  Our Priority.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Smart healthcare monitoring and medicine reminders for a healthier tomorrow.
                Empowering patients with live vitals telemetry, adherence management, and instant caregiver alerts.
              </p>

              {/* Call-to-action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-base shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Activity className="w-5 h-5" />
                  <span>Get Started (Patient Dashboard)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => { setActiveTab('medicines'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-base border border-slate-200/80 shadow-sm hover:shadow hover:border-sky-300 transition-all duration-200"
                >
                  <Pill className="w-5 h-5 text-teal-500" />
                  <span>Explore Features</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/70 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Real-time Simulated PPG & Temperature
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Intelligent Dosage Timelines
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Hospital-Grade PDF Generator
                </span>
              </div>
            </div>

            {/* Right Hero Preview / Medical Dashboard Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Glow behind preview */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500 to-teal-400 rounded-3xl blur-xl opacity-30 animate-pulse-subtle"></div>
                
                {/* Main Glass Card Preview */}
                <div className="relative glass-panel rounded-3xl p-6 shadow-soft-lg border border-white/80 space-y-6">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <img 
                        src={patient.avatar} 
                        alt={patient.name} 
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-sky-400/40"
                      />
                      <div>
                        <h3 className="font-bold text-slate-800 text-base">{patient.name}</h3>
                        <p className="text-xs text-slate-500">{patient.age} yrs • {patient.primaryCondition.split('&')[0]}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      Active Stable
                    </span>
                  </div>

                  {/* Vitals Quick Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Heart Rate */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-50 to-white border border-rose-100 shadow-sm">
                      <div className="flex items-center justify-between text-xs text-rose-600 font-semibold mb-1">
                        <span className="flex items-center gap-1">
                          <HeartPulse className="w-3.5 h-3.5 animate-heartbeat" /> Heart Rate
                        </span>
                        <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">BPM</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-slate-800">{vitals.heartRate}</span>
                        <span className="text-xs text-slate-500">bpm</span>
                      </div>
                      <p className="text-[10px] text-emerald-600 font-medium mt-1">Normal sinus rhythm</p>
                    </div>

                    {/* SpO2 */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-sky-50 to-white border border-sky-100 shadow-sm">
                      <div className="flex items-center justify-between text-xs text-sky-600 font-semibold mb-1">
                        <span className="flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5" /> Blood O2
                        </span>
                        <span className="text-[10px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded">SpO2</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-slate-800">{vitals.spo2}</span>
                        <span className="text-xs text-slate-500">%</span>
                      </div>
                      <p className="text-[10px] text-emerald-600 font-medium mt-1">Optimal oxygenation</p>
                    </div>

                    {/* Temperature */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-100 shadow-sm">
                      <div className="flex items-center justify-between text-xs text-teal-600 font-semibold mb-1">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> Body Temp
                        </span>
                        <span className="text-[10px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded">°C</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-slate-800">{vitals.temp}</span>
                        <span className="text-xs text-slate-500">°C</span>
                      </div>
                      <p className="text-[10px] text-emerald-600 font-medium mt-1">Afebrile / Healthy</p>
                    </div>

                    {/* Blood Pressure */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 shadow-sm">
                      <div className="flex items-center justify-between text-xs text-indigo-600 font-semibold mb-1">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" /> BP Index
                        </span>
                        <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">mmHg</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-slate-800">{vitals.bloodPressure || '118/78'}</span>
                      </div>
                      <p className="text-[10px] text-emerald-600 font-medium mt-1">Optimal BP range</p>
                    </div>
                  </div>

                  {/* Next Reminder Preview Strip */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/10 via-teal-500/10 to-transparent border border-sky-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-sm">
                        <Pill className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500">Next Upcoming Dose</p>
                        <h4 className="text-sm font-bold text-slate-800">{nextUpcomingMedicine.name} ({nextUpcomingMedicine.dosage})</h4>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-700">
                        {nextUpcomingMedicine.scheduledTime}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <button
                    onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Open Live Patient Telemetry</span>
                    <ArrowRight className="w-4 h-4 text-teal-400" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Animated Health Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 shadow-soft border border-white/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/70">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={`pt-4 lg:pt-0 ${idx > 0 ? 'lg:pl-8' : ''} space-y-2`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl ${item.bg}`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{item.label}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">{item.value}</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{item.suffix}</span>
                  </div>
                  <p className="text-xs text-slate-400">Continuous edge-simulated monitoring</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Smart Health Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            Comprehensive Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Smart Health Pro?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Engineered with modern reactive technologies to bridge the critical gap between patients, remote caregivers, and medical practitioners.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                onClick={() => { setActiveTab(feat.target); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="group relative glass-panel rounded-3xl p-7 border border-white hover:border-sky-300 shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feat.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-teal-600 transition-colors">
                  <span>Explore Module</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Real-World Impact Banner (Elderly & Rural Accessibility) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-700 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm">
              Social Impact & Inclusivity
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Designed for Elderly Dignity & Rural Telemedicine
            </h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              In remote communities, access to tertiary hospitals is scarce and elderly family members frequently miss crucial doses. 
              SmartHealth Pro simplifies routines with large visual prompts, sound notifications, and seamless remote sync so families remain connected anywhere in the world.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => { setActiveTab('caregiver'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 shadow-md transition-colors"
              >
                Launch Caregiver Portal
              </button>
              <button
                onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/30 backdrop-blur-sm transition-colors"
              >
                View Academic Objectives
              </button>
            </div>
          </div>

          {/* Decorative Pattern */}
          <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        </div>
      </section>

    </div>
  );
}
