import React, { useState } from 'react';
import { Database, Search, ArrowRight, Zap, Layers, RefreshCw, Cpu, Server, ShieldCheck, Lock, Webhook, Activity, FileText, Info, Calendar, MessageSquare, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiagramProps {
  type: string;
}

export const InteractiveDiagram: React.FC<DiagramProps> = ({ type }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  switch (type) {
    case 'search':
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-4 sm:p-6 bg-slate-950/80 border border-slate-800 rounded-xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider text-sky-400 font-mono flex items-center gap-1.5 font-bold">
              <Search className="w-3.5 h-3.5" /> High-Precision Elasticsearch Engine
            </span>
            <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
              <Info className="w-3 h-3 text-sky-400" /> Tap nodes to inspect
            </span>
          </div>

          <div className="w-full max-w-md flex flex-col gap-2 font-mono text-xs">
            {/* Step 1 */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveStep(activeStep === 1 ? null : 1)}
              className={`p-2.5 rounded-lg cursor-pointer transition-all border ${
                activeStep === 1
                  ? 'bg-slate-900 border-sky-500 shadow-md shadow-sky-500/20'
                  : 'bg-slate-900/90 border-slate-700/60 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-200">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">MongoDB Relational Primary</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">2,000,000+ Talents</span>
              </div>
              <AnimatePresence>
                {activeStep === 1 && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800"
                  >
                    Primary datastore storing candidate profiles, resume vectors, and 30,000+ total job postings.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="flex justify-center text-slate-500 my-[-2px]">
              <RefreshCw className="w-3 h-3 animate-spin text-sky-400" style={{ animationDuration: '6s' }} />
            </div>

            {/* Step 2 */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveStep(activeStep === 2 ? null : 2)}
              className={`p-2.5 rounded-lg cursor-pointer transition-all border ${
                activeStep === 2
                  ? 'bg-sky-950/60 border-sky-400 shadow-md shadow-sky-400/20'
                  : 'bg-sky-950/30 border-sky-800/50 hover:border-sky-600'
              }`}
            >
              <div className="flex justify-between items-center text-sky-300 font-semibold mb-0.5">
                <span>Bilingual Synonym Tokenizer</span>
                <span className="text-[10px] text-sky-400 font-mono bg-sky-900/60 px-1.5 py-0.5 rounded">Edge N-Grams</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Maps colloquial Indonesian/English role variants (e.g. "FE" ↔ "Frontend Developer", "Lead" ↔ "Squad Lead").
              </p>
            </motion.div>

            <div className="flex justify-center text-slate-500 my-[-2px]">
              <ArrowRight className="w-3 h-3 text-slate-600 rotate-90" />
            </div>

            {/* Step 3 */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveStep(activeStep === 3 ? null : 3)}
              className="p-2.5 bg-slate-900/90 border border-slate-700/60 hover:border-slate-500 rounded-lg flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2 text-slate-200">
                <Layers className="w-4 h-4 text-amber-400" />
                <span className="font-bold">Elasticsearch Multi-Match Scoring</span>
              </div>
              <span className="text-[10px] text-amber-400 font-mono bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">Boost Weights</span>
            </motion.div>

            <div className="flex justify-center text-slate-500 my-[-2px]">
              <ArrowRight className="w-3 h-3 text-slate-600 rotate-90" />
            </div>

            {/* Output */}
            <div className="p-3 bg-emerald-950/50 border border-emerald-500/60 rounded-lg flex items-center justify-between shadow-lg shadow-emerald-950/30">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>API Query Latency (6k+ Active Jobs)</span>
              </div>
              <span className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-900/80 px-2.5 py-1 rounded border border-emerald-400/40">
                &lt; 100ms P95
              </span>
            </div>
          </div>
        </div>
      );

    case 'indeed':
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-4 sm:p-6 bg-slate-950/80 border border-slate-800 rounded-xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider text-sky-400 font-mono flex items-center gap-1.5 font-bold">
              <Webhook className="w-3.5 h-3.5" /> Asynchronous Queue Decoupling
            </span>
            <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
              <Info className="w-3 h-3 text-sky-400" /> Tap nodes to inspect
            </span>
          </div>

          <div className="w-full max-w-md flex flex-col gap-2 font-mono text-xs">
            {/* Step 1 */}
            <div className="p-2.5 bg-slate-900 border border-slate-700/60 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <Webhook className="w-4 h-4 text-sky-400" />
                <span className="font-bold">Indeed Apply Webhook Intake</span>
              </div>
              <span className="text-[10px] font-bold text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">&lt; 120ms (HTTP 202)</span>
            </div>

            <div className="flex justify-center text-slate-500 my-[-2px]">
              <ArrowRight className="w-3 h-3 text-slate-600 rotate-90" />
            </div>

            {/* Step 2 */}
            <div className="p-2.5 bg-purple-950/30 border border-purple-800/50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-300">
                <Lock className="w-4 h-4 text-purple-400" />
                <span className="font-semibold">Distributed Redis Lock</span>
              </div>
              <span className="text-[10px] text-purple-400 bg-purple-900/40 px-2 py-0.5 rounded">Idempotency Hash</span>
            </div>

            <div className="flex justify-center text-slate-500 my-[-2px]">
              <ArrowRight className="w-3 h-3 text-slate-600 rotate-90" />
            </div>

            {/* Step 3 */}
            <div className="p-2.5 bg-slate-900 border border-slate-700/60 rounded-lg">
              <div className="flex justify-between items-center text-slate-200 mb-0.5">
                <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" /> BullMQ Background Queue
                </span>
                <span className="text-[10px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded">Workers Pool</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Decoupled profile deduplication, industry resolver, and dead-letter retry logic.
              </p>
            </div>

            <div className="flex justify-center text-slate-500 my-[-2px]">
              <ArrowRight className="w-3 h-3 text-slate-600 rotate-90" />
            </div>

            {/* Output */}
            <div className="p-3 bg-emerald-950/50 border border-emerald-500/60 rounded-lg flex items-center justify-between shadow-lg shadow-emerald-950/30">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>JobApplication Synced</span>
              </div>
              <span className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-900/80 px-2.5 py-1 rounded border border-emerald-400/40">
                936 Batch Automated
              </span>
            </div>
          </div>
        </div>
      );

    case 'docvault':
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-4 sm:p-6 bg-slate-950/80 border border-slate-800 rounded-xl relative overflow-hidden backdrop-blur-sm">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider text-sky-400 font-mono flex items-center gap-1.5 font-bold">
              <FileText className="w-3.5 h-3.5" /> Go Microservice & E-Sign Engine
            </span>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              Zero 415 Errors
            </span>
          </div>

          <div className="w-full max-w-md flex flex-col gap-2 font-mono text-xs">
            <div className="p-2.5 bg-slate-900 border border-slate-700/60 rounded-lg flex items-center justify-between">
              <span className="text-slate-300 font-semibold">Client Web Admin / Mobile App</span>
              <span className="text-[10px] text-slate-400">REST & Preview Transport</span>
            </div>

            <div className="flex justify-center text-slate-500 my-[-2px]">
              <ArrowRight className="w-3 h-3 text-slate-600 rotate-90" />
            </div>

            <div className="p-2.5 bg-sky-950/40 border border-sky-800/60 rounded-lg text-center">
              <div className="text-sky-300 font-bold mb-0.5">Corporate Document Vault (Go Clean Arch)</div>
              <div className="text-[11px] text-slate-400">Recursive Folder Search & Symmetric ACL Permission Check</div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="p-2.5 bg-slate-900 border border-slate-700/60 rounded-lg flex flex-col justify-between">
                <div className="text-slate-200 font-semibold mb-1 flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-sky-400" /> S3 / MinIO Vault
                </div>
                <span className="text-[10px] text-slate-400">Decoupled Streaming Preview & Direct Download</span>
              </div>
              <div className="p-2.5 bg-purple-950/30 border border-purple-800/60 rounded-lg flex flex-col justify-between">
                <div className="text-purple-300 font-semibold mb-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> E-Sign Engine
                </div>
                <span className="text-[10px] text-purple-400">Cryptographic Hash, IP, & Signer Verification</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'multicompany':
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-4 sm:p-6 bg-slate-950/80 border border-slate-800 rounded-xl relative overflow-hidden backdrop-blur-sm">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider text-sky-400 font-mono flex items-center gap-1.5 font-bold">
              <Lock className="w-3.5 h-3.5" /> Forward-Auth Multi-Tenancy Architecture
            </span>
            <span className="text-[10px] text-sky-400 font-mono bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/60">
              Holding Admin
            </span>
          </div>

          <div className="w-full max-w-md flex flex-col gap-2 font-mono text-xs">
            <div className="p-2.5 bg-slate-900 border border-slate-700/60 rounded-lg flex justify-between items-center">
              <span className="text-slate-300 font-semibold">Corporate User Session</span>
              <span className="text-[10px] text-slate-400">Unified Portal Access</span>
            </div>

            <div className="flex justify-center text-slate-500 my-[-2px]">
              <ArrowRight className="w-3 h-3 text-slate-600 rotate-90" />
            </div>

            <div className="p-2.5 bg-sky-950/40 border border-sky-700/60 rounded-lg">
              <div className="text-sky-300 font-bold mb-0.5">Traefik / API Gateway Layer</div>
              <div className="text-[11px] text-slate-400">
                Forward-Auth Context Switching: <code className="text-emerald-400 bg-slate-900 px-1 py-0.5 rounded font-mono">X-Company-ID: [UUID]</code>
              </div>
            </div>

            <div className="flex justify-center text-slate-500 my-[-2px]">
              <ArrowRight className="w-3 h-3 text-slate-600 rotate-90" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-slate-900 border border-slate-700/60 rounded-lg">
                <div className="text-slate-200 font-semibold mb-1">Dealls ATS</div>
                <span className="text-[10px] text-slate-400">Isolated Candidate Pipelines</span>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-700/60 rounded-lg">
                <div className="text-slate-200 font-semibold mb-1">KantorKu HRIS</div>
                <span className="text-[10px] text-slate-400">Isolated Employee Hierarchy Trees</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'events':
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-4 sm:p-6 bg-slate-950/80 border border-slate-800 rounded-xl relative overflow-hidden backdrop-blur-sm">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider text-sky-400 font-mono flex items-center gap-1.5 font-bold">
              <Activity className="w-3.5 h-3.5" /> High-Concurrency & Multi-Gateway Routing
            </span>
            <span className="text-[10px] text-amber-400 font-mono bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              10k+ Concurrent
            </span>
          </div>

          <div className="w-full max-w-md flex flex-col gap-2 font-mono text-xs">
            <div className="p-2.5 bg-slate-900 border border-slate-700/60 rounded-lg flex justify-between items-center">
              <span className="text-slate-300 font-semibold">National Competition Bursts (SFL & IHBS)</span>
              <span className="text-[10px] text-emerald-400">Tuned PostgreSQL</span>
            </div>

            <div className="flex justify-center text-slate-500 my-[-2px]">
              <ArrowRight className="w-3 h-3 text-slate-600 rotate-90" />
            </div>

            <div className="p-2.5 bg-sky-950/40 border border-sky-800/60 rounded-lg text-center">
              <div className="text-sky-300 font-bold mb-0.5">Multi-Gateway Routing Adapter</div>
              <div className="text-[11px] text-slate-400">
                Dynamic Routing across Multiple Independent Merchant Accounts (Midtrans QRIS, VA, E-Wallets)
              </div>
            </div>

            <div className="flex justify-center text-slate-500 my-[-2px]">
              <ArrowRight className="w-3 h-3 text-slate-600 rotate-90" />
            </div>

            <div className="p-3 bg-emerald-950/50 border border-emerald-500/60 rounded-lg flex justify-between items-center">
              <div>
                <div className="text-emerald-300 font-bold">Automated Invoice State Machine</div>
                <div className="text-[10px] text-slate-400">HMAC Signature Verification & Auto-Expiration</div>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-900/80 px-2 py-1 rounded">Zero Deadlock</span>
            </div>
          </div>
        </div>
      );

    case 'courtwin':
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-4 sm:p-6 bg-slate-950/80 border border-slate-800 rounded-xl relative overflow-hidden backdrop-blur-sm">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider text-sky-400 font-mono flex items-center gap-1.5 font-bold">
              <Calendar className="w-3.5 h-3.5" /> Courtwin Multi-Venue Sports Platform
            </span>
            <span className="text-[10px] text-sky-400 font-mono bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/60">
              Overseas Client
            </span>
          </div>

          <div className="w-full max-w-md flex flex-col gap-2 font-mono text-xs">
            <div className="p-2.5 bg-slate-900 border border-slate-700/60 rounded-lg flex justify-between items-center">
              <span className="text-slate-300 font-semibold">Player Court Booking Request</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">Multi-Timezone</span>
            </div>

            <div className="flex justify-center text-slate-500 my-[-2px]">
              <ArrowRight className="w-3 h-3 text-slate-600 rotate-90" />
            </div>

            <div className="p-2.5 bg-sky-950/40 border border-sky-800/60 rounded-lg text-center">
              <div className="text-sky-300 font-bold mb-0.5">Timezone-Aware Conflict Lock (Go/TS)</div>
              <div className="text-[11px] text-slate-400">Prevents overlapping court reservations & dynamic peak pricing tiers</div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="p-2.5 bg-slate-900 border border-slate-700/60 rounded-lg flex flex-col justify-between">
                <div className="text-slate-200 font-semibold mb-1 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> Tournament Draw
                </div>
                <span className="text-[10px] text-slate-400">Automated single/round-robin player bracket algorithms</span>
              </div>
              <div className="p-2.5 bg-purple-950/30 border border-purple-800/60 rounded-lg flex flex-col justify-between">
                <div className="text-purple-300 font-semibold mb-1 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-400" /> WebSockets Chat
                </div>
                <span className="text-[10px] text-purple-400">Bidirectional live messaging with heartbeat tracking</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'sanbersy':
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-4 sm:p-6 bg-slate-950/80 border border-slate-800 rounded-xl relative overflow-hidden backdrop-blur-sm">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider text-purple-400 font-mono flex items-center gap-1.5 font-bold">
              <Layers className="w-3.5 h-3.5" /> Sanbersy Client Engagements
            </span>
            <span className="text-[10px] text-purple-400 font-mono bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/60">
              2 Client Deliveries
            </span>
          </div>

          <div className="w-full max-w-md flex flex-col gap-2.5 font-mono text-xs">
            <div className="p-3 bg-purple-950/40 border border-purple-800/60 rounded-lg">
              <div className="text-purple-300 font-bold mb-1 flex items-center justify-between">
                <span>Asesmen Online PKS DS</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">GitLab !69, !70, !73</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Engineered automated scoring algorithms for PAPI Kostik psychometric assessments and competence evaluations.
              </p>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-lg">
              <div className="text-slate-200 font-bold mb-1 flex items-center justify-between">
                <span>Enterprise Mini ERP System</span>
                <span className="text-[10px] text-sky-400 bg-sky-950 px-2 py-0.5 rounded">Full Stack Laravel</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Delivered inventory tracking, commercial order management, and administrative accounting modules for corporate clients.
              </p>
            </div>
          </div>
        </div>
      );

    default: // ecosystem
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-4 sm:p-6 bg-slate-950/80 border border-slate-800 rounded-xl relative overflow-hidden backdrop-blur-sm">
          <div className="text-xs uppercase tracking-wider text-sky-400 font-mono mb-3 flex items-center gap-1.5 font-bold">
            <Cpu className="w-3.5 h-3.5" /> 4-Pillar Systems Ecosystem Overview
          </div>

          <div className="w-full max-w-md grid grid-cols-2 gap-2 font-mono text-xs">
            <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 bg-slate-900 border border-sky-800/40 rounded-lg">
              <div className="text-sky-400 font-bold mb-0.5 flex items-center gap-1 text-[11px]">
                <Database className="w-3 h-3" /> Enterprise Platforms
              </div>
              <div className="text-[11px] text-slate-200 font-semibold">Dealls & KantorKu</div>
              <div className="text-[10px] text-slate-500 mt-0.5">2M+ Talents • 16M+ Applications</div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 bg-slate-900 border border-emerald-800/40 rounded-lg">
              <div className="text-emerald-400 font-bold mb-0.5 flex items-center gap-1 text-[11px]">
                <Zap className="w-3 h-3" /> Retail & Inventory
              </div>
              <div className="text-[11px] text-slate-200 font-semibold">Apotek Roxy</div>
              <div className="text-[10px] text-slate-500 mt-0.5">&lt;10ms POS • OMS Booking</div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 bg-slate-900 border border-amber-800/40 rounded-lg">
              <div className="text-amber-400 font-bold mb-0.5 flex items-center gap-1 text-[11px]">
                <Activity className="w-3 h-3" /> Industrial IoT & ERP
              </div>
              <div className="text-[11px] text-slate-200 font-semibold">PT Kamiko Cipta Solusi</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Decotatoo ERP • Power 363V</div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 bg-slate-900 border border-purple-800/40 rounded-lg">
              <div className="text-purple-400 font-bold mb-0.5 flex items-center gap-1 text-[11px]">
                <Layers className="w-3 h-3" /> Studios & Contracts
              </div>
              <div className="text-[11px] text-slate-200 font-semibold">Courtwin, Sanbersy, Thinkedge</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Commercial Client Systems</div>
            </motion.div>
          </div>
        </div>
      );
  }
};
