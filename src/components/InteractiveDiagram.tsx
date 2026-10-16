import React from 'react';
import { Database, Search, ArrowRight, Zap, Layers, RefreshCw, Cpu, Server, ShieldCheck, Lock, Webhook, Activity, FileText } from 'lucide-react';

interface DiagramProps {
  type: string;
}

export const InteractiveDiagram: React.FC<DiagramProps> = ({ type }) => {
  switch (type) {
    case 'search':
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 bg-slate-950/70 border border-slate-800 rounded-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="text-xs uppercase tracking-wider text-sky-400 font-mono mb-4 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" /> High-Precision Elasticsearch Pipeline
          </div>

          <div className="w-full max-w-md flex flex-col gap-3 font-mono text-xs">
            {/* Step 1 */}
            <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-700/60 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>MongoDB Relational Primary</span>
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">1.74M Profiles</span>
            </div>

            <div className="flex justify-center text-slate-500">
              <RefreshCw className="w-4 h-4 animate-spin text-sky-400" style={{ animationDuration: '6s' }} />
            </div>

            {/* Step 2 */}
            <div className="p-3 bg-sky-950/40 border border-sky-800/60 rounded-lg">
              <div className="flex justify-between items-center mb-1 text-sky-300 font-semibold">
                <span>Bilingual Synonym Tokenizer</span>
                <span className="text-[10px] text-sky-400 font-mono">Edge N-Grams</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Custom Indonesian/English mapping (e.g. "FE" ↔ "Frontend Engineer", "Lead" ↔ "Squad Lead")
              </p>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
            </div>

            {/* Step 3 */}
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Elasticsearch Multi-Match Scoring</span>
              </div>
              <span className="text-[10px] text-amber-400 font-mono bg-amber-950/60 px-2 py-0.5 rounded">Boost Weights</span>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
            </div>

            {/* Output */}
            <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/50 rounded-lg flex items-center justify-between shadow-lg shadow-emerald-950/20">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>API Response Delivery</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-900/60 px-2.5 py-1 rounded border border-emerald-500/30">
                &lt; 100ms P95
              </span>
            </div>
          </div>
        </div>
      );

    case 'indeed':
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 bg-slate-950/70 border border-slate-800 rounded-xl relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="text-xs uppercase tracking-wider text-sky-400 font-mono mb-4 flex items-center gap-1.5">
            <Webhook className="w-3.5 h-3.5" /> Asynchronous Batch Ingestion
          </div>

          <div className="w-full max-w-md flex flex-col gap-3 font-mono text-xs">
            {/* Step 1 */}
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <Webhook className="w-4 h-4 text-sky-400" />
                <span>Indeed Apply Webhook Incoming</span>
              </div>
              <span className="text-[10px] font-bold text-sky-400 bg-sky-950 px-2 py-0.5 rounded">&lt; 120ms (HTTP 202)</span>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
            </div>

            {/* Step 2 */}
            <div className="p-3 bg-purple-950/30 border border-purple-800/50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-300">
                <Lock className="w-4 h-4 text-purple-400" />
                <span>Distributed Redis Lock & Hash</span>
              </div>
              <span className="text-[10px] text-purple-400">Idempotency Guard</span>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
            </div>

            {/* Step 3 */}
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-lg">
              <div className="flex justify-between items-center text-slate-200 mb-1">
                <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" /> BullMQ Asynchronous Queue
                </span>
                <span className="text-[10px] text-slate-400">Workers Pool</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Decoupled profile deduplication, industry resolver, and ATS seeder
              </p>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
            </div>

            {/* Output */}
            <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>JobApplication Entity Created</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-900/60 px-2.5 py-1 rounded border border-emerald-500/30">
                936 Batch Automated
              </span>
            </div>
          </div>
        </div>
      );

    case 'docvault':
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 bg-slate-950/70 border border-slate-800 rounded-xl relative overflow-hidden">
          <div className="text-xs uppercase tracking-wider text-sky-400 font-mono mb-4 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> Go Microservice & E-Sign Engine
          </div>

          <div className="w-full max-w-md flex flex-col gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-lg flex items-center justify-between">
              <span className="text-slate-300">Client Web Admin / Mobile App</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">Zero 415 Errors</span>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
            </div>

            <div className="p-3 bg-sky-950/40 border border-sky-800/60 rounded-lg text-center">
              <div className="text-sky-300 font-bold mb-1">ms-document-management (Golang Clean Arch)</div>
              <div className="text-[11px] text-slate-400">Recursive Folder Search & Symmetric ACL Permission Check</div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-lg flex flex-col justify-between">
                <div className="text-slate-300 font-semibold mb-1 flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-sky-400" /> S3 / MinIO Vault
                </div>
                <span className="text-[10px] text-slate-400">Decoupled Streaming Preview & Direct Download</span>
              </div>
              <div className="p-3 bg-purple-950/30 border border-purple-800/60 rounded-lg flex flex-col justify-between">
                <div className="text-purple-300 font-semibold mb-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> E-Sign Audit Engine
                </div>
                <span className="text-[10px] text-purple-400">Cryptographic Hash, IP, & Timestamp Verification</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'multicompany':
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 bg-slate-950/70 border border-slate-800 rounded-xl relative overflow-hidden">
          <div className="text-xs uppercase tracking-wider text-sky-400 font-mono mb-4 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Forward-Auth Multi-Tenancy Architecture
          </div>

          <div className="w-full max-w-md flex flex-col gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-lg flex justify-between items-center">
              <span className="text-slate-300">Corporate User Session</span>
              <span className="text-[10px] text-sky-400 bg-sky-950 px-2 py-0.5 rounded">Holding Admin</span>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
            </div>

            <div className="p-3 bg-sky-950/40 border border-sky-700/60 rounded-lg">
              <div className="text-sky-300 font-bold mb-1">Traefik / API Gateway Layer</div>
              <div className="text-[11px] text-slate-400">
                Forward-Auth Context Switching Injection: <code className="text-emerald-400 bg-slate-900 px-1 py-0.5 rounded font-mono">X-Company-ID: [Subsidiary-UUID]</code>
              </div>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-lg">
                <div className="text-slate-300 font-semibold mb-1">Dealls ATS</div>
                <span className="text-[10px] text-slate-400">Candidate Pipelines per Legal Subsidiary</span>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-lg">
                <div className="text-slate-300 font-semibold mb-1">KantorKu HRIS</div>
                <span className="text-[10px] text-slate-400">Isolated Organization Hierarchy Trees</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'events':
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 bg-slate-950/70 border border-slate-800 rounded-xl relative overflow-hidden">
          <div className="text-xs uppercase tracking-wider text-sky-400 font-mono mb-4 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> High-Concurrency & Multi-Gateway Routing
          </div>

          <div className="w-full max-w-md flex flex-col gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-lg flex justify-between items-center">
              <span className="text-slate-300">National Competition Bursts (SFL & IHBS)</span>
              <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded">10k+ Concurrent</span>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
            </div>

            <div className="p-3 bg-sky-950/40 border border-sky-800/60 rounded-lg text-center">
              <div className="text-sky-300 font-bold mb-1">ms-payment-gateway Routing Adapter</div>
              <div className="text-[11px] text-slate-400">
                Dynamic Routing across Multiple Independent Merchant Accounts (Midtrans QRIS, VA, E-Wallets)
              </div>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-lg flex justify-between items-center">
              <div>
                <div className="text-emerald-300 font-bold">Automated Invoice State Machine</div>
                <div className="text-[10px] text-slate-400">Signature Verification & Timed Auto-Expiration</div>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-900/60 px-2 py-1 rounded">Zero Deadlock</span>
            </div>
          </div>
        </div>
      );

    default: // ecosystem
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 bg-slate-950/70 border border-slate-800 rounded-xl relative overflow-hidden">
          <div className="text-xs uppercase tracking-wider text-sky-400 font-mono mb-4 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> 4-Pillar Systems Ecosystem Overview
          </div>

          <div className="w-full max-w-md grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-900 border border-sky-800/40 rounded-lg">
              <div className="text-sky-400 font-bold mb-1 flex items-center gap-1">
                <Database className="w-3.5 h-3.5" /> Enterprise Systems
              </div>
              <div className="text-[11px] text-slate-300">Dealls & KantorKu</div>
              <div className="text-[10px] text-slate-500 mt-1">1.74M Talents • Search & ATS</div>
            </div>

            <div className="p-3 bg-slate-900 border border-emerald-800/40 rounded-lg">
              <div className="text-emerald-400 font-bold mb-1 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Retail & Inventory
              </div>
              <div className="text-[11px] text-slate-300">Apotek Roxy</div>
              <div className="text-[10px] text-slate-500 mt-1">&lt;10ms POS • OMS Booking</div>
            </div>

            <div className="p-3 bg-slate-900 border border-amber-800/40 rounded-lg">
              <div className="text-amber-400 font-bold mb-1 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> Industrial IoT
              </div>
              <div className="text-[11px] text-slate-300">PT Kamiko Cipta Solusi</div>
              <div className="text-[10px] text-slate-500 mt-1">Modbus Serial • Leaflet GIS</div>
            </div>

            <div className="p-3 bg-slate-900 border border-purple-800/40 rounded-lg">
              <div className="text-purple-400 font-bold mb-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> Studios & Ventures
              </div>
              <div className="text-[11px] text-slate-300">Thinkedge & Versamorph</div>
              <div className="text-[10px] text-slate-500 mt-1">Commercial Client Platforms</div>
            </div>
          </div>
        </div>
      );
  }
};
