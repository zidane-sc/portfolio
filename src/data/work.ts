// Public-safe content from career audit, Oct 2026.
// Deck bullets: max 4 per case. No fabricated metrics or unsupported ownership claims.
// Implementation, contribution, design/POC, and resume-supported context are distinguished.
export type Metric = { value: string; label: string; source?: string }
export type Case = {
  id: string
  org: string
  period: string
  title: string
  role: string
  problem: string
  actions: string[]
  results?: Metric[]
  features: { name: string; detail: string }[]
  stack: string[]
  flow?: string[]
}

export const closing = {
  title: "Let's build systems that hold.",
  body: 'Open to senior backend, platform architecture, and full-stack engineering roles (remote). Specialized in Go, TypeScript, PostgreSQL, and modern React/Next.js interfaces.',
  note: 'Selected engineering work. Contribution scope is distinguished from sole authorship throughout.',
}

export const profile = {
  name: 'Muhammad Zidane Sc',
  role: 'Backend & Platform Architecture (Full Stack)',
  thesis: 'Core depth in distributed backend systems and platform architecture, with end-to-end full-stack product delivery across Go, TypeScript, and React/Next.js.',
  location: 'Indonesia · Open to global remote',
  email: 'zidanesc02@gmail.com',
  github: 'https://github.com/zidane-sc',
  linkedin: 'https://www.linkedin.com/in/zidane-sc',
  cv: `${import.meta.env.BASE_URL}Muhammad-Zidane-Sc-Resume.pdf`,
}

export const headline: Metric[] = []

