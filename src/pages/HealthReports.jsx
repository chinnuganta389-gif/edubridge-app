import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  HeartPulse, 
  Activity, 
  Pill, 
  Printer, 
  Sparkles,
  ShieldCheck,
  Award
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { MONTHLY_ADHERENCE_DATA, WEEKLY_VITALS_DATA } from '../data/mockData';
import { generateHealthReportPDF } from '../utils/pdfGenerator';

export default function HealthReports({ patient, vitals, medicines, onNotify }) {
  const [reportType, setReportType] = useState('weekly'); // 'daily' | 'weekly' | 'monthly'

  const adherenceScore = 94;

  const handleDownloadPDF = () => {
    generateHealthReportPDF(patient, vitals, medicines, adherenceScore);
    if (onNotify) {
      onNotify({
        type: 'success',
        title: 'PDF Report Exported',
        message: `Clinical summary PDF downloaded for ${patient.name}.`
      });
    }
  };

  const historyRows = [
    { date: "Yesterday, Nov 13", avgHr: "74 BPM", spo2: "98%", bp: "119/78", adherence: "100% (6/6)", status: "Optimal" },
    { date: "Wed, Nov 12", avgHr: "76 BPM", spo2: "97%", bp: "122/80", adherence: "83% (5/6)", status: "Good" },
    { date: "Tue, Nov 11", avgHr: "73 BPM", spo2: "99%", bp: "118/76", adherence: "100% (6/6)", status: "Optimal" },
    { date: "Mon, Nov 10", avgHr: "75 BPM", spo2: "98%", bp: "120/79", adherence: "100% (6/6)", status: "Optimal" },
    { date: "Sun, Nov 09", avgHr: "72 BPM", spo2: "98%", bp: "116/75", adherence: "100% (6/6)", status: "Optimal" },
    { date: "Sat, Nov 08", avgHr: "71 BPM", spo2: "99%", bp: "115/74", adherence: "100% (6/6)", status: "Optimal" }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header & Download Bar */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-soft border border-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
            <FileText className="w-4 h-4" />
            <span>Clinical Analytics & Telemetry Reports</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Health Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Certified telehealth summary, vitals history, and medication compliance metrics.
          </p>
        </div>

        {/* Report Type Selector & Download CTA */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1">
            <button
              onClick={() => setReportType('daily')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                reportType === 'daily'
                  ? 'bg-white text-sky-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Daily Report
            </button>
            <button
              onClick={() => setReportType('weekly')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                reportType === 'weekly'
                  ? 'bg-white text-sky-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Weekly Report
            </button>
            <button
              onClick={() => setReportType('monthly')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                reportType === 'monthly'
                  ? 'bg-white text-sky-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Summary
            </button>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white text-xs font-bold shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* 4 Report Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Adherence Score */}
        <div className="glass-panel p-6 rounded-3xl shadow-soft border border-white space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Med Adherence</span>
            <Pill className="w-4 h-4 text-teal-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{adherenceScore}%</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Optimal
            </span>
          </div>
          <p className="text-xs text-slate-500">Target threshold is 90%. Patient is +4% above benchmark.</p>
        </div>

        {/* Resting Heart Rate */}
        <div className="glass-panel p-6 rounded-3xl shadow-soft border border-white space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Avg Heart Rate</span>
            <HeartPulse className="w-4 h-4 text-rose-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">73.4</span>
            <span className="text-xs text-slate-400">BPM</span>
          </div>
          <p className="text-xs text-slate-500">Min 61 BPM • Max 95 BPM over the evaluation window.</p>
        </div>

        {/* SpO2 Oxygenation */}
        <div className="glass-panel p-6 rounded-3xl shadow-soft border border-white space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Avg SpO2 Level</span>
            <Activity className="w-4 h-4 text-sky-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">98.2%</span>
            <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
              Healthy
            </span>
          </div>
          <p className="text-xs text-slate-500">No hypoxic drops below 95% detected during sleep or daytime.</p>
        </div>

        {/* Mean Blood Pressure */}
        <div className="glass-panel p-6 rounded-3xl shadow-soft border border-white space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Mean BP Index</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">118/78</span>
            <span className="text-xs text-slate-400">mmHg</span>
          </div>
          <p className="text-xs text-slate-500">Consistent with Stage-1 controlled hypertension target.</p>
        </div>

      </div>

      {/* Interactive Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Weekly Medication Adherence Bar Chart */}
        <div className="glass-panel p-6 rounded-3xl shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">4-Week Medication Adherence</h3>
              <p className="text-xs text-slate-500">Doses taken vs target adherence (90%)</p>
            </div>
            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
              Target: 90%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_ADHERENCE_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="period" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis domain={[70, 100]} stroke="#94A3B8" fontSize={12} tickLine={false} unit="%" />
                <Tooltip />
                <Legend />
                <Bar dataKey="adherence" name="Adherence %" fill="#14B8A6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="target" name="Clinical Benchmark" fill="#CBD5E1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: 7-Day Heart Rate & SpO2 Trends */}
        <div className="glass-panel p-6 rounded-3xl shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">7-Day Physiological Trends</h3>
              <p className="text-xs text-slate-500">Daily average BPM and SpO2 tracking</p>
            </div>
            <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
              Stable Correlate
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_VITALS_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis domain={[60, 100]} stroke="#94A3B8" fontSize={12} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgBpm" name="Avg BPM" stroke="#F43F5E" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="spo2" name="SpO2 %" stroke="#0EA5E9" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Historical Telemetry Logs Table */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">Health Monitoring History</h3>
            <p className="text-xs text-slate-500">Audit trail of daily aggregated biometric readings</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">Showing last 6 days</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Mean Heart Rate</th>
                <th className="py-3 px-3">SpO2 Oxygen</th>
                <th className="py-3 px-3">Blood Pressure</th>
                <th className="py-3 px-3">Adherence (Doses)</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historyRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-sky-50/40 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-800">{row.date}</td>
                  <td className="py-3.5 px-3 font-semibold text-rose-600">{row.avgHr}</td>
                  <td className="py-3.5 px-3 font-semibold text-sky-600">{row.spo2}</td>
                  <td className="py-3.5 px-3 text-slate-700">{row.bp}</td>
                  <td className="py-3.5 px-3 font-bold text-teal-600">{row.adherence}</td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor Assessment & Clinical Recommendations Card */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-7 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-md">
              Dr.
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Attending Physician's Clinical Assessment</h3>
              <p className="text-xs text-teal-300">Dr. Priya Sharma, MD (Senior Cardiologist) • St. Jude Memorial</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Verified Digital Tele-Review
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-1.5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
            <span className="text-teal-400 font-bold block text-sm">Cardiovascular Dynamics</span>
            <p>
              Heart rate variability remains in safe sinus rhythm with resting BPM hovering at 73. Blood pressure is well-controlled under Lisinopril therapy.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
            <span className="text-teal-400 font-bold block text-sm">Medication Adherence</span>
            <p>
              Adherence is exemplary at 94%. Afternoon doses have been logged within reasonable intervals. No contraindications noted with current regimen.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
            <span className="text-teal-400 font-bold block text-sm">Caregiver Action Directive</span>
            <p>
              Maintain current lifestyle and hydration protocols. Next scheduled clinical consultation confirmed for Friday at 11:30 AM EST.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-700 text-xs">
          <span className="text-slate-400">Electronic Telemetry Signature: <strong className="text-white">SHP-HASH-883921</strong></span>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Signed Report</span>
          </button>
        </div>
      </div>

    </div>
  );
}
