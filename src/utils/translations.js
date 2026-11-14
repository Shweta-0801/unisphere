export const translations = {
  en: {
    // Navigation & App Shell
    nav: {
      dashboard: "Dashboard",
      attendance: "Attendance Hub",
      complaints: "Complaints Portal",
      lostFound: "Lost & Found",
      notes: "Notes Marketplace",
      groupStudy: "Group Study Hub",
      library: "Smart Library",
      myClasses: "My Classes & Students",
      assignments: "Assignments Portal",
      performance: "Academic Performance",
      attendanceMgmt: "Attendance Management",
      campusServices: "Campus Services",
      facultyServices: "Faculty Services",
      home: "Home",
      signIn: "Sign In",
      logOut: "Log out",
      guestStudent: "Guest Student",
      homePill: "Home ↗",
      academicSuite: "Academic Campus Suite"
    },

    // Common Global UI
    common: {
      search: "Search...",
      filter: "Filter",
      all: "All",
      safe: "Safe Zone",
      atRisk: "At Risk",
      save: "Save Changes",
      cancel: "Cancel",
      close: "Close",
      viewDetails: "View Details",
      download: "Download",
      status: "Status",
      action: "Action",
      today: "Today",
      present: "Present",
      absent: "Absent",
      leave: "Leave",
      changeLanguage: "Change Language",
      toggleTheme: "Toggle Theme",
      light: "Light",
      dark: "Dark"
    },

    // Dashboard
    dashboard: {
      welcomeBack: "Welcome back, {name}",
      subtitleStudent: "Monitor academic metrics, track attendance, and engage with live campus modules.",
      subtitleFaculty: "Manage course rosters, mark session attendance, and review student performance.",
      semesterBadge: "4th Semester • Computer Science",
      facultyBadge: "Faculty Member • Department of CSE",
      quickActions: "Quick Services",
      modulesTitle: "Academic Campus Modules",
      systemStanding: "Institutional Standing",
      activePeers: "24 Active Peers in Study Hub",
      attendanceNotice: "Keep attendance above 75% for seamless final exam eligibility.",
      grievanceTitle: "Grievances & Redressal",
      grievanceDesc: "Report campus infrastructure issues with transparent 9-stage tracking.",
      lostFoundTitle: "Lost & Found Network",
      lostFoundDesc: "Locate misplaced belongings plotted on the interactive campus map.",
      notesTitle: "Notes Marketplace",
      notesDesc: "Access verified semester lecture notes and peer study materials.",
      studyTitle: "Virtual Study Lounge",
      studyDesc: "Collaborate in synchronous study rooms with live peer presence and Pomodoro timer.",
      libraryTitle: "Smart Library System",
      libraryDesc: "Check 36-seat live floor layout availability and reserve study desks."
    },

    // Attendance Hub (Shweta)
    attendance: {
      title: "Attendance & Eligibility Hub",
      subtitle: "Monitor daily subject attendance, compute safe bunks, predict final exam eligibility, and keep your record safely above university thresholds.",
      trackerPill: "Smart Campus Academic Tracker",
      semesterPill: "Semester 4 • 2026",
      coursesSafe: "{safe} of {total} Courses Safe",
      shortageRisk: "{count} Course at Shortage Risk",
      targetCutoff: "Target:",
      addCourse: "Add Course",
      overviewTab: "Overview",
      predictorTab: "Predictor & What-If",
      calculatorTab: "Bunk Calculator",
      registerTab: "Quick Register",
      calendarTab: "Schedule Calendar",
      breakdownTab: "Course Breakdown",
      atRiskBadge: "{count} at risk",
      aggregateStanding: "Aggregate Standing",
      semesterPerformance: "Semester Performance",
      examEligible: "Exam Eligible",
      shortageRiskBadge: "Shortage Risk",
      presentRatio: "Present Ratio:",
      absenceRatio: "Absence Ratio:",
      targetClearance: "Target Clearance:",
      passingCutoff: "{target}% Passing Cutoff",
      classesAttended: "Classes Attended",
      classesMissed: "Classes Missed",
      totalClasses: "Total Classes",
      safeBunkAllowance: "Safe Bunk Allowance",
      catchUpClasses: "Catch-Up Classes",
      attendedSub: "Completed lecture & practical sessions",
      missedSub: "Absences, leaves, and missed roll calls",
      totalSub: "Total delivered sessions this term",
      safeBunkSub: "Classes can be skipped",
      catchUpSub: "Consecutive needed",
      withoutDropping: "Without dropping below {target}%",
      restoreEligibility: "To restore standard eligibility",
      guidelinesTitle: "Institutional Attendance Guidelines & Insights",
      safeZone: "Safe Zone",
      caution: "Caution",
      actionRequired: "Action Required",
      advisorComfortable: "You are comfortably above target! You can safely miss up to {count} total classes across subjects and still stay above {target}%.",
      advisorEdge: "You are right on the edge of your {target}% target. Missing your next class will put you at risk!",
      advisorDanger: "Attendance Warning: You must attend the next {count} consecutive classes without missing any to restore your standing to {target}%.",
      advisorEmpty: "No classes recorded yet. Start logging your subject sessions!"
    },

    // Smart Library (Shweta)
    library: {
      title: "Smart Library System",
      subtitle: "Real-time 36-desk floor occupancy, circulation catalog, and automated return deadline tracking.",
      overviewTab: "Library Overview",
      seatsTab: "36-Seat Floor Map",
      catalogTab: "Book Catalog",
      issuedTab: "My Issued Books & Reminders",
      totalCapacity: "Total Capacity",
      availableSeats: "Seats Available",
      occupiedSeats: "Occupied Desks",
      issuedBooksCount: "Books in Hand",
      searchBooks: "Search book title, author, or ISBN...",
      allCategories: "All Categories",
      reserveSeat: "Reserve Selected Seat",
      vacateSeat: "Vacate Desk"
    },

    // My Classes (Shweta)
    myClasses: {
      title: "My Classes & Students",
      subtitle: "Select an assigned course to view the student directory, monitor attendance against the mandatory 75% cutoff, and record lecture roll calls.",
      selectBatch: "Assigned Classes:",
      searchPlaceholder: "Search students by name or roll number...",
      allStudents: "All Students",
      safeStudents: "Safe ≥ 75%",
      atRiskStudents: "Below 75%",
      totalEnrolled: "Enrolled Students",
      classAverage: "Average Attendance",
      studentsAtRisk: "Students Below 75% Cutoff",
      markAttendanceBtn: "Mark Today's Attendance"
    },

    // Aanvi: Lost & Found
    lostFound: {
      title: "Lost & Found Network",
      subtitle: "Interactive Campus Map & Community Recovery System",
      campusMapTab: "Campus Map",
      reportItemTab: "Report Item",
      myReportsTab: "My Reports",
      myPointsTab: "My Points & Rewards",
      activePins: "{count} Active Pins on Map",
      filterAll: "All Items",
      filterLost: "Lost Items",
      filterFound: "Found Items",
      searchPlaceholder: "Search items by name, category or building..."
    },

    // Aanvi: Teacher Dashboard
    teacherDashboard: {
      title: "Faculty Teaching Suite",
      subtitle: "Manage course batches, conduct lecture roll calls, evaluate student submissions, and review grade distribution.",
      assignedBatches: "Assigned Batches",
      totalStudents: "Total Enrolled",
      pendingEvaluations: "Pending Grading",
      averageAttendance: "Average Attendance",
      scheduleTitle: "Today's Teaching Schedule",
      quickActions: "Quick Class Actions"
    },

    // Aanvi: Assignments & Courseware
    assignments: {
      title: "Assignments & Courseware",
      subtitle: "Create problem sets, publish lecture notes, and grade student submissions.",
      assignmentsTab: "Course Assignments",
      materialsTab: "Study Materials & Notes",
      createAsgBtn: "Create Assignment",
      uploadMatBtn: "Upload Material",
      searchPlaceholder: "Search assignments or resources by title...",
      pendingGrading: "Pending Grading",
      graded: "Graded",
      dueDate: "Due Date"
    },

    // Aditi: Notes Marketplace
    notesMarket: {
      title: "Notes Marketplace",
      subtitle: "Peer-Verified Semester Resources & Lecture Notes",
      uploadBtn: "Upload Notes",
      browseTitle: "Browse Course Materials",
      searchPlaceholder: "Search by subject, title, author, or keyword...",
      verifiedPacks: "Verified Semester Note Packs",
      savedInLocker: "Notes Saved in Locker",
      filterAllSubjects: "All Subjects",
      sortByPopular: "Most Popular",
      sortByRating: "Top Rated",
      sortByPages: "Page Count"
    },

    // Aditi: Virtual Study Lounge
    groupStudy: {
      title: "Virtual Study Lounge",
      subtitle: "Collaborate in synchronous study rooms with live peer presence and Pomodoro focus timers.",
      createCircleBtn: "Start Study Circle",
      activeRooms: "Active Study Circles",
      allCategories: "All Circles",
      searchPlaceholder: "Search study circle by topic or subject...",
      enterRoom: "Enter Study Room",
      activePeersCount: "{count} Peers Studying"
    },

    // Aditi: Academic Performance
    academicPerformance: {
      title: "Academic Performance & Marks",
      subtitle: "Track internal assessment scores, grade distributions, and semester exam eligibility.",
      overviewTab: "Performance Overview",
      classesTab: "Class Distribution",
      marksTab: "Student Scorecards",
      analysisTab: "Grade Analytics",
      statsTab: "Statistical Reports",
      averageScore: "Class Average Score",
      topScorer: "Top Performing Score"
    },

    // Gungun: Complaints & Redressal Portal
    complaints: {
      title: "Grievances & Redressal Portal",
      subtitle: "Campus Facilities, Labs, Hostels & Administration",
      fileTab: "File a Complaint",
      listTab: "All Grievance Records",
      statsTab: "Resolution Statistics",
      pendingBadge: "{pending} Pending • {resolved} Resolved",
      registerTitle: "Register Grievance Ticket",
      categoryTitle: "Select Grievance Category"
    },

    // Gungun: Attendance Management (Teacher)
    attendanceMgmt: {
      title: "Faculty Attendance Management",
      subtitle: "Daily lecture roll call, section aggregates, and mandatory university threshold records.",
      overviewTab: "Attendance Overview",
      classesTab: "Sections & Batches",
      markTab: "Mark Session Roll Call",
      calendarTab: "Lecture Calendar",
      statsTab: "Condonation Statistics",
      takeRollCall: "Take Roll Call",
      batchLabel: "Select Course Section:"
    },

    // Role Selection Page
    roleSelection: {
      title: "Choose Your Campus Role",
      subtitle: "Select your academic portal to access tailored tools and data.",
      studentTitle: "Student Identity",
      studentDesc: "Track attendance, reserve library desks, browse verified notes, and recover lost belongings.",
      facultyTitle: "Faculty / Teacher Identity",
      facultyDesc: "Conduct classroom roll calls, publish assignments, upload courseware, and grade submissions.",
      continueBtn: "Continue to Portal",
      backHome: "← Back to Campus Home"
    },

    // Authentication
    auth: {
      welcome: "Welcome Back",
      portalSubtitle: "Smart Campus Academic & Administrative Suite",
      signIn: "Sign In",
      register: "Create Account",
      forgotPassword: "Forgot Password?",
      studentTab: "Student Portal",
      facultyTab: "Faculty Portal",
      emailLabel: "Campus Email",
      passwordLabel: "Password",
      rememberMe: "Remember my credentials",
      submitSignIn: "Sign In to UniSphere",
      demoStudent: "Quick Demo: Student Access",
      demoFaculty: "Quick Demo: Faculty Access",
      backHome: "Change Role / Back"
    }
  },

  hi: {
    // Navigation & App Shell
    nav: {
      dashboard: "डैशबोर्ड",
      attendance: "उपस्थिति केंद्र",
      complaints: "शिकायत पोर्टल",
      lostFound: "खोया-पाया",
      notes: "नोट्स बाज़ार",
      groupStudy: "समूह अध्ययन",
      library: "स्मार्ट पुस्तकालय",
      myClasses: "मेरी कक्षाएं व छात्र",
      assignments: "असाइनमेंट पोर्टल",
      performance: "शैक्षणिक प्रदर्शन",
      attendanceMgmt: "उपस्थिति प्रबंधन",
      campusServices: "परिसर सेवाएं",
      facultyServices: "संकाय सेवाएं",
      home: "मुख्य पृष्ठ",
      signIn: "साइन इन",
      logOut: "लॉग आउट",
      guestStudent: "अतिथि छात्र",
      homePill: "मुख्य ↗",
      academicSuite: "शैक्षणिक परिसर मंच"
    },

    // Common Global UI
    common: {
      search: "खोजें...",
      filter: "फ़िल्टर",
      all: "सभी",
      safe: "सुरक्षित क्षेत्र",
      atRisk: "जोखिम में",
      save: "परिवर्तन सहेजें",
      cancel: "रद्द करें",
      close: "बंद करें",
      viewDetails: "विवरण देखें",
      download: "डाउनलोड",
      status: "स्थिति",
      action: "कार्रवाई",
      today: "आज",
      present: "उपस्थित",
      absent: "अनुपस्थित",
      leave: "अवकाश",
      changeLanguage: "भाषा बदलें",
      toggleTheme: "थीम बदलें",
      light: "लाइट",
      dark: "डार्क"
    },

    // Dashboard
    dashboard: {
      welcomeBack: "वापसी पर स्वागत है, {name}",
      subtitleStudent: "अपनी शैक्षणिक प्रगति की निगरानी करें, उपस्थिति ट्रैक करें और परिसर सुविधाओं का लाभ उठाएं।",
      subtitleFaculty: "कक्षा सूचियों का प्रबंधन करें, दैनिक उपस्थिति दर्ज करें और छात्रों के प्रदर्शन की समीक्षा करें।",
      semesterBadge: "चतुर्थ सेमेस्टर • कंप्यूटर साइंस",
      facultyBadge: "संकाय सदस्य • सीएसई विभाग",
      quickActions: "त्वरित सेवाएं",
      modulesTitle: "शैक्षणिक परिसर मॉड्यूल",
      systemStanding: "संस्थागत स्थिति",
      activePeers: "अध्ययन केंद्र में 24 सक्रिय सहपाठी",
      attendanceNotice: "अंतिम परीक्षा की पात्रता बनाए रखने के लिए 75% से अधिक उपस्थिति रखें।",
      grievanceTitle: "शिकायत एवं समाधान",
      grievanceDesc: "परिसर अवसंरचना समस्याओं की पारदर्शी 9-चरणीय ट्रैकिंग द्वारा रिपोर्ट करें।",
      lostFoundTitle: "खोया-पाया नेटवर्क",
      lostFoundDesc: "इंटरैक्टिव मानचित्र पर खोई हुई वस्तुओं की खोज करें।",
      notesTitle: "नोट्स बाज़ार",
      notesDesc: "सत्यापित सेमेस्टर व्याख्यान नोट्स और अध्ययन सामग्री प्राप्त करें।",
      studyTitle: "वर्चुअल स्टडी लाउंज",
      studyDesc: "लाइव पोमोडोरो टाइमर और सहपाठियों के साथ मिलकर अध्ययन करें।",
      libraryTitle: "स्मार्ट पुस्तकालय प्रणाली",
      libraryDesc: "36-सीट लेआउट उपलब्धता देखें और अध्ययन डेस्क आरक्षित करें।"
    },

    // Attendance Hub (Shweta)
    attendance: {
      title: "उपस्थिति एवं पात्रता केंद्र",
      subtitle: "दैनिक विषय उपस्थिति देखें, सुरक्षित अवकाश की गणना करें, परीक्षा पात्रता का पूर्वानुमान लगाएं और विश्वविद्यालय मानकों से ऊपर रहें।",
      trackerPill: "स्मार्ट कैंपस शैक्षणिक ट्रैकर",
      semesterPill: "सेमेस्टर 4 • 2026",
      coursesSafe: "{safe} / {total} पाठ्यक्रम सुरक्षित",
      shortageRisk: "{count} पाठ्यक्रम में उपस्थिति कम होने का जोखिम",
      targetCutoff: "लक्ष्य:",
      addCourse: "विषय जोड़ें",
      overviewTab: "अवलोकन",
      predictorTab: "पूर्वानुमान एवं विश्लेषण",
      calculatorTab: "अवकाश गणक",
      registerTab: "त्वरित पंजीकरण",
      calendarTab: "समय-सारणी कैलेंडर",
      breakdownTab: "विषयवार विवरण",
      atRiskBadge: "{count} जोखिम में",
      aggregateStanding: "कुल स्थिति",
      semesterPerformance: "सेमेस्टर प्रदर्शन",
      examEligible: "परीक्षा हेतु पात्र",
      shortageRiskBadge: "कमी का जोखिम",
      presentRatio: "उपस्थिति अनुपात:",
      absenceRatio: "अनुपस्थिति अनुपात:",
      targetClearance: "लक्ष्य से अंतर:",
      passingCutoff: "{target}% न्यूनतम सीमा",
      classesAttended: "उपस्थित कक्षाएं",
      classesMissed: "छूटी हुई कक्षाएं",
      totalClasses: "कुल कक्षाएं",
      safeBunkAllowance: "सुरक्षित अवकाश सीमा",
      catchUpClasses: "अनिवार्य उपस्थित कक्षाएं",
      attendedSub: "पूर्ण किए गए व्याख्यान और प्रयोगशाला सत्र",
      missedSub: "अनुपस्थितियां व छूटी हुई हाज़िरी",
      totalSub: "इस सत्र में आयोजित कुल कक्षाएं",
      safeBunkSub: "कक्षाएं जो छोड़ी जा सकती हैं",
      catchUpSub: "लगातार उपस्थित होना आवश्यक",
      withoutDropping: "{target}% से कम हुए बिना",
      restoreEligibility: "पात्रता बहाल करने हेतु",
      guidelinesTitle: "संस्थागत उपस्थिति दिशानिर्देश एवं विश्लेषण",
      safeZone: "सुरक्षित क्षेत्र",
      caution: "सावधानी",
      actionRequired: "तत्काल कार्रवाई आवश्यक",
      advisorComfortable: "आप लक्ष्य से सुरक्षित दूरी पर हैं! आप सभी विषयों में कुल {count} कक्षाएं छोड़ सकते हैं और फिर भी {target}% से ऊपर रहेंगे।",
      advisorEdge: "आप ठीक अपने {target}% लक्ष्य की सीमा पर हैं। अगली कक्षा छोड़ते ही आप जोखिम क्षेत्र में आ जाएंगे!",
      advisorDanger: "उपस्थिति चेतावनी: मानक {target}% स्तर वापस पाने के लिए आपको अगली लगातार {count} कक्षाओं में उपस्थित होना होगा।",
      advisorEmpty: "अभी तक कोई कक्षा दर्ज नहीं की गई है। सत्र दर्ज करना शुरू करें!"
    },

    // Smart Library (Shweta)
    library: {
      title: "स्मार्ट पुस्तकालय प्रणाली",
      subtitle: "36-डेस्क फ्लोर अधिभोग, पुस्तक सूची और स्वचालित वापसी समय-सीमा ट्रैकिंग।",
      overviewTab: "पुस्तकालय अवलोकन",
      seatsTab: "36-सीट फ्लोर मैप",
      catalogTab: "पुस्तक सूची",
      issuedTab: "मेरी जारी पुस्तकें व सूचनाएं",
      totalCapacity: "कुल क्षमता",
      availableSeats: "उपलब्ध सीटें",
      occupiedSeats: "आरक्षित डेस्क",
      issuedBooksCount: "प्राप्त पुस्तकें",
      searchBooks: "शीर्षक, लेखक या ISBN द्वारा खोजें...",
      allCategories: "सभी श्रेणियां",
      reserveSeat: "चयनित सीट आरक्षित करें",
      vacateSeat: "सीट खाली करें"
    },

    // My Classes (Shweta)
    myClasses: {
      title: "मेरी कक्षाएं व छात्र",
      subtitle: "सक्रिय पाठ्यक्रम बैचों का प्रबंधन करें, छात्रों की व्यक्तिगत उपस्थिति ट्रैक करें और हाज़िरी दर्ज करें।",
      selectBatch: "पाठ्यक्रम बैच चुनें:",
      searchPlaceholder: "छात्र का नाम या रोल नंबर खोजें...",
      allStudents: "सभी छात्र",
      safeStudents: "सुरक्षित (≥ 75%)",
      atRiskStudents: "जोखिम में (< 75%)",
      totalEnrolled: "कुल नामांकित",
      classAverage: "कक्षा औसत",
      studentsAtRisk: "जोखिम वाले छात्र",
      markAttendanceBtn: "उपस्थिति दर्ज करें"
    },

    // Aanvi: Lost & Found
    lostFound: {
      title: "खोया-पाया नेटवर्क",
      subtitle: "इंटरैक्टिव परिसर मानचित्र एवं समुदाय पुनर्प्राप्ति प्रणाली",
      campusMapTab: "परिसर मानचित्र",
      reportItemTab: "वस्तु की रिपोर्ट करें",
      myReportsTab: "मेरी रिपोर्ट",
      myPointsTab: "अंक एवं पुरस्कार",
      activePins: "मानचित्र पर {count} सक्रिय पिन",
      filterAll: "सभी वस्तुएं",
      filterLost: "खोई हुई वस्तुएं",
      filterFound: "मिली हुई वस्तुएं",
      searchPlaceholder: "नाम, श्रेणी या भवन द्वारा खोजें..."
    },

    // Aanvi: Teacher Dashboard
    teacherDashboard: {
      title: "संकाय शिक्षण कक्ष",
      subtitle: "कक्षा बैचों का प्रबंधन करें, उपस्थिति की समीक्षा करें और असाइनमेंट जांचें।",
      assignedBatches: "आवंटित बैच",
      totalStudents: "कुल नामांकित छात्र",
      pendingEvaluations: "लंबित मूल्यांकन",
      averageAttendance: "औसत उपस्थिति",
      scheduleTitle: "आज की कक्षा समय-सारणी",
      quickActions: "त्वरित कक्षा क्रियाएं"
    },

    // Aanvi: Assignments & Courseware
    assignments: {
      title: "असाइनमेंट एवं अध्ययन सामग्री",
      subtitle: "समस्या सेट बनाएं, व्याख्यान नोट्स प्रकाशित करें और छात्रों की सबमिशन जांचें।",
      assignmentsTab: "पाठ्यक्रम असाइनमेंट",
      materialsTab: "अध्ययन सामग्री व नोट्स",
      createAsgBtn: "नया असाइनमेंट बनाएं",
      uploadMatBtn: "सामग्री अपलोड करें",
      searchPlaceholder: "शीर्षक द्वारा असाइनमेंट या संसाधन खोजें...",
      pendingGrading: "जांच हेतु लंबित",
      graded: "जांच पूर्ण",
      dueDate: "अंतिम तिथि"
    },

    // Aditi: Notes Marketplace
    notesMarket: {
      title: "नोट्स बाज़ार",
      subtitle: "सहपाठियों द्वारा सत्यापित सेमेस्टर संसाधन एवं व्याख्यान नोट्स",
      uploadBtn: "नोट्स अपलोड करें",
      browseTitle: "पाठ्यक्रम सामग्री देखें",
      searchPlaceholder: "विषय, शीर्षक, लेखक या कीवर्ड द्वारा खोजें...",
      verifiedPacks: "सत्यापित सेमेस्टर नोट्स पैक",
      savedInLocker: "लॉकर में सहेजे गए नोट्स",
      filterAllSubjects: "सभी विषय",
      sortByPopular: "सर्वाधिक लोकप्रिय",
      sortByRating: "शीर्ष मूल्यांकित",
      sortByPages: "पृष्ठ संख्या"
    },

    // Aditi: Virtual Study Lounge
    groupStudy: {
      title: "वर्चुअल स्टडी लाउंज",
      subtitle: "लाइव पोमोडोरो टाइमर और सहपाठियों के साथ मिलकर अध्ययन करें।",
      createCircleBtn: "नया अध्ययन समूह शुरू करें",
      activeRooms: "सक्रिय अध्ययन समूह",
      allCategories: "सभी समूह",
      searchPlaceholder: "विषय द्वारा अध्ययन समूह खोजें...",
      enterRoom: "अध्ययन कक्ष में प्रवेश करें",
      activePeersCount: "{count} सहपाठी अध्ययनरत"
    },

    // Aditi: Academic Performance
    academicPerformance: {
      title: "शैक्षणिक प्रदर्शन एवं अंक",
      subtitle: "आंतरिक मूल्यांकन अंक, ग्रेड वितरण और परीक्षा पात्रता देखें।",
      overviewTab: "प्रदर्शन अवलोकन",
      classesTab: "कक्षा वितरण",
      marksTab: "छात्र अंकतालिका",
      analysisTab: "ग्रेड विश्लेषण",
      statsTab: "सांख्यिकी रिपोर्ट",
      averageScore: "कक्षा का औसत स्कोर",
      topScorer: "शीर्ष प्रदर्शन स्कोर"
    },

    // Gungun: Complaints & Redressal Portal
    complaints: {
      title: "शिकायत एवं समाधान पोर्टल",
      subtitle: "परिसर सुविधाएं, प्रयोगशालाएं, छात्रावास एवं प्रशासन",
      fileTab: "शिकायत दर्ज करें",
      listTab: "सभी शिकायत रिकॉर्ड",
      statsTab: "समाधान सांख्यिकी",
      pendingBadge: "{pending} लंबित • {resolved} हल",
      registerTitle: "शिकायत टिकट दर्ज करें",
      categoryTitle: "शिकायत की श्रेणी चुनें"
    },

    // Gungun: Attendance Management (Teacher)
    attendanceMgmt: {
      title: "संकाय उपस्थिति प्रबंधन",
      subtitle: "दैनिक व्याख्यान हाज़िरी, अनुभाग कुल और अनिवार्य विश्वविद्यालय मानक रिकॉर्ड।",
      overviewTab: "उपस्थिति अवलोकन",
      classesTab: "अनुभाग एवं बैच",
      markTab: "सत्र हाज़िरी दर्ज करें",
      calendarTab: "व्याख्यान कैलेंडर",
      statsTab: "छूट सांख्यिकी",
      takeRollCall: "हाज़िरी लें",
      batchLabel: "पाठ्यक्रम अनुभाग चुनें:"
    },

    // Role Selection Page
    roleSelection: {
      title: "अपनी परिसर भूमिका चुनें",
      subtitle: "अनुकूलित उपकरणों और डेटा तक पहुंचने के लिए अपना पोर्टल चुनें।",
      studentTitle: "छात्र पहचान",
      studentDesc: "उपस्थिति ट्रैक करें, पुस्तकालय डेस्क आरक्षित करें और खोया-पाया सामान खोजें।",
      facultyTitle: "संकाय / शिक्षक पहचान",
      facultyDesc: "कक्षा हाज़िरी दर्ज करें, असाइनमेंट दें, नोट्स अपलोड करें और अंक दें।",
      continueBtn: "पोर्टल पर आगे बढ़ें",
      backHome: "← मुख्य पृष्ठ पर वापस जाएं"
    },

    // Authentication
    auth: {
      welcome: "वापसी पर स्वागत है",
      portalSubtitle: "एकीकृत स्मार्ट परिसर शैक्षणिक एवं प्रशासनिक सुइट",
      signIn: "साइन इन",
      register: "नया खाता बनाएं",
      forgotPassword: "पासवर्ड भूल गए?",
      studentTab: "छात्र पोर्टल",
      facultyTab: "संकाय पोर्टल",
      emailLabel: "परिसर ईमेल",
      passwordLabel: "पासवर्ड",
      rememberMe: "इस कंप्यूटर पर मुझे याद रखें",
      submitSignIn: "UniSphere में साइन इन करें",
      demoStudent: "त्वरित डेमो: छात्र पहुंच",
      demoFaculty: "त्वरित डेमो: संकाय पहुंच",
      backHome: "भूमिका बदलें / वापस"
    }
  },

  es: {
    // Navigation & App Shell
    nav: {
      dashboard: "Panel Principal",
      attendance: "Centro de Asistencia",
      complaints: "Portal de Quejas",
      lostFound: "Objetos Perdidos",
      notes: "Mercado de Apuntes",
      groupStudy: "Grupo de Estudio",
      library: "Biblioteca Inteligente",
      myClasses: "Mis Clases y Alumnos",
      assignments: "Portal de Tareas",
      performance: "Rendimiento Académico",
      attendanceMgmt: "Gestión de Asistencia",
      campusServices: "Servicios del Campus",
      facultyServices: "Servicios Docentes",
      home: "Inicio",
      signIn: "Iniciar Sesión",
      logOut: "Cerrar sesión",
      guestStudent: "Estudiante Invitado",
      homePill: "Inicio ↗",
      academicSuite: "Suite Académica del Campus"
    },

    // Common Global UI
    common: {
      search: "Buscar...",
      filter: "Filtrar",
      all: "Todos",
      safe: "Zona Segura",
      atRisk: "En Riesgo",
      save: "Guardar Cambios",
      cancel: "Cancelar",
      close: "Cerrar",
      viewDetails: "Ver Detalles",
      download: "Descargar",
      status: "Estado",
      action: "Acción",
      today: "Hoy",
      present: "Presente",
      absent: "Ausente",
      leave: "Permiso",
      changeLanguage: "Cambiar Idioma",
      toggleTheme: "Alternar Tema",
      light: "Claro",
      dark: "Oscuro"
    },

    // Dashboard
    dashboard: {
      welcomeBack: "Bienvenido de nuevo, {name}",
      subtitleStudent: "Monitorea tus métricas académicas, controla tu asistencia y accede a los servicios del campus.",
      subtitleFaculty: "Gestiona listas de cursos, registra la asistencia y revisa el rendimiento estudiantil.",
      semesterBadge: "4º Semestre • Ingeniería Informática",
      facultyBadge: "Profesor • Departamento de Informática",
      quickActions: "Servicios Rápidos",
      modulesTitle: "Módulos del Campus Académico",
      systemStanding: "Estado Institucional",
      activePeers: "24 Compañeros activos en el centro de estudio",
      attendanceNotice: "Mantén una asistencia superior al 75% para garantizar el acceso al examen final.",
      grievanceTitle: "Quejas y Reclamaciones",
      grievanceDesc: "Reporta incidencias del campus con seguimiento transparente en 9 fases.",
      lostFoundTitle: "Red de Objetos Perdidos",
      lostFoundDesc: "Localiza pertenencias perdidas mediante el mapa interactivo del campus.",
      notesTitle: "Mercado de Apuntes",
      notesDesc: "Accede a apuntes verificados del semestre y material de estudio compartido.",
      studyTitle: "Sala Virtual de Estudio",
      studyDesc: "Colabora en salas sincronizadas con presencia en vivo y temporizador Pomodoro.",
      libraryTitle: "Sistema de Biblioteca Inteligente",
      libraryDesc: "Consulta disponibilidad en vivo del plano de 36 puestos y reserva escritorios."
    },

    // Attendance Hub (Shweta)
    attendance: {
      title: "Centro de Asistencia y Elegibilidad",
      subtitle: "Monitorea tu asistencia diaria, calcula faltas permitidas, predice tu acceso a exámenes finales y mantente por encima de los límites universitarios.",
      trackerPill: "Seguimiento Académico Inteligente",
      semesterPill: "Semestre 4 • 2026",
      coursesSafe: "{safe} de {total} asignaturas seguras",
      shortageRisk: "{count} asignatura en riesgo de falta",
      targetCutoff: "Objetivo:",
      addCourse: "Añadir Asignatura",
      overviewTab: "Resumen",
      predictorTab: "Predictor y Escenarios",
      calculatorTab: "Calculadora de Faltas",
      registerTab: "Registro Rápido",
      calendarTab: "Calendario de Clases",
      breakdownTab: "Desglose de Cursos",
      atRiskBadge: "{count} en riesgo",
      aggregateStanding: "Estado Global",
      semesterPerformance: "Rendimiento del Semestre",
      examEligible: "Apto para Exámenes",
      shortageRiskBadge: "Riesgo de Falta",
      presentRatio: "Tasa de Asistencia:",
      absenceRatio: "Tasa de Ausencia:",
      targetClearance: "Margen sobre Objetivo:",
      passingCutoff: "{target}% Corte de Aprobado",
      classesAttended: "Clases Asistidas",
      classesMissed: "Clases Faltadas",
      totalClasses: "Clases Totales",
      safeBunkAllowance: "Margen Seguro de Faltas",
      catchUpClasses: "Clases Necesarias",
      attendedSub: "Sesiones teóricas y prácticas completadas",
      missedSub: "Ausencias, permisos y faltas registradas",
      totalSub: "Sesiones impartidas este periodo",
      safeBunkSub: "Clases que puedes faltar",
      catchUpSub: "Consecutivas requeridas",
      withoutDropping: "Sin bajar del {target}%",
      restoreEligibility: "Para restaurar tu derecho a examen",
      guidelinesTitle: "Directrices y Análisis Institucionales de Asistencia",
      safeZone: "Zona Segura",
      caution: "Precaución",
      actionRequired: "Acción Requerida",
      advisorComfortable: "¡Estás holgadamente por encima del objetivo! Puedes faltar hasta {count} clases en total y seguir por encima del {target}%.",
      advisorEdge: "Estás justo en el límite de tu meta del {target}%. ¡Faltar a la próxima clase te pondrá en zona de riesgo!",
      advisorDanger: "Aviso de Asistencia: Debes asistir a las próximas {count} clases consecutivas sin faltar para recuperar tu elegibilidad al {target}%.",
      advisorEmpty: "Aún no hay clases registradas. ¡Empieza registrando tus asignaturas!"
    },

    // Smart Library (Shweta)
    library: {
      title: "Sistema de Biblioteca Inteligente",
      subtitle: "Ocupación en tiempo real de 36 puestos, catálogo general y control automático de plazos de devolución.",
      overviewTab: "Resumen Biblioteca",
      seatsTab: "Plano de 36 Puestos",
      catalogTab: "Catálogo de Libros",
      issuedTab: "Mis Libros Prestados",
      totalCapacity: "Capacidad Total",
      availableSeats: "Puestos Libres",
      occupiedSeats: "Puestos Ocupados",
      issuedBooksCount: "Libros en Préstamo",
      searchBooks: "Buscar por título, autor o ISBN...",
      allCategories: "Todas las Categorías",
      reserveSeat: "Reservar Puesto Seleccionado",
      vacateSeat: "Liberar Puesto"
    },

    // My Classes (Shweta)
    myClasses: {
      title: "Mis Clases y Alumnos",
      subtitle: "Gestiona grupos de asignaturas, supervisa la asistencia de los alumnos y pasa lista de sesión.",
      selectBatch: "Seleccionar Grupo de Curso:",
      searchPlaceholder: "Buscar por nombre o matrícula...",
      allStudents: "Todos los Alumnos",
      safeStudents: "Seguros (≥ 75%)",
      atRiskStudents: "En Riesgo (< 75%)",
      totalEnrolled: "Total Inscritos",
      classAverage: "Promedio del Grupo",
      studentsAtRisk: "Alumnos en Riesgo",
      markAttendanceBtn: "Pasar Lista del Grupo"
    },

    // Aanvi: Lost & Found
    lostFound: {
      title: "Red de Objetos Perdidos",
      subtitle: "Mapa interactivo del campus y sistema de recuperación comunitaria",
      campusMapTab: "Mapa del Campus",
      reportItemTab: "Reportar Objeto",
      myReportsTab: "Mis Reportes",
      myPointsTab: "Puntos y Recompensas",
      activePins: "{count} Marcadores activos",
      filterAll: "Todos los Objetos",
      filterLost: "Objetos Perdidos",
      filterFound: "Objetos Encontrados",
      searchPlaceholder: "Buscar por nombre, categoría o edificio..."
    },

    // Aanvi: Teacher Dashboard
    teacherDashboard: {
      title: "Suite Docente del Profesorado",
      subtitle: "Gestiona grupos de clase, pasa lista, califica entregas de alumnos y revisa distribución de notas.",
      assignedBatches: "Grupos Asignados",
      totalStudents: "Total Alumnos Inscritos",
      pendingEvaluations: "Pendientes de Calificar",
      averageAttendance: "Asistencia Media",
      scheduleTitle: "Horario de Clases de Hoy",
      quickActions: "Acciones Rápidas de Clase"
    },

    // Aanvi: Assignments & Courseware
    assignments: {
      title: "Tareas y Materiales de Curso",
      subtitle: "Crea cuestionarios, publica apuntes y califica entregas de estudiantes.",
      assignmentsTab: "Tareas del Curso",
      materialsTab: "Materiales de Estudio y Apuntes",
      createAsgBtn: "Crear Nueva Tarea",
      uploadMatBtn: "Subir Material",
      searchPlaceholder: "Buscar tareas o recursos por título...",
      pendingGrading: "Pendiente de Calificar",
      graded: "Calificado",
      dueDate: "Fecha Límite"
    },

    // Aditi: Notes Marketplace
    notesMarket: {
      title: "Mercado de Apuntes",
      subtitle: "Recursos semestrales verificados y apuntes de clase",
      uploadBtn: "Subir Apuntes",
      browseTitle: "Explorar Materiales del Curso",
      searchPlaceholder: "Buscar por asignatura, título, autor o palabra clave...",
      verifiedPacks: "Packs de Apuntes Verificados",
      savedInLocker: "Apuntes guardados en casillero",
      filterAllSubjects: "Todas las Asignaturas",
      sortByPopular: "Más Populares",
      sortByRating: "Mejor Valorados",
      sortByPages: "Número de Páginas"
    },

    // Aditi: Virtual Study Lounge
    groupStudy: {
      title: "Sala Virtual de Estudio",
      subtitle: "Colabora en salas sincronizadas con presencia en vivo y temporizador Pomodoro.",
      createCircleBtn: "Iniciar Círculo de Estudio",
      activeRooms: "Círculos de Estudio Activos",
      allCategories: "Todos los Círculos",
      searchPlaceholder: "Buscar círculo por tema o asignatura...",
      enterRoom: "Entrar a la Sala",
      activePeersCount: "{count} Compañeros Estudiando"
    },

    // Aditi: Academic Performance
    academicPerformance: {
      title: "Rendimiento Académico y Calificaciones",
      subtitle: "Seguimiento de calificaciones, distribución de notas y elegibilidad para exámenes.",
      overviewTab: "Resumen de Rendimiento",
      classesTab: "Distribución por Clases",
      marksTab: "Boletín de Alumnos",
      analysisTab: "Análisis de Calificaciones",
      statsTab: "Informes Estadísticos",
      averageScore: "Puntuación Media del Grupo",
      topScorer: "Puntuación Más Alta"
    },

    // Gungun: Complaints & Redressal Portal
    complaints: {
      title: "Portal de Quejas y Reclamaciones",
      subtitle: "Instalaciones, laboratorios, residencias y administración del campus",
      fileTab: "Poner una Queja",
      listTab: "Todas las Quejas",
      statsTab: "Estadísticas de Resolución",
      pendingBadge: "{pending} Pendientes • {resolved} Resueltas",
      registerTitle: "Registrar Ticket de Reclamación",
      categoryTitle: "Seleccionar Categoría de Incidencia"
    },

    // Gungun: Attendance Management (Teacher)
    attendanceMgmt: {
      title: "Gestión Docente de Asistencia",
      subtitle: "Pase de lista diario, agregados por sección y control de mínimos universitarios.",
      overviewTab: "Resumen de Asistencia",
      classesTab: "Secciones y Grupos",
      markTab: "Pasar Lista de Sesión",
      calendarTab: "Calendario de Clases",
      statsTab: "Estadísticas de Asistencia",
      takeRollCall: "Pasar Lista",
      batchLabel: "Seleccionar Grupo de Asignatura:"
    },

    // Role Selection Page
    roleSelection: {
      title: "Elige tu Rol en el Campus",
      subtitle: "Selecciona tu portal académico para acceder a tus herramientas y datos.",
      studentTitle: "Identidad Estudiantil",
      studentDesc: "Controla asistencias, reserva escritorios de biblioteca y busca apuntes.",
      facultyTitle: "Identidad Docente",
      facultyDesc: "Pasa lista, publica tareas, sube materiales y califica alumnos.",
      continueBtn: "Continuar al Portal",
      backHome: "← Volver al Inicio del Campus"
    },

    // Authentication
    auth: {
      welcome: "Bienvenido a UniSphere",
      portalSubtitle: "Suite Académica y de Gestión Inteligente del Campus",
      signIn: "Iniciar Sesión",
      register: "Crear Cuenta",
      forgotPassword: "¿Olvidaste tu contraseña?",
      studentTab: "Portal del Estudiante",
      facultyTab: "Portal del Profesor",
      emailLabel: "Correo Institucional",
      passwordLabel: "Contraseña",
      rememberMe: "Recordar mis credenciales",
      submitSignIn: "Iniciar Sesión en UniSphere",
      demoStudent: "Demo Rápida: Acceso Alumno",
      demoFaculty: "Demo Rápida: Acceso Profesor",
      backHome: "Cambiar Rol / Volver"
    }
  }
};

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" }
];