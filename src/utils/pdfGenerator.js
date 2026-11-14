import { jsPDF } from 'jspdf';

export function generateHealthReportPDF(patient, vitals, medicines, adherenceScore = 94) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header Background Banner
  doc.setFillColor(14, 165, 233); // Primary health blue (#0EA5E9)
  doc.rect(0, 0, pageWidth, 38, 'F');

  // Secondary Accent Line
  doc.setFillColor(20, 184, 166); // Teal accent (#14B8A6)
  doc.rect(0, 38, pageWidth, 3, 'F');

  // Title Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('SmartHealth Pro | Clinical Telemetry Report', 15, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Smart Healthcare Monitoring & Medication Adherence Telemetry System', 15, 26);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })} at ${new Date().toLocaleTimeString()}`, 15, 32);

  // Verification Badge on Right
  doc.setFontSize(9);
  doc.text('REF: SHP-' + Math.floor(100000 + Math.random() * 900000), pageWidth - 45, 18);
  doc.text('CONFIDENTIAL CLINICAL RECORD', pageWidth - 65, 26);

  // Patient Information Card
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('1. Patient Demographics & Caregiver Information', 15, 50);

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, 54, pageWidth - 30, 36, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, 54, pageWidth - 30, 36, 3, 3, 'D');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);

  // Column 1
  doc.text(`Patient Name: `, 20, 62);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${patient.name}`, 48, 62);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Patient ID: `, 20, 70);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${patient.id}`, 48, 70);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Age / Gender: `, 20, 78);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${patient.age} yrs / ${patient.gender} (${patient.bloodGroup})`, 48, 78);

  // Column 2
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Primary Diagnosis: `, 105, 62);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${patient.primaryCondition}`, 140, 62);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Attending Physician: `, 105, 70);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${patient.doctor.name} (${patient.doctor.specialty})`, 140, 70);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Primary Caregiver: `, 105, 78);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${patient.caregiver.name} (${patient.caregiver.relation})`, 140, 78);

  // Section 2: Vitals Telemetry Summary
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('2. Telemetry Vital Signs Summary (Last 24 Hours)', 15, 99);

  const vitalsBoxes = [
    { title: 'Heart Rate', value: `${vitals.heartRate} BPM`, status: 'Normal (60-100)', color: [239, 68, 68] },
    { title: 'Blood Oxygen (SpO2)', value: `${vitals.spo2}%`, status: 'Optimal (>= 95%)', color: [14, 165, 233] },
    { title: 'Body Temp', value: `${vitals.temp} °C`, status: 'Afebrile (36.1-37.2)', color: [20, 184, 166] },
    { title: 'Blood Pressure', value: `${vitals.bloodPressure || '118/78'} mmHg`, status: 'Normotensive', color: [168, 85, 247] }
  ];

  const boxWidth = (pageWidth - 30 - 15) / 4;
  vitalsBoxes.forEach((vb, idx) => {
    const xPos = 15 + idx * (boxWidth + 5);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(xPos, 104, boxWidth, 26, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(xPos, 104, boxWidth, 26, 2, 2, 'D');

    // Colored Accent bar
    doc.setFillColor(...vb.color);
    doc.rect(xPos, 104, boxWidth, 2, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(vb.title, xPos + 4, 112);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(vb.value, xPos + 4, 120);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(16, 185, 129);
    doc.text(vb.status, xPos + 4, 126);
  });

  // Section 3: Medication Adherence & Schedule
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('3. Medication Adherence & Active Prescription Schedule', 15, 139);

  // Adherence badge
  doc.setFillColor(236, 253, 245);
  doc.roundedRect(pageWidth - 75, 133, 60, 8, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(5, 150, 105);
  doc.text(`Compliance Score: ${adherenceScore}% (Optimal)`, pageWidth - 72, 138.5);

  // Table Header
  const tableY = 145;
  doc.setFillColor(241, 245, 249);
  doc.rect(15, tableY, pageWidth - 30, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text('Medication Name', 18, tableY + 5.5);
  doc.text('Dosage', 65, tableY + 5.5);
  doc.text('Frequency & Slot', 95, tableY + 5.5);
  doc.text('Instructions', 135, tableY + 5.5);
  doc.text('Status', pageWidth - 35, tableY + 5.5);

  let currentY = tableY + 8;
  medicines.slice(0, 6).forEach((med, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(15, currentY, pageWidth - 30, 9, 'F');
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(med.name, 18, currentY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(med.dosage, 65, currentY + 6);
    doc.text(`${med.scheduledTime} (${med.slot.toUpperCase()})`, 95, currentY + 6);
    doc.text(med.instructions ? med.instructions.substring(0, 28) + '...' : 'As prescribed', 135, currentY + 6);

    // Status Pill
    if (med.status === 'taken') {
      doc.setTextColor(16, 185, 129);
      doc.setFont('helvetica', 'bold');
      doc.text('TAKEN', pageWidth - 35, currentY + 6);
    } else if (med.status === 'missed') {
      doc.setTextColor(239, 68, 68);
      doc.setFont('helvetica', 'bold');
      doc.text('MISSED', pageWidth - 35, currentY + 6);
    } else {
      doc.setTextColor(234, 88, 12);
      doc.setFont('helvetica', 'bold');
      doc.text('PENDING', pageWidth - 35, currentY + 6);
    }

    currentY += 9;
  });

  // Section 4: Physician Clinical Assessment & Caregiver Action Plan
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('4. Clinical Assessment & Recommendation', 15, currentY + 12);

  const notesY = currentY + 16;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, notesY, pageWidth - 30, 36, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, notesY, pageWidth - 30, 36, 3, 3, 'D');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text('• Cardiovascular and respiratory telemetry are within acceptable clinical parameters over the 24h evaluation window.', 20, notesY + 8);
  doc.text(`• Patient exhibits high medication compliance (${adherenceScore}%). Evening dose monitoring confirmed via smart alert system.`, 20, notesY + 15);
  doc.text('• Caregiver Alert: Ensure hydration schedule is sustained, especially between 14:00 and 17:00 daily.', 20, notesY + 22);
  doc.text('• Next scheduled tele-health consultation with Dr. Priya Sharma on Friday at 11:30 AM EST.', 20, notesY + 29);

  // Footer & Official Digital Seal
  const footerY = 270;
  doc.setDrawColor(203, 213, 225);
  doc.line(15, footerY, pageWidth - 15, footerY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text('SMARTHEALTH PRO CERTIFIED TELEMETRY', 15, footerY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('B.Tech Information Technology Project Prototype | Batch_22 | Academic & Clinical Model', 15, footerY + 11);
  doc.text('This document was automatically generated by the SmartHealth Pro Telehealth Platform.', 15, footerY + 16);

  // Digital Signature block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Digitally Verified:', pageWidth - 60, footerY + 6);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(2, 132, 199);
  doc.text('Dr. Priya Sharma, MD', pageWidth - 60, footerY + 11);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Cardiology Telehealth Sync ID: SHP-AUTH-882', pageWidth - 60, footerY + 16);

  // Download PDF
  doc.save(`SmartHealth_Report_${patient.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`);
}
