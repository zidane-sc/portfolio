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
  diagramType?: 'search' | 'indeed' | 'docvault' | 'multicompany' | 'events' | 'ecosystem';
  screenshots?: { title: string; src: string; caption?: string }[];
  links?: { label: string; url: string }[];
}

export const SLIDES: SlideData[] = [
  // Slide 1: Cover
  {
    id: 'cover',
    category: 'EXECUTIVE PROFILE',
    categoryColor: 'cyan',
    title: 'MUHAMMAD ZIDANE SC',
    subtitle: 'Software Engineer | Full Stack & Platform Architecture',
    problem: 'Engineering scalable backend services, event-driven distributed platforms, and high-precision search engines designed for continuous high throughput.',
    solution: [
      '5+ years of production experience delivering 100+ scalable features across Southeast Asia.',
      'Currently Squad Lead (Backend) at Dealls (YC W22) & KantorKu Enterprise People Platform.',
      'Proven expertise spanning Golang Clean Architecture, TypeScript/Node.js microservices, PostgreSQL query profiling, and distributed Redis/Kafka queues.',
      'Active builder across commercial studio ventures (Thinkedge, Versamorph) and open-source systems.'
    ],
    impact: [
      '1.74M Talents Matched at Scale',
      'Sub-100ms P95 Search Latency',
      '936 Batch Automated Ingestion',
      'Sub-10ms Retail POS Transactions'
    ],
    stack: ['Golang', 'TypeScript', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'Redis', 'Kafka', 'Docker'],
    links: [
      { label: 'GitHub Profile', url: 'https://github.com/zidane-sc' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/zidane-sc' },
      { label: 'Email Me', url: 'mailto:zidanesc02@gmail.com' }
    ]
  },

  // Slide 2: Systems Landscape
  {
    id: 'landscape',
    category: 'SYSTEMS LANDSCAPE',
    categoryColor: 'cyan',
    title: 'Architectural Ecosystem & Track Record',
    subtitle: 'Cross-industry systems delivery across enterprise, retail, industrial IoT, and client studios.',
    problem: 'Modern applications require domain-specific architectural compromises—balancing strict ACID transactional consistency, low-latency search retrieval, and high-concurrency event ingestion.',
    solution: [
      'Enterprise Platforms (Dealls & KantorKu): B2C Job Marketplace & ATS suite serving millions of search queries, automated batch ingestion, and corporate document vault.',
      'Retail Microservices (Apotek Roxy): Core pharmacy Point-of-Sale (POS) and multi-branch booking engine with atomic inventory deductions and bounded connection pooling.',
      'Industrial IoT Telemetry (PT Kamiko): Real-time Modbus serial sensor ingestion, interactive GIS mapping, and automated plant maintenance scheduling.',
      'Commercial Studios & Ventures (Thinkedge & Versamorph): Production client platforms (Bank Sampah, Aromas, Ocean Dental) and 32-bit computer architecture simulators.'
    ],
    impact: [
      '4,240+ Production Commits & 1,711 PRs Shipped',
      '2,056+ Jira Epics & Sprints Delivered',
      'Zero 5xx Latency Dropouts during Peak Traffic',
      '100% On-Time Enterprise Handover Record'
    ],
    stack: ['Go (Clean Arch)', 'Node.js/NestJS', 'Postgres (pgxpool)', 'MongoDB', 'Elasticsearch', 'Docker', 'Kubernetes'],
    diagramType: 'ecosystem'
  },

  // Slide 3: Dealls Search Engine
  {
    id: 'search-engine',
    category: 'ENTERPRISE SCALE',
    categoryColor: 'cyan',
    title: 'High-Precision Search & Synonym Architecture',
    subtitle: 'Elasticsearch Indexing & Custom Bilingual Tokenization (Dealls Core)',
    problem: 'Direct database keyword matching resulted in severe CPU contention, >1,200ms query latency, and complete failure to match Indonesian/English role synonyms (e.g., "FE" vs "Frontend Developer").',
    solution: [
      'Re-architected Elasticsearch indexing pipeline with custom Indonesian/English synonym tokenizers, edge n-grams, and multi-field boost weights.',
      'Built automated background exporter reconciling database role taxonomies with Elasticsearch dictionaries in real time.',
      'Engineered multi-field weighted scoring heuristics balancing job title, skill vector match, and candidate experience duration.'
    ],
    impact: [
      'Maintained sub-100ms P95 latency across millions of live search queries',
      'Achieved 99.38% HTTP availability with zero 5xx server errors',
      'Authored recommendation architecture specification for matching 1.74M talents'
    ],
    stack: ['Golang', 'Elasticsearch', 'Redis', 'MongoDB', 'Docker', 'REST API'],
    diagramType: 'search'
  },

  // Slide 4: Indeed Async Ingestion
  {
    id: 'indeed-sync',
    category: 'ENTERPRISE INTEGRATION',
    categoryColor: 'cyan',
    title: 'Asynchronous ATS Ingestion & Webhook Decoupling',
    subtitle: 'High-Volume Batch Synchronization Pipeline (Indeed Apply x Dealls)',
    problem: 'Synchronous ingestion of high-frequency third-party job board webhooks caused HTTP worker timeouts (>8,000ms), thread pool starvation, and duplicate candidate profile creations upon retries.',
    solution: [
      'Decoupled HTTP webhook intake from heavy entity deduplication via BullMQ background queues, returning instant HTTP 202 Accepted.',
      'Engineered distributed Redis locking and cryptographic request hashing for guaranteed idempotent ingestion.',
      'Configured dead-letter queue (DLQ) workers with exponential backoff retries for transient downstream database delays.'
    ],
    impact: [
      'Successfully processed 936 candidate applications in a single automated batch without data loss',
      'Cut ingestion response latency from >8,000ms down to <120ms',
      'Completely eliminated duplicate candidate profile records across partner job boards'
    ],
    stack: ['Node.js', 'Express', 'TypeScript', 'BullMQ', 'Redis', 'MongoDB'],
    diagramType: 'indeed'
  },

  // Slide 5: Document Library & E-Sign
  {
    id: 'document-vault',
    category: 'ENTERPRISE SAAS',
    categoryColor: 'cyan',
    title: 'Enterprise Document Vault & Digital E-Sign Engine',
    subtitle: 'Compliant Corporate Workforce Records & Audit Trails (KantorKu & Dealls)',
    problem: 'Enterprise corporate clients required a compliant document repository supporting multi-subsidiary authorization, cryptographic audit trails, and mobile document streaming without client-side HTTP 415 crashes.',
    solution: [
      'Architected centralized document management microservice in Go featuring recursive hierarchical folder traversal and symmetric ACL security.',
      'Eliminated mobile streaming crashes across iOS/Android by standardizing error contract payloads and decoupling file preview fallbacks from direct download endpoints.',
      'Authored technical specification and database schema for digital E-Sign integration with tamper-evident audit trail logging (signer IP, hash, timestamp).'
    ],
    impact: [
      '100% elimination of mobile document streaming crashes (HTTP 415)',
      'Adopted by corporate holding groups managing thousands of employee contracts',
      'Zero-downtime service handover with 19 defect backlogs resolved upon assumption'
    ],
    stack: ['Golang Clean Architecture', 'PostgreSQL', 'MinIO / AWS S3', 'Fiber v2', 'Docker'],
    diagramType: 'docvault'
  },

  // Slide 6: Multi-Company Architecture
  {
    id: 'multi-company',
    category: 'ENTERPRISE SAAS',
    categoryColor: 'cyan',
    title: 'Multi-Company Holding Context & Taxonomy Sync',
    subtitle: 'Gateway Forward-Auth Tenant Isolation (Dealls Enterprise & KantorKu)',
    problem: 'Conglomerates and holding companies (Sewu, Ibunda) needed to administer multiple subsidiaries from a single dashboard without cross-tenant data leakage or requiring recruiters to maintain multiple login credentials.',
    solution: [
      'Engineered forward-auth tenant context switching via injected contextual headers (X-Company-ID) at the gateway layer.',
      'Designed tenant-isolated relational database schemas ensuring multi-level RBAC where admins hold granular permissions across legal entities.',
      'Architected cross-platform data synchronization pipeline between ATS and HRIS, normalizing candidate data into canonical employee hierarchies.'
    ],
    impact: [
      'Enabled holding conglomerates to administer dozens of subsidiaries from a single interface',
      'Guaranteed 100% tenant data isolation across recruitment and workforce suites',
      'Seamless automated onboarding from job application to active employee record'
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
      'Built automated invoice cancellation timers, payment expiration state machines, and reconciliation webhooks with cryptographic signature verification.'
    ],
    impact: [
      'Handled tens of thousands of concurrent national competition participants without database lockup',
      'Processed hundreds of millions of rupiah in ticket transactions with zero overpayment discrepancies',
      'Eliminated stale checkout deadlocks through automated invoice expiration state machines'
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
      'Developed full-stack Order Management System (OMS) appointment reservation module in Go and React, introducing concurrent time-slot locking for clinical services.'
    ],
    impact: [
      'Sustained sub-10ms P95 query execution on retail counter transactions',
      'Maintained 100% financial and inventory reconciliation accuracy across stores',
      'Successfully migrated active development and 1,000+ merge requests to self-hosted enterprise infrastructure'
    ],
    stack: ['Golang Clean Architecture', 'PostgreSQL (pgx)', 'React', 'Redis', 'Docker'],
    screenshots: [
      { title: 'Pharmacy Retail Checkout', src: '/portfolio/assets/kamiko/erp.jpg', caption: 'Point-of-Sale billing with atomic stock ledgering' }
    ]
  },

  // Slide 9: Thinkedge Studio
  {
    id: 'thinkedge-studio',
    category: 'COMMERCIAL VENTURE STUDIO',
    categoryColor: 'purple',
    title: 'Thinkedge Studio — Production Client Suite',
    subtitle: 'Commercial Digital Engineering Agency (Co-Founded with Sahri)',
    problem: 'Independent businesses needed modern, responsive operational software tailored to their workflows without the overhead and bloat of generic off-the-shelf software.',
    solution: [
      'Bank Sampah Platform: Built community waste recycling management ledger recording member deposits, weight ledgers, automated pricing calculations, and member cash payout balances.',
      'Aromas Catalog Showcase: Developed high-conversion mobile-first brand showcase and catalog exploration portal with WhatsApp order routing.',
      'Ocean Dental Suite: Engineered multi-clinic dental management portal handling patient records, treatment histories, and dentist schedule coordination.'
    ],
    impact: [
      'Delivered 3 custom commercial software platforms currently operating for paying businesses',
      'Engineered responsive mobile-first UIs deployed on high-reliability serverless infrastructure',
      'Full end-to-end client scoping, schema modeling, and zero-maintenance production deployment'
    ],
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Vercel', 'Supabase'],
    screenshots: [
      { title: 'Commercial Client Solutions', src: '/portfolio/assets/kamiko/jagain.jpg', caption: 'Operational ledgers and client portals deployed in production' }
    ]
  },

  // Slide 10: Versamorph Studio
  {
    id: 'versamorph-studio',
    category: 'SYSTEMS & MEDIA R&D',
    categoryColor: 'purple',
    title: '32-Bit MIPS Simulator & StreamDonate Engine',
    subtitle: 'Computer Architecture Simulation & Real-Time Media Protocols (Versamorph Studio)',
    problem: 'Visualizing low-level computer architecture execution states and streaming real-time broadcast overlay notifications without client lag or WebSockets disconnects.',
    solution: [
      'MIPS Instruction Simulator: Engineered interactive web demo modeling 32-bit MIPS assembly execution, ALU operations, register file states, and cycle-accurate pipeline progression.',
      'StreamDonate Engine: Enhanced live-streaming donation overlay platform supporting real-time OBS browser alerts using Server-Sent Events (SSE) and Web Audio API synthesized sound themes.'
    ],
    impact: [
      'Built cycle-accurate instruction pipeline simulator visualizing Fetch, Decode, Execute, Memory, and Writeback stages',
      'Engineered low-overhead OBS browser overlay rendering with zero visual lag'
    ],
    stack: ['Next.js', 'TypeScript', 'Server-Sent Events (SSE)', 'Web Audio API', 'Canvas API'],
    screenshots: [
      { title: 'Computer Architecture & Media Demos', src: '/portfolio/assets/kamiko/navr-cctv.jpg', caption: 'Interactive browser simulator and real-time streaming tools' }
    ]
  },

  // Slide 11: Kamiko Industrial IoT
  {
    id: 'kamiko-iot-erp',
    category: 'INDUSTRIAL IOT & ERP',
    categoryColor: 'amber',
    title: 'Industrial IoT Telemetry & Enterprise Plant ERP',
    subtitle: 'Hardware Integration & Predictive Maintenance (PT Kamiko Cipta Solusi)',
    problem: 'Industrial manufacturing facilities required real-time visibility into machine power consumption, automated equipment maintenance schedules, and centralized asset tracking without manual paper logs.',
    solution: [
      'Built telemetry ingestion services in Node.js reading raw Modbus serial sensor packets from industrial hardware power meters.',
      'Broadcasted live telemetry coordinates and equipment statuses to interactive Leaflet GIS map dashboards via WebSockets.',
      'Engineered automated preventive maintenance work-order generation using node-cron schedulers and restructured PostgreSQL relational databases.'
    ],
    impact: [
      'Deployed in live manufacturing plants monitoring 90+ physical industrial assets and power meters',
      'Automated maintenance work-order dispatching eliminating manual inspection tracking',
      'Real-time power meter telemetry (Voltage, Current, CosPhi) visualized on live operator screens'
    ],
    stack: ['Node.js', 'Laravel (PHP)', 'PostgreSQL', 'Modbus Serial', 'WebSockets', 'Leaflet GIS', 'Chart.js'],
    screenshots: [
      { title: 'Power Meter Telemetry', src: '/portfolio/assets/kamiko/power-meter.jpg', caption: 'Live electrical telemetry (363V, Current, Power) and time-series trending' },
      { title: 'JaGain Asset Management', src: '/portfolio/assets/kamiko/jagain.jpg', caption: 'Plant asset hierarchy, maintenance schedules, and work order tracking' },
      { title: 'NAVR CCTV GIS Mapping', src: '/portfolio/assets/kamiko/navr-cctv.jpg', caption: 'Interactive Leaflet GIS map displaying real-time camera nodes' }
    ]
  },

  // Slide 12: Real-Time Multiplayer Games & AI Tooling
  {
    id: 'multiplayer-ai',
    category: 'REAL-TIME PROTOCOLS & AI',
    categoryColor: 'cyan',
    title: 'Real-Time Multiplayer Engines & Agentic Tooling',
    subtitle: 'Server-Authoritative State Synchronization & Model Context Protocol (Personal R&D)',
    problem: 'Browser-based multiplayer games and autonomous task tracking platforms require zero-latency state synchronization across concurrent clients without desyncs or client-side manipulation.',
    solution: [
      'Built server-authoritative multiplayer engines utilizing WebSockets (ws, Socket.io) in Node.js, enforcing server-side state arbitration, room matchmaking, and canvas rendering (SOS Online & Dual Blast).',
      'Developed Tebak Lagu audio trivia application featuring Web Audio API synthesized buzzers and low-latency multiplayer rooms.',
      'Engineered Atlas RPG task manager with custom Model Context Protocol (MCP) server integration, allowing autonomous AI agents (Hermes) to stream live progress telemetry directly into Kanban cards.'
    ],
    impact: [
      'Live playable applications deployed on public cloud infrastructure supporting real-time concurrent multiplayer sessions',
      'Custom Model Context Protocol (MCP) server actively powering real-world AI engineering workflows and live task logging'
    ],
    stack: ['Next.js', 'Node.js', 'WebSockets', 'Web Audio API', 'Prisma', 'Model Context Protocol (MCP)'],
    links: [
      { label: 'Atlas RPG Platform', url: 'https://atlas-rpg.fly.dev' }
    ]
  },

  // Slide 13: Closing & Contact Gateway
  {
    id: 'closing',
    category: 'COLLABORATION GATEWAY',
    categoryColor: 'cyan',
    title: "Let's Build Resilient Systems Together",
    subtitle: 'Available for Global Remote Senior/Staff Backend Roles & High-Ticket Architecture Consulting',
    problem: 'Looking for a seasoned Senior Engineer who bridges high-scale systems architecture with rapid product delivery and full operational ownership?',
    solution: [
      'Proven at Scale: 1.74M talents matched, sub-100ms P95 search, sub-10ms retail POS, 936 automated batch ingestion.',
      'Full Technical Ownership: From architectural technical specifications and relational database schemas to clean code implementation, observability, and RCA.',
      'High-Velocity Delivery: 100+ production features shipped across recruiter ATS, enterprise HRIS, retail POS, and event platforms.'
    ],
    impact: [
      'Squad Lead (Backend) at YC W22 Backed Platform',
      '5+ Years Proven Production Experience',
      'Fluent in Golang Clean Architecture, TypeScript/Node.js, Postgres, and Distributed Caching'
    ],
    stack: ['Golang', 'TypeScript', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'Redis', 'Kafka', 'Docker'],
    links: [
      { label: 'Download Master CV (PDF)', url: '/portfolio/Muhammad-Zidane-Sc-Resume.pdf' },
      { label: 'Connect on LinkedIn', url: 'https://www.linkedin.com/in/zidane-sc' },
      { label: 'Explore GitHub Repositories', url: 'https://github.com/zidane-sc' },
      { label: 'Email: zidanesc02@gmail.com', url: 'mailto:zidanesc02@gmail.com' }
    ]
  }
];
