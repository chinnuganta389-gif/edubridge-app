const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'edubridge.db');
const db = new DatabaseSync(dbPath);

// Initialize Tables
function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'student',
      village TEXT,
      college_school TEXT,
      study_level TEXT,
      preferred_language TEXT DEFAULT 'en',
      interests TEXT DEFAULT '[]',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      logo_icon TEXT,
      category TEXT NOT NULL,
      subcategories TEXT DEFAULT '[]',
      skill_level TEXT DEFAULT 'Beginner',
      pricing TEXT DEFAULT '100% Free',
      pricing_details TEXT,
      description TEXT NOT NULL,
      telugu_description TEXT,
      supported_topics TEXT DEFAULT '[]',
      featured INTEGER DEFAULT 0,
      click_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      resource_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, resource_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(resource_id) REFERENCES resources(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      resource_id INTEGER NOT NULL,
      visited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(resource_id) REFERENCES resources(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      user_name TEXT,
      user_email TEXT,
      type TEXT NOT NULL,
      title TEXT,
      url TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  seedData();
}

function seedData() {
  // Check if admin user exists
  const adminCheck = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@edubridge.org');
  if (!adminCheck) {
    const salt = bcrypt.genSaltSync(10);
    const adminHash = bcrypt.hashSync('admin123', salt);
    const demoStudentHash = bcrypt.hashSync('student123', salt);

    const insertUser = db.prepare(`
      INSERT INTO users (name, email, password_hash, role, village, college_school, study_level, preferred_language, interests)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertUser.run(
      'EduBridge Administrator',
      'admin@edubridge.org',
      adminHash,
      'admin',
      'Digital Education Cell',
      'EduBridge Research Foundation',
      'Faculty / Admin',
      'en',
      JSON.stringify(['Programming', 'B.Tech Subjects', 'Digital Literacy'])
    );

    insertUser.run(
      'Ravi Kumar',
      'ravi.student@example.com',
      demoStudentHash,
      'student',
      'Kothapalli Village, Guntur District',
      'Govt. Polytechnic College',
      'B.Tech 2nd Year',
      'te',
      JSON.stringify(['Python', 'Web Development', 'Free Courses', 'Aptitude', 'Data Structures and Algorithms'])
    );

    console.log('Default users created: admin@edubridge.org (admin123), ravi.student@example.com (student123)');
  }

  // Clear existing resources to refresh with the full, authentic dataset
  db.exec('DELETE FROM resources');

  console.log('Seeding comprehensive authentic educational resources into EduBridge database...');

  const initialResources = [
    // ==================== 1. PROGRAMMING LEARNING SECTION ====================
    {
      name: 'W3Schools',
      url: 'https://www.w3schools.com',
      logo_icon: 'w3schools',
      category: 'programming',
      subcategories: ['HTML', 'CSS', 'JavaScript', 'Python', 'SQL', 'C', 'C++', 'Java', 'PHP', 'Web Development'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: 'Free interactive tutorials with "Try It Yourself" browser editor; optional paid certificates.',
      description: 'The world\'s most popular website for learning web technologies and programming. Offers bite-sized, beginner-friendly explanations with instant live code examples.',
      telugu_description: 'ప్రోగ్రామింగ్ ప్రారంభించడానికి ప్రపంచంలోనే అత్యంత ప్రసిద్ధ వెబ్‌సైట్. HTML, CSS, జావాస్క్రిప్ట్, పైథాన్ వంటి విషయాలను సులభమైన వివరణలు మరియు లైవ్ ఉదాహరణలతో ఉచితంగా నేర్చుకోవచ్చు.',
      supported_topics: ['Web Basics', 'Frontend', 'Backend', 'Database Queries', 'Syntax Practice'],
      featured: 1
    },
    {
      name: 'GeeksforGeeks',
      url: 'https://www.geeksforgeeks.org',
      logo_icon: 'geeksforgeeks',
      category: 'programming',
      subcategories: ['Data Structures and Algorithms', 'C', 'C++', 'Java', 'Python', 'SQL', 'Database Management', 'B.Tech Subjects'],
      skill_level: 'All Levels',
      pricing: '100% Free',
      pricing_details: 'Completely free access to millions of CS articles, code implementations, and interview guides.',
      description: 'A comprehensive computer science portal providing in-depth articles, algorithm explanations, code examples in multiple languages, and company interview experiences.',
      telugu_description: 'కంప్యూటర్ సైన్స్ విద్యార్థులకు అత్యంత సమగ్రమైన పోర్టల్. డేటా స్ట్రక్చర్స్, అల్గోరిథమ్స్, ఇంటర్వ్యూ ప్రిపరేషన్ మరియు ప్రోగ్రామింగ్ కాన్సెప్టులు ఉచితంగా అందుబాటులో ఉన్నాయి.',
      supported_topics: ['Data Structures', 'Algorithms', 'CS Subjects', 'Interview Prep', 'Code Snippets'],
      featured: 1
    },
    {
      name: 'freeCodeCamp',
      url: 'https://www.freecodecamp.org',
      logo_icon: 'freecodecamp',
      category: 'programming',
      subcategories: ['Web Development', 'JavaScript', 'HTML', 'CSS', 'Python', 'Data Structures and Algorithms'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: '100% free non-profit platform offering verified certificates upon completing projects with zero fees.',
      description: 'A donor-supported non-profit platform where anyone can learn full-stack web development, Python, and data structures through interactive coding challenges and projects.',
      telugu_description: 'లాభాపేక్ష లేని 100% ఉచిత ప్లాట్‌ఫారమ్. వెబ్ డెవలప్‌మెంట్, పైథాన్ నేర్చుకుని నిజమైన ప్రాజెక్ట్‌లను పూర్తి చేయడం ద్వారా అధికారిక సర్టిఫికెట్లను ఉచితంగా పొందవచ్చు.',
      supported_topics: ['Responsive Web Design', 'JavaScript Algorithms', 'Frontend Libraries', 'Backend APIs', 'Relational Databases'],
      featured: 1
    },
    {
      name: 'Programiz',
      url: 'https://www.programiz.com',
      logo_icon: 'programiz',
      category: 'programming',
      subcategories: ['Python', 'C Programming', 'C++', 'Java', 'SQL', 'Data Structures and Algorithms'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: 'Free structured tutorials, built-in online compiler, step-by-step examples.',
      description: 'Tailored for complete beginners. Contains crystal-clear explanations, simplified diagrams, and an online compiler to run Python, C, C++, and Java code directly in your browser without any setup.',
      telugu_description: 'ప్రోగ్రామింగ్ మొదటిసారి నేర్చుకునే వారికి అనువైనది. సులభమైన పదాలు, బొమ్మల ద్వారా వివరణలు మరియు కంప్యూటర్‌లో సాఫ్ట్‌వేర్ అవసరం లేకుండా బ్రౌజర్‌లోనే కోడింగ్ రన్ చేసే సౌకర్యం.',
      supported_topics: ['Python Basics', 'C Programming', 'C++ OOPs', 'Java Syntax', 'Flowcharts'],
      featured: 1
    },
    {
      name: 'JavaTpoint',
      url: 'https://www.javatpoint.com',
      logo_icon: 'javatpoint',
      category: 'programming',
      subcategories: ['Java', 'C Programming', 'C++', 'Python', 'PHP', 'SQL', 'Database Management', 'Web Development'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: 'All tutorials, interview questions, and examples are 100% free.',
      description: 'Huge collection of tutorials on core Java, advanced Java, Python, web technologies, and database systems with college curriculum alignment and interview Q&A.',
      telugu_description: 'కాలేజ్ పరీక్షలకు మరియు జావా, పైథాన్, డేటాబేస్ కాన్సెప్టులను పాయింట్-టు-పాయింట్ నోట్స్ రూపంలో ఉచితంగా చదువుకోవడానికి ఉపయోగపడే సైట్.',
      supported_topics: ['Core Java', 'Spring Boot', 'PHP & MySQL', 'DBMS Concepts', 'Viva Questions'],
      featured: 0
    },
    {
      name: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      logo_icon: 'mdn',
      category: 'programming',
      subcategories: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
      skill_level: 'All Levels',
      pricing: '100% Free',
      pricing_details: 'Official open web documentation by Mozilla and developers worldwide.',
      description: 'The definitive, industry-standard documentation for web standards including HTML, CSS, JavaScript, and Web APIs maintained by Mozilla and the developer community.',
      telugu_description: 'వెబ్ డెవలప్‌మెంట్ నేర్చుకోవడానికి ప్రపంచ ప్రమాణాల అధికారిక గైడ్. HTML, CSS మరియు జావాస్క్రిప్ట్ గురించి ఖచ్చితమైన సమాచారం లభిస్తుంది.',
      supported_topics: ['HTML5 Tags', 'Modern CSS', 'JavaScript Deep Dive', 'Web APIs', 'Accessibility'],
      featured: 0
    },
    {
      name: 'TutorialsPoint',
      url: 'https://www.tutorialspoint.com',
      logo_icon: 'tutorialspoint',
      category: 'programming',
      subcategories: ['C Programming', 'C++', 'Java', 'Python', 'PHP', 'SQL', 'Database Management'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: 'Free reading material, quick reference sheets, and online coding terminal.',
      description: 'Extensive library of high-quality tutorials covering virtually every programming language, software engineering concept, and database technology.',
      telugu_description: 'సాఫ్ట్‌వేర్ ఇంజనీరింగ్, ప్రోగ్రామింగ్ భాషలు మరియు టెక్నాలజీల గురించి సమగ్ర ట్యుటోరియల్స్ మరియు సులభమైన నోట్స్ అందించే సైట్.',
      supported_topics: ['Quick Reference', 'Cheat Sheets', 'C / C++ Pointers', 'SQL Commands', 'Architecture'],
      featured: 0
    },
    {
      name: 'The Odin Project',
      url: 'https://www.theodinproject.com',
      logo_icon: 'odin',
      category: 'programming',
      subcategories: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
      skill_level: 'Intermediate',
      pricing: '100% Free',
      pricing_details: '100% free open-source full stack web development curriculum.',
      description: 'An open-source full stack web curriculum that teaches you how to build real web applications from scratch using Git, HTML, CSS, JavaScript, and Node.js.',
      telugu_description: 'నిజమైన వెబ్‌సైట్లు మరియు అప్లికేషన్లు రూపొందించడం నేర్పించే ఉచిత ఓపెన్ సోర్స్ కరికులమ్.',
      supported_topics: ['Git & GitHub', 'Full Stack JS', 'Node.js', 'Frontend Foundations', 'Portfolio Projects'],
      featured: 0
    },
    {
      name: 'LearnCpp.com',
      url: 'https://www.learncpp.com',
      logo_icon: 'learncpp',
      category: 'programming',
      subcategories: ['C++', 'Data Structures and Algorithms'],
      skill_level: 'All Levels',
      pricing: '100% Free',
      pricing_details: 'Completely free in-depth C++ tutorial series covering modern C++ standards.',
      description: 'Universally recognized as the best free text tutorial for learning modern C++ from absolute fundamentals up to object-oriented programming, templates, and pointers.',
      telugu_description: 'సి++ (C++) ప్రోగ్రామింగ్ ప్రాథమిక అంశాల నుండి అడ్వాన్స్‌డ్ స్థాయి వరకు క్షుణ్ణంగా ఉచితంగా నేర్చుకోవడానికి ప్రపంచంలోనే ఉత్తమ వెబ్‌సైట్.',
      supported_topics: ['Pointers & References', 'Object-Oriented C++', 'Memory Management', 'Standard Template Library', 'Templates'],
      featured: 0
    },
    {
      name: 'SQLZoo',
      url: 'https://sqlzoo.net',
      logo_icon: 'sqlzoo',
      category: 'programming',
      subcategories: ['SQL', 'Database Management'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: 'Free interactive SQL browser quizzes on real relational datasets.',
      description: 'Interactive SQL practice platform where you run real SQL queries against live tables directly in the browser with instant pass/fail feedback on nested queries and joins.',
      telugu_description: 'డేటాబేస్ SQL క్వెరీస్ ప్రాక్టీస్ చేయడానికి ఉత్తమ ఇంటరాక్టివ్ సైట్. బ్రౌజర్‌లోనే ప్రశ్నలను రన్ చేసి నేర్చుకోవచ్చు.',
      supported_topics: ['SELECT Basics', 'JOINs', 'Aggregate Functions', 'Nested Queries', 'GROUP BY & HAVING'],
      featured: 0
    },
    {
      name: 'PHP The Right Way',
      url: 'https://phptherightway.com',
      logo_icon: 'php',
      category: 'programming',
      subcategories: ['PHP', 'Web Development', 'Database Management'],
      skill_level: 'Intermediate',
      pricing: '100% Free',
      pricing_details: 'Free community-driven guide to modern PHP best practices.',
      description: 'An easy-to-read, quick reference for PHP popular coding standards, security best practices, and database interaction with PDO.',
      telugu_description: 'PHP భాషను సరైన పద్ధతిలో, ఆధునిక ప్రమాణాలతో మరియు డేటాబేస్ సెక్యూరిటీతో ఎలా కోడ్ చేయాలో మార్గనిర్దేశం చేసే సైట్.',
      supported_topics: ['Modern PHP 8', 'PDO Database', 'Security Basics', 'Object-Oriented PHP', 'Dependency Injection'],
      featured: 0
    },

    // ==================== 2. CODING PRACTICE SECTION ====================
    {
      name: 'HackerRank',
      url: 'https://www.hackerrank.com',
      logo_icon: 'hackerrank',
      category: 'coding_practice',
      subcategories: ['Beginner', 'Problem Solving', 'Data Structures and Algorithms', 'SQL Practice', 'Interview Preparation'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: '100% free practice badges, skill certifications, and problem solving tracks.',
      description: 'The ideal starting platform for rural college students to build coding confidence. Practice C, Java, Python, and SQL with automated test cases and earn verified skill badges.',
      telugu_description: 'గ్రామీణ విద్యార్థులు కోడింగ్ సాధన ప్రారంభించడానికి అత్యుత్తమ సైట్. పైథాన్, సి, జావా, SQL సమస్యలను పరిష్కరించి స్టార్ బ్యాడ్జ్‌లు పొందవచ్చు.',
      supported_topics: ['30 Days of Code', 'Python 5-Star Badges', 'SQL Queries', 'Problem Solving', 'Skill Certifications'],
      featured: 1
    },
    {
      name: 'CodeChef',
      url: 'https://www.codechef.com',
      logo_icon: 'codechef',
      category: 'coding_practice',
      subcategories: ['Beginner', 'Intermediate', 'Competitive Programming', 'Data Structures and Algorithms'],
      skill_level: 'All Levels',
      pricing: 'Freemium',
      pricing_details: 'Free access to thousands of practice problems, contests, and peer discussion forum.',
      description: 'India\'s premier competitive programming community. Offers beginner-friendly difficulty ratings (500 to 1200+), monthly Starters contests, and active Indian campus chapters.',
      telugu_description: 'భారతదేశంలో ప్రసిద్ధమైన కాంపిటేటివ్ ప్రోగ్రామింగ్ ప్లాట్‌ఫారమ్. స్టార్టర్స్ కాంటెస్టులు, బిగినర్ ప్రాబ్లమ్స్ ద్వారా విద్యార్థులు తమ ప్రోగ్రామింగ్ లాజిక్‌ను పెంచుకోవచ్చు.',
      supported_topics: ['Starters Contests', 'Rating Ladder', 'Basic Math to DSA', 'Logic Building', 'Discussion Forums'],
      featured: 1
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com',
      logo_icon: 'leetcode',
      category: 'coding_practice',
      subcategories: ['Intermediate', 'Advanced', 'Data Structures and Algorithms', 'Interview Preparation', 'SQL Practice'],
      skill_level: 'Intermediate',
      pricing: 'Freemium',
      pricing_details: 'Over 2,000 algorithmic problems and weekly contests completely free.',
      description: 'The golden standard for technical coding interviews. Features curated lists of DSA problems categorized by Easy, Medium, and Hard with detailed community solutions.',
      telugu_description: 'సాఫ్ట్‌వేర్ కంపెనీలలో ఉద్యోగం సంపాదించడానికి కోడింగ్ ఇంటర్వ్యూలకు సిద్ధం చేసే ప్రముఖ ప్లాట్‌ఫారమ్. సులభమైన నుండి క్లిష్టమైన DSA ప్రశ్నలు ఇక్కడ లభిస్తాయి.',
      supported_topics: ['LeetCode 75', 'Top Interview 150', 'Binary Trees', 'Dynamic Programming', 'Weekly Contests'],
      featured: 1
    },
    {
      name: 'HackerEarth Practice',
      url: 'https://www.hackerearth.com/practice',
      logo_icon: 'hackerearth',
      category: 'coding_practice',
      subcategories: ['Beginner', 'Intermediate', 'Data Structures and Algorithms', 'Competitive Programming'],
      skill_level: 'Intermediate',
      pricing: '100% Free',
      pricing_details: 'Free structured topic-wise coding tracks with detailed tutorials before each problem.',
      description: 'Practice platform featuring dedicated tracks for Data Structures, Math, and Algorithms with clear tutorials and conceptual reading before you attempt each coding question.',
      telugu_description: 'ప్రతి ప్రాబ్లమ్ సాల్వ్ చేయడానికి ముందే కాన్సెప్ట్ చదువుకోవడానికి ఉచిత ట్యుటోరియల్ ఇచ్చే ప్రాక్టీస్ ప్లాట్‌ఫారమ్.',
      supported_topics: ['Array Practice', 'Graph Theory', 'Number Theory', 'Greedy Algorithms', 'Monthly Hackathons'],
      featured: 0
    },
    {
      name: 'Codeforces',
      url: 'https://codeforces.com',
      logo_icon: 'codeforces',
      category: 'coding_practice',
      subcategories: ['Advanced', 'Competitive Programming', 'Data Structures and Algorithms'],
      skill_level: 'Advanced',
      pricing: '100% Free',
      pricing_details: '100% free international contests, problem archive, and gym.',
      description: 'Top-tier global competitive programming platform hosting short 2-hour rating rounds. Best for students aiming for ACM-ICPC and deep mathematical problem solving.',
      telugu_description: 'అంతర్జాతీయ స్థాయి కాంపిటేటివ్ ప్రోగ్రామింగ్ కాంటెస్ట్‌లు జరిగే సైట్. గణిత మరియు అడ్వాన్స్‌డ్ అల్గోరిథమిక్ నైపుణ్యాలను అభివృద్ధి చేసుకోవచ్చు.',
      supported_topics: ['Division 3/4 Rounds', 'Problemset Archive', 'Virtual Contests', 'Editorial Solutions', 'ICPC Prep'],
      featured: 0
    },
    {
      name: 'Coding Ninjas Code360',
      url: 'https://www.naukri.com/code360',
      logo_icon: 'code360',
      category: 'coding_practice',
      subcategories: ['Beginner', 'Interview Preparation', 'Data Structures and Algorithms', 'Problem Solving'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: 'Free company-specific sheets (TCS, Infosys, Wipro, Amazon, Google) and guided paths.',
      description: 'Free coding practice with guided problem sheets categorized by Indian IT service companies (TCS, Infosys, Wipro) and product companies with hints in Hindi and English.',
      telugu_description: 'TCS, Infosys, Wipro వంటి ప్రముఖ కంపెనీల ప్లేస్‌మెంట్ కోడింగ్ పరీక్షలకు సరిపోయే మోడల్ ప్రశ్నలు ఉచితంగా ప్రాక్టీస్ చేయవచ్చు.',
      supported_topics: ['Company Sheets', 'Guided Paths', 'TCS NQT Prep', 'Campus Placements', 'Daily Challenges'],
      featured: 0
    },
    {
      name: 'Exercism',
      url: 'https://exercism.org',
      logo_icon: 'exercism',
      category: 'coding_practice',
      subcategories: ['Beginner', 'Intermediate', 'Problem Solving'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: '100% free and open-source with optional human volunteer mentoring.',
      description: 'Fun, zero-cost code practice across 70+ programming languages with automated test suites and friendly human mentors who review your code for idiomatic style.',
      telugu_description: '70 కి పైగా ప్రోగ్రామింగ్ భాషలను ఉచితంగా సాధన చేయవచ్చు. మీ కోడ్‌ను నిపుణులు స్వచ్ఛందంగా సమీక్షించి సలహాలు ఇస్తారు.',
      supported_topics: ['70+ Languages', 'Idiomatic Code', 'Mentor Feedback', 'CLI Tooling', 'Concept Trees'],
      featured: 0
    },
    {
      name: 'Project Euler',
      url: 'https://projecteuler.net',
      logo_icon: 'euler',
      category: 'coding_practice',
      subcategories: ['Intermediate', 'Advanced', 'Problem Solving'],
      skill_level: 'Intermediate',
      pricing: '100% Free',
      pricing_details: 'Free mathematical and computer programming challenges.',
      description: 'Challenging mathematical and computational problems requiring ingenuity and programming to solve. Excellent for honing logical reasoning and numerical algorithms.',
      telugu_description: 'గణితం మరియు ప్రోగ్రామింగ్ లాజిక్‌ను కలగలిపిన ప్రత్యేకమైన ఛాలెంజ్‌లు. గణిత విశ్లేషణను పెంచుకోవడానికి చాలా మంచిది.',
      supported_topics: ['Number Theory', 'Combinatorics', 'Computational Math', 'Logic Puzzles', 'Optimization'],
      featured: 0
    },
    {
      name: 'Replit Playground',
      url: 'https://replit.com',
      logo_icon: 'replit',
      category: 'coding_practice',
      subcategories: ['Beginner', 'Python', 'C Programming', 'Web Development'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: 'Free in-browser development environment that works smoothly even on mobile phones and basic laptops.',
      description: 'An online coding playground where students can write, compile, and share Python, C, C++, and Web code straight from a web browser or smartphone without downloading software.',
      telugu_description: 'కంప్యూటర్ లేని వారు కూడా తమ మొబైల్ ఫోన్ లేదా సాధారణ ల్యాప్‌టాప్‌లో ఎటువంటి సాఫ్ట్‌వేర్ ఇన్‌స్టాల్ చేయకుండా బ్రౌజర్ ద్వారానే కోడింగ్ చేసి చూసుకోవచ్చు.',
      supported_topics: ['In-browser IDE', 'Mobile Friendly', 'Python / C / Java', 'Shareable Links', 'Zero Setup'],
      featured: 1
    },

    // ==================== 3. B.TECH SUBJECT-WISE LEARNING ====================
    {
      name: 'Gate Smashers (Varun Singla Sir)',
      url: 'https://www.youtube.com/@GateSmashers',
      logo_icon: 'gatesmashers',
      category: 'btech_subjects',
      subcategories: ['Operating Systems', 'Database Management Systems', 'Computer Networks', 'Automata Theory', 'Compiler Design', 'Data Structures'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: '100% free complete university syllabus video playlists.',
      description: 'India\'s most popular university exam video channel for CSE/IT students. Explains complex B.Tech core subjects in simple, colloquial language with real-world examples and exam tips.',
      telugu_description: 'కంప్యూటర్ సైన్స్ విద్యార్థులకు సెమిస్టర్ పరీక్షలు మరియు GATE ప్రిపరేషన్ కోసం దేశంలోనే అత్యంత ఆదరణ పొందిన ఉచిత వీడియో లెక్చర్స్.',
      supported_topics: ['OS Process Scheduling', 'DBMS Normalization', 'CN OSI Model', 'TOC Turing Machines', 'Compiler Parsing'],
      featured: 1
    },
    {
      name: 'Abdul Bari - Algorithms & Data Structures',
      url: 'https://www.youtube.com/@abdul_bari',
      logo_icon: 'abdulbari',
      category: 'btech_subjects',
      subcategories: ['Data Structures', 'Data Structures and Algorithms', 'Mathematics'],
      skill_level: 'All Levels',
      pricing: '100% Free',
      pricing_details: 'Free blackboard whiteboard video lessons on YouTube.',
      description: 'Legendary Indian educator whose intuitive whiteboard explanations of Divide & Conquer, Dynamic Programming, Greedy Algorithms, and Time Complexity are revered globally.',
      telugu_description: 'డేటా స్ట్రక్చర్స్ మరియు అల్గోరిథమ్స్ అత్యంత సులభంగా బోర్డు మీద అర్థమయ్యేలా వివరించే ప్రపంచ ప్రసిద్ధ భారతీయ అధ్యాపకుడు.',
      supported_topics: ['Asymptotic Notations', 'Divide and Conquer', 'Dynamic Programming', 'Graph Algorithms', 'Greedy Method'],
      featured: 1
    },
    {
      name: 'Neso Academy',
      url: 'https://www.nesoacademy.org',
      logo_icon: 'neso',
      category: 'btech_subjects',
      subcategories: ['Computer Organization', 'Operating Systems', 'Automata Theory', 'Computer Networks', 'Mathematics'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: 'Free structured university lectures, chapter notes, and quiz questions.',
      description: 'High-quality animated academic lectures covering Computer Organization, Digital Electronics, Theory of Computation, and Discrete Mathematics with downloadable lecture notes.',
      telugu_description: 'కంప్యూటర్ ఆర్గనైజేషన్, డిజిటల్ ఎలక్ట్రానిక్స్, డిస్క్రీట్ మ్యాథ్స్ వంటి కష్టమైన సబ్జెక్టులను బొమ్మల ద్వారా సులభంగా బోధించే పోర్టల్.',
      supported_topics: ['Instruction Cycle', 'Logic Gates', 'DFA/NFA', 'CPU Architecture', 'Boolean Algebra'],
      featured: 1
    },
    {
      name: 'Jenny\'s Lectures CS IT',
      url: 'https://www.youtube.com/@JennyslecturesCSIT',
      logo_icon: 'jennys',
      category: 'btech_subjects',
      subcategories: ['Data Structures', 'C Programming', 'Software Engineering', 'Python'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: '100% free comprehensive playlists with crystal-clear handwritten notes.',
      description: 'Popular Indian educator Jenny ma\'am explains Data Structures, C programming, Software Engineering, and Python with exceptionally clear whiteboard visual diagrams.',
      telugu_description: 'డేటా స్ట్రక్చర్స్, సి లాంగ్వేజ్ మరియు అల్గోరిథమ్స్ అత్యంత సులభంగా అర్థమయ్యేలా విడమరిచి చెప్పే ప్రముఖ యూట్యూబ్ ఛానెల్.',
      supported_topics: ['Linked Lists & Trees', 'Stack & Queue', 'Sorting Algorithms', 'Graph Traversals', 'C Pointers'],
      featured: 1
    },
    {
      name: 'Knowledge Gate (Sanchit Jain Sir)',
      url: 'https://www.youtube.com/@KnowledgeGate_KG',
      logo_icon: 'knowledgegate',
      category: 'btech_subjects',
      subcategories: ['Database Management Systems', 'Software Engineering', 'Compiler Design', 'Operating Systems', 'Automata Theory'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: 'Free comprehensive playlists on university CSE syllabus.',
      description: 'Sanchit Jain Sir\'s renowned educational channel simplifying Database Management, SQL, Software Engineering, and Compiler Design for university exams and GATE.',
      telugu_description: 'డేటాబేస్ మేనేజ్‌మెంట్ సిస్టమ్స్, సాఫ్ట్‌వేర్ ఇంజనీరింగ్ మరియు కంపైలర్ డిజైన్ సబ్జెక్టులను సులభంగా నేర్పించే ఉచిత లెక్చర్స్.',
      supported_topics: ['SQL Queries', 'SDLC Models', 'LL/LR Parsers', 'Deadlocks', 'ER Modeling'],
      featured: 0
    },
    {
      name: 'Ravindrababu Ravula GATE CSE',
      url: 'https://www.youtube.com/@RavindrababuRavula',
      logo_icon: 'ravula',
      category: 'btech_subjects',
      subcategories: ['Automata Theory', 'Compiler Design', 'Computer Networks', 'Operating Systems', 'Database Management Systems'],
      skill_level: 'All Levels',
      pricing: '100% Free',
      pricing_details: 'Free GATE Computer Science lectures and problem-solving sessions.',
      description: 'Legendary Indian computer science GATE mentor with deep-dive lectures into Automata Theory (TOC), Compiler Design, Operating Systems, and DBMS.',
      telugu_description: 'కంప్యూటర్ సైన్స్ కాన్సెప్టులను అత్యంత లోతుగా అర్థం చేసుకోవడానికి గేట్ టాపర్లు చూసే ప్రసిద్ధ లెక్చర్స్.',
      supported_topics: ['Chomsky Hierarchy', 'Parsing Techniques', 'Concurrency Control', 'Paging & Virtual Memory', 'TCP/IP'],
      featured: 0
    },
    {
      name: 'Cybrary - Cybersecurity Fundamentals',
      url: 'https://www.cybrary.it',
      logo_icon: 'cybrary',
      category: 'btech_subjects',
      subcategories: ['Cybersecurity', 'Computer Networks'],
      skill_level: 'Beginner',
      pricing: 'Freemium',
      pricing_details: 'Free access to introductory cybersecurity courses, network defense, and ethical hacking fundamentals.',
      description: 'Premier cybersecurity education platform offering free introductory modules on Network Security, CompTIA Security+, ethical hacking concepts, and digital forensics.',
      telugu_description: 'సైబర్‌సెక్యూరిటీ మరియు నెట్‌వర్క్ భద్రత రంగంలో ఉచితంగా ప్రాథమిక నైపుణ్యాలు నేర్పించే అంతర్జాతీయ ప్లాట్‌ఫారమ్.',
      supported_topics: ['Network Security', 'Ethical Hacking Basics', 'Malware Analysis', 'Information Assurance', 'CIA Triad'],
      featured: 0
    },
    {
      name: 'MIT OpenCourseWare - Computer Science',
      url: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science',
      logo_icon: 'mit',
      category: 'btech_subjects',
      subcategories: ['Data Structures and Algorithms', 'Artificial Intelligence', 'Mathematics', 'Software Engineering'],
      skill_level: 'Advanced',
      pricing: '100% Free',
      pricing_details: '100% free lecture notes, assignments, exam papers from MIT professors.',
      description: 'Official free educational materials from MIT, featuring world-class courses in Intro to CS, Algorithms, AI, and Linear Algebra.',
      telugu_description: 'ప్రపంచ ప్రఖ్యాత ఎంఐటి (MIT) యూనివర్సిటీ ప్రొఫెసర్లు బోధించిన కంప్యూటర్ సైన్స్ లెక్చర్స్, నోట్స్ మరియు అసైన్‌మెంట్స్ ఉచితంగా లభిస్తాయి.',
      supported_topics: ['Intro to CS in Python', 'Design and Analysis of Algorithms', 'Artificial Intelligence', 'Linear Algebra', 'Systems'],
      featured: 0
    },
    {
      name: 'Stanford Online - AI & ML Lectures',
      url: 'https://online.stanford.edu/free-courses',
      logo_icon: 'stanford',
      category: 'btech_subjects',
      subcategories: ['Artificial Intelligence', 'Machine Learning', 'Cybersecurity', 'Database Management Systems'],
      skill_level: 'Intermediate',
      pricing: '100% Free',
      pricing_details: 'Free audit option on Stanford course materials and YouTube playlists.',
      description: 'Access seminal computer science course lectures from Stanford University, including Andrew Ng\'s foundational Machine Learning course and Cryptography courses.',
      telugu_description: 'స్టాన్‌ఫోర్డ్ విశ్వవిద్యాలయం అందించే మెషిన్ లెర్నింగ్ మరియు సైబర్‌సెక్యూరిటీ పాఠాలు ఉచితంగా చదువుకోవచ్చు.',
      supported_topics: ['Supervised Learning', 'Neural Networks', 'Cryptography I', 'Database Systems', 'CS106A Programming'],
      featured: 0
    },

    // ==================== 4. FREE ONLINE COURSES AND CERTIFICATIONS ====================
    {
      name: 'NPTEL (IITs & IISc - Govt. of India)',
      url: 'https://nptel.ac.in',
      logo_icon: 'nptel',
      category: 'free_courses',
      subcategories: ['B.Tech Subjects', 'Artificial Intelligence', 'Data Structures and Algorithms', 'Python', 'C Programming'],
      skill_level: 'All Levels',
      pricing: '100% Free Learning',
      pricing_details: '100% free video lectures, assignments, and notes from IIT & IISc professors. Optional nominal exam fee only if student wants an IIT certificate.',
      description: 'A joint initiative of the IITs and IISc funded by Ministry of Education, Govt. of India. Offers semester-long courses across engineering disciplines with credit transfer for college students.',
      telugu_description: 'భారత ప్రభుత్వ విద్యా మంత్రిత్వ శాఖ, ఐఐటి (IIT) మరియు ఐఐఎస్సీ (IISc) ప్రొఫెసర్లు కలిసి నిర్వహిస్తున్న ఉచిత ఇంజనీరింగ్ కోర్సుల పోర్టల్. వీడియోలు, అసైన్‌మెంట్లు పూర్తిగా ఉచితం.',
      supported_topics: ['IIT Video Lectures', 'Semester Credit Transfer', 'Weekly Assignments', 'Discussion Forum', 'IIT Exam Certificate'],
      featured: 1
    },
    {
      name: 'SWAYAM (Ministry of Education, GoI)',
      url: 'https://swayam.gov.in',
      logo_icon: 'swayam',
      category: 'free_courses',
      subcategories: ['B.Tech Subjects', 'Mathematics', 'Python', 'Database Management', 'Aptitude'],
      skill_level: 'All Levels',
      pricing: '100% Free Learning',
      pricing_details: '100% free learning for anyone, anywhere, anytime. Free access to tests, reading material, and teacher interaction.',
      description: 'Official Government of India portal designed to achieve the three cardinal principles of Education Policy: access, equity and quality. Free courses from class 9 to post-graduation.',
      telugu_description: 'భారత ప్రభుత్వం ప్రారంభించిన జాతీయ ఆన్‌లైన్ పోర్టల్. గ్రామీణ విద్యార్థుల కోసం ఉన్నత స్థాయి కోర్సులు, స్టడీ మెటీరియల్ ఉచితంగా లభిస్తాయి.',
      supported_topics: ['UG/PG Engineering', 'Humanities & Science', 'Self-Paced Courses', 'Govt Certification', 'Regional Languages'],
      featured: 1
    },
    {
      name: 'Coursera (Financial Aid & Free Audit)',
      url: 'https://www.coursera.org',
      logo_icon: 'coursera',
      category: 'free_courses',
      subcategories: ['Machine Learning', 'Python', 'Web Development', 'Cybersecurity', 'Cloud Engineering'],
      skill_level: 'All Levels',
      pricing: 'Free Audit / Paid Certificate',
      pricing_details: 'Almost all courses have a "Free Audit" option (full access to video lectures & readings). Rural students can apply for 100% Financial Aid / Fee Waiver.',
      description: 'World-renowned online learning platform partnering with universities like Stanford, Yale, and companies like Google and IBM. Rural students can learn freely via course auditing and financial aid.',
      telugu_description: 'ప్రపంచ ప్రఖ్యాత యూనివర్సిటీల కోర్సులు. గ్రామీణ విద్యార్థులు "Free Audit" ద్వారా ఉచితంగా పాఠాలు వినవచ్చు లేదా "Financial Aid" కు దరఖాస్తు చేసుకుని ఉచిత సర్టిఫికెట్ పొందవచ్చు.',
      supported_topics: ['Google IT Support', 'DeepLearning.AI', 'Meta Frontend Dev', 'IBM Data Science', 'University Courses'],
      featured: 1
    },
    {
      name: 'IBM SkillsBuild',
      url: 'https://skillsbuild.org/students',
      logo_icon: 'ibm',
      category: 'free_courses',
      subcategories: ['Artificial Intelligence', 'Cybersecurity', 'Data Analyst', 'Cloud Engineering', 'Web Development'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: '100% free learning platform with FREE verified digital credentials and badges from IBM.',
      description: 'Dedicated IBM education program specifically created for students and job seekers. Offers zero-cost certifications in AI, Cybersecurity, Cloud, and Professional Workplace Skills.',
      telugu_description: 'విద్యార్థుల కోసం IBM సంస్థ ప్రారంభించిన ఉచిత శిక్షణా కార్యక్రమం. AI, సైబర్‌సెక్యూరిటీ మరియు క్లౌడ్ కోర్సులు ఉచితంగా పూర్తి చేసి అధికారిక IBM బ్యాడ్జ్‌లు పొందవచ్చు.',
      supported_topics: ['AI Foundations', 'Cybersecurity Fundamentals', 'Cloud Essentials', 'Professional Skills', 'IBM Digital Badges'],
      featured: 1
    },
    {
      name: 'Infosys Springboard',
      url: 'https://infyspringboard.onwingspan.com',
      logo_icon: 'infosys',
      category: 'free_courses',
      subcategories: ['Python', 'Java', 'Full Stack Developer', 'Artificial Intelligence', 'Aptitude'],
      skill_level: 'All Levels',
      pricing: '100% Free',
      pricing_details: '100% free initiative by Infosys CSR with verified completion certificates.',
      description: 'A flagship CSR initiative by Infosys India providing free world-class digital skills, programming masterclasses, telemetric labs, and career pathways for Indian students.',
      telugu_description: 'ఇన్ఫోసిస్ (Infosys) కంపెనీ విద్యార్థుల కోసం ఉచితంగా అందించే డిజిటల్ లెర్నింగ్ వేదిక. ప్రోగ్రామింగ్, సాఫ్ట్ స్కిల్స్ నేర్చుకుని ఇన్ఫోసిస్ సర్టిఫికేట్ ఉచితంగా పొందవచ్చు.',
      supported_topics: ['Infosys Java Track', 'Full Stack MERN', 'Python for Beginners', 'Soft Skills & English', 'TCS/Infosys Prep'],
      featured: 1
    },
    {
      name: 'CS50: Introduction to Computer Science (Harvard)',
      url: 'https://cs50.harvard.edu/x',
      logo_icon: 'harvard',
      category: 'free_courses',
      subcategories: ['C Programming', 'Python', 'SQL', 'Web Development', 'Data Structures and Algorithms'],
      skill_level: 'Beginner',
      pricing: '100% Free Learning',
      pricing_details: '100% free access to all lectures, problem sets, and auto-grader. Offers free Harvard-verified certificate of completion upon 70%+ score.',
      description: 'Harvard University\'s flagship introductory computer science course taught by David J. Malan. Widely considered the finest introductory computer course in the world.',
      telugu_description: 'హార్వర్డ్ విశ్వవిద్యాలయం యొక్క అత్యంత ప్రసిద్ధ కోర్సు. సి లాంగ్వేజ్, పైథాన్, వెబ్ డెవలప్‌మెంట్ సులభంగా నేర్చుకోవచ్చు; 70% మార్కులు సాధిస్తే ఉచిత హార్వర్డ్ సర్టిఫికెట్ లభిస్తుంది.',
      supported_topics: ['Computational Thinking', 'Memory & Pointers', 'Algorithms', 'Flask Web Apps', 'Free Harvard Certificate'],
      featured: 1
    },
    {
      name: 'Microsoft Learn',
      url: 'https://learn.microsoft.com',
      logo_icon: 'microsoft',
      category: 'free_courses',
      subcategories: ['Cloud Engineering', 'Python', 'Artificial Intelligence', 'Cybersecurity', 'Database Management'],
      skill_level: 'All Levels',
      pricing: '100% Free',
      pricing_details: 'Completely free interactive sandboxes, learning paths, and browser labs.',
      description: 'Free interactive technical documentation and hands-on modules by Microsoft. Practice Azure cloud, Python data science, and C# with free live cloud browser sandboxes.',
      telugu_description: 'మైక్రోసాఫ్ట్ యొక్క అధికారిక లెర్నింగ్ ప్లాట్‌ఫారమ్. క్లౌడ్ కంప్యూటింగ్ (Azure), పైథాన్ మరియు సైబర్‌సెక్యూరిటీ ఉచిత ప్రాక్టికల్ ల్యాబ్స్ ద్వారా నేర్చుకోవచ్చు.',
      supported_topics: ['Azure Fundamentals', 'Python on Azure', 'GitHub Essentials', 'AI-900 Prep', 'Cloud Sandbox'],
      featured: 0
    },
    {
      name: 'Cisco Networking Academy',
      url: 'https://www.netacad.com',
      logo_icon: 'cisco',
      category: 'free_courses',
      subcategories: ['Computer Networks', 'Cybersecurity', 'Python', 'Operating Systems'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: 'Multiple free self-paced introductory courses with verifiable digital badges.',
      description: 'Global IT skills education program offering free courses in Networking Basics, Cybersecurity Introduction, Packet Tracer simulator, and Python programming.',
      telugu_description: 'కంప్యూటర్ నెట్‌వర్కింగ్ మరియు సైబర్‌సెక్యూరిటీలో ప్రపంచ దిగ్గజమైన సిస్కో సంస్థ అందించే ఉచిత ప్రాథమిక కోర్సులు మరియు డిజిటల్ బ్యాడ్జ్‌లు.',
      supported_topics: ['Networking Basics', 'Packet Tracer Labs', 'Cybersecurity Intro', 'Linux Unhatched', 'IoT Basics'],
      featured: 0
    },
    {
      name: 'Great Learning Academy',
      url: 'https://www.mygreatlearning.com/academy',
      logo_icon: 'greatlearning',
      category: 'free_courses',
      subcategories: ['Data Analyst', 'Python', 'Machine Learning', 'Full Stack Developer', 'Aptitude'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: '1000+ short free certificate courses with immediate downloadable certificates.',
      description: 'Offers 1000+ free beginner courses in Hindi and English on Data Science, Artificial Intelligence, Digital Marketing, and Software Development with free certificates of completion.',
      telugu_description: 'డేటా సైన్స్, AI, పైథాన్ వంటి అంశాలపై ఉచిత కోర్సులు పూర్తి చేసి ఉచిత సర్టిఫికెట్ డౌన్‌లోడ్ చేసుకునే అవకాశం.',
      supported_topics: ['Python for Data Science', 'Free Certificates', 'Hindi & English Tracks', 'Interview Prep', 'Excel to PowerBI'],
      featured: 0
    },
    {
      name: 'Kaggle Learn',
      url: 'https://www.kaggle.com/learn',
      logo_icon: 'kaggle',
      category: 'free_courses',
      subcategories: ['Python', 'Machine Learning', 'Data Analyst', 'Artificial Intelligence', 'SQL'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: '100% free micro-courses with interactive browser Jupyter notebooks and instant certificates.',
      description: 'Google-backed data science community providing hands-on micro-courses in Python, Pandas, Machine Learning, Data Visualization, and SQL in 3-4 hours each.',
      telugu_description: 'గూగుల్ ఆధ్వర్యంలోని కాగిల్ ఉచిత మైక్రో-కోర్సులు. బ్రౌజర్‌లోనే జూపిటర్ నోట్‌బుక్స్ ద్వారా పైథాన్, మెషిన్ లెర్నింగ్ నేర్చుకోవచ్చు.',
      supported_topics: ['Python for Data Science', 'Pandas & Matplotlib', 'Intro to ML', 'Intermediate ML', 'Feature Engineering'],
      featured: 1
    },
    {
      name: 'Google Cloud Skills Boost',
      url: 'https://www.cloudskillsboost.google',
      logo_icon: 'googlecloud',
      category: 'free_courses',
      subcategories: ['Cloud Engineering', 'Artificial Intelligence', 'Machine Learning'],
      skill_level: 'Beginner',
      pricing: 'Freemium',
      pricing_details: 'Free introductory learning paths on Google Cloud architecture, generative AI fundamentals, and digital skill badges.',
      description: 'Official Google Cloud education hub. Learn cloud infrastructure, BigQuery data warehousing, and Generative AI fundamentals with Google-issued digital badges.',
      telugu_description: 'గూగుల్ క్లౌడ్ అధికారిక శిక్షణా వేదిక. క్లౌడ్ కంప్యూటింగ్ మరియు జనరేటివ్ AI ఉచితంగా నేర్చుకుని గూగుల్ బ్యాడ్జ్‌లు పొందవచ్చు.',
      supported_topics: ['Google Cloud Architecture', 'Generative AI Basics', 'BigQuery Analytics', 'Cloud Storage', 'Skill Badges'],
      featured: 0
    },

    // ==================== 5. APTITUDE AND REASONING ====================
    {
      name: 'IndiaBIX',
      url: 'https://www.indiabix.com',
      logo_icon: 'indiabix',
      category: 'aptitude',
      subcategories: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Placement Preparation', 'Interview Preparation'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: '100% free practice questions, explanations, formulas, and online mock tests.',
      description: 'India\'s most famous online portal for campus placement aptitude tests. Features topic-wise questions for Quant, Logical Reasoning, Verbal Ability, Technical MCQs, and HR interview questions.',
      telugu_description: 'క్యాంపస్ ప్లేస్‌మెంట్స్ మరియు ఉద్యోగ రాత పరీక్షలకు అవసరమైన ఆప్టిట్యూడ్, రీజనింగ్ మరియు ఇంగ్లీష్ ప్రిపరేషన్ కోసం భారతదేశంలో అత్యంత ప్రసిద్ధ ఉచిత సైట్.',
      supported_topics: ['Arithmetic Aptitude', 'Data Interpretation', 'Logical Deduction', 'Verbal Ability', 'C/Java Technical MCQs'],
      featured: 1
    },
    {
      name: 'GeeksforGeeks Aptitude',
      url: 'https://www.geeksforgeeks.org/aptitude-questions-and-answers',
      logo_icon: 'geeksforgeeks',
      category: 'aptitude',
      subcategories: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Interview Preparation', 'Placement Preparation'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: 'Free shortcut tricks, formula cheatsheets, and company-specific aptitude tests.',
      description: 'Comprehensive aptitude section with step-by-step mathematical shortcut tricks, formula cheatsheets, and mock tests designed specifically for IT company placement drives.',
      telugu_description: 'గీక్స్ ఫర్ గీక్స్ లో సులభమైన షార్ట్‌కట్ ట్రిక్స్ మరియు ఫార్ములాలతో కూడిన ఆప్టిట్యూడ్ నోట్స్ మరియు మోడల్ టెస్టులు.',
      supported_topics: ['Shortcut Formulas', 'Time and Work', 'Probability & PnC', 'Puzzles & Syllogism', 'Company Aptitude Packs'],
      featured: 1
    },
    {
      name: 'PrepInsta Free Resources',
      url: 'https://prepinsta.com',
      logo_icon: 'prepinsta',
      category: 'aptitude',
      subcategories: ['Placement Preparation', 'Quantitative Aptitude', 'Logical Reasoning', 'Interview Preparation'],
      skill_level: 'Beginner',
      pricing: 'Freemium',
      pricing_details: 'Extensive free syllabus breakdowns, previous year papers, and pattern analysis for top recruiters.',
      description: 'Specializes in recruitment patterns for Indian IT service companies (TCS, Infosys, Cognizant, Wipro, Accenture). Offers free model papers and syllabus blueprints.',
      telugu_description: 'TCS, ఇన్ఫోసిస్, విప్రో వంటి ఐటీ కంపెనీల తాజా పరీక్షా విధానాలు, మునుపటి ప్రశ్నపత్రాలు మరియు ఉచిత ప్రిపరేషన్ గైడ్స్.',
      supported_topics: ['TCS NQT Syllabus', 'Cognizant Automata', 'Infosys Pseudo Code', 'Wipro NLTH Patterns', 'Resume Tips'],
      featured: 0
    },
    {
      name: 'FACE Prep Free Library',
      url: 'https://www.faceprep.in',
      logo_icon: 'faceprep',
      category: 'aptitude',
      subcategories: ['Placement Preparation', 'Quantitative Aptitude', 'Verbal Ability', 'Interview Preparation'],
      skill_level: 'Beginner',
      pricing: 'Freemium',
      pricing_details: 'Free company test patterns, aptitude formula booklets, and video breakdowns.',
      description: 'Placement training leader with free company-specific test guides, quantitative aptitude tricks, English communication tips, and mock HR interview answers.',
      telugu_description: 'కాలేజ్ విద్యార్థులకు ప్లేస్‌మెంట్ శిక్షణలో పేరొందిన సంస్థ. ఉచిత ఫార్ములా బుక్‌లెట్స్ మరియు ఇంటర్వ్యూ చిట్కాలు అందిస్తుంది.',
      supported_topics: ['Company Patterns', 'Quant Speed Tricks', 'Verbal Grammar', 'HR Behavioral Answers', 'Company Archives'],
      featured: 0
    },
    {
      name: 'CareerRide',
      url: 'https://www.careerride.com',
      logo_icon: 'careerride',
      category: 'aptitude',
      subcategories: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Interview Preparation'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: 'Free tests on technical topics, HR questions, group discussions, and aptitude tests.',
      description: 'Complete placement and career preparation portal featuring aptitude tests, mock tests, GD topics, technical interview Q&A for fresh engineering graduates.',
      telugu_description: 'ఇంజనీరింగ్ విద్యార్థుల కోసం క్యాంపస్ రిక్రూట్‌మెంట్ మరియు ఇంటర్వ్యూ ప్రిపరేషన్ మెటీరియల్ అందించే ఉచిత సైట్.',
      supported_topics: ['Placement Papers', 'HR Questions', 'Group Discussion Topics', 'Technical MCQs', 'Mock Tests'],
      featured: 0
    },
    {
      name: 'Sawaal',
      url: 'https://www.sawaal.com',
      logo_icon: 'sawaal',
      category: 'aptitude',
      subcategories: ['Quantitative Aptitude', 'General Knowledge', 'Logical Reasoning', 'Placement Preparation'],
      skill_level: 'Beginner',
      pricing: '100% Free',
      pricing_details: 'Free topic-wise quizzes and competitive exam mock tests.',
      description: 'Free repository of thousands of aptitude, general knowledge, current affairs, and reasoning questions with answers and detailed explanations.',
      telugu_description: 'ఆప్టిట్యూడ్, జనరల్ నాలెడ్జ్ మరియు రీజనింగ్ ప్రశ్నలను ఉచితంగా సాధన చేయడానికి మంచి సైట్.',
      supported_topics: ['Current Affairs', 'Banking Exams', 'Govt Job Quant', 'Series & Analogies', 'Speed Math'],
      featured: 0
    },
    {
      name: 'Testbook Free Quizzes',
      url: 'https://testbook.com/free-mock-tests',
      logo_icon: 'testbook',
      category: 'aptitude',
      subcategories: ['Quantitative Aptitude', 'Logical Reasoning', 'General Knowledge', 'Placement Preparation'],
      skill_level: 'Beginner',
      pricing: 'Freemium',
      pricing_details: 'Free daily live quizzes, performance analysis, and all-India ranking.',
      description: 'Test your quantitative aptitude, current affairs, and logical ability with timed practice quizzes and all-India percentile analytics against thousands of test takers.',
      telugu_description: 'రోజువారీ ఉచిత ఆప్టిట్యూడ్ క్విజ్‌లు మరియు ఆల్-ఇండియా ర్యాంకింగ్ ద్వారా మీ వేగం మరియు ఖచ్చితత్వాన్ని పరీక్షించుకోవచ్చు.',
      supported_topics: ['Daily Speed Quizzes', 'Detailed Solutions', 'Time Analysis', 'Reasoning Shortcuts', 'All India Ranks'],
      featured: 0
    }
  ];

  const insertResource = db.prepare(`
    INSERT INTO resources (
      name, url, logo_icon, category, subcategories, skill_level, pricing, pricing_details,
      description, telugu_description, supported_topics, featured
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const res of initialResources) {
    insertResource.run(
      res.name,
      res.url,
      res.logo_icon,
      res.category,
      JSON.stringify(res.subcategories),
      res.skill_level,
      res.pricing,
      res.pricing_details,
      res.description,
      res.telugu_description,
      JSON.stringify(res.supported_topics),
      res.featured
    );
  }

  console.log(`Seeded ${initialResources.length} educational resources successfully.`);
}

module.exports = {
  db,
  initDatabase
};
