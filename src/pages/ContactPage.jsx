import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Send, 
  Users, 
  Award, 
  GraduationCap, 
  HelpCircle, 
  CheckCircle2, 
  MessageSquare,
  Clock,
  Sparkles
} from 'lucide-react';
import { FAQ_LIST } from '../data/mockData';

export default function ContactPage({ onNotify }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'Project Feedback',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitted(true);
    if (onNotify) {
      onNotify({
        type: 'success',
        title: 'Inquiry Transmitted',
        message: `Thank you, ${form.name}. Your message has been logged in the project registry.`
      });
    }

    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: '',
        email: '',
        subject: '',
        category: 'Project Feedback',
        message: ''
      });
    }, 4000);
  };

  const teamMembers = [
    {
      name: "B.Tech IT Project Team",
      role: "Lead Developers & Telehealth Researchers",
      dept: "Department of Information Technology",
      details: "Design, Frontend Architecture & Sensor Simulation Engine"
    },
    {
      name: "Dr. K. Ramanathan, Ph.D.",
      role: "Project Supervisor & Faculty Guide",
      dept: "Professor, Department of Information Technology",
      details: "Academic Guidance, Research Validation & System Design"
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Bar */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-soft border border-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
            <PhoneCall className="w-4 h-4" />
            <span>Connect & Support Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Contact & Academic Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Reach out for research collaborations, B.Tech IT project evaluation, and clinical feedback.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
          <GraduationCap className="w-4 h-4 text-teal-600" />
          <span>Final Year Project Presentation Ready</span>
        </div>
      </div>

      {/* Main Grid: Form & Team/Project Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl shadow-soft border border-white space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-xl font-extrabold text-slate-900">Send an Inquiry or Demonstration Feedback</h2>
            <p className="text-xs text-slate-500">All submissions are simulated and verified on the local client interface.</p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900">Message Successfully Submitted!</h3>
              <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                Thank you for your feedback. In an active deployment, an automated receipt is dispatched to your registered email address.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Robert Langdon"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. reviewer@university.edu"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Telemetry Evaluation Inquiry"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Inquiry Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Project Feedback">Project Demonstration Feedback</option>
                    <option value="Research Question">Academic & Research Query</option>
                    <option value="Clinical Evaluation">Clinical Workflow Inquiry</option>
                    <option value="General Support">General Telehealth Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Message / Comments *
                </label>
                <textarea
                  rows="4"
                  placeholder="Share your thoughts, suggestions, or project evaluation remarks..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-xs shadow-md shadow-sky-500/25 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Project & Team Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Project Details */}
          <div className="glass-panel p-6 rounded-3xl shadow-soft border border-white space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600">
              <Award className="w-4 h-4" />
              <span>Project Metadata</span>
            </div>

            <h3 className="text-base font-extrabold text-slate-900">
              SmartHealth Pro Telemetry
            </h3>

            <div className="space-y-2 text-xs text-slate-600">
              <p><strong>Department:</strong> Department of Information Technology</p>
              <p><strong>Degree Program:</strong> Bachelor of Technology (B.Tech IT)</p>
              <p><strong>Academic Year:</strong> Final Year Capstone Presentation</p>
              <p><strong>Architecture:</strong> Single-Page Application (React.js + Tailwind CSS + Recharts)</p>
            </div>
          </div>

          {/* Academic Team Information */}
          <div className="glass-panel p-6 rounded-3xl shadow-soft border border-white space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600">
              <Users className="w-4 h-4" />
              <span>Academic Team & Supervision</span>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-1">
                  <h4 className="text-sm font-extrabold text-slate-900">{member.name}</h4>
                  <p className="text-xs font-semibold text-teal-600">{member.role}</p>
                  <p className="text-[11px] text-slate-500">{member.dept}</p>
                  <p className="text-[11px] text-slate-400 italic pt-1">{member.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Contact Strip */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Institutional Contact</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>College of Technology & Engineering Campus</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <span className="font-mono">smarthealth.capstone@btech-it.edu</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Project Lab Hours: 09:00 AM - 05:30 PM IST</span>
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-soft border border-white space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500">Key considerations for viva and demonstration evaluators</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQ_LIST.map((faq, idx) => (
            <div 
              key={idx}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-sky-300 shadow-2xs transition-colors cursor-pointer space-y-2"
            >
              <h4 className="text-sm font-bold text-slate-800 flex items-start justify-between gap-2">
                <span>{faq.q}</span>
                <span className="text-teal-600 font-bold shrink-0">{openFaq === idx ? '−' : '+'}</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
