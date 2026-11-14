import React from 'react';
import { 
  Award, 
  HeartHandshake, 
  Activity, 
  Pill, 
  Users, 
  Globe2, 
  Cpu, 
  Code2, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Database,
  Smartphone,
  Server
} from 'lucide-react';

export default function AboutProject({ setActiveTab }) {
  const objectives = [
    {
      title: "Support Elderly People",
      description: "Provide seniors with an intuitive, friendly, high-contrast digital interface that eliminates confusion, preserves independence, and safeguards everyday well-being.",
      icon: HeartHandshake,
      color: "text-rose-500",
      bg: "bg-rose-50",
      border: "border-rose-200"
    },
    {
      title: "Reduce Missed Medicine Doses",
      description: "Combat non-adherence through automated multi-slot scheduling (morning, afternoon, evening, night), real-time countdowns, and proactive dosage reminders.",
      icon: Pill,
      color: "text-teal-500",
      bg: "bg-teal-50",
      border: "border-teal-200"
    },
    {
      title: "Enable Regular Health Monitoring",
      description: "Deliver continuous telemetry surveillance of critical biometrics—Heart Rate (BPM), SpO2 Oxygenation, and Body Temperature—with anomaly detection.",
      icon: Activity,
      color: "text-sky-500",
      bg: "bg-sky-50",
      border: "border-sky-200"
    },
    {
      title: "Help Caregivers Stay Informed",
      description: "Empower family guardians and healthcare aides with synchronized notifications, telemetry audit feeds, missed-dose warnings, and one-touch VoIP communication.",
      icon: Users,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      border: "border-indigo-200"
    },
    {
      title: "Improve Rural Healthcare Accessibility",
      description: "Bridge geographic divides in remote communities where physical clinic visits are difficult, allowing urban specialists to review verifiable digital reports remotely.",
      icon: Globe2,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-200"
    }
  ];

  const techStack = [
    { name: "React.js 18", desc: "Component architecture, declarative UI state, and reactive telemetry streaming." },
    { name: "Tailwind CSS", desc: "Modern utility styling, glassmorphism aesthetics, soft shadows, and responsive layouts." },
    { name: "Recharts", desc: "Interactive SVG data visualizations for heart rate BPM, SpO2 trends, and adherence scores." },
    { name: "Lucide React", desc: "Extensive, accessible SVG medical and interface iconography." },
    { name: "jsPDF Engine", desc: "Client-side generation of authenticated, printable clinical health summaries." }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Project Presentation Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-700 via-teal-700 to-slate-900 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md text-teal-300 border border-white/20">
            <Award className="w-4 h-4 text-teal-300" />
            <span>B.Tech Information Technology • Final Year Project Capstone (Batch_22)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            IoT-Simulated Smart Healthcare & Intelligent Medication Adherence Ecosystem
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
            An advanced ambient assisted living (AAL) prototype engineered to resolve chronic medication non-compliance, 
            facilitate remote caregiver monitoring, and bridge clinical tele-health gaps in underserved rural populations.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-teal-200 font-semibold">
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-teal-400" /> Academic Project Demonstration
            </span>
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-teal-400" /> Frontend-Only Architecture
            </span>
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Main Purpose & Core Objectives (Highlighting the 5 key points) */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Core Project Objectives & Social Purpose
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Addressing critical World Health Organization (WHO) benchmarks: over 50% of chronic patients fail to follow medication regimens correctly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj, idx) => {
            const Icon = obj.icon;
            return (
              <div 
                key={idx}
                className={`glass-panel p-6 rounded-3xl shadow-soft hover:shadow-soft-lg transition-all duration-300 border ${obj.border} space-y-4`}
              >
                <div className={`w-12 h-12 rounded-2xl ${obj.bg} ${obj.color} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{obj.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{obj.description}</p>
              </div>
            );
          })}

          {/* SDG 3 Alignment Card */}
          <div className="glass-panel p-6 rounded-3xl shadow-soft border border-emerald-200 bg-emerald-50/20 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-xl shadow-sm">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-800">UN SDG Goal 3: Good Health</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Directly aligns with the United Nations Sustainable Development Goal 3 by reducing premature mortality from non-communicable diseases through prevention and digital adherence support.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md inline-block">
              Global Health Initiative
            </span>
          </div>
        </div>
      </div>

      {/* System Architecture Section */}
      <div className="glass-panel p-8 rounded-3xl shadow-soft space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">System Architecture Overview</h2>
            <p className="text-xs text-slate-500">Multi-tier simulated IoT telemetry pipeline</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800">1. Simulated Sensors</h4>
            <p className="text-[11px] text-slate-500">PPG pulse wave, pulse oximetry (SpO2), thermistor skin probe.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center mx-auto">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800">2. Telemetry Engine</h4>
            <p className="text-[11px] text-slate-500">Reactive state container calculating rolling means and threshold alarms.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800">3. Patient UI Layer</h4>
            <p className="text-[11px] text-slate-500">Intuitive reminder timelines, quick action cards, and audible alarms.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800">4. Caregiver Portal</h4>
            <p className="text-[11px] text-slate-500">Remote surveillance, missed dose flags, and PDF clinical export.</p>
          </div>
        </div>
      </div>

      {/* Technology Stack Breakdown */}
      <div className="glass-panel p-8 rounded-3xl shadow-soft space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          <span>Technical Implementation (Frontend-Only Stack)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((tech, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                <span className="font-bold text-sm text-slate-800">{tech.name}</span>
              </div>
              <p className="text-xs text-slate-600">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation CTA to test features */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-extrabold">Ready to evaluate the live prototype?</h3>
          <p className="text-xs text-slate-400 mt-1">
            Test real-time sensor updates, log doses, switch patient profiles, or generate certified reports.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md transition-colors"
          >
            Open Patient Dashboard
          </button>
          <button
            onClick={() => { setActiveTab('reports'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 text-xs font-bold shadow-md transition-colors"
          >
            Export Clinical PDF
          </button>
        </div>
      </div>

    </div>
  );
}
