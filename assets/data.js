/* Generated from the live KroomBase database - do not hand-edit.
   Regenerate with: python tools/generate_data.py */
window.PORTFOLIO = {
  "profile": {
    "fullName": "Muhammad Ariansyah Fajar Saputra",
    "nim": "607012500067",
    "classGroup": "49-03",
    "program": "D3 Sistem Informasi",
    "headline": "Information systems student working across databases, networks and small applications.",
    "bio": "Coursework-driven portfolio: relational schema design and SQL on the data side, multi-router network assessment on the infrastructure side, plus Java and Kotlin programs from algorithm coursework.",
    "location": "Indonesia",
    "email": "you@example.com",
    "githubUrl": "https://github.com/your-username",
    "linkedinUrl": null,
    "placeholders": true
  },
  "skillGroups": [
    {
      "name": "Programming Languages",
      "skills": [
        {
          "name": "Java",
          "proficiency": 4
        },
        {
          "name": "Kotlin",
          "proficiency": 3
        },
        {
          "name": "HTML & CSS",
          "proficiency": 3
        },
        {
          "name": "SQL",
          "proficiency": 4
        }
      ]
    },
    {
      "name": "Databases",
      "skills": [
        {
          "name": "Relational Modeling",
          "proficiency": 4
        },
        {
          "name": "PostgreSQL",
          "proficiency": 3
        },
        {
          "name": "Oracle SQL",
          "proficiency": 3
        },
        {
          "name": "Joins & Set Operators",
          "proficiency": 4
        }
      ]
    },
    {
      "name": "Networking",
      "skills": [
        {
          "name": "Cisco Packet Tracer",
          "proficiency": 4
        },
        {
          "name": "Routing & Switching",
          "proficiency": 3
        },
        {
          "name": "Network Troubleshooting",
          "proficiency": 3
        }
      ]
    },
    {
      "name": "Data & Office Tools",
      "skills": [
        {
          "name": "Spreadsheet Reporting",
          "proficiency": 4
        },
        {
          "name": "Excel Data Analysis",
          "proficiency": 3
        },
        {
          "name": "Technical Writing",
          "proficiency": 4
        }
      ]
    },
    {
      "name": "Design & Analysis",
      "skills": [
        {
          "name": "System Analysis",
          "proficiency": 3
        },
        {
          "name": "UI Prototyping",
          "proficiency": 3
        }
      ]
    },
    {
      "name": "Mathematics",
      "skills": [
        {
          "name": "Graph Theory",
          "proficiency": 3
        },
        {
          "name": "Discrete Mathematics",
          "proficiency": 3
        },
        {
          "name": "Applied Statistics",
          "proficiency": 3
        }
      ]
    }
  ],
  "projects": [
    {
      "id": 1,
      "slug": "hr-database-schema",
      "title": "HR Database Schema and Queries",
      "summary": "A relational HR schema built from scratch with DDL, populated with sample records, then queried with joins and aggregation.",
      "body": "Defined the entity set for an HR domain (employees, departments, jobs, locations), wrote the CREATE TABLE script, loaded sample rows through a separate insert script, and documented the relationships in an entity diagram.",
      "course": "Basis Data I",
      "role": "Schema designer and query author",
      "status": "done",
      "featured": true,
      "skills": [
        "Relational Modeling",
        "PostgreSQL",
        "Technical Writing",
        "SQL"
      ],
      "media": [
        {
          "kind": "code",
          "url": "E:/tolkem/Semester2/BasisData/Create_HR.sql",
          "caption": "DDL script for the HR schema"
        },
        {
          "kind": "code",
          "url": "E:/tolkem/Semester2/BasisData/Input_HR.sql",
          "caption": "Sample data load script"
        },
        {
          "kind": "diagram",
          "url": "E:/tolkem/Semester2/BasisData/Hungy.drawio",
          "caption": "Entity relationship diagram source"
        }
      ]
    },
    {
      "id": 2,
      "slug": "sql-join-analysis",
      "title": "SQL JOIN Query Set",
      "summary": "A DQL exercise set covering inner and outer joins, set operators and aggregate queries against a populated sample schema.",
      "body": "Worked through a graded JOIN question set, including multi-table joins and grouped aggregate output.",
      "course": "Basis Data I",
      "role": "Query author",
      "status": "done",
      "featured": true,
      "skills": [
        "SQL",
        "Joins & Set Operators"
      ],
      "media": [
        {
          "kind": "document",
          "url": "E:/tolkem/Semester2/BasisData/607012500067_Muhammad Ariansyah FS_TugasSQL_JOIN01.pdf",
          "caption": "Graded JOIN exercise set"
        }
      ]
    },
    {
      "id": 3,
      "slug": "oracle-oe-schema",
      "title": "Oracle OE Schema Query Work",
      "summary": "Query work against the Oracle Order Entry sample schema: outer joins, set operators and analytical reporting queries.",
      "body": "Imported the Oracle OE schema and answered a series of reporting questions using outer joins, set operators and analytic functions.",
      "course": "Basis Data II",
      "role": "Query author",
      "status": "done",
      "featured": true,
      "skills": [
        "Oracle SQL",
        "Joins & Set Operators"
      ],
      "media": [
        {
          "kind": "document",
          "url": "E:/tolkem/Semester3/BasDat2/TA2_607012500067_Muhammad Ariansyah FS_4903.pdf",
          "caption": "Query assignment write-up"
        },
        {
          "kind": "document",
          "url": "E:/tolkem/Semester3/BasDat2/TP_607012500067_Muhammad Ariansyah FS_4903.pdf",
          "caption": "Supporting report"
        }
      ]
    },
    {
      "id": 4,
      "slug": "recursive-algorithm-study-case",
      "title": "Recursive Algorithm Study Case",
      "summary": "A recursion study case implemented twice - once as a Java program and once as a Kotlin script - with the execution trace written up.",
      "body": "Chose a recursive formulation, implemented it in Java, ported it to Kotlin and compiled it, then documented the call stack behaviour and results.",
      "course": "Algoritma dan Pemrograman",
      "role": "Implementer",
      "status": "done",
      "featured": true,
      "skills": [
        "Java",
        "Kotlin",
        "Technical Writing"
      ],
      "media": [
        {
          "kind": "code",
          "url": "E:/tolkem/Cheva/StudyCase/TArekursif.java",
          "caption": "Java recursion implementation"
        },
        {
          "kind": "code",
          "url": "E:/tolkem/Cheva/StudyCase/studycase.kt",
          "caption": "Kotlin port of the same case"
        },
        {
          "kind": "document",
          "url": "E:/tolkem/Cheva/StudyCase/StudyCaseAri.pdf",
          "caption": "Study case write-up"
        }
      ]
    },
    {
      "id": 5,
      "slug": "campus-network-assessment",
      "title": "Multi-Router Network Assessment",
      "summary": "A Packet Tracer assessment topology spanning three routers and multiple client networks, verified link by link.",
      "body": "Built the topology, configured addressing and routing between three routers across two cities, then captured per-link verification evidence for router-to-router and router-to-PC paths.",
      "course": "Jaringan Komputer",
      "role": "Network designer",
      "status": "done",
      "featured": true,
      "skills": [
        "Cisco Packet Tracer",
        "Routing & Switching",
        "Network Troubleshooting"
      ],
      "media": [
        {
          "kind": "diagram",
          "url": "E:/tolkem/JarKom/Asesmen2/ROUTERJKT1-ROUTERJKT2.png",
          "caption": "Router-to-router verification"
        },
        {
          "kind": "diagram",
          "url": "E:/tolkem/JarKom/Asesmen2/ROUTERBDG-PC.png",
          "caption": "Router-to-PC verification"
        },
        {
          "kind": "diagram",
          "url": "E:/tolkem/JarKom/Asesmen2/asesmen2_Muhammad_Ariansyah_FS.pkt",
          "caption": "Packet Tracer topology file"
        }
      ]
    },
    {
      "id": 6,
      "slug": "travel-route-shortest-path",
      "title": "Shortest Route Across Bali Tourism Points",
      "summary": "Modelled 20 tourism points as a weighted graph and solved the shortest route using a matrix-based method.",
      "body": "Collected 20 tourism locations, represented them as a weighted undirected graph, and applied a tabular shortest-path method, documenting each iteration.",
      "course": "Matematika Diskrit",
      "role": "Modeller",
      "status": "done",
      "featured": true,
      "skills": [
        "Graph Theory",
        "Excel Data Analysis",
        "Discrete Mathematics"
      ],
      "media": [
        {
          "kind": "document",
          "url": "E:/tolkem/MATDIS/Matdis_ShortRoute.pdf",
          "caption": "Shortest route solution"
        },
        {
          "kind": "document",
          "url": "E:/tolkem/MATDIS/Peta Wisata German.xlsx",
          "caption": "Tourism point dataset"
        }
      ]
    },
    {
      "id": 7,
      "slug": "student-grade-reporting",
      "title": "Student Grade Reporting Workbook",
      "summary": "A spreadsheet workbook that compiles student scores, applies weighted assessment and produces printable grade reports.",
      "body": "Structured raw scores into a calculated assessment model, applied formulas for weighting and ranking, and produced a printable report view.",
      "course": "Pengantar Teknologi Informasi",
      "role": "Workbook author",
      "status": "done",
      "featured": false,
      "skills": [
        "Spreadsheet Reporting",
        "Technical Writing"
      ],
      "media": [
        {
          "kind": "document",
          "url": "E:/tolkem/PTI/Laporan Nilai Siswa - PTI.xlsx",
          "caption": "Grade reporting workbook"
        }
      ]
    },
    {
      "id": 8,
      "slug": "descriptive-statistics-quiz",
      "title": "Descriptive Analysis of a Patient Dataset",
      "summary": "Cleaned a patient dataset and produced descriptive statistical summaries with supporting charts.",
      "body": "Handled missing and inconsistent values, then produced measures of central tendency, spread and distribution summaries.",
      "course": "Statistika Terapan",
      "role": "Analyst",
      "status": "done",
      "featured": false,
      "skills": [
        "Excel Data Analysis",
        "Applied Statistics"
      ],
      "media": [
        {
          "kind": "document",
          "url": "E:/tolkem/Semester3/analisis/QUIS1_607012500067_Muhammad Ariansyah FS.xlsx",
          "caption": "Statistics quiz workbook"
        }
      ]
    },
    {
      "id": 9,
      "slug": "chardes-ui-prototype",
      "title": "Character Design App Prototype",
      "summary": "Requirements analysis and interface prototype for a character-design application, covering primary screens and user flows.",
      "body": "Wrote the system analysis, defined the main use cases and produced a clickable-quality prototype of the primary screens.",
      "course": "Analisis dan Perancangan Sistem",
      "role": "Analyst and prototyper",
      "status": "done",
      "featured": false,
      "skills": [
        "System Analysis",
        "UI Prototyping"
      ],
      "media": [
        {
          "kind": "document",
          "url": "E:/tolkem/Prototype CharDes.pdf",
          "caption": "Prototype document"
        }
      ]
    },
    {
      "id": 10,
      "slug": "android-kotlin-study-case",
      "title": "Android Study Case in Kotlin",
      "summary": "A Kotlin study case compiled to a runnable artifact and documented with result captures.",
      "body": "Implemented the study case in Kotlin, compiled it with kotlinc and documented the outcome with screenshots.",
      "course": "Pemrograman Kotlin dan Android",
      "role": "Implementer",
      "status": "done",
      "featured": false,
      "skills": [
        "Kotlin"
      ],
      "media": [
        {
          "kind": "code",
          "url": "E:/tolkem/Cheva/StudyCase/studycase.kt",
          "caption": "Kotlin source"
        },
        {
          "kind": "image",
          "url": "E:/tolkem/Cheva/HasilStudyCase.png",
          "caption": "Result capture"
        }
      ]
    },
    {
      "id": 11,
      "slug": "competitive-programming-practice",
      "title": "Competitive Programming Practice Solutions",
      "summary": "Practice solutions for algorithmic problems, including a custom sequence-ordering task.",
      "body": "Solved practice problems in Java, focusing on array manipulation and ordering logic, with the solutions kept alongside scratch tests.",
      "course": "Competitive Programming",
      "role": "Problem solver",
      "status": "done",
      "featured": false,
      "skills": [
        "Java"
      ],
      "media": [
        {
          "kind": "code",
          "url": "E:/tolkem/Competitive Programming/UrutanAneh.java",
          "caption": "Sequence-ordering solution"
        }
      ]
    },
    {
      "id": 12,
      "slug": "network-topology-simulation",
      "title": "Network Topology Simulation Lab",
      "summary": "Simulation lab covering device configuration and connectivity exercises across guided Packet Tracer scenarios.",
      "body": "Completed guided configuration scenarios covering device setup and connectivity testing.",
      "course": "Jaringan Komputer",
      "role": "Student",
      "status": "done",
      "featured": false,
      "skills": [
        "Cisco Packet Tracer"
      ],
      "media": [
        {
          "kind": "document",
          "url": "E:/tolkem/JarKom/6070120500067_Muhammad Ariansyah Fajar Saputra_49-03_Jarkom.docx",
          "caption": "Lab report"
        }
      ]
    }
  ],
  "courses": [
    {
      "code": "ALPRO",
      "name": "Algoritma dan Pemrograman",
      "summary": "Java fundamentals, control flow and recursion."
    },
    {
      "code": "APSI",
      "name": "Analisis dan Perancangan Sistem",
      "summary": "Systems analysis and interface prototyping."
    },
    {
      "code": "BASDAT1",
      "name": "Basis Data I",
      "summary": "Relational model, DDL/DML and JOIN queries."
    },
    {
      "code": "BASDAT2",
      "name": "Basis Data II",
      "summary": "Outer joins, set operators and the Oracle OE schema."
    },
    {
      "code": "CHEVA",
      "name": "Pemrograman Kotlin dan Android",
      "summary": "Kotlin study case compiled to a runnable artifact."
    },
    {
      "code": "CP",
      "name": "Competitive Programming",
      "summary": "Algorithmic problem practice and solution write-ups."
    },
    {
      "code": "JARKOM",
      "name": "Jaringan Komputer",
      "summary": "Packet Tracer topologies and routing configuration."
    },
    {
      "code": "MATDIS",
      "name": "Matematika Diskrit",
      "summary": "Graph modelling, short paths and discrete structures."
    },
    {
      "code": "PTI",
      "name": "Pengantar Teknologi Informasi",
      "summary": "Office productivity and spreadsheet reporting work."
    },
    {
      "code": "STAT",
      "name": "Statistika Terapan",
      "summary": "Applied descriptive statistics."
    }
  ],
  "certificates": [
    {
      "title": "",
      "issuer": "",
      "issued": "",
      "credentialId": "",
      "url": "",
      "skills": [],
      "image": "",
      "highlight": true
    },
    {
      "title": "",
      "issuer": "",
      "issued": "",
      "credentialId": "",
      "url": "",
      "skills": [],
      "image": ""
    },
    {
      "title": "",
      "issuer": "",
      "issued": "",
      "credentialId": "",
      "url": "",
      "skills": [],
      "image": ""
    },
    {
      "title": "",
      "issuer": "",
      "issued": "",
      "credentialId": "",
      "url": "",
      "skills": [],
      "image": ""
    },
    {
      "title": "",
      "issuer": "",
      "issued": "",
      "credentialId": "",
      "url": "",
      "skills": [],
      "image": ""
    },
    {
      "title": "",
      "issuer": "",
      "issued": "",
      "credentialId": "",
      "url": "",
      "skills": [],
      "image": ""
    }
  ],
  "counts": {
    "projects": 12,
    "featured": 6,
    "skills": 19,
    "courses": 10,
    "artifacts": 21,
    "certificates": 0,
    "certificateSlots": 6
  }
};
