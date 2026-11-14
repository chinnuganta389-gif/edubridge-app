// Realistic healthcare mock data for SmartHealth Pro
export const PATIENT_PROFILES = [
  {
    id: "P-1049",
    name: "Eleanor Vance",
    age: 72,
    gender: "Female",
    bloodGroup: "B+",
    weight: "64 kg",
    height: "162 cm",
    primaryCondition: "Mild Hypertension & Type-2 Diabetes",
    room: "Residence #4B - Home Telehealth",
    caregiver: {
      name: "Marcus Vance",
      relation: "Son / Primary Caregiver",
      phone: "+1 (555) 382-9014",
      email: "marcus.vance@medicare-hub.org"
    },
    doctor: {
      name: "Dr. Priya Sharma",
      specialty: "Senior Cardiologist, MD",
      hospital: "City Central Health & Research Center",
      phone: "+1 (555) 700-1122"
    },
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    adherenceRate: 94,
    status: "Normal & Stable",
    statusType: "safe",
    insuranceId: "MED-99201-XYZ"
  },
  {
    id: "P-1050",
    name: "Robert Chen",
    age: 68,
    gender: "Male",
    bloodGroup: "O+",
    weight: "78 kg",
    height: "174 cm",
    primaryCondition: "Post-Myocardial Recovery & Arrhythmia",
    room: "Residence #12A - Supervised Care",
    caregiver: {
      name: "Linda Chen",
      relation: "Spouse",
      phone: "+1 (555) 489-3321",
      email: "linda.chen@familycare.io"
    },
    doctor: {
      name: "Dr. Alistair Finch",
      specialty: "Consultant Pulmonologist",
      hospital: "St. Jude Memorial Hospital",
      phone: "+1 (555) 881-2299"
    },
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    adherenceRate: 78,
    status: "Attention Required",
    statusType: "warning",
    insuranceId: "MED-88172-ABC"
  },
  {
    id: "P-1051",
    name: "Martha Stewart",
    age: 81,
    gender: "Female",
    bloodGroup: "A+",
    weight: "58 kg",
    height: "155 cm",
    primaryCondition: "Osteoarthritis & Mild Cognitive Impairment",
    room: "Sunny Meadows Assisted Living Suite 204",
    caregiver: {
      name: "Angela Gomez",
      relation: "Registered Nurse Aid",
      phone: "+1 (555) 912-4400",
      email: "angela.gomez@sunnymeadows.com"
    },
    doctor: {
      name: "Dr. Rajesh Kothari",
      specialty: "Geriatric Specialist",
      hospital: "Apex Integrated Clinic",
      phone: "+1 (555) 431-7788"
    },
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    adherenceRate: 88,
    status: "Normal & Stable",
    statusType: "safe",
    insuranceId: "MED-66314-OPQ"
  }
];

export const INITIAL_MEDICINES = [
  {
    id: "med-1",
    name: "Lisinopril",
    dosage: "10 mg",
    form: "Tablet",
    category: "Cardiovascular / BP",
    instructions: "Take with water once daily before breakfast.",
    slot: "morning",
    scheduledTime: "08:00 AM",
    status: "taken",
    lastTakenTime: "08:05 AM Today",
    remainingDoses: 24,
    color: "teal"
  },
  {
    id: "med-2",
    name: "Metformin HCl",
    dosage: "500 mg",
    form: "Extended Release",
    category: "Diabetes Management",
    instructions: "Take with meals to minimize stomach upset.",
    slot: "morning",
    scheduledTime: "08:30 AM",
    status: "taken",
    lastTakenTime: "08:35 AM Today",
    remainingDoses: 18,
    color: "blue"
  },
  {
    id: "med-3",
    name: "Aspirin (Cardio)",
    dosage: "81 mg",
    form: "Enteric Coated",
    category: "Blood Thinner",
    instructions: "Take post-lunch with a full glass of water.",
    slot: "afternoon",
    scheduledTime: "01:30 PM",
    status: "taken",
    lastTakenTime: "01:25 PM Today",
    remainingDoses: 42,
    color: "amber"
  },
  {
    id: "med-4",
    name: "Atorvastatin",
    dosage: "20 mg",
    form: "Film-coated Tablet",
    category: "Lipid / Cholesterol",
    instructions: "Take in the evening before or after dinner.",
    slot: "evening",
    scheduledTime: "07:30 PM",
    status: "pending",
    lastTakenTime: null,
    remainingDoses: 14,
    color: "purple"
  },
  {
    id: "med-5",
    name: "Omega-3 EPA/DHA",
    dosage: "1000 mg",
    form: "Softgel Capsule",
    category: "Nutritional Supplement",
    instructions: "Take with evening meal.",
    slot: "evening",
    scheduledTime: "08:00 PM",
    status: "pending",
    lastTakenTime: null,
    remainingDoses: 30,
    color: "emerald"
  },
  {
    id: "med-6",
    name: "Melatonin Sleep Aid",
    dosage: "3 mg",
    form: "Dissolvable Tab",
    category: "Sleep Support",
    instructions: "Take 30 minutes before bed.",
    slot: "night",
    scheduledTime: "10:00 PM",
    status: "pending",
    lastTakenTime: null,
    remainingDoses: 28,
    color: "indigo"
  }
];

