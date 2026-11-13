' ==============================================================================
' EDUBRIDGE PROJECT - AUTOMATIC POWERPOINT GENERATOR MACRO (VBA)
' Project Title: A STUDY ON DIGITAL EDUCATION AWARENESS IN RURAL VILLAGES
' ==============================================================================
' INSTRUCTIONS TO RUN:
' 1. Open Microsoft PowerPoint.
' 2. Press ALT + F11 on your keyboard to open the VBA Editor.
' 3. Click menu "Insert" -> "Module".
' 4. Paste this entire code into the module window.
' 5. Press F5 (or click the green Play button) to run the macro.
' 6. All 14 slides will be generated automatically with titles, bullet points, and notes!
' ==============================================================================

Sub GenerateEduBridgePresentation()
    Dim pptApp As PowerPoint.Application
    Dim pres As PowerPoint.Presentation
    Dim sld As PowerPoint.Slide
    Dim shpTitle As PowerPoint.Shape
    Dim shpBody As PowerPoint.Shape
    Dim notesShape As PowerPoint.Shape
    
    Set pres = ActivePresentation
    
    ' Set 16:9 Widescreen layout if available
    On Error Resume Next
    pres.PageSetup.SlideSize = ppSlideSizeOnScreen16x9
    On Error GoTo 0
    
    ' --------------------------------------------------------------------------
    ' SLIDE 1: Title Slide
    ' --------------------------------------------------------------------------
    Set sld = pres.Slides.Add(pres.Slides.Count + 1, ppLayoutTitle)
    sld.Shapes(1).TextFrame.TextRange.Text = "EduBridge"
    sld.Shapes(1).TextFrame.TextRange.Font.Name = "Segoe UI"
    sld.Shapes(1).TextFrame.TextRange.Font.Bold = msoTrue
    sld.Shapes(1).TextFrame.TextRange.Font.Size = 44
    sld.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(30, 58, 138) ' Navy Blue
    
    sld.Shapes(2).TextFrame.TextRange.Text = "A Study on Digital Education Awareness in Rural Villages" & vbCrLf & _
        "Community Service Project (CSP) / Academic Capstone" & vbCrLf & vbCrLf & _
        "Presented by: [Your Name] | Roll No: [Your Roll No]" & vbCrLf & _
        "Department of Computer Science & Engineering | [Your College Name]"
    sld.Shapes(2).TextFrame.TextRange.Font.Name = "Segoe UI"
    sld.Shapes(2).TextFrame.TextRange.Font.Size = 18
    sld.Shapes(2).TextFrame.TextRange.Font.Color.RGB = RGB(71, 85, 105)
    
    sld.NotesPage.Shapes(2).TextFrame.TextRange.Text = "Speaker Note: Good morning respected evaluators and professors. Today, I am proud to present our project titled 'EduBridge: A Study on Digital Education Awareness in Rural Villages'. This project addresses the critical awareness gap in rural technical education by centralizing world-class free learning platforms into an accessible, bilingual gateway."

    ' --------------------------------------------------------------------------
    ' SLIDE 2: Introduction & Social Context
    ' --------------------------------------------------------------------------
    Set sld = pres.Slides.Add(pres.Slides.Count + 1, ppLayoutText)
    sld.Shapes(1).TextFrame.TextRange.Text = "Introduction & Social Context"
    sld.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(30, 58, 138)
    
    sld.Shapes(2).TextFrame.TextRange.Text = _
        "Rapid Mobile Penetration: Rural India has experienced exponential 4G/5G mobile internet adoption and smartphone ownership." & vbCrLf & _
        "The Missing Link: Despite internet connectivity, rural students primarily utilize smartphones for social media and video streaming, unaware of high-quality educational portals." & vbCrLf & _
        "The Education Divide: Urban students benefit from peer mentorship, coaching, and awareness of platforms like W3Schools, GeeksforGeeks, HackerRank, and SWAYAM." & vbCrLf & _
        "EduBridge Mission: To bridge this digital information gap by creating a free, bilingual discovery hub connecting rural students directly to global learning resources."
    sld.NotesPage.Shapes(2).TextFrame.TextRange.Text = "Speaker Note: While hardware and connectivity have reached rural villages, digital educational awareness has lagged behind. Many students do not know that platforms like W3Schools, LeetCode, or Harvard's CS50 exist and are completely free. EduBridge was born to solve this exact problem."

    ' --------------------------------------------------------------------------
    ' SLIDE 3: Problem Statement
    ' --------------------------------------------------------------------------
    Set sld = pres.Slides.Add(pres.Slides.Count + 1, ppLayoutText)
    sld.Shapes(1).TextFrame.TextRange.Text = "Problem Statement & Rural Challenges"
    sld.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(30, 58, 138)
    
    sld.Shapes(2).TextFrame.TextRange.Text = _
        "Information Asymmetry: Millions of free educational tutorials, textbooks, and compiler tools exist online, but rural students do not know where to start." & vbCrLf & _
        "High Financial Barriers: Commercial coaching institutes charge heavy fees (Rs. 20,000 to Rs. 50,000) for basic programming lessons freely available online." & vbCrLf & _
        "Language Hesitation: Technical English creates fear and hesitation among rural regional-medium students." & vbCrLf & _
        "Hardware Misconception: A widespread belief that learning programming strictly requires an expensive laptop, preventing mobile-only learners from coding." & vbCrLf & _
        "Lack of Structured Roadmaps: Confusion regarding skill sequences for career roles like Full Stack, Python, or Data Analytics."
    sld.NotesPage.Shapes(2).TextFrame.TextRange.Text = "Speaker Note: Through our rural survey, we identified four major bottlenecks: lack of awareness, fear of English, the false belief that programming requires an expensive PC, and absence of mentorship. Students waste money or give up because they lack guidance."

    ' --------------------------------------------------------------------------
    ' SLIDE 4: Project Objectives & Scope
    ' --------------------------------------------------------------------------
    Set sld = pres.Slides.Add(pres.Slides.Count + 1, ppLayoutText)
    sld.Shapes(1).TextFrame.TextRange.Text = "Project Objectives & Scope"
    sld.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(30, 58, 138)
    
    sld.Shapes(2).TextFrame.TextRange.Text = _
        "Centralized Discovery: Build a single-window portal cataloging 47+ verified, genuine educational platforms." & vbCrLf & _
        "Bilingual Orientation: Provide parallel Telugu (తెలుగు) summaries, explanations, and advice for beginners." & vbCrLf & _
        "Academic Integration: Organize 12 foundational B.Tech CSE/IT subjects with curated lecture playlists (Gate Smashers, Abdul Bari, Neso Academy)." & vbCrLf & _
        "Transparency in Pricing: Clearly classify resources into 100% Free, Free Audit, and Govt-sponsored (NPTEL, Infosys Springboard, IBM)." & vbCrLf & _
        "Career Roadmaps: Deliver 9 step-by-step career path guides with beginner project ideas." & vbCrLf & _
        "Scope Boundary: EduBridge is an awareness & discovery gateway, not a replacement LMS. It redirects students directly to official providers."
    sld.NotesPage.Shapes(2).TextFrame.TextRange.Text = "Speaker Note: Our primary objective is to empower rural students with self-paced learning. EduBridge does not duplicate external platforms; instead, it organizes, clarifies, and points students directly to official verified portals with Telugu guidance."

    ' --------------------------------------------------------------------------
    ' SLIDE 5: System Architecture
    ' --------------------------------------------------------------------------
    Set sld = pres.Slides.Add(pres.Slides.Count + 1, ppLayoutText)
    sld.Shapes(1).TextFrame.TextRange.Text = "System Architecture & Workflow"
    sld.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(30, 58, 138)
    
    sld.Shapes(2).TextFrame.TextRange.Text = _
        "3-Tier Web Architecture: Presentation Layer (HTML5/CSS3/JS), Application Server (Node.js/Express), and Data Persistence (Embedded SQLite)." & vbCrLf & _
        "High-Performance Embedded Database: Built-in node:sqlite (DatabaseSync) providing zero-latency queries without separate database server processes." & vbCrLf & _
        "Stateless Token Security: JWT (JSON Web Tokens) with HTTP-only cookies for student authentication and role-based access control." & vbCrLf & _
        "Responsive Client: Mobile-first responsive CSS tailored for budget 4G smartphones and low bandwidth usage." & vbCrLf & _
        "Direct Traffic Redirection: Tracks student visits and redirects directly to genuine external platforms in isolated browser tabs."
    sld.NotesPage.Shapes(2).TextFrame.TextRange.Text = "Speaker Note: EduBridge is designed to run efficiently on both desktop and low-end mobile devices. The architecture uses Express for REST APIs and Node's modern built-in SQLite engine, ensuring rapid startup and zero external database overhead."

    ' --------------------------------------------------------------------------
    ' SLIDE 6: Core Modules & Features
    ' --------------------------------------------------------------------------
    Set sld = pres.Slides.Add(pres.Slides.Count + 1, ppLayoutText)
    sld.Shapes(1).TextFrame.TextRange.Text = "Core Modules of EduBridge"
    sld.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(30, 58, 138)
    
    sld.Shapes(2).TextFrame.TextRange.Text = _
        "1. Global Resource Catalog (explore.html): Real-time search, multi-filter by Category, Difficulty Level, and Pricing Model." & vbCrLf & _
        "2. Programming Hub (programming.html): 12 languages/domains (C, C++, Java, Python, Web, SQL, DSA) with in-browser online compiler recommendations." & vbCrLf & _
        "3. Coding Practice Portal (coding-practice.html): LeetCode, HackerRank, CodeChef, Codeforces ranked by beginner-to-advanced progression." & vbCrLf & _
        "4. B.Tech Engineering Hub (btech-subjects.html): 12 core semester subjects with top YouTube playlists and semester exam scoring strategies." & vbCrLf & _
        "5. Free Courses & Certifications (free-courses.html): Direct links to NPTEL, SWAYAM, IBM SkillsBuild, and Coursera Financial Aid guide." & vbCrLf & _
        "6. Aptitude & Placement Prep (aptitude.html): IndiaBIX, PrepInsta, and built-in Speed Math formula cheatsheet." & vbCrLf & _
        "7. Career Roadmaps (career-guidance.html): 9 software job roadmaps with required skills, practice platforms, and project ideas."
    sld.NotesPage.Shapes(2).TextFrame.TextRange.Text = "Speaker Note: EduBridge covers the entire student journey: from learning their first line of Python in their phone browser, to cracking semester exams, obtaining free IBM/NPTEL certificates, and preparing for campus placement aptitude tests."

    ' --------------------------------------------------------------------------
    ' SLIDE 7: Key Research Innovations
    ' --------------------------------------------------------------------------
    Set sld = pres.Slides.Add(pres.Slides.Count + 1, ppLayoutText)
    sld.Shapes(1).TextFrame.TextRange.Text = "Special Features for Rural Beginners"
    sld.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(30, 58, 138)
    
    sld.Shapes(2).TextFrame.TextRange.Text = _
        "Bilingual Toggle Engine (English & Telugu): Instant one-click language switcher without page reload, providing native Telugu explanations for complex concepts." & vbCrLf & _
        "Digital Literacy Handbook (digital-literacy.html): 11 guided lessons tailored for rural students:" & vbCrLf & _
        "   - Setting up professional Gmail accounts" & vbCrLf & _
        "   - Video data saving techniques (360p/480p vs 1080p)" & vbCrLf & _
        "   - Coding on mobile phones with Rs. 30 OTG keyboards" & vbCrLf & _
        "   - Identifying genuine government portals (.ac.in / .gov.in) vs scam sites" & vbCrLf & _
        "   - Cyber hygiene, strong passwords, and OTP security" & vbCrLf & _
        "Zero-Hardware Barrier: Actively promotes browser-based cloud IDEs (Replit, Programiz) so students don't need a laptop."
    sld.NotesPage.Shapes(2).TextFrame.TextRange.Text = "Speaker Note: Our research highlighted that rural students needed more than just links; they needed basic digital orientation. Our 11 Digital Literacy modules teach students how to save mobile data, create professional emails, and stay safe from cyber fraud."

    ' --------------------------------------------------------------------------
    ' SLIDE 8: User Roles & Interactive Portals
    ' --------------------------------------------------------------------------
    Set sld = pres.Slides.Add(pres.Slides.Count + 1, ppLayoutText)
    sld.Shapes(1).TextFrame.TextRange.Text = "User Roles & Interactive Portals"
    sld.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(30, 58, 138)
    
    sld.Shapes(2).TextFrame.TextRange.Text = _
        "1. Public Visitor (Guest):" & vbCrLf & _
        "   - Freely browse, search, and filter all 47+ educational platforms with zero registration friction." & vbCrLf & _
        "2. Registered Student Portal (dashboard.html):" & vbCrLf & _
        "   - Personalized greeting displaying village name and college details." & vbCrLf & _
        "   - Interactive bookmark manager to save favorite platforms." & vbCrLf & _
        "   - Recently visited platforms timeline and profile editor." & vbCrLf & _
        "3. Administrator Console (admin.html):" & vbCrLf & _
        "   - Full CRUD operations (Add, Edit, Delete platforms with English & Telugu text)." & vbCrLf & _
        "   - Real-time analytical dashboard (Total platforms, registered students, link clicks)." & vbCrLf & _
        "   - Student suggestion and broken link resolution tracking."
    sld.NotesPage.Shapes(2).TextFrame.TextRange.Text = "Speaker Note: We implemented a 3-tier user system. Visitors can freely browse without friction. Students get a personalized dashboard with bookmarks and history. Administrators have a dedicated console to manage verified listings and review student feedback."

    ' --------------------------------------------------------------------------
    ' SLIDE 9: Database Design
    ' --------------------------------------------------------------------------
    Set sld = pres.Slides.Add(pres.Slides.Count + 1, ppLayoutText)
    sld.Shapes(1).TextFrame.TextRange.Text = "Database Schema & Entity Relationships"
    sld.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(30, 58, 138)
    
    sld.Shapes(2).TextFrame.TextRange.Text = _
        "1. 'users' Table: User ID, Name, Email, Password Hash (Bcrypt), Role (Admin/Student), Village, College, Study Level, Language, Interests." & vbCrLf & _
        "2. 'resources' Table: Resource ID, Name, URL, Category, Subcategories, Skill Level, Pricing, Description, Telugu Description, Featured Flag, Click Count." & vbCrLf & _
        "3. 'bookmarks' Table: Composite Unique (user_id, resource_id) with cascading deletion." & vbCrLf & _
        "4. 'visits' Table: Tracking student redirection history and timestamp logs." & vbCrLf & _
        "5. 'feedback' Table: Student submissions, broken link reports, message content, and status tracking (pending/reviewed/resolved)."
    sld.NotesPage.Shapes(2).TextFrame.TextRange.Text = "Speaker Note: The database schema is lightweight and relational, enforcing foreign key integrity and password hashing using bcrypt. The embedded SQLite database ensures instant initialization and portable deployments."

    ' --------------------------------------------------------------------------
    ' SLIDE 10: Technology Stack & Tools Used
    ' --------------------------------------------------------------------------
    Set sld = pres.Slides.Add(pres.Slides.Count + 1, ppLayoutText)
    sld.Shapes(1).TextFrame.TextRange.Text = "Technology Stack & Tools Used"
    sld.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(30, 58, 138)
    
    sld.Shapes(2).TextFrame.TextRange.Text = _
        "Frontend Architecture:" & vbCrLf & _
        "   - Semantic HTML5 & Vanilla CSS3 with Custom Variable Design System" & vbCrLf & _
        "   - Client-side JavaScript (ES6+), Fetch API, and i18n Translation Engine" & vbCrLf & _
        "   - Responsive Mobile-first layout with Noto Sans Telugu typography" & vbCrLf & _
        "Backend Architecture:" & vbCrLf & _
        "   - Node.js Runtime (v22+ / v24) with Express.js 5.3 REST Framework" & vbCrLf & _
        "   - JSON Web Tokens (JWT) & Cookie-Parser for stateless session auth" & vbCrLf & _
        "   - Bcrypt.js for secure cryptographic password hashing" & vbCrLf & _
        "Database & Deployment:" & vbCrLf & _
        "   - Node.js Embedded SQLite (node:sqlite DatabaseSync) & GitHub / Render.com Cloud"
    sld.NotesPage.Shapes(2).TextFrame.TextRange.Text = "Speaker Note: Our stack is chosen for maximum speed and zero bloat. By avoiding heavy frontend frameworks like React or Angular, pages load in milliseconds even over rural 3G/4G connections with low bandwidth consumption."

    ' --------------------------------------------------------------------------
    ' SLIDE 11: Key Outcomes & Community Impact
    ' --------------------------------------------------------------------------
    Set sld = pres.Slides.Add(pres.Slides.Count + 1, ppLayoutText)
    sld.Shapes(1).TextFrame.TextRange.Text = "Key Outcomes & Community Impact"
    sld.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(30, 58, 138)
    
    sld.Shapes(2).TextFrame.TextRange.Text = _
        "Democratizing Higher Technical Education: Gives rural youth the exact same educational access as students in premier metropolitan institutions." & vbCrLf & _
        "Elimination of Coaching Dependency: Empowers students to learn programming and aptitude at Rs. 0 cost from top global educators." & vbCrLf & _
        "Practical Employability: Direct exposure to industry-standard problem solving (HackerRank, LeetCode) enhances campus placement conversion rates." & vbCrLf & _
        "Regional Confidence: Telugu explanations remove the psychological fear of English-only technical portals." & vbCrLf & _
        "Academic Upliftment: Curated video playlists improve B.Tech semester pass percentages in challenging subjects like Automata, OS, and Compiler Design."
    sld.NotesPage.Shapes(2).TextFrame.TextRange.Text = "Speaker Note: The measurable outcome of EduBridge is confidence, awareness, and employability. When a student in a rural village realizes they can practice coding for free and get certified by IBM or IITs, their entire career trajectory changes."

    ' --------------------------------------------------------------------------
    ' SLIDE 12: Future Scope & Enhancements
    ' --------------------------------------------------------------------------
    Set sld = pres.Slides.Add(pres.Slides.Count + 1, ppLayoutText)
    sld.Shapes(1).TextFrame.TextRange.Text = "Future Scope & Enhancements"
    sld.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(30, 58, 138)
    
    sld.Shapes(2).TextFrame.TextRange.Text = _
        "Progressive Web App (PWA): Enable offline reading of notes and cheat sheets in areas with intermittent connectivity." & vbCrLf & _
        "Telugu Voice Assistant: AI-powered voice search in Telugu for students with low typing fluency." & vbCrLf & _
        "Community Mentorship Network: Connect rural college students with senior software engineers from nearby districts." & vbCrLf & _
        "Gram Panchayat Kiosk Integration: Deploy lightweight touch-screen learning kiosks in village digital centers and community halls." & vbCrLf & _
        "Mobile App Release: Publish dedicated Android APK on Google Play Store for one-tap mobile learning."
    sld.NotesPage.Shapes(2).TextFrame.TextRange.Text = "Speaker Note: Looking forward, we aim to transform EduBridge into a Progressive Web App with offline caching, add Telugu voice-based navigation, and integrate physical digital kiosks in rural Gram Panchayats."

    ' --------------------------------------------------------------------------
    ' SLIDE 13: Conclusion
    ' --------------------------------------------------------------------------
    Set sld = pres.Slides.Add(pres.Slides.Count + 1, ppLayoutText)
    sld.Shapes(1).TextFrame.TextRange.Text = "Conclusion"
    sld.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(30, 58, 138)
    
    sld.Shapes(2).TextFrame.TextRange.Text = _
        "Digital awareness is the true catalyst for educational equality in 21st-century India." & vbCrLf & _
        "EduBridge successfully bridges the gap between available free educational resources and rural students who need them most." & vbCrLf & _
        "With bilingual navigation, mobile-friendly design, curated syllabus roadmaps, and zero-cost credentials, EduBridge provides a comprehensive, sustainable solution." & vbCrLf & _
        "In conclusion, EduBridge proves that with the right guidance, a smartphone in a rural village can become a gateway to world-class learning and career success."
    sld.NotesPage.Shapes(2).TextFrame.TextRange.Text = "Speaker Note: To conclude, technology is only as powerful as the awareness surrounding it. EduBridge bridges this final mile, empowering rural learners to transition from passive consumers of entertainment into skilled developers and professionals."

    ' --------------------------------------------------------------------------
    ' SLIDE 14: Thank You & Q&A
    ' --------------------------------------------------------------------------
    Set sld = pres.Slides.Add(pres.Slides.Count + 1, ppLayoutTitle)
    sld.Shapes(1).TextFrame.TextRange.Text = "Thank You!"
    sld.Shapes(1).TextFrame.TextRange.Font.Size = 48
    sld.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(30, 58, 138)
    
    sld.Shapes(2).TextFrame.TextRange.Text = _
        "Bridging the Digital Divide Through Awareness and Opportunity." & vbCrLf & vbCrLf & _
        "Project Repository: https://github.com/chinnuganta389-gif/edubridge-app" & vbCrLf & _
        "Live Deployment: https://edubridge-app.onrender.com" & vbCrLf & vbCrLf & _
        "Questions & Discussion Open"
    sld.Shapes(2).TextFrame.TextRange.Font.Size = 18
    sld.Shapes(2).TextFrame.TextRange.Font.Color.RGB = RGB(71, 85, 105)
    
    sld.NotesPage.Shapes(2).TextFrame.TextRange.Text = "Speaker Note: Thank you for your valuable time and attention. I am now open to any questions, suggestions, or feedback from the committee."

    MsgBox "EduBridge Presentation generated successfully with 14 slides and Speaker Notes!", vbInformation, "Presentation Created"
End Sub
