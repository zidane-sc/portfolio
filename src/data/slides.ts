export interface SlideData {
  id: string;
  category: string;
  categoryColor: string; // cyan, emerald, amber, purple
  title: string;
  subtitle: string;
  problem: string;
  solution: string[];
  impact: string[];
  stack: string[];
  diagramType?: 'search' | 'indeed' | 'docvault' | 'multicompany' | 'events' | 'ecosystem' | 'courtwin' | 'sanbersy';
  screenshots?: { title: string; src: string; caption?: string }[];
  links?: { label: string; url: string }[];
}

export const SLIDES: SlideData[] = [
  // Slide 1: Cover & Identity
  {
    id: 'cover',
    category: 'EXECUTIVE PROFILE',
    categoryColor: 'cyan',
    title: 'MUHAMMAD ZIDANE SC',
    subtitle: 'Software Engineer | Full Stack & Platform Architecture',
    problem: 'Modern digital businesses require engineering leaders who combine low-level systems discipline with high-velocity product delivery—architecting platforms that remain resilient under tens of millions of transactional queries without operational degradation.',
    solution: [
      '5+ years of production experience architecting full-stack web platforms, high-throughput microservices, and distributed data pipelines across Golang, TypeScript/Node.js, and PostgreSQL.',
      'Currently serving as Squad Lead (Backend) for Dealls & KantorKu Enterprise People Platform, leading technical delivery and authoring architecture specifications across cross-functional squads.',
      'Track record spanning talent search engines (Elasticsearch), asynchronous batch pipelines, pharmacy retail POS engines, industrial IoT Modbus integration, and multi-tenant SaaS.',
      'Active systems researcher and venture co-founder (Thinkedge Studio, Versamorph Studio), shipping production client software and developer tooling.'
    ],
    impact: [
      '2,000,000+ Registered Talents at Scale',
      '16,000,000+ Job Applications Processed',
      '6,000+ Active Jobs (30,000+ Total Postings)',
      'Sub-10ms Retail POS Query Execution'
    ],
    stack: ['Golang', 'TypeScript', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'Redis', 'Apache Kafka', 'Docker', 'Kubernetes'],
    links: [
      { label: 'Download Master CV (PDF)', url: '/portfolio/Muhammad-Zidane-Sc-Resume.pdf' },
      { label: 'GitHub Profile', url: 'https://github.com/zidane-sc' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/zidane-sc' },
      { label: 'Email: zidanesc02@gmail.com', url: 'mailto:zidanesc02@gmail.com' }
    ]
  },

  // Slide 2: Systems Landscape
  {
    id: 'landscape',
    category: 'SYSTEMS LANDSCAPE',
    categoryColor: 'cyan',
    title: 'Architectural Ecosystem & Track Record',
    subtitle: 'Proven multi-domain systems engineering across enterprise platforms, retail POS, industrial IoT, and client studios.',
    problem: 'Scaling diverse software architectures requires choosing the exact right consistency and concurrency models—from strict relational ACID transactions in retail billing to eventual consistency in event queues and distributed search indexing.',
    solution: [
      'Enterprise Recruitment & HRIS (Dealls & KantorKu): Core job marketplace, recruiter ATS, and workforce platform handling 2M+ talents, 16M+ applications, automated batch sync, and corporate document vault.',
      'Retail Pharmacy Microservices (Apotek Roxy): Nationwide pharmacy Point-of-Sale (POS) and healthcare reservation engine built with Golang Clean Architecture and bounded connection pooling.',
      'Industrial Hardware IoT & ERP (PT Kamiko Cipta Solusi): Real-time Modbus serial sensor telemetry, automated maintenance dispatch, interactive GIS mapping, and 20-module plant ERP.',
      'International Contracts & Client Studios (Courtwin, Sanbersy, Thinkedge, Versamorph): Overseas racket sports venue booking platform, corporate psychological assessment scoring engines, and client SaaS.'
    ],
    impact: [
      '100+ Production Features Shipped across Domains',
      'Sub-100ms P95 Search Latency Maintained',
      '100% On-Time Enterprise Handover Record',
      '16M+ Applications Ingested with Zero Record Loss'
    ],
    stack: ['Go (Clean Arch)', 'Node.js/NestJS', 'Postgres (pgxpool)', 'MongoDB', 'Elasticsearch', 'Docker', 'Kubernetes'],
    diagramType: 'ecosystem'
  },

  // Slide 3: Dealls Search Engine
  {
    id: 'search-engine',
    category: 'ENTERPRISE SEARCH AT SCALE',
    categoryColor: 'cyan',
    title: 'High-Precision Search & Synonym Pipeline',
    subtitle: 'Elasticsearch Indexing & Custom Bilingual Tokenization (Dealls Core Platform)',
    problem: 'Direct relational database search resulted in severe CPU contention, high search latency (>1,200ms), and zero recall for Indonesian/English synonym variants (e.g., matching "FE" to "Frontend Developer" or "Lead" to "Squad Lead").',
    solution: [
      'Re-architected search indexing pipeline utilizing custom bilingual (Indonesian/English) synonym tokenizers, edge n-grams, and multi-field boost weights.',
      'Built automated background exporter reconciling database role taxonomies with Elasticsearch token dictionaries in real time.',
      'Engineered weighted multi-field scoring heuristics balancing exact job title matches (3.0x), required skill vectors (2.0x), and location hierarchies (1.5x).',
      'Authored technical architecture specification and POC for matching 1.74M candidate profiles against active requisitions to eliminate database CPU bottlenecks.'
    ],
    impact: [
      'Sub-100ms P95 search latency sustained across millions of job queries',
      '99.38% HTTP availability achieved with zero 5xx server errors',
      '6,000+ active jobs (30,000+ total) instantly searchable across 2M+ talents'
    ],
    stack: ['Golang', 'Node.js', 'Elasticsearch', 'Redis', 'MongoDB', 'Docker', 'REST API'],
    diagramType: 'search'
  },

  // Slide 4: Indeed Async Ingestion
  {
    id: 'indeed-sync',
    category: 'ENTERPRISE INTEGRATION',
    categoryColor: 'cyan',
    title: 'Asynchronous ATS Ingestion & Webhook Decoupling',
    subtitle: 'High-Volume Batch Synchronization Pipeline (Indeed Apply x Dealls ATS)',
    problem: 'Synchronous ingestion of candidate applications from external job board webhooks (Indeed Apply) caused HTTP request timeouts (>8,000ms), worker thread pool starvation, and duplicate applicant profiles upon network retries.',
    solution: [
      'Decoupled synchronous ingestion webhooks from heavy deduplication queries via BullMQ background queues, returning instant HTTP 202 Accepted responses.',
      'Implemented idempotent request deduplication using unique external application reference hashes and distributed Redis locks.',
      'Built dead-letter queues (DLQ) with exponential backoff retries for transient database and third-party service downtimes.',
      'Decoupled candidate portfolio asset ingestion and resolved duplicate industry edge cases to prevent worker crashes.'
    ],
    impact: [
      '936 candidate applications processed in a single automated batch run without data loss',
      'Webhook response latency cut from >8,000ms down to <120ms',
      '100% elimination of duplicate candidate profile records across partner job boards'
    ],
    stack: ['Node.js', 'Express', 'TypeScript', 'BullMQ', 'Redis', 'MongoDB', 'Idempotent Webhooks'],
    diagramType: 'indeed'
  },

  // Slide 5: Document Library & E-Sign
  {
    id: 'document-vault',
    category: 'ENTERPRISE SAAS',
    categoryColor: 'cyan',
    title: 'Enterprise Document Vault & Digital E-Sign Engine',
    subtitle: 'Compliant Corporate Workforce Records & Audit Trails (KantorKu & Dealls)',
    problem: 'Enterprise corporate clients required a centralized, tamper-evident corporate document library supporting role-based access control (RBAC), multi-subsidiary authorization, and mobile document streaming without client-side HTTP 415 crashes.',
    solution: [
      'Architected centralized document management microservice in Go featuring recursive hierarchical folder queries and symmetric ACL permission checks.',
      'Eliminated mobile streaming crashes across iOS/Android by standardizing error contract payloads (UNSUPPORTED_PREVIEW_TYPE) and decoupling direct download endpoints from streaming previews.',
      'Authored technical architecture specification and database schemas for digital E-Sign integration with tamper-evident audit trail logging (signer IP, cryptographic hash, timestamp).',
      'Assumed technical ownership as Lead Backend, stabilizing service runbooks and resolving 19 outstanding defect backlogs across enterprise repositories.'
    ],
    impact: [
      '100% elimination of mobile document streaming crashes (HTTP 415)',
      'Adopted by corporate holding groups managing thousands of active employee records',
      'Zero-downtime service handover signed off by Lead QA and Engineering Manager'
    ],
    stack: ['Golang Clean Architecture', 'PostgreSQL', 'MinIO / AWS S3', 'Fiber v2', 'Docker'],
    diagramType: 'docvault'
  },

  // Slide 6: Multi-Company Architecture
  {
    id: 'multi-company',
    category: 'ENTERPRISE SAAS',
    categoryColor: 'cyan',
    title: 'Multi-Company Context Switching & Taxonomy Sync',
    subtitle: 'Gateway Forward-Auth Tenant Isolation (Dealls Enterprise & KantorKu)',
    problem: 'Large enterprise holding groups (Sewu, Ibunda) needed to manage multiple distinct legal subsidiaries from a single master dashboard without cross-tenant data leakage or requiring recruiters to maintain multiple login credentials.',
    solution: [
      'Engineered forward-auth tenant context switching via injected contextual headers (X-Company-ID) at the gateway layer.',
      'Designed tenant-isolated relational database schemas ensuring multi-level RBAC where admins hold granular permissions across multiple legal entities.',
      'Authored technical analysis and schema design for cross-platform data synchronization between ATS and HRIS, standardizing job role taxonomies and candidate-to-employee onboarding pipelines.'
    ],
    impact: [
      'Dozens of subsidiaries administered seamlessly from a single unified portal',
      '100% tenant data isolation guaranteed across recruitment and workforce suites',
      'Zero manual re-entry from hired applicant profile to active HRIS employee record'
    ],
    stack: ['Golang', 'Node.js', 'Forward-Auth Gateway', 'PostgreSQL', 'MongoDB', 'Redis'],
    diagramType: 'multicompany'
  },

  // Slide 7: High-Concurrency Events & Payment
  {
    id: 'events-payments',
    category: 'FINANCIAL PLATFORMS',
    categoryColor: 'cyan',
    title: 'High-Concurrency Event Engines & Payment Routing',
    subtitle: 'National Competition Platforms & Midtrans Multi-Gateway (SejutaCita Platforms)',
    problem: 'National competition platforms (SejutaCita Future Leaders, IHBS) suffered database deadlocks and checkout drop-offs during massive tryout and ticketing registration traffic spikes.',
    solution: [
      'Decoupled high-concurrency event registration and online quiz scoring from monolithic databases into dedicated, tuned PostgreSQL relational schemas.',
      'Architected foundational multi-account payment gateway routing (ms-payment-gateway) supporting dynamic routing across independent merchant accounts and payment methods (QRIS, VA, e-wallets).',
      'Built automated invoice cancellation timers, payment expiration state machines, and reconciliation webhooks with cryptographic signature verification.',
      'Automated real-time Google Sheets synchronization workers and QR ticketing for national summit attendees.'
    ],
    impact: [
      'Tens of thousands of concurrent participants handled during timed quiz bursts',
      'Hundreds of millions of rupiah processed with zero overpayment discrepancies',
      'Zero checkout deadlocks via automated invoice expiration state machines'
    ],
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Midtrans SDK', 'Redis', 'BullMQ'],
    diagramType: 'events'
  },

  // Slide 8: Apotek Roxy POS & OMS
  {
    id: 'roxy-pos-oms',
    category: 'RETAIL & INVENTORY',
    categoryColor: 'emerald',
    title: 'Point-of-Sale (POS) Engine & Atomic Deductions',
    subtitle: 'Retail Pharmacy Microservices & Booking Engine (Apotek Roxy Ecosystem)',
    problem: 'Pharmacy retail checkout terminals required sub-second billing, dynamic discount rules, and zero-risk inventory deductions across multiple counter terminals without stock overselling or race conditions.',
    solution: [
      'Architected pharmacy POS backend strictly following Golang Clean Architecture, cleanly separating domain logic, usecases, and repository adapters; built cashier UI in React.',
      'Implemented atomic database transactions utilizing bounded PostgreSQL connection pooling (pgxpool) and row-level locking (SELECT ... FOR UPDATE) during cart checkout.',
      'Developed full-stack Order Management System (OMS) appointment reservation module in Go and React, introducing concurrent time-slot locking for clinical services.',
      'Designed enterprise E-Procurement platform in Go and PostgreSQL for multi-branch pharmacy asset lifecycle and depreciation tracking.'
    ],
    impact: [
      'Sub-10ms P95 query latency sustained on retail pharmacy checkout counters',
      '100% stock reconciliation accuracy across multi-terminal retail stores',
      '1,000+ merge requests transitioned to self-hosted enterprise infrastructure'
    ],
    stack: ['Golang Clean Architecture', 'PostgreSQL (pgx)', 'React', 'Redis', 'Docker'],
    screenshots: [
      { title: 'Pharmacy Retail Checkout', src: '/portfolio/assets/kamiko/erp.jpg', caption: 'Point-of-Sale billing with atomic stock ledgering' }
    ]
  },

  // Slide 9: Courtwin Platform (International Contract)
  {
    id: 'courtwin-platform',
    category: 'INTERNATIONAL CONTRACT',
    categoryColor: 'cyan',
    title: 'Multi-Venue Sports Reservation & Real-Time Engine',
    subtitle: 'Courtwin Platform — All-in-One Padel & Tennis Platform (Singapore / Overseas Client)',
    problem: 'Overseas racket sports clubs needed an all-in-one platform handling dynamic multi-court booking, clubhouse point-of-sale, tournament brackets, and real-time player messaging across timezones and currencies without double bookings.',
    solution: [
      'Delivered end-to-end backend in TypeScript and Go as part of a 3-engineer core squad (collaborating with Kang Agung and Kang Deny).',
      'Architected the court reservation engine supporting single/double match bookings with timezone-aware conflict-locking mechanisms preventing overlapping reservations.',
      'Built clubhouse Point-of-Sale backend, cash drawer session tracking, and automated payment gateway webhooks.',
      'Engineered tournament draw algorithms automating single-elimination and round-robin player bracket generation.',
      'Developed bidirectional real-time in-app chat utilizing WebSockets with connection tracking, heartbeat verification, and paginated message history.'
    ],
    impact: [
      'Delivered production platform for overseas racket sports clubs across 10 repositories',
      'Zero double-bookings achieved through timezone-aware reservation locking',
      'Real-time WebSocket chat supporting instant player-coach messaging'
    ],
    stack: ['Golang', 'TypeScript', 'Node.js', 'WebSockets (ws)', 'PostgreSQL', 'Payment Gateways'],
    diagramType: 'courtwin'
  },

  // Slide 10: Sanbersy Freelance Client Engagements
  {
    id: 'sanbersy-freelance',
    category: 'FREELANCE CLIENT ENGAGEMENTS',
    categoryColor: 'purple',
    title: 'Psychometric Assessment Engine & Enterprise Mini ERP',
    subtitle: 'Sanbersy Client Engagements — Asesmen Online PKS DS & Operations',
    problem: 'Psychological assessment platforms required 100% accurate mathematical scoring and evaluation reporting across complex multi-question psychometric tests without data corruption.',
    solution: [
      'Asesmen Online PKS DS: Developed online psychological evaluation platform using Laravel and MySQL; engineered automated scoring and reporting algorithms for PAPI Kostik psychometric assessments.',
      'Hardened psychometric question evaluation logic and designed specialized database debugging schemas to trace participant score calculations (GitLab MRs !69, !70, !73).',
      'Implemented granular role-based access control (RBAC) separating test participants, psychometric evaluators, and corporate client administrators.',
      'Enterprise Mini ERP: Engineered operational inventory, ordering, and accounting modules for corporate client business workflows.'
    ],
    impact: [
      '100% accurate PAPI Kostik evaluation and automated psychological report generation',
      'Delivered 2 commercial client systems on schedule and verified via GitLab MRs',
      'Zero scoring regression under concurrent corporate participant assessment sessions'
    ],
    stack: ['PHP (Laravel)', 'MySQL', 'REST APIs', 'GitLab CI', 'Psychometric Scoring Algorithms'],
    diagramType: 'sanbersy'
  },

  // Slide 11: Decotatoo Enterprise ERP (Kamiko)
  {
    id: 'kamiko-decotatoo-erp',
    category: 'ENTERPRISE OPERATIONS',
    categoryColor: 'amber',
    title: 'Manufacturing Enterprise ERP Suite (Decotatoo)',
    subtitle: '20-Module Industrial Plant Operations & Supply Chain ERP (PT Kamiko Cipta Solusi)',
    problem: 'Industrial manufacturing facilities operated fragmented paper-based processes across production recipes, inventory replenishment, human resources, and WooCommerce e-commerce ordering.',
    solution: [
      'Engineered comprehensive 20-module enterprise ERP platform using Laravel and PostgreSQL, replacing legacy native PHP scripts.',
      'Built core operational modules: Company, Human Resource, Task Management, Document Management, Engineering, and Finance.',
      'Developed complete supply chain and production workflows: Purchasing Orders, Supplier Management, Inventory Tracking, Sales Orders, Color Management, and Packing Management.',
      'Architected advanced manufacturing modules: Production Process pipelines, Recipe Management, and Roboqbo Industrial Production System integration.',
      'Integrated WooCommerce and WordPress synchronization for automated e-commerce order ingestion and invoice printing.'
    ],
    impact: [
      'Unified 20 business modules into a single central enterprise plant management platform',
      'Eliminated manual paper tracking across industrial production, recipes, and warehouse orders',
      'Secure enterprise access enforced via custom CAPTCHA, RBAC, and print engine integration'
    ],
    stack: ['PHP (Laravel)', 'PostgreSQL', 'WordPress/WooCommerce API', 'Chart.js', 'HTML5/CSS3'],
    screenshots: [
      { title: 'Decotatoo 20-Module Launcher', src: '/portfolio/assets/kamiko/erp.jpg', caption: 'Full-stack manufacturing ERP with 20 business modules and secure CAPTCHA auth' }
    ]
  },

  // Slide 12: Kamiko Industrial IoT, JaGain & Facilities
  {
    id: 'kamiko-iot-facilities',
    category: 'HARDWARE & INDUSTRIAL IOT',
    categoryColor: 'amber',
    title: 'Industrial IoT Power Telemetry, Asset Management & GIS',
    subtitle: 'Hardware Modbus Ingestion, Predictive Maintenance & CCTV Mapping (PT Kamiko Cipta Solusi)',
    problem: 'Manufacturing plants lacked real-time visibility into machine power consumption, automated equipment maintenance schedules, and centralized physical asset tracking.',
    solution: [
      'Power & Billing Monitoring (Kamiko Plant): Built telemetry ingestion services in Node.js reading raw Modbus serial sensor packets from plant power meters; calculated live Current (A), Voltage (363V), Energy (kWh), and CosPhi.',
      'JaGain Asset Management: Developed enterprise asset tracking and preventive maintenance platform with work order statistics (Chart.js), hierarchical asset trees (90 assets, 38 maintenances), and Bill of Materials (BOM).',
      'Automated Work-Orders: Built automated maintenance work-order generation using node-cron schedulers.',
      'NAVR CCTV GIS Monitoring: Broadcasted live machine coordinates and camera streams to interactive Leaflet GIS map dashboards via WebSockets.'
    ],
    impact: [
      'Monitored 90+ industrial physical assets and live electrical power meters at Kamiko Plant',
      'Automated preventive maintenance work orders, eliminating manual inspection delays',
      'Real-time 363V plant telemetry visualized with time-series historical consumption trends'
    ],
    stack: ['Node.js', 'Laravel', 'PostgreSQL', 'Modbus Serial', 'WebSockets', 'Leaflet GIS', 'Chart.js'],
    screenshots: [
      { title: 'Power Meter Telemetry', src: '/portfolio/assets/kamiko/power-meter.jpg', caption: 'Live electrical telemetry (363V, Current, Power) and time-series trending' },
      { title: 'JaGain Asset Management', src: '/portfolio/assets/kamiko/jagain.jpg', caption: 'Plant asset hierarchy, maintenance schedules, and work order tracking' },
      { title: 'NAVR CCTV GIS Mapping', src: '/portfolio/assets/kamiko/navr-cctv.jpg', caption: 'Interactive Leaflet GIS map displaying real-time camera nodes' }
    ]
  },

  // Slide 13: Thinkedge Studio
  {
    id: 'thinkedge-studio',
    category: 'COMMERCIAL VENTURE STUDIO',
    categoryColor: 'purple',
    title: 'Thinkedge Studio — Production Client Suite',
    subtitle: 'Commercial Digital Engineering Agency (Co-Founded with Sahri)',
    problem: 'Independent commercial businesses needed modern, responsive operational software tailored to their exact workflows without the bloat, licensing costs, and rigidity of generic off-the-shelf software.',
    solution: [
      'Co-founded independent technical agency with Sahri delivering production software for verified paying clients.',
      'Bank Sampah Platform: Built community waste recycling management ledger recording resident waste deposits, weight categories, automated price calculation, and member cash payout balances.',
      'Aromas Catalog Showcase: Developed high-conversion mobile-first brand showcase and catalog exploration portal with WhatsApp order routing.',
      'Ocean Dental Management Suite: Engineered multi-clinic dental management portal handling patient medical records, treatment histories, and dentist schedule coordination.'
    ],
    impact: [
      'Delivered 3 custom commercial platforms currently operating for paying businesses',
      'Engineered responsive mobile-first UIs deployed on zero-maintenance serverless infrastructure',
      'Full ownership lifecycle: From initial client requirements to database schema design and production hosting'
    ],
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Vercel', 'Supabase'],
    screenshots: [
      { title: 'Commercial Client Solutions', src: '/portfolio/assets/kamiko/jagain.jpg', caption: 'Operational ledgers and client portals deployed in production' }
    ]
  },

  // Slide 14: Versamorph Studio
  {
    id: 'versamorph-studio',
    category: 'SYSTEMS & MEDIA R&D',
    categoryColor: 'purple',
    title: 'Computer Architecture Demos & Live-Streaming R&D',
    subtitle: '32-Bit MIPS Processor Demonstration & StreamDonate Platform (Versamorph Studio)',
    problem: 'Creating intuitive web-based visualizers for low-level computer architecture concepts, and engineering ultra-low-latency real-time overlay notifications for live-streaming creators.',
    solution: [
      'MIPS 32-Bit Instruction Simulator: Engineered interactive web demo modeling 32-bit MIPS assembly execution, ALU operations, register file states, and basic pipeline stage flows.',
      'StreamDonate Engine: Enhanced live-streaming donation overlay platform supporting real-time OBS browser alerts using Server-Sent Events (SSE) and Web Audio API synthesized sound themes.',
      'Implemented queueing mechanisms to prevent live alert collisions and built customizable browser source widgets.'
    ],
    impact: [
      'Interactive 32-bit assembly simulation visualizing register states and memory maps in browser',
      'Sub-100ms OBS overlay alerts streaming real-time donation notifications via Server-Sent Events',
      'Clean zero-lag media synthesis utilizing native browser Web Audio APIs'
    ],
    stack: ['Next.js', 'TypeScript', 'Server-Sent Events (SSE)', 'Web Audio API', 'Canvas API'],
    screenshots: [
      { title: 'Computer Architecture & Media Demos', src: '/portfolio/assets/kamiko/navr-cctv.jpg', caption: 'Interactive browser simulator and real-time streaming tools' }
    ]
  },

  // Slide 15: Real-Time Multiplayer Games & AI Tooling
  {
    id: 'multiplayer-ai',
    category: 'REAL-TIME PROTOCOLS & AI',
    categoryColor: 'cyan',
    title: 'Server-Authoritative Multiplayer Engines & Agentic Tooling',
    subtitle: 'Live WebSockets State Arbitration & Model Context Protocol (Personal Systems R&D)',
    problem: 'Browser-based multiplayer games and autonomous task tracking platforms require zero-latency state synchronization across concurrent clients without desyncs or client-side manipulation.',
    solution: [
      'Built server-authoritative multiplayer engines utilizing WebSockets (ws, Socket.io) in Node.js, enforcing server-side state arbitration, room matchmaking, and canvas rendering (SOS Online & Dual Blast).',
      'Developed Tebak Lagu audio trivia application featuring Web Audio API synthesized buzzers and low-latency multiplayer rooms.',
      'Engineered Atlas RPG task manager with custom Model Context Protocol (MCP) server integration, allowing autonomous AI agents (Hermes) to stream live progress telemetry directly into Kanban cards.'
    ],
    impact: [
      'Live playable applications deployed on public cloud infrastructure supporting real-time concurrent multiplayer sessions',
      'Custom Model Context Protocol (MCP) server actively powering real-world AI engineering workflows and live task logging',
      'Server-authoritative game state preventing client-side desyncs across live multiplayer rooms'
    ],
    stack: ['Next.js', 'Node.js', 'WebSockets', 'Web Audio API', 'Prisma', 'Model Context Protocol (MCP)'],
    links: [
      { label: 'Atlas RPG Platform', url: 'https://atlas-rpg.fly.dev' }
    ]
  },

  // Slide 16: Closing & Master CV Download
  {
    id: 'closing',
    category: 'COLLABORATION GATEWAY',
    categoryColor: 'cyan',
    title: "Let's Build Resilient Systems Together",
    subtitle: 'Available for Global Remote Senior/Staff Backend Roles & Specialized Architecture Consulting',
    problem: 'Looking for a seasoned Senior Engineer who bridges high-scale systems architecture with rapid product delivery and full operational ownership?',
    solution: [
      'Proven at Enterprise Scale: 2,000,000+ talents, 16,000,000+ job applications, 6,000+ active jobs searched in sub-100ms P95, sub-10ms retail POS transactions.',
      'Full Ownership Mindset: From architectural technical specifications and relational database schemas to clean code implementation, observability, and RCA.',
      'High-Velocity Delivery: 100+ production features shipped across recruiter ATS, enterprise HRIS, retail POS, industrial IoT, and event platforms.'
    ],
    impact: [
      'Squad Lead (Backend) at YC W22 Backed Platform',
      '5+ Years Proven Production Experience across Go, TypeScript & Postgres',
      'Official Google Cloud Recognition: Student Mentor Certificate of Appreciation'
    ],
    stack: ['Golang', 'TypeScript', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'Redis', 'Apache Kafka', 'Docker', 'Kubernetes'],
    links: [
      { label: 'Download Master CV (PDF)', url: '/portfolio/Muhammad-Zidane-Sc-Resume.pdf' },
      { label: 'Connect on LinkedIn', url: 'https://www.linkedin.com/in/zidane-sc' },
      { label: 'Explore GitHub Repositories', url: 'https://github.com/zidane-sc' },
      { label: 'Email: zidanesc02@gmail.com', url: 'mailto:zidanesc02@gmail.com' }
    ]
  }
];