export const HOURLY_VITALS_DATA = [
  { time: "00:00", heartRate: 64, spo2: 98, temp: 36.4, systolic: 114, diastolic: 74 },
  { time: "02:00", heartRate: 62, spo2: 97, temp: 36.3, systolic: 112, diastolic: 72 },
  { time: "04:00", heartRate: 61, spo2: 98, temp: 36.3, systolic: 110, diastolic: 70 },
  { time: "06:00", heartRate: 68, spo2: 99, temp: 36.5, systolic: 118, diastolic: 76 },
  { time: "08:00", heartRate: 78, spo2: 98, temp: 36.6, systolic: 124, diastolic: 80 },
  { time: "10:00", heartRate: 84, spo2: 97, temp: 36.8, systolic: 122, diastolic: 78 },
  { time: "12:00", heartRate: 76, spo2: 98, temp: 36.7, systolic: 119, diastolic: 77 },
  { time: "14:00", heartRate: 80, spo2: 98, temp: 36.9, systolic: 121, diastolic: 79 },
  { time: "16:00", heartRate: 75, spo2: 99, temp: 36.7, systolic: 118, diastolic: 78 },
  { time: "18:00", heartRate: 79, spo2: 98, temp: 36.8, systolic: 120, diastolic: 80 },
  { time: "20:00", heartRate: 72, spo2: 98, temp: 36.6, systolic: 117, diastolic: 76 },
  { time: "22:00", heartRate: 68, spo2: 99, temp: 36.5, systolic: 115, diastolic: 74 }
];

export const WEEKLY_VITALS_DATA = [
  { day: "Mon", avgBpm: 72, maxBpm: 88, minBpm: 62, spo2: 98, temp: 36.6, adherence: 100 },
  { day: "Tue", avgBpm: 74, maxBpm: 92, minBpm: 63, spo2: 98, temp: 36.7, adherence: 100 },
  { day: "Wed", avgBpm: 76, maxBpm: 95, minBpm: 65, spo2: 97, temp: 36.8, adherence: 83 },
  { day: "Thu", avgBpm: 73, maxBpm: 89, minBpm: 62, spo2: 99, temp: 36.6, adherence: 100 },
  { day: "Fri", avgBpm: 75, maxBpm: 91, minBpm: 64, spo2: 98, temp: 36.6, adherence: 100 },
  { day: "Sat", avgBpm: 71, maxBpm: 86, minBpm: 61, spo2: 98, temp: 36.5, adherence: 100 },
  { day: "Sun", avgBpm: 73, maxBpm: 87, minBpm: 62, spo2: 99, temp: 36.6, adherence: 94 }
];

