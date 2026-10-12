import { PortfolioData } from './types';

export const generateCadSvgPlaceholder = (
  title: string,
  color: string = "#0b6efd",
  subtitle: string = "CAD Design"
): string => `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none"><rect width="600" height="400" fill="%23f8fafc"/><rect x="20" y="20" width="560" height="360" rx="8" stroke="%23cbd5e1" stroke-width="2" stroke-dasharray="6 6"/><circle cx="300" cy="180" r="75" stroke="${encodeURIComponent(color)}" stroke-width="3" fill="%23eff6ff"/><path d="M225 180h150M300 105v150M247 127l106 106M247 233l106-106" stroke="${encodeURIComponent(color)}" stroke-width="1.5" stroke-dasharray="4 3"/><circle cx="300" cy="180" r="30" stroke="${encodeURIComponent(color)}" stroke-width="2" fill="white"/><text x="300" y="310" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="bold" fill="%231e293b">${encodeURIComponent(title)}</text><text x="300" y="335" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="600" fill="${encodeURIComponent(color)}">${encodeURIComponent(subtitle)}</text></svg>`;

export const initialPortfolioData: PortfolioData = {
  "hero": {
    "name": "Aman Maurya",
    "title": "Mechanical Design Engineer",
    "bio": "Mechanical Engineering student with hands-on experience in CAD design and machine mechanisms. Skilled in AutoCAD and SolidWorks, with practical exposure to drafting, 3D modeling, and mechanism development. Seeking a Mechanical Design Job to apply engineering fundamentals and contribute to real-world product development.",
    "primaryBtnText": "Projects Work",
    "secondaryBtnText": "Download Resume",
    "heroImage": "/assets/hero-engine.jpg",
    "highlights": [
      "⚡ SolidWorks (Part, Assembly & Weldments)",
      "📐 ASME Y14.5 GD&T Standards",
      "🎓 CIPET IPT Jaipur (B.Tech 3rd Yr)",
      "🛠️ Precision Reverse Engineering"
    ]
  },
  "profile": {
    "title": "Mechanical Engineering Student",
    "bio1": "Hi! I'm Aman Maurya, a passionate Mechanical Engineering student currently pursuing B.Tech (3rd Year) at CIPET IPT–Jaipur. I have a keen interest in CAD design, research and development, new product development and enjoy creating precise, efficient, and functional models that bring engineering concepts to life.",
    "bio2": "I have hands-on experience with AutoCAD and SolidWorks, along with practical exposure to 2D drafting, 3D modelling, mechanism design and prototype development.",
    "skills": [
      "Engineering Drawing",
      "CAD Fundamentals",
      "AutoCAD & SolidWorks",
      "Workshop Technology",
      "GD&T Principles",
      "Assembly & Mechanisms"
    ],
    "profileImage": "/assets/aman-profile.jpg"
  },
  "contact": {
    "phone": "+91 9257766762",
    "phoneDisplay": "+91 9257766762",
    "email": "amanmauryaji16@gmail.com",
    "location": "Jaipur, Rajasthan, India",
    "linkedinUrl": "https://www.linkedin.com/in/aman-maurya-80700a301/",
    "instagramUrl": "https://www.instagram.com/",
    "formspreeUrl": "https://formspree.io/f/meaqjjan"
  },
  "settings": {
    "adminPin": "admin123",
    "siteTitle": "Aman Maurya | Mechanical Design Portfolio",
    "brandSubtitle": "MECHANICAL DESIGN PORTFOLIO",
    "adminEmail": "amanmauryaji16@gmail.com",
    "sheetDbUrl": "",
    "resumeUrl": ""
  },
  "expertise": [
    {
      "id": "exp-1",
      "number": "01",
      "title": "CAD Design",
      "description": "2D drafting and 3D mechanical design using AutoCAD and SolidWorks, with focus on accurate engineering drawings and practical design solutions.",
      "icon": "cube"
    },
    {
      "id": "exp-2",
      "number": "02",
      "title": "3D Modelling",
      "description": "Creation of detailed 3D parts, components and assemblies with proper dimensions, constraints and engineering design considerations.",
      "icon": "cubes"
    },
    {
      "id": "exp-3",
      "number": "03",
      "title": "Machine Design",
      "description": "Design and development of machine components and mechanisms with focus on strength, functionality, reliability and manufacturability.",
      "icon": "cogs"
    },
    {
      "id": "exp-4",
      "number": "04",
      "title": "Product Design",
      "description": "Practical product development from concept to 3D model, focusing on functionality, ease of manufacturing and real-world engineering requirements.",
      "icon": "lightbulb"
    }
  ],
  "projects": [
    {
      "id": "proj-1",
      "title": "Geneva Wheel Mechanism",
      "description": "Designed and developed a 6-slot Geneva Wheel Mechanism as a B.Tech 4th Semester team Minor project to convert continuous rotary motion into precise intermittent motion for industrial indexing applications.",
      "badge": "⚡ Motion Control",
      "badgeColor": "#0b6efd",
      "dateRange": "Jan 2026 - Apr 2026",
      "role": "Team Lead",
      "teamSize": "4 Members",
      "tools": [
        "AutoCAD",
        "SolidWorks",
        "MATLAB"
      ],
      "achievements": [
        "🏆 Runner-Up at TechFest 2026",
        "📐 Kinematic Analysis Completed"
      ],
      "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
      "imageUrl": "/assets/geneva-wheel.jpg",
      "isExtra": false
    },
    {
      "id": "proj-2",
      "title": "Solar Tracking System",
      "description": "Designed and developed a Solar Tracking System as a Polytechnic Final Year Major Project to enhance solar panel efficiency through automatic sun tracking without external power using mechanical principles.",
      "badge": "🌱 Green Tech",
      "badgeColor": "#10b981",
      "dateRange": "Jul 2025 - Dec 2025",
      "role": "Project Lead",
      "teamSize": "5 Members",
      "tools": [
        "AutoCAD",
        "3D Printing",
        "Mechanical Linkage"
      ],
      "achievements": [
        "🏆 Best Project Award 2025",
        "⚡ +35% Solar Efficiency"
      ],
      "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
      "imageUrl": "/assets/solar-tracker.jpg",
      "isExtra": false
    },
    {
      "id": "proj-3",
      "title": "Machine Component Design",
      "description": "Designed a precision machine component with detailed 3D modelling and engineering drawing using SolidWorks and AutoCAD with complete dimensional accuracy and GD&T adherence.",
      "badge": "⚙️ Precision",
      "badgeColor": "#8b5cf6",
      "dateRange": "Sep 2026 - Nov 2026",
      "role": "Individual Project",
      "teamSize": "Self-Initiated",
      "tools": [
        "SolidWorks",
        "AutoCAD",
        "GD&T"
      ],
      "achievements": [
        "📐 100% Design Accuracy",
        "⚡ Manufacturing Ready"
      ],
      "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%238b5cf6\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%238b5cf6\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%238b5cf6\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Machine%20Component%20Design</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%238b5cf6\">Precision%203D%20Part</text></svg>",
      "isExtra": true
    },
    {
      "id": "proj-4",
      "title": "Assembly Design & Analysis",
      "description": "Created a complete assembly model with motion analysis and interference checking using SolidWorks. Optimized the assembly for manufacturability and performance.",
      "badge": "🔧 Assembly",
      "badgeColor": "#f59e0b",
      "dateRange": "Mar 2026 - Jun 2026",
      "role": "Team Member",
      "teamSize": "2 Members",
      "tools": [
        "SolidWorks",
        "AutoCAD"
      ],
      "achievements": [
        "📊 Motion Analysis Completed",
        "✅ Zero Interference"
      ],
      "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%23f59e0b\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%23f59e0b\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%23f59e0b\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Assembly%20Design%20%26%20Analysis</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%23f59e0b\">SolidWorks%20Multi-body</text></svg>",
      "isExtra": true
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "yearRange": "Sep 2025 – Present",
      "institution": "Central Institute of Petrochemicals Engineering & Technology (CIPET), Jaipur",
      "branch": "Mechanical Engineering",
      "cgpa": "7.35",
      "status": "Currently in 3rd year (B.Tech)"
    },
    {
      "id": "edu-2",
      "yearRange": "Aug 2023 – Jun 2025",
      "institution": "Government Polytechnic College, Nawa (Didwana - Kuchaman)",
      "branch": "Mechanical Engineering (Diploma)",
      "cgpa": "9.34",
      "status": "Best Student Award"
    },
    {
      "id": "edu-3",
      "yearRange": "Jun 2022 – Apr 2023",
      "institution": "Senior Secondary Examination (Rajasthan Board)",
      "branch": "Science with Mathematics",
      "percentage": "82.20%"
    },
    {
      "id": "edu-4",
      "yearRange": "Jun 2020 – Apr 2021",
      "institution": "Secondary School Certificate (Rajasthan Board)",
      "branch": "General Studies & Science",
      "percentage": "93%"
    }
  ],
  "internships": [
    {
      "id": "int-1",
      "number": "01",
      "role": "Mechanical Engineering Intern",
      "company": "Indian Railways, Govt. of India",
      "location": "Jaipur, Rajasthan, India",
      "duration": "26 May 2026 – 10 July 2026",
      "description": "During my internship at Indian Railways, I gained practical exposure to railway coach maintenance, brake systems, inspection and engineering practices.",
      "points": [
        "Studied the working principle and maintenance of the Air Brake System.",
        "Gained practical knowledge of the FIBA System.",
        "Observed the operation of the CNC Underfloor Wheel Lathe Machine.",
        "Participated in coach inspection, preventive maintenance and brake testing.",
        "Learned railway maintenance procedures, safety standards and engineering practices."
      ],
      "imageUrl": "/assets/cert-railways.jpg"
    },
    {
      "id": "int-2",
      "number": "02",
      "role": "Mechanical Engineering Intern",
      "company": "Centre for Electronic Governance (CEG), Govt. of Rajasthan",
      "location": "Jaipur, Rajasthan, India",
      "duration": "10 July 2024 – 20 August 2024",
      "description": "Successfully completed a Summer Internship in Industrial Design of Machine Components at CEG, Government of Rajasthan.",
      "points": [
        "Gained knowledge of machine component design.",
        "Studied CAD fundamentals and engineering design principles.",
        "Developed understanding of product development and mechanical design practices.",
        "Gained practical exposure to industrial design methodologies."
      ],
      "imageUrl": "/assets/cert-ceg.jpg"
    },
    {
      "id": "int-3",
      "number": "03",
      "role": "MIIC Winter Internship Program",
      "company": "Malaviya National Institute of Technology (MNIT), Jaipur",
      "location": "Jaipur, Rajasthan, India",
      "duration": "26 December 2023 – 22 January 2024",
      "description": "Successfully completed the 24-day MIIC Winter Internship Program at MNIT Jaipur focusing on incubation and product innovation.",
      "points": [
        "Developed communication and soft skills.",
        "Learned fundamentals of entrepreneurship.",
        "Gained awareness of Intellectual Property Rights (IPR).",
        "Learned about the contribution and working of incubation centres.",
        "Gained practical exposure through interaction, mentoring and team-based learning."
      ],
      "imageUrl": "/assets/cert-mnit.jpg"
    }
  ],
  "awards": [
    {
      "id": "award-1",
      "title": "AutoCAD Certification",
      "description": "Successfully completed AutoCAD Mechanical 2D+3D Course from Digital CADD Solutions. Developed practical skills in 2D Drafting, 3D Modeling, Assembly Design, Parametric Drawing, and Engineering Drawing.",
      "imageUrl": "/assets/cert-autocad.jpg",
      "isExtra": false
    },
    {
      "id": "award-2",
      "title": "SolidWorks Certificate",
      "description": "Completed SolidWorks training with hands-on experience in 3D Modelling, Weldment Assemblies, Mechanical Drafting, Assembly Design, and Surface Modelling.",
      "imageUrl": "/assets/cert-solidworks.jpg",
      "isExtra": false
    },
    {
      "id": "award-3",
      "title": "Best Student Award – Mechanical Engineering",
      "description": "Honored with the Best Student of Mechanical Engineering award for maintaining outstanding academic performance (CGPA: 9.34), demonstrating technical excellence, and actively contributing to projects.",
      "imageUrl": "/assets/award-best-student.jpg",
      "isExtra": false
    },
    {
      "id": "award-4",
      "title": "Runner-Up – Tech Vanguard, TechFest 2026 (PRISMA)",
      "description": "Awarded Runner-Up in the Tech Vanguard competition during TechFest 2026 – PRISMA at CIPET Jaipur. Presented the Geneva Wheel Mechanism project, demonstrating mechanical design and kinematic analysis.",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%2310b981\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%2310b981\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%2310b981\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Runner-Up%20Tech%20Vanguard</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%2310b981\">PRISMA%20TechFest%202026</text></svg>",
      "isExtra": true
    },
    {
      "id": "award-5",
      "title": "Winner – CAD Maestro, TechFest 2026 (PRISMA)",
      "description": "Awarded Winner in the CAD Maestro competition during TechFest 2026 – PRISMA at CIPET Jaipur. Demonstrated proficiency in CAD modeling, engineering drawing, mechanical design, and technical problem-solving.",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%23ef4444\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%23ef4444\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%23ef4444\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Winner%20-%20CAD%20Maestro</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%23ef4444\">CIPET%20TechFest%202026</text></svg>",
      "isExtra": true
    },
    {
      "id": "award-6",
      "title": "Blood Donation Camp — Volunteer Service",
      "description": "Awarded Certificate of Appreciation for voluntary service at the Blood Donation, Health & Eye Checkup Camp organized at Khatian Polytechnic College, Jaipur on 14 November 2025.",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%23ec4899\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%23ec4899\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%23ec4899\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Certificate%20of%20Appreciation</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%23ec4899\">Community%20Service</text></svg>",
      "isExtra": true
    }
  ],
  "galleryItems": [
    {
      "id": "gal-2d-1",
      "title": "Sketch-1 (Flanged Hub)",
      "description": "Precision 2D sketch with dimensions and geometric annotations.",
      "category": "2d-sketch",
      "categoryLabel": "2D SKETCH",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">2D%20Sketch%20-%20Flanged%20Hub</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">AutoCAD%202D%20Drafting</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View 2D Sketch",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">2D%20Sketch%20-%20Flanged%20Hub</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">AutoCAD%202D%20Drafting</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-2d-2",
      "title": "Sketch-2 (Spur Gear Profile)",
      "description": "Involute teeth generation and pitch circle drafting.",
      "category": "2d-sketch",
      "categoryLabel": "2D SKETCH",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">2D%20Sketch%20-%20Spur%20Gear%20Profile</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Gear%20Involute%20Geometry</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View 2D Sketch",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">2D%20Sketch%20-%20Spur%20Gear%20Profile</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Gear%20Involute%20Geometry</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-2d-3",
      "title": "Sketch-3 (Lever Arm)",
      "description": "Parametric 2D profile with fulcrum and tolerance dimensions.",
      "category": "2d-sketch",
      "categoryLabel": "2D SKETCH",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">2D%20Sketch%20-%20Lever%20Arm</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Parametric%20Drawing</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View 2D Sketch",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">2D%20Sketch%20-%20Lever%20Arm</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Parametric%20Drawing</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-3d-1",
      "title": "Mechanical Part-1 (Shaft Coupling)",
      "description": "Detailed 3D model created in SolidWorks with keyway slots.",
      "category": "3d-modeling",
      "categoryLabel": "3D PART MODELING",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">3D%20Part%20-%20Shaft%20Coupling</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">SolidWorks%203D%20Feature</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View 3D Part Modeling",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">3D%20Part%20-%20Shaft%20Coupling</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">SolidWorks%203D%20Feature</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-3d-2",
      "title": "Mechanical Part-2 (Bearing Housing)",
      "description": "Split bearing pedestal housing with lubrication port.",
      "category": "3d-modeling",
      "categoryLabel": "3D PART MODELING",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">3D%20Part%20-%20Bearing%20Housing</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Cast%20Iron%20Pedestal</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View 3D Part Modeling",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">3D%20Part%20-%20Bearing%20Housing</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Cast%20Iron%20Pedestal</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-3d-3",
      "title": "Mechanical Part-3 (Flanged Sleeve)",
      "description": "Turned component with counterbored clearance holes.",
      "category": "3d-modeling",
      "categoryLabel": "3D PART MODELING",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">3D%20Part%20-%20Flanged%20Sleeve</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Revolved%20Feature%20Model</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View 3D Part Modeling",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">3D%20Part%20-%20Flanged%20Sleeve</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Revolved%20Feature%20Model</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-draft-1",
      "title": "Geneva Wheel Mechanism",
      "description": "Full drafting with sectional views and BOM detail.",
      "category": "drafting",
      "categoryLabel": "DRAFTING",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Drafting%20-%20Geneva%20Wheel%20Mechanism</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Complete%20Production%20Drawing</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View Drafting",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Drafting%20-%20Geneva%20Wheel%20Mechanism</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Complete%20Production%20Drawing</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-draft-2",
      "title": "Gib and Cotter Joint",
      "description": "Cotter joint with cotter taper and gib reinforcement detail.",
      "category": "drafting",
      "categoryLabel": "DRAFTING",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Drafting%20-%20Gib%20and%20Cotter%20Joint</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Machine%20Joint%20Standard</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View Drafting",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Drafting%20-%20Gib%20and%20Cotter%20Joint</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Machine%20Joint%20Standard</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-draft-3",
      "title": "Bush Bearing",
      "description": "Brass bush assembly with oil groove and housing tolerances.",
      "category": "drafting",
      "categoryLabel": "DRAFTING",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Drafting%20-%20Bush%20Bearing</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Bushing%20Tolerance%20Drawing</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View Drafting",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Drafting%20-%20Bush%20Bearing</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Bushing%20Tolerance%20Drawing</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-draft-4",
      "title": "Screw Jack",
      "description": "Square thread spindle, Tommy bar, and cup casting detail.",
      "category": "drafting",
      "categoryLabel": "DRAFTING",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Drafting%20-%20Screw%20Jack</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Lifting%20Mechanism%20Blueprint</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View Drafting",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Drafting%20-%20Screw%20Jack</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Lifting%20Mechanism%20Blueprint</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-iso-1",
      "title": "Isometric Drawing 1 (Crank Link)",
      "description": "3D isometric projection with detailed geometric annotations.",
      "category": "isometric",
      "categoryLabel": "ISOMETRIC DRAWING",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Isometric%20Drawing%201</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">30-deg%20Isometric%20View</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View Isometric Drawing",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Isometric%20Drawing%201</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">30-deg%20Isometric%20View</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-iso-2",
      "title": "Isometric Drawing 2 (V-Block Clamp)",
      "description": "Clamping fixture for cylindrical stock inspection.",
      "category": "isometric",
      "categoryLabel": "ISOMETRIC DRAWING",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Isometric%20Drawing%202</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">V-Block%20Fixture</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View Isometric Drawing",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Isometric%20Drawing%202</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">V-Block%20Fixture</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-adv-1",
      "title": "Linford Two-Stroke Engine",
      "description": "Detailed 3D engine model with complex mechanical assembly.",
      "category": "advanced-3d",
      "categoryLabel": "Part Assembly Work",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Linford%20Two-Stroke%20Engine</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Internal%20Combustion%20Assembly</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View Advanced 3D Modeling",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Linford%20Two-Stroke%20Engine</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Internal%20Combustion%20Assembly</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-adv-2",
      "title": "Vertical Steam Boiler Assembly",
      "description": "Advanced cylindrical CAD model focusing on pressure vessel fittings.",
      "category": "advanced-3d",
      "categoryLabel": "Part Assembly Work",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Vertical%20Steam%20Boiler%20Assembly</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Pressure%20Vessel%20Assembly</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View Advanced 3D Modeling",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Vertical%20Steam%20Boiler%20Assembly</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Pressure%20Vessel%20Assembly</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-adv-3",
      "title": "Horizontal Steam Boiler Assembly",
      "description": "Shell construction, flue tubes, mountings, and pressure system.",
      "category": "advanced-3d",
      "categoryLabel": "Part Assembly Work",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Horizontal%20Steam%20Boiler%20Assembly</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Industrial%20Boiler%20CAD</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View Advanced 3D Modeling",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Horizontal%20Steam%20Boiler%20Assembly</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Industrial%20Boiler%20CAD</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-ass-1",
      "title": "Assembly Drawing 1 (Plummer Block)",
      "description": "Complete assembly drawing with parts list and BOM.",
      "category": "assembly-drawing",
      "categoryLabel": "ASSEMBLY DRAWING",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Assembly%20Drawing%201</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">BOM%20%26%20Bill%20of%20Materials</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View Assembly Drawing",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Assembly%20Drawing%201</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">BOM%20%26%20Bill%20of%20Materials</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-tool-1",
      "title": "Tool & Die Design 1 (Blanking Die)",
      "description": "Precision tool and die design for sheet metal blanking operations.",
      "category": "tool-die",
      "categoryLabel": "TOOL & DIE DESIGN",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Tool%20%26%20Die%20-%20Blanking%20Die</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Punch%20%26%20Die%20Clearance</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View Tool & Die Design",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Tool%20%26%20Die%20-%20Blanking%20Die</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Punch%20%26%20Die%20Clearance</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-surf-1",
      "title": "Surface Modeling 1 (Ergonomic Handle)",
      "description": "Complex lofted and swept curvature with class-A continuity.",
      "category": "surface-design",
      "categoryLabel": "SURFACE DESIGN",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Surface%20Modeling%201</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Complex%20Lofted%20Surface</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View Surface Design",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Surface%20Modeling%201</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Complex%20Lofted%20Surface</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-sheet-1",
      "title": "Sheet Metal Design 1 (Electronic Enclosure)",
      "description": "Precision sheet metal casing with bend allowance and flat pattern.",
      "category": "sheet-metal",
      "categoryLabel": "SHEET METAL DESIGN",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Sheet%20Metal%20Design%201</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Flat%20Pattern%20%26%20Bends</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View Sheet Metal Design",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Sheet%20Metal%20Design%201</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Flat%20Pattern%20%26%20Bends</text></svg>",
      "mediaType": "image"
    },
    {
      "id": "gal-weld-1",
      "title": "Weldment Design 1 (Structural Base Frame)",
      "description": "Tubular structural frame with welded corner gussets and cut list.",
      "category": "weldment",
      "categoryLabel": "WELDMENT DESIGN",
      "badgeColor": "blue",
      "imageUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Weldment%20Design%201</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Weld%20Bead%20%26%20Structural%20Tubing</text></svg>",
      "cadLink": "https://grabcad.com/library",
      "cadLinkText": "View Weldment Design",
      "mediaUrl": "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\" fill=\"none\"><rect width=\"600\" height=\"400\" fill=\"%23f8fafc\"/><rect x=\"20\" y=\"20\" width=\"560\" height=\"360\" rx=\"8\" stroke=\"%23cbd5e1\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><circle cx=\"300\" cy=\"180\" r=\"75\" stroke=\"%230b6efd\" stroke-width=\"3\" fill=\"%23eff6ff\"/><path d=\"M225 180h150M300 105v150M247 127l106 106M247 233l106-106\" stroke=\"%230b6efd\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><circle cx=\"300\" cy=\"180\" r=\"30\" stroke=\"%230b6efd\" stroke-width=\"2\" fill=\"white\"/><text x=\"300\" y=\"310\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"%231e293b\">Weldment%20Design%201</text><text x=\"300\" y=\"335\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"%230b6efd\">Weld%20Bead%20%26%20Structural%20Tubing</text></svg>",
      "mediaType": "image"
    }
  ],
  "homeSections": {
    "expertiseBadge": "CORE EXPERTISE",
    "expertiseTitle": "Mechanical Design & Engineering",
    "expertiseSubtitle": "Precision drafting, 3D parametric modeling, and manufacturing standards",
    "projectsBadge": "PROJECT SHOWCASE",
    "projectsTitle": "ENGINEERING PROJECTS",
    "ctaBadge": "HAVE A DESIGN CHALLENGE IN MIND?",
    "ctaTitle": "Let's turn your idea into a practical engineering solution.",
    "ctaSubtitle": "Available for mechanical design projects, CAD drafting, and engineering roles.",
    "ctaBtnText": "Send Your Enquiry"
  }
};
