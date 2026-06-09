'use client';

import Link from 'next/link';
import {
  Sun,
  Cloud,
  Globe,
  BarChart3,
  Database,
  FileText,
  ArrowRight,
} from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-28">

          <div className="max-w-3xl">
            <span className="bg-cyan-500/20 text-cyan-200 px-4 py-2 rounded-full text-sm">
              Advanced Climate Analytics Platform
            </span>

            <h1 className="text-6xl font-bold mt-6 leading-tight">
              ClimaSphere
            </h1>

            <h2 className="text-3xl mt-4 font-light">
              Generate Typical Meteorological Year (TMY) Data
            </h2>

            <p className="mt-6 text-lg text-blue-100">
              Create high-quality TMY datasets using ERA5 and CAMS climate
              databases for solar energy, building simulation,
              environmental studies and climate research.
            </p>

            <div className="flex gap-4 mt-10">
              <Link
                href="/generate"
                className="bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition"
              >
                Generate TMY
              </Link>

              <Link
                href="/register"
                className="border border-white px-6 py-3 rounded-xl hover:bg-white/10 transition"
              >
                Get Started
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-800">
            Powerful Climate Data Tools
          </h2>

          <p className="text-slate-500 mt-4">
            Everything needed to generate reliable meteorological datasets.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <Sun className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="font-bold text-lg">Solar Radiation</h3>
            <p className="text-slate-500 mt-2">
              Analyze solar resources using CAMS datasets.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <Cloud className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="font-bold text-lg">Climate Analysis</h3>
            <p className="text-slate-500 mt-2">
              Long-term weather and atmospheric data.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <Globe className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="font-bold text-lg">Global Coverage</h3>
            <p className="text-slate-500 mt-2">
              Generate TMY datasets for any location.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <BarChart3 className="w-10 h-10 text-purple-500 mb-4" />
            <h3 className="font-bold text-lg">Visualization</h3>
            <p className="text-slate-500 mt-2">
              Charts, reports and climate summaries.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-10 text-center">

            <div>
              <Database className="mx-auto w-12 h-12 text-blue-700 mb-4" />
              <h3 className="font-semibold">
                Select Location
              </h3>
            </div>

            <div>
              <Cloud className="mx-auto w-12 h-12 text-blue-700 mb-4" />
              <h3 className="font-semibold">
                Retrieve ERA5 + CAMS Data
              </h3>
            </div>

            <div>
              <BarChart3 className="mx-auto w-12 h-12 text-blue-700 mb-4" />
              <h3 className="font-semibold">
                Generate TMY
              </h3>
            </div>

            <div>
              <FileText className="mx-auto w-12 h-12 text-blue-700 mb-4" />
              <h3 className="font-semibold">
                Download Reports
              </h3>
            </div>

          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <h2 className="text-4xl font-bold text-center mb-16">
          Applications
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-3">
              Solar Energy
            </h3>

            <p className="text-slate-500">
              Evaluate solar power potential and optimize photovoltaic systems.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-3">
              Building Simulation
            </h3>

            <p className="text-slate-500">
              Accurate weather files for energy performance analysis.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-3">
              Climate Research
            </h3>

            <p className="text-slate-500">
              Long-term meteorological studies and environmental assessments.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-800 to-cyan-700 text-white py-24">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold">
            Ready to Generate Climate Data?
          </h2>

          <p className="mt-6 text-lg text-blue-100">
            Start generating Typical Meteorological Year datasets today.
          </p>

          <Link
            href="/generate"
            className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold mt-8"
          >
            Start Now
            <ArrowRight />
          </Link>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 py-10">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">

          <div>
            <h3 className="text-2xl font-bold text-white">
              ClimaSphere
            </h3>

            <p className="mt-2 text-slate-400">
              Advanced Climate & TMY Generation Platform
            </p>
          </div>

          <div className="mt-8 md:mt-0">
            <p>© 2026 ClimaSphere</p>
            <p className="text-slate-500 mt-1">
              Built with Next.js, Django, ERA5 & CAMS
            </p>
          </div>

        </div>

      </footer>

    </main>
  );
}