export const cases: Case[] = [
  // ── DEALLS / SEJUTACITA ──────────────────────────────────────────
  {
    id: 'dealls-search',
    org: 'Dealls',
    period: 'May 2022 — present',
    title: 'Search and matching across languages and signals',
    role: 'Backend contributor · Squad Lead since Jan 2026',
    problem: 'Job search and candidate matching need to handle bilingual queries, varied titles, and multi-factor candidate signals.',
    actions: [
      'Contributed Elasticsearch analyzers with bilingual Indonesian/English synonyms, shingles, and stemming.',
      'Authored recommendation POCs comparing realtime scoring vs precomputed cron pipelines.',
      'Worked on candidate evaluation contracts, scoring heuristics, and thresholded matching.',
      'Designed talent-blast flows and explored embedding/cosine-similarity retargeting.',
    ],
    features: [
      { name: 'Bilingual Analyzer Chain', detail: 'Configured synonym_graph filters with English porter_stem and curated Indonesian synonyms.' },
      { name: 'Search-Time Mapping', detail: 'Configured sector search_analyzer allowing synonym dictionary updates without reindexing.' },
      { name: 'Recommendation Architecture', detail: 'Authored technical specification and POC for matching 1.74M profiles against requisitions.' },
    ],
    stack: ['Go', 'TypeScript', 'Elasticsearch', 'MongoDB', 'Redis'],
    flow: ['search query / requisition', 'bilingual synonym analyzer', 'multi-factor scoring', 'ranked candidate matches'],
  },
  {
    id: 'dealls-indeed',
    org: 'Dealls × Indeed',
    period: '2026',
    title: 'External job applications, processed asynchronously',
    role: 'Integration analysis & backend contribution',
    problem: 'External partner intake, candidate deduplication, and application-status updates have different timing and error-handling requirements.',
    actions: [
      'Authored Indeed Apply and Disposition Sync integration analysis and technical specification.',
      'Contributed asynchronous webhook intake that decouples ingestion from processing.',
      'Implemented raw-byte webhook signature verification to validate payload authenticity.',
      'Worked on screener-question synchronization and bi-directional status mapping.',
    ],
    features: [
      { name: 'Asynchronous Ingestion', detail: 'Webhook immediately validates and acknowledges intake, moving heavy processing to BullMQ.' },
      { name: 'HMAC Signature Security', detail: 'Raw-byte HMAC signature verification before JSON parsing prevents payload leakage in logs.' },
      { name: 'Status Synchronization', detail: 'Bidirectional status reconciliation mapping disposition updates with third-party job boards.' },
    ],
    stack: ['Node.js', 'TypeScript', 'BullMQ', 'MongoDB'],
    flow: ['signed webhook (HMAC)', 'BullMQ intake queue', 'deduplication worker', 'disposition status sync'],
  },
  {
    id: 'dealls-ai-cv',
    org: 'Dealls',
    period: '2022 — present · AI initiatives',
    title: 'AI-assisted CV parsing and applicant analysis',
    role: 'Backend implementation contributor',
    problem: 'Resume analysis requires reliable ingestion, structured extraction, and explicit failure handling at document and token boundaries.',
    actions: [
      'Contributed OCR and URL-based document ingestion, Gemini analysis, and language-aware prompts.',
      'Worked on structured resume-to-JSON extraction across review, parser, and analyzer services.',
      'Added token-limit guards, Pub/Sub completion logging, and zero-byte document error handling.',
      'Contributed load-test resource tuning and job-portal AI-feature integration.',
    ],
    features: [
      { name: 'Structured Extraction', detail: 'Pipeline converting raw multi-page resumes into structured JSON schemas via Gemini and OCR.' },
      { name: 'Defensive Processing', detail: 'Token-boundary guards, Pub/Sub completion logging, and zero-byte file error handling.' },
      { name: 'Throughput Tuning', detail: 'Load-tested worker memory limits to prevent pod starvation on complex PDF documents.' },
    ],
    stack: ['TypeScript', 'Gemini', 'OCR', 'Pub/Sub', 'Node.js'],
    flow: ['document upload / URL', 'OCR & text extraction', 'Gemini structured JSON', 'Pub/Sub event stream'],
  },
  {
    id: 'dealls-mentoring',
    org: 'Dealls',
    period: '2022 — present · Mentoring platform',
    title: 'Mentoring from onboarding to session certificates',
    role: 'Backend implementation contributor',
    problem: 'Mentors and participants need coordinated availability, session lifecycle rules, and administrative oversight.',
    actions: [
      'Built mentor onboarding, expertise/topic setup, and profile synchronization.',
      'Implemented scheduling, booking, conflict validation, and approval flows.',
      'Built cancellation, rescheduling, attendance, and referral capabilities.',
      'Contributed notifications, certificate generation, and admin batch controls.',
    ],
    features: [
      { name: 'Booking Lifecycle', detail: 'State machine managing scheduling, conflict checks, approvals, cancellations, and reschedules.' },
      { name: 'Automated Credentialing', detail: 'Automated certificate generation and attendance verification upon session completion.' },
      { name: 'Admin Governance', detail: 'Batch tools for mentor onboarding approval queues, topic setups, and referral tracking.' },
    ],
    stack: ['TypeScript', 'Node.js', 'MongoDB', 'BullMQ'],
  },
  {
    id: 'dealls-auth',
    org: 'Dealls',
    period: '2022 — present · Auth & messaging',
    title: 'Account recovery and asynchronous message delivery',
    role: 'Backend implementation contributor',
    problem: 'Authentication flows and transactional delivery need safeguards, recovery paths, and gateway flexibility.',
    actions: [
      'Contributed login-token flow, HRIS auth, email OTP approval gating, and failed-password rate limiting.',
      'Worked on recovery OTP, verification-link resend, and background password-recovery dispatch.',
      'Built WhatsApp master/slave queue consumers, completion listeners, retries, and delivery controls.',
      'Contributed banned-account alerts, Fazpass configuration, and Meta WhatsApp gateway migration.',
    ],
    features: [
      { name: 'Enterprise Auth Guard', detail: 'Login-token verification, email OTP approval gating, and Redis-backed failed-login limiting.' },
      { name: 'Resilient Messaging', detail: 'Baileys master/slave worker queues in Redis with retry listeners and automated gateway fallbacks.' },
      { name: 'Asynchronous Recovery', detail: 'Background BullMQ workers for verification links, password resets, and multi-session auth.' },
    ],
    stack: ['TypeScript', 'Redis', 'BullMQ', 'Baileys'],
  },
  {
    id: 'dealls-payments',
    org: 'Dealls',
    period: '2022 — present · Payments & events',
    title: 'Payments, billing, and national program operations',
    role: 'Backend implementation contributor',
    problem: 'Program registration ties money movement, participant state, and operational tooling together.',
    actions: [
      'Contributed multi-gateway/multi-account payment routing, health checks, and dispatcher behavior.',
      'Worked on checkout, webhook handling, receipts, timezone-safe events, and subscription billing.',
      'Built SFL/IHBS/IDM quizzes, submissions, commitment fees, ticketing, and certificates.',
      'Contributed participant state tools, selection emails, and operational scripts.',
    ],
    features: [
      { name: 'Multi-Gateway Router', detail: 'Dynamic adapter routing across payment providers with health checks and timezone-safe receipts.' },
      { name: 'Contest & Event Engines', detail: 'Decoupled event databases in PostgreSQL to withstand tryout and registration traffic spikes.' },
      { name: 'Invoice Lifecycle', detail: 'State machines managing invoice generation, payment expirations, and B2B billing webhooks.' },
    ],
    stack: ['TypeScript', 'Node.js', 'Midtrans', 'BullMQ'],
  },
  {
    id: 'dealls-enterprise',
    org: 'Dealls / KantorKu',
    period: '2026 · Enterprise HRIS',
    title: 'Document management, e-sign, and company boundaries',
    role: 'Backend design & implementation contributor',
    problem: 'Enterprise documents need hierarchical access control, signing workflows, and consistent preview and download behavior.',
    actions: [
      'Authored Go/PostgreSQL document-service design, folder hierarchy, access control, and API contracts.',
      'Contributed identity resolution, duplicate upload policies, and hierarchical search fixes.',
      'Hardened e-sign recipient access, document streaming, and trash lifecycle behavior.',
      'Designed holding-company schemas, member mappings, Casbin permissions, and pooled quotas.',
    ],
    features: [
      { name: 'Document Vault Microservice', detail: 'Built Go service from scratch with recursive folder structures, metadata, and trash lifecycles.' },
      { name: 'Granular Access Control', detail: 'Casbin-based ACL evaluating company, department, and employee permissions on every operation.' },
      { name: 'E-Sign Signature Scope', detail: 'Annotation-based digital signing lifecycle with recipient permission isolation and typed streaming.' },
    ],
    stack: ['Go', 'PostgreSQL', 'S3', 'Casbin'],
  },
  {
    id: 'dealls-hris',
    org: 'Dealls / KantorKu',
    period: '2026 · HRIS initiatives',
    title: 'ATS–HRIS data sync and scheduling workflows',
    role: 'Authored system design & backend requirements',
    problem: 'Enterprise services need consistent company context, role taxonomy alignment, and coordinated scheduling capabilities.',
    actions: [
      'Specified ATS–HRIS job-role normalization with migration scripts, embedding verification, and dry-run guards.',
      'Authored availability, Google Calendar, invitation, and booking API/database designs.',
      'Specified recurring tasks, comment mentions, activity logs, bulk updates, and multi-step approvals.',
      'Designed ATS login approval chain, actor activity tracking, and security hardening.',
    ],
    features: [
      { name: 'Multi-Company Holding', detail: 'Tenant-scoped authorization with pooled quotas, enabling groups to manage subsidiaries centrally.' },
      { name: 'Taxonomy Normalization', detail: 'Embedding-assisted pipelines standardizing ATS job roles into HRIS organizational hierarchies.' },
      { name: 'Interview Coordination', detail: 'Conflict-free calendar slot locking integrating Google Calendar via Workspace DWD.' },
    ],
    stack: ['Go', 'PostgreSQL', 'Casbin', 'Google Calendar'],
  },
  {
    id: 'dealls-platform',
    org: 'Dealls',
    period: '2022 — present · Platform',
    title: 'Recruiter workflows, discovery, and data evolution',
    role: 'Backend implementation contributor',
    problem: 'Recruiter and discovery features depend on maintainable data and predictable bulk operations.',
    actions: [
      'Contributed scorecards, scoring recalculation, bulk application drafts, and background CSV exports.',
      'Delivered saved jobs, search suggestions, company verification, and candidate lifecycle behavior.',
      'Resolved N+1 batching issues; contributed MongoDB backfills, index cleanup, and query profiling.',
      'Built CMS pagination, redirects, permissions, sitemaps; authored IDOR ownership-check security analysis.',
    ],
    features: [
      { name: 'Query Optimization', detail: 'Eliminated high-latency MongoDB lookup fan-outs and N+1 bottlenecks on candidate bulk status updates.' },
      { name: 'Candidate Evaluation', detail: 'Multi-factor heuristics evaluating qualifications and work history for enterprise recruiters.' },
      { name: 'Security Review', detail: 'Authored IDOR security report validating backend user verification checks across preference endpoints.' },
    ],
    stack: ['TypeScript', 'Go', 'MongoDB', 'Elasticsearch'],
  },
  // ── ROXY ────────────────────────────────────────────────────────
  {
    id: 'roxy-pos',
    org: 'Roxy Group / Apotek Roxy',
    period: '2025 — present · Remote',
    title: 'Pharmacy point-of-sale and stock synchronization',
    role: 'Backend & Full Stack Engineer · Contract',
    problem: 'Cashier terminals need atomic stock operations, device accountability, and synchronized pricing across branches.',
    actions: [
      'Reworked POS toward Go Clean Architecture; built cashier open/close/reclose sessions.',
      'Delivered fingerprint/device-bound activity, sales, returns, and invoice printing.',
      'Implemented barcode/promotion stock lookup and gRPC/Kafka stock-price synchronization.',
      'Engineered cashier session lifecycle in Go and delivered responsive cashier interfaces in React.',
    ],
    features: [
      { name: 'Clean Architecture', detail: 'Decoupled domain, usecase, and repository layers in Go with bounded connection pools.' },
      { name: 'Cashier Accountability', detail: 'Fingerprint login, device-bound terminal sessions, and open-close-reclose reconciliation.' },
      { name: 'Distributed Stock Sync', detail: 'gRPC contracts and Kafka event streaming to keep stock levels synchronized across branches.' },
    ],
    stack: ['Go', 'PostgreSQL', 'React', 'gRPC', 'Kafka'],
  },
  {
    id: 'roxy-assets',
    org: 'Roxy Group / Apotek Roxy',
    period: '2025 — present · Remote',
    title: 'Asset lifecycle, valuation, and branch operations',
    role: 'Backend & Full Stack Engineer · Contract',
    problem: 'Multi-branch asset teams need traceable ownership, financial valuation, and QR-enabled field verification.',
    actions: [
      'Built Go backend and Next.js interfaces for asset hierarchy, categories, and document archives.',
      'Implemented automated depreciation engine, as-of valuation, and branch transfer workflows.',
      'Built floor/room/PIC ownership, branch-scoped RBAC, and receipt confirmation.',
      'Delivered camera QR asset verification, label-print presets, and executive analytics UI.',
    ],
    features: [
      { name: 'Depreciation Engine', detail: 'Automated valuation engine calculating pharmacy asset book value and depreciation as-of any target date.' },
      { name: 'Field QR Verification', detail: 'Camera-based QR verification and label-print presets for physical asset auditing in pharmacy branches.' },
      { name: 'Branch Hierarchy & RBAC', detail: 'Floor, room, and PIC assignment chains with multi-step transfer approvals between branches.' },
    ],
    stack: ['Go', 'Next.js', 'PostgreSQL', 'S3'],
  },
  {
    id: 'roxy-oms',
    org: 'Roxy Group / Apotek Roxy',
    period: '2025 — present · Remote',
    title: 'Tenants, resource bookings, agreements, and invoices',
    role: 'Backend & Full Stack Engineer · Contract',
    problem: 'Office operations need tenant onboarding, resource reservations, and billing linked to agreements.',
    actions: [
      'Delivered full-stack tenant management: Go API, photos, cursor pagination, and Next.js area dashboards.',
      'Built room/fleet booking engine with concurrent slot locking and Google Calendar integration.',
      'Engineered agreement workflows, authorized approvals, and advisory-lock invoice numbering.',
      'Delivered event-driven WhatsApp/email notifications and Excel/PDF report exports.',
    ],
    features: [
      { name: 'Resource Reservation', detail: 'Multi-branch room and fleet booking engine with concurrent slot locking and Google Calendar invites.' },
      { name: 'Tenant Administration', detail: 'Tenant journey lifecycle tracking with cursor pagination, area dashboards, and document archives.' },
      { name: 'Advisory-Lock Invoicing', detail: 'Concurrency-safe invoice numbering using PostgreSQL advisory locks and automated payment reminders.' },
    ],
    stack: ['Go', 'Next.js', 'PostgreSQL', 'Google Workspace'],
  },
  // ── OTHER PROFESSIONAL ───────────────────────────────────────────
  {
    id: 'courtwin',
    org: 'Courtwin',
    period: 'Jan 2023 — Apr 2024 · International Remote',
    title: 'Sports reservations, clubhouse POS, and real-time chat',
    role: 'Core Backend Engineer · Three-person squad',
    problem: 'Padel and tennis clubs need court reservations, tournament management, retail sales, and in-app messaging.',
    actions: [
      'Built TypeScript/PostgreSQL APIs for court/venue reservations and schedule constraints.',
      'Contributed tournament, match, player, lesson, class, and customer profile workflows.',
      'Implemented clubhouse cash-drawer/POS, sales, and payment-setting capabilities.',
      'Built WebSocket conversations with connection tracking, heartbeat, and paginated chat history.',
    ],
    features: [
      { name: 'Multi-Venue Scheduling', detail: 'UTC-normalized reservation engine preventing double-bookings across international clubs and courts.' },
      { name: 'Clubhouse Operations', detail: 'Point-of-sale backend with cash-drawer sessions, payment webhooks, and tournament brackets.' },
      { name: 'Real-Time Messaging', detail: 'WebSocket chat engine with heartbeat verification, connection tracking, and paginated history.' },
    ],
    stack: ['TypeScript', 'PostgreSQL', 'WebSockets'],
  },
  {
    id: 'sanbersy',
    org: 'Sanbersy',
    period: 'Dec 2022 — Sep 2023 · Freelance',
    title: 'Psychometric assessments and F&B operational software',
    role: 'Full Stack Developer · Freelance',
    problem: 'Assessment administrators and F&B teams need domain-specific workflows separate from generic tools.',
    actions: [
      'Built end-to-end PAPI Kostik assessment platform: dynamic test runner, navigation, and scoring.',
      'Implemented stateful exam timers, remedial test flows, and printable candidate competency reports.',
      'Developed full-stack F&B ERP for Oza Tea: ingredient usage, recipe costing, and inventory.',
      'Delivered employee/position management, export tools, and client-facing web modules.',
    ],
    features: [
      { name: 'Psychometric Engine', detail: 'Automated scoring algorithms for PAPI Kostik psychometric and competency evaluations.' },
      { name: 'Timed Assessments', detail: 'Stateful navigation timers, remedial test paths, and automated personal report generation.' },
      { name: 'F&B Production ERP', detail: 'Recipe master cost-percentage calculation and inventory deduction for tea manufacturing.' },
    ],
    stack: ['Laravel', 'Vue.js/Blade', 'MySQL', 'PHP'],
  },
  {
    id: 'sirkel',
    org: 'Sirkel Kreasi Nusantara',
    period: 'May — Aug 2022 · Freelance',
    title: 'Hospitalpreneur social community platform',
    role: 'Full Stack Developer · Freelance',
    problem: 'A mobile professional community needs social interaction, anonymous Q&A, and moderation tools.',
    actions: [
      'Engineered mobile community app using Laravel REST API and React Native frontend.',
      'Built interactive social feeds, quote-posts, comments, likes, and anonymous polling Q&A.',
      'Implemented FCM push notifications, moderation queues, user blocking, and coaching requests.',
      'Delivered automated integration test suites across API and containerized runtime.',
    ],
    features: [
      { name: 'Community Interaction', detail: 'Social interaction architecture with posts, quote-posts, likes, and anonymous polling Q&A.' },
      { name: 'Push & Moderation', detail: 'FCM notification dispatcher, automated moderation queues, user blocking, and coaching requests.' },
      { name: 'Integration Hardening', detail: 'Comprehensive test suites covering authentication and API boundaries in Docker/Nginx.' },
    ],
    stack: ['Laravel', 'React Native', 'FCM', 'Docker'],
  },
  {
    id: 'kamiko',
    org: 'PT Kamiko / Grootech',
    period: 'Nov 2020 — Nov 2021',
    title: 'Manufacturing ERP and industrial monitoring',
    role: 'Full Stack Developer · Multi-contributor codebases',
    problem: 'Manufacturing teams need integrated production, inventory, asset maintenance, and live monitoring.',
    actions: [
      'Contributed Laravel/PostgreSQL ERP modules across finance, inventory, production, and HR.',
      'Worked on purchasing, shipping, HACCP reporting, and WooCommerce integration.',
      'Built JaGain asset hierarchy, work orders, maintenance schedules, and material tracking.',
      'Contributed water/energy/billing dashboards, Modbus reader changes, and alarm controls.',
    ],
    features: [
      { name: 'Industrial Modbus Bridge', detail: 'Serial frame decoding in Node.js streaming live voltage, current, and energy telemetry.' },
      { name: 'Manufacturing ERP', detail: 'Shared development of 20 Laravel operational modules covering production, inventory, and HR.' },
      { name: 'Asset Maintenance', detail: 'JaGain asset hierarchy with scheduled preventive work orders and material BOM tracking.' },
    ],
    stack: ['Laravel', 'Vue.js/Blade', 'Node.js', 'PostgreSQL', 'Modbus'],
  },
  // ── STUDIOS & PERSONAL ───────────────────────────────────────────
  {
    id: 'thinkedge',
    org: 'Thinkedge Studio',
    period: '2025 — present · Co-Founded',
    title: 'Industrial monitoring, dental SaaS, and circular-economy operations',
    role: 'Co-Founder & Full Stack Engineer',
    problem: 'Studio client work spans sensor systems, multi-branch clinic operations, and community waste management.',
    actions: [
      'Built Ecosphere/NexaSense: Go/TimescaleDB IoT backend paired with Next.js telemetry & alarm UI.',
      'Delivered Dental Suite/Appointly: full-stack multi-branch SaaS in Next.js, React, Prisma, and PostgreSQL.',
      'Built Sirkula/Bank Sampah full-stack recycling ledger, weight-based payouts, and member balance sync.',
      'Delivered client web portals and studio sites with typed API contracts and responsive interfaces.',
    ],
    features: [
      { name: 'CEMS Telemetry', detail: 'Industrial environmental monitoring foundation built in Go, TimescaleDB, and Modbus TCP/RTU.' },
      { name: 'Multi-Clinic Dental SaaS', detail: 'Prisma and PostgreSQL backend architecture supporting multi-branch appointment scheduling.' },
      { name: 'Recycling Ledger', detail: 'Sirkula waste-deposit ledger managing weight-based payouts, balance sync, and inventory.' },
    ],
    stack: ['Go', 'Next.js', 'React', 'Prisma', 'PostgreSQL', 'TimescaleDB'],
  },
  {
    id: 'versamorph',
    org: 'Versamorph Studio',
    period: '2026 — present',
    title: 'Port-simulation interfaces and live-stream overlays',
    role: 'Core Systems & Full Stack Engineer',
    problem: 'Interactive products require synchronized application state and browser-native live event presentation.',
    actions: [
      'Built MIPS Maritime Integrated Port Simulator interactive product interface in Next.js, React, and Zustand.',
      'Engineered real-time state synchronization modeling maritime logistics, vessel routes, and dock allocations.',
      'Delivered StreamDonate live overlay platform supporting browser alerts via Server-Sent Events (SSE).',
      'Integrated native Web Audio API synthesis for zero-latency audio alert playback.',
    ],
    features: [
      { name: 'Port Simulator UI', detail: 'Simulation logic and state synchronization modeling maritime logistics and vessel routing.' },
      { name: 'Realtime Donation Overlays', detail: 'SSE event dispatcher and Web Audio API synthesis for browser-source live-streaming alerts.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Zustand', 'Server-Sent Events', 'Web Audio API'],
  },
  {
    id: 'personal',
    org: 'Personal engineering',
    period: '2022 — present · Independent',
    title: 'Agent tools, multiplayer audio, and IoT telemetry',
    role: 'Independent Full Stack Engineer',
    problem: 'Personal projects explore practical interfaces between AI agents, realtime multiplayer, and IoT devices.',
    actions: [
      'Built Atlas RPG task manager: gamified Next.js/React frontend with custom Model Context Protocol (MCP) server.',
      'Delivered Tebak Lagu full-stack multiplayer audio trivia using TypeScript, WebSockets, LibSQL, and Web Audio.',
      'Engineered PCX Telemetry: mobile diagnostic app in Flutter/Dart connected to PocketBase IoT backend.',
      'Built Denailss personal web experience and supporting real-time experiments (Unibot, Techtutor Pro).',
    ],
    features: [
      { name: 'Agentic Task Engine', detail: 'Atlas RPG task manager exposing custom Model Context Protocol (MCP) server endpoints for AI agents.' },
      { name: 'Audio Multiplayer', detail: 'Tebak Lagu real-time trivia rooms built on WebSockets, LibSQL/Turso, and Web Audio API.' },
      { name: 'Vehicle IoT Telemetry', detail: 'Flutter/Dart and PocketBase diagnostic cluster for Honda PCX 160 telemetry.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'MCP', 'WebSockets', 'Flutter', 'PostgreSQL'],
  },
  {
    id: 'early-career',
    org: 'Jabar Digital Service',
    period: 'Feb — Apr 2022 · Internship',
    title: 'Internal attendance APIs and early backend delivery',
    role: 'Backend Intern · Resume-supported context',
    problem: 'Internal attendance tracking required NestJS service development in a team environment.',
    actions: [
      'Developed employee-attendance REST APIs using NestJS and PostgreSQL.',
      'Worked within a Docker/Kubernetes-based Scrum environment.',
    ],
    features: [
      { name: 'Attendance API', detail: 'Employee attendance REST endpoints engineered with NestJS and PostgreSQL in an agile Scrum squad.' },
      { name: 'Containerized Runtime', detail: 'Microservice development and container orchestration using Docker and Kubernetes.' },
    ],
    stack: ['NestJS', 'PostgreSQL', 'Docker', 'Kubernetes'],
  },
]

export const alsoShipped: any[] = []

export const facts = [
  'Squad Lead Backend since Jan 2026 · Dealls / KantorKu',
  'Delivering software since 2020 · Go, TypeScript, Laravel',
  'Google Cloud Student Mentor · 79 students, Oct–Dec 2024',
  'Information Systems, S.Kom in progress · GPA 3.9/4.0',
]
