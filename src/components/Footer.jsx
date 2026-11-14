import React from 'react';
import { HeartPulse, Shield, Phone, Mail, MapPin, Award, CheckCircle, ExternalLink, Heart } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-teal-400 text-white shadow-md shadow-sky-500/20">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                SmartHealth <span className="text-teal-400">Pro</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Next-generation smart healthcare telemetry and intelligent medication adherence ecosystem. 
              Designed to empower elderly patients, assist caregivers, and bridge tele-health connectivity in rural communities.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-teal-300 font-medium">
              <Award className="w-3.5 h-3.5 text-teal-400" />
              <span>B.Tech Information Technology Project Capstone</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                HIPAA-Design Standard
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                AES-256 Mock Encrypted
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Patient Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('medicines'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Medicine Reminders
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('caregiver'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Caregiver Portal
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('reports'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Clinical PDF Reports
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('notifications'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Alerts & Reminders
                </button>
              </li>
            </ul>
          </div>

          {/* Project & Research Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Project Scope
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Problem Statement
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  System Architecture
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Elderly Care Benefits
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Rural Telemedicine
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Project Team & Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Helplines & Support
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Emergency Dispatch</p>
                  <p className="text-rose-400 font-mono">911 / 108 / 112</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Telehealth Support</p>
                  <p className="text-slate-400 font-mono">telemetry@smarthealth.demo</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Department of IT</p>
                  <p className="text-slate-400">Academic Project Showcase</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SmartHealth Pro. Final Year B.Tech IT Project Demonstration.</p>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Healthcare Innovation
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">Frontend Prototype (React + Tailwind + Recharts)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