export const MONTHLY_ADHERENCE_DATA = [
  { period: "Week 1", adherence: 92, target: 90, dosesTaken: 39, dosesMissed: 3 },
  { period: "Week 2", adherence: 95, target: 90, dosesTaken: 40, dosesMissed: 2 },
  { period: "Week 3", adherence: 88, target: 90, dosesTaken: 37, dosesMissed: 5 },
  { period: "Week 4", adherence: 96, target: 90, dosesTaken: 41, dosesMissed: 1 }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "medicine",
    category: "Upcoming Dose",
    title: "Evening Medication Approaching",
    message: "Atorvastatin (20mg) is scheduled at 07:30 PM. Please take with water.",
    time: "10 mins ago",
    unread: true,
    severity: "info"
  },
  {
    id: "notif-2",
    type: "vital",
    category: "Vital Reading",
    title: "Stable Vitals Stream Verified",
    message: "Resting Heart Rate stabilized at 74 BPM. SpO2 is optimal at 98%.",
    time: "25 mins ago",
    unread: true,
    severity: "success"
  },
  {
    id: "notif-3",
    type: "caregiver",
    category: "Caregiver Sync",
    title: "Marcus Vance Reviewed Vitals",
    message: "Primary caregiver checked the morning telemetry log. No intervention needed.",
    time: "2 hours ago",
    unread: false,
    severity: "neutral"
  },
  {
    id: "notif-4",
    type: "alert",
    category: "Adherence Alert",
    title: "Wednesday Afternoon Dose Notice",
    message: "Aspirin 81mg was logged 45 minutes past optimal window on Wednesday.",
    time: "Yesterday",
    unread: false,
    severity: "warning"
  },
  {
    id: "notif-5",
    type: "checkup",
    category: "Doctor Advisory",
    title: "Bi-Weekly Tele-Review Confirmed",
    message: "Dr. Priya Sharma scheduled virtual follow-up for Friday at 11:30 AM.",
    time: "2 days ago",
    unread: false,
    severity: "info"
  }
];

export const CAREGIVER_ACTIVITY_LOG = [
  {
    id: "act-1",
    time: "08:35 AM",
    date: "Today",
    action: "Medication Confirmed",
    details: "Metformin HCl 500mg marked as TAKEN by Eleanor Vance.",
    badge: "Adherence",
    badgeColor: "teal"
  },
  {
    id: "act-2",
    time: "08:05 AM",
    date: "Today",
    action: "Medication Confirmed",
    details: "Lisinopril 10mg marked as TAKEN.",
    badge: "Adherence",
    badgeColor: "teal"
  },
  {
    id: "act-3",
    time: "07:15 AM",
    date: "Today",
    action: "Morning Sensor Sync",
    details: "Wearable telemetry synced: HR 72 BPM, SpO2 98%, Temp 36.6°C.",
    badge: "Telemetry",
    badgeColor: "blue"
  },
  {
    id: "act-4",
    time: "09:45 PM",
    date: "Yesterday",
    action: "Bedtime Routine Check",
    details: "Melatonin 3mg logged. Vitals transitioned into resting sleep baseline.",
    badge: "Routine",
    badgeColor: "indigo"
  },
  {
    id: "act-5",
    time: "03:10 PM",
    date: "Yesterday",
    action: "Hydration Alert Triggered",
    details: "Patient prompt delivered to drink 250ml water. Acknowledged.",
    badge: "Wellness",
    badgeColor: "emerald"
  }
];

export const FAQ_LIST = [
  {
    q: "How does the simulated IoT health monitoring work?",
    a: "The dashboard integrates a smart simulation engine that mimics real photoplethysmography (PPG) and thermal sensors. You can toggle live vitals to observe dynamic fluctuations in Heart Rate, SpO2, and Body Temperature in real time."
  },
  {
    q: "How does the Caregiver interface help elderly patients?",
    a: "Caregivers receive real-time sync when doses are marked as taken or missed, instant alerts if vitals cross safe clinical thresholds, and quick-action buttons to dial the patient or their attending physician directly."
  },
  {
    q: "Can health reports be exported for clinical visits?",
    a: "Yes! Our Reports section features an interactive PDF generator that compiles historical vitals, adherence analytics, physician notes, and hospital-ready summary sheets with a single click."
  },
  {
    q: "How does this platform benefit rural and underserved communities?",
    a: "By bridging the tele-health gap, elderly patients in remote areas can be monitored continuously by distant family members or community health workers, drastically reducing emergency room readmissions."
  }
];
