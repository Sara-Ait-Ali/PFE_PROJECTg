// 'use client';

// import Link from 'next/link';
// import {
//   Sun,
//   Cloud,
//   Globe,
//   BarChart3,
//   Database,
//   FileText,
//   ArrowRight,
// } from 'lucide-react';

// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-slate-50">

//       {/* HERO */}
//       <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-700 text-white">
//         <div className="max-w-7xl mx-auto px-6 py-28">

//           <div className="max-w-3xl">
//             <span className="bg-cyan-500/20 text-cyan-200 px-4 py-2 rounded-full text-sm">
//               Advanced Climate Analytics Platform
//             </span>

//             <h1 className="text-6xl font-bold mt-6 leading-tight">
//               ClimaSphere
//             </h1>

//             <h2 className="text-3xl mt-4 font-light">
//               Generate Typical Meteorological Year (TMY) Data
//             </h2>

//             <p className="mt-6 text-lg text-blue-100">
//               Create high-quality TMY datasets using ERA5 and CAMS climate
//               databases for solar energy, building simulation,
//               environmental studies and climate research.
//             </p>

//             <div className="flex gap-4 mt-10">
//               <Link
//                 href="/generate"
//                 className="bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition"
//               >
//                 Generate TMY
//               </Link>

//               <Link
//                 href="/register"
//                 className="border border-white px-6 py-3 rounded-xl hover:bg-white/10 transition"
//               >
//                 Get Started
//               </Link>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="max-w-7xl mx-auto px-6 py-24">

//         <div className="text-center mb-14">
//           <h2 className="text-4xl font-bold text-slate-800">
//             Powerful Climate Data Tools
//           </h2>

//           <p className="text-slate-500 mt-4">
//             Everything needed to generate reliable meteorological datasets.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-4 gap-8">

//           <div className="bg-white p-6 rounded-2xl shadow-sm">
//             <Sun className="w-10 h-10 text-yellow-500 mb-4" />
//             <h3 className="font-bold text-lg">Solar Radiation</h3>
//             <p className="text-slate-500 mt-2">
//               Analyze solar resources using CAMS datasets.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-sm">
//             <Cloud className="w-10 h-10 text-blue-500 mb-4" />
//             <h3 className="font-bold text-lg">Climate Analysis</h3>
//             <p className="text-slate-500 mt-2">
//               Long-term weather and atmospheric data.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-sm">
//             <Globe className="w-10 h-10 text-green-500 mb-4" />
//             <h3 className="font-bold text-lg">Global Coverage</h3>
//             <p className="text-slate-500 mt-2">
//               Generate TMY datasets for any location.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-sm">
//             <BarChart3 className="w-10 h-10 text-purple-500 mb-4" />
//             <h3 className="font-bold text-lg">Visualization</h3>
//             <p className="text-slate-500 mt-2">
//               Charts, reports and climate summaries.
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section className="bg-white py-24">
//         <div className="max-w-7xl mx-auto px-6">

//           <h2 className="text-4xl font-bold text-center mb-16">
//             How It Works
//           </h2>

//           <div className="grid md:grid-cols-4 gap-10 text-center">

//             <div>
//               <Database className="mx-auto w-12 h-12 text-blue-700 mb-4" />
//               <h3 className="font-semibold">
//                 Select Location
//               </h3>
//             </div>

//             <div>
//               <Cloud className="mx-auto w-12 h-12 text-blue-700 mb-4" />
//               <h3 className="font-semibold">
//                 Retrieve ERA5 + CAMS Data
//               </h3>
//             </div>

//             <div>
//               <BarChart3 className="mx-auto w-12 h-12 text-blue-700 mb-4" />
//               <h3 className="font-semibold">
//                 Generate TMY
//               </h3>
//             </div>

//             <div>
//               <FileText className="mx-auto w-12 h-12 text-blue-700 mb-4" />
//               <h3 className="font-semibold">
//                 Download Reports
//               </h3>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* APPLICATIONS */}
//       <section className="max-w-7xl mx-auto px-6 py-24">

//         <h2 className="text-4xl font-bold text-center mb-16">
//           Applications
//         </h2>

//         <div className="grid md:grid-cols-3 gap-8">

//           <div className="bg-white rounded-2xl p-8 shadow-sm">
//             <h3 className="text-xl font-bold mb-3">
//               Solar Energy
//             </h3>

//             <p className="text-slate-500">
//               Evaluate solar power potential and optimize photovoltaic systems.
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl p-8 shadow-sm">
//             <h3 className="text-xl font-bold mb-3">
//               Building Simulation
//             </h3>

//             <p className="text-slate-500">
//               Accurate weather files for energy performance analysis.
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl p-8 shadow-sm">
//             <h3 className="text-xl font-bold mb-3">
//               Climate Research
//             </h3>

//             <p className="text-slate-500">
//               Long-term meteorological studies and environmental assessments.
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* CTA */}
//       <section className="bg-gradient-to-r from-blue-800 to-cyan-700 text-white py-24">

//         <div className="max-w-5xl mx-auto text-center px-6">

//           <h2 className="text-5xl font-bold">
//             Ready to Generate Climate Data?
//           </h2>

//           <p className="mt-6 text-lg text-blue-100">
//             Start generating Typical Meteorological Year datasets today.
//           </p>

//           <Link
//             href="/generate"
//             className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold mt-8"
//           >
//             Start Now
//             <ArrowRight />
//           </Link>

//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-slate-950 text-slate-300 py-10">

//         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">

//           <div>
//             <h3 className="text-2xl font-bold text-white">
//               ClimaSphere
//             </h3>

//             <p className="mt-2 text-slate-400">
//               Advanced Climate & TMY Generation Platform
//             </p>
//           </div>

//           <div className="mt-8 md:mt-0">
//             <p>© 2026 ClimaSphere</p>
//             <p className="text-slate-500 mt-1">
//               Built with Next.js, Django, ERA5 & CAMS
//             </p>
//           </div>

//         </div>

//       </footer>

//     </main>
//   );
// }

// 'use client';

// import Link from 'next/link';
// import { useEffect, useRef, useState } from 'react';
// import {
//   Sun, Cloud, Globe, BarChart3, Database,
//   FileText, ArrowRight, Wind, Thermometer,
//   Mail, MapPin, Phone, ChevronRight
// } from 'lucide-react';

// /* ─── HORIZONTAL SCROLL CAROUSEL ─── */
// function ClimateCarousel() {
//   const slides = [
//     {
//       id: 1,
//       label: 'Solar Farm Analysis',
//       caption: 'Morocco – Ouarzazate',
//       // put your image at: /public/carousel/solar-farm.jpg
//       src: '/carousel/solar-farm.jpg',
//     },
//     {
//       id: 2,
//       label: 'Wind Resource Mapping',
//       caption: 'Atlas Mountains Region',
//       src: '/carousel/wind-mapping.jpg',
//     },
//     {
//       id: 3,
//       label: 'ERA5 Data Retrieval',
//       caption: 'Copernicus Climate Store',
//       src: '/carousel/era5-data.jpg',
//     },
//     {
//       id: 4,
//       label: 'TMY Report Output',
//       caption: 'PVsyst · SAM · PVGIS formats',
//       src: '/carousel/tmy-report.jpg',
//     },
//     {
//       id: 5,
//       label: 'Building Simulation',
//       caption: 'Energy Performance Studies',
//       src: '/carousel/building-sim.jpg',
//     },
//   ];

//   const trackRef = useRef(null);
//   const [active, setActive] = useState(0);

//   const scrollTo = (i) => {
//     const card = trackRef.current?.children[i];
//     if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
//     setActive(i);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const next = (active + 1) % slides.length;
//       scrollTo(next);
//     }, 3500);
//     return () => clearInterval(interval);
//   }, [active]);

//   return (
//     <div className="relative">
//       {/* Track */}
//       <div
//         ref={trackRef}
//         className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 hide-scrollbar"
//         style={{ scrollbarWidth: 'none' }}
//       >
//         {slides.map((s, i) => (
//           <div
//             key={s.id}
//             onClick={() => setActive(i)}
//             className={`snap-center flex-none w-72 md:w-96 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
//               active === i ? 'ring-4 ring-emerald-400 scale-[1.02]' : 'opacity-80'
//             }`}
//           >
//             {/* Image — replace src with your actual images */}
//             <div className="relative h-52 bg-gradient-to-br from-emerald-800 to-teal-600">
//               <img
//                 src={s.src}
//                 alt={s.label}
//                 className="w-full h-full object-cover"
//                 onError={(e) => { e.target.style.display = 'none'; }}
//               />
//               {/* Fallback gradient shown when no image */}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <Sun className="w-16 h-16 text-white/30" />
//               </div>
//             </div>
//             <div className="bg-white p-4">
//               <p className="font-semibold text-slate-800">{s.label}</p>
//               <p className="text-sm text-slate-400 mt-1">{s.caption}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Dots */}
//       <div className="flex justify-center gap-2 mt-4">
//         {slides.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => scrollTo(i)}
//             className={`rounded-full transition-all duration-300 ${
//               active === i ? 'w-6 h-2 bg-emerald-500' : 'w-2 h-2 bg-slate-300'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ─── MAIN PAGE ─── */
// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-slate-50 font-sans">

//       {/* ══════════ NAVBAR ══════════ */}
//       <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2">
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
//               <Sun className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-extrabold tracking-tight text-slate-900">
//               Clima<span className="text-emerald-500">Sphere</span>
//             </span>
//           </Link>

//           {/* Nav links */}
//           <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
//             <a href="#features" className="hover:text-emerald-600 transition">Features</a>
//             <a href="#how" className="hover:text-emerald-600 transition">How it works</a>
//             <a href="#gallery" className="hover:text-emerald-600 transition">Gallery</a>
//             <a href="#contact" className="hover:text-emerald-600 transition">Contact</a>
//           </nav>

//           {/* CTA buttons */}
//           <div className="flex items-center gap-3">
//             <Link
//               href="/login"
//               className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition px-3 py-2"
//             >
//               Sign in
//             </Link>
//             <Link
//               href="/generate"
//               className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-sm shadow-emerald-200"
//             >
//               Try Now →
//             </Link>
//           </div>

//         </div>
//       </header>

//       {/* ══════════ HERO ══════════ */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900 text-white">

//         {/* Background pattern */}
//         <div className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: 'radial-gradient(circle at 20% 50%, #10b981 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0d9488 0%, transparent 40%)'
//           }}
//         />

//         <div className="relative max-w-7xl mx-auto px-6 py-32">
//           <div className="max-w-3xl">

//             <span className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
//               <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//               ERA5 · CAMS · Copernicus Data
//             </span>

//             <h1 className="text-6xl md:text-7xl font-black leading-[1.05] tracking-tight">
//               Clima
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
//                 Sphere
//               </span>
//             </h1>

//             <p className="text-2xl font-light text-slate-300 mt-4">
//               Generate Typical Meteorological Year data<br />
//               for any location on Earth.
//             </p>

//             <p className="mt-5 text-slate-400 text-lg leading-relaxed max-w-xl">
//               Built for solar engineers, climate researchers, and energy consultants.
//               Powered by ERA5 reanalysis and CAMS solar radiation databases.
//             </p>

//             <div className="flex flex-wrap gap-4 mt-10">
//               <Link
//                 href="/generate"
//                 className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-7 py-3.5 rounded-xl transition shadow-lg shadow-emerald-900/40"
//               >
//                 Generate TMY <ArrowRight className="w-4 h-4" />
//               </Link>
//               <Link
//                 href="/register"
//                 className="flex items-center gap-2 border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 px-7 py-3.5 rounded-xl transition"
//               >
//                 Get Started Free
//               </Link>
//             </div>

//             {/* Stats */}
//             <div className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-white/10">
//               {[
//                 { n: '20+', label: 'Years of climate data' },
//                 { n: '4', label: 'Export formats' },
//                 { n: '∞', label: 'Global coverage' },
//               ].map((s) => (
//                 <div key={s.label}>
//                   <div className="text-3xl font-black text-emerald-400">{s.n}</div>
//                   <div className="text-sm text-slate-400 mt-1">{s.label}</div>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* ══════════ FEATURES ══════════ */}
//       <section id="features" className="max-w-7xl mx-auto px-6 py-24">

//         <div className="text-center mb-14">
//           <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-2">What we offer</p>
//           <h2 className="text-4xl font-bold text-slate-800">Powerful Climate Data Tools</h2>
//           <p className="text-slate-500 mt-3 max-w-xl mx-auto">
//             Everything you need to generate reliable meteorological datasets for any project.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-4 gap-6">
//           {[
//             { icon: <Sun className="w-8 h-8 text-amber-500" />, title: 'Solar Radiation', desc: 'High-resolution GHI, DNI, DHI data from CAMS satellite datasets.' },
//             { icon: <Cloud className="w-8 h-8 text-blue-500" />, title: 'Climate Analysis', desc: 'Long-term ERA5 reanalysis: temperature, wind, humidity, pressure.' },
//             { icon: <Globe className="w-8 h-8 text-emerald-500" />, title: 'Global Coverage', desc: 'Any coordinates on Earth, from deserts to Arctic regions.' },
//             { icon: <BarChart3 className="w-8 h-8 text-purple-500" />, title: 'P50–P99 Scenarios', desc: 'Statistical TMY with median and pessimistic yield scenarios.' },
//             { icon: <Database className="w-8 h-8 text-teal-500" />, title: 'Multi-format Export', desc: 'Compatible with PVsyst, SAM, PVGIS and custom formats.' },
//             { icon: <FileText className="w-8 h-8 text-rose-500" />, title: 'Auto Reports', desc: 'Full Word report with charts, tables and uncertainty analysis.' },
//             { icon: <Wind className="w-8 h-8 text-cyan-500" />, title: 'Wind Data', desc: 'ERA5 wind speed and direction at 10m and 100m height.' },
//             { icon: <Thermometer className="w-8 h-8 text-orange-500" />, title: 'Thermal Analysis', desc: 'Dew point, relative humidity, and air temperature profiles.' },
//           ].map((f) => (
//             <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
//               <div className="mb-4">{f.icon}</div>
//               <h3 className="font-bold text-slate-800">{f.title}</h3>
//               <p className="text-slate-500 text-sm mt-2 leading-relaxed">{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ══════════ HOW IT WORKS ══════════ */}
//       <section id="how" className="bg-gradient-to-br from-emerald-50 to-teal-50 py-24">
//         <div className="max-w-7xl mx-auto px-6">

//           <div className="text-center mb-14">
//             <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-2">Process</p>
//             <h2 className="text-4xl font-bold text-slate-800">From coordinates to TMY in minutes</h2>
//           </div>

//           <div className="grid md:grid-cols-4 gap-6">
//             {[
//               { step: '01', icon: <MapPin className="w-8 h-8" />, title: 'Select Location', desc: 'Click on the interactive map or enter coordinates manually.' },
//               { step: '02', icon: <Cloud className="w-8 h-8" />, title: 'Retrieve Data', desc: 'ERA5 and CAMS data downloaded automatically from Copernicus.' },
//               { step: '03', icon: <BarChart3 className="w-8 h-8" />, title: 'Generate TMY', desc: 'Sandia/NREL method applied to select the most typical months.' },
//               { step: '04', icon: <FileText className="w-8 h-8" />, title: 'Download', desc: 'Get your TMY files and full PDF/Word report instantly.' },
//             ].map((s) => (
//               <div key={s.step} className="relative bg-white rounded-2xl p-7 shadow-sm border border-emerald-100">
//                 <span className="absolute top-4 right-4 text-5xl font-black text-emerald-50 select-none">{s.step}</span>
//                 <div className="text-emerald-600 mb-4">{s.icon}</div>
//                 <h3 className="font-bold text-slate-800 text-lg">{s.title}</h3>
//                 <p className="text-slate-500 text-sm mt-2">{s.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════ GALLERY / CAROUSEL ══════════ */}
//       <section id="gallery" className="max-w-7xl mx-auto px-6 py-24">

//         <div className="text-center mb-12">
//           <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-2">Gallery</p>
//           <h2 className="text-4xl font-bold text-slate-800">See ClimaSphere in action</h2>
//           <p className="text-slate-500 mt-3">
//             Real outputs from our climate generation pipeline.
//           </p>
//         </div>

//         {/*
//           ── IMAGE INSTRUCTIONS ──
//           Place your images in your Next.js /public/carousel/ folder:
//             /public/carousel/solar-farm.jpg
//             /public/carousel/wind-mapping.jpg
//             /public/carousel/era5-data.jpg
//             /public/carousel/tmy-report.jpg
//             /public/carousel/building-sim.jpg
//           They will appear automatically in the carousel below.
//         */}
//         <ClimateCarousel />

//       </section>

//       {/* ══════════ APPLICATIONS ══════════ */}
//       <section className="bg-slate-900 text-white py-24">
//         <div className="max-w-7xl mx-auto px-6">

//           <div className="text-center mb-14">
//             <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-2">Use cases</p>
//             <h2 className="text-4xl font-bold">Built for every climate project</h2>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               { emoji: '☀️', title: 'Solar Energy', desc: 'Evaluate solar power potential, optimize PV systems, and run yield simulations with bankable TMY data.' },
//               { emoji: '🏢', title: 'Building Simulation', desc: 'Accurate weather files for EnergyPlus, IDA ICE, and other building energy performance tools.' },
//               { emoji: '🌍', title: 'Climate Research', desc: 'Long-term meteorological studies, environmental assessments, and climate change impact analysis.' },
//             ].map((a) => (
//               <div key={a.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition">
//                 <span className="text-4xl">{a.emoji}</span>
//                 <h3 className="text-xl font-bold mt-4 mb-3">{a.title}</h3>
//                 <p className="text-slate-400 leading-relaxed">{a.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════ CONTACT ══════════ */}
//       <section id="contact" className="max-w-7xl mx-auto px-6 py-24">

//         <div className="grid md:grid-cols-2 gap-12 items-center">

//           <div>
//             <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">Contact us</p>
//             <h2 className="text-4xl font-bold text-slate-800 mb-4">
//               Have a project in mind?
//             </h2>
//             <p className="text-slate-500 leading-relaxed mb-8">
//               Whether you need a custom TMY dataset, technical support, or want to integrate ClimaSphere into your workflow — we're here to help.
//             </p>

//             <div className="space-y-4">
//               {[
//                 { icon: <Mail className="w-5 h-5 text-emerald-500" />, label: 'Email', value: 'contact@climasphere.com' },
//                 { icon: <MapPin className="w-5 h-5 text-emerald-500" />, label: 'Location', value: 'Green Energy Park, Ben Guerir, Morocco' },
//                 { icon: <Phone className="w-5 h-5 text-emerald-500" />, label: 'Phone', value: '+212 5XX XXX XXX' },
//               ].map((c) => (
//                 <div key={c.label} className="flex items-center gap-4">
//                   <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">{c.icon}</div>
//                   <div>
//                     <p className="text-xs text-slate-400">{c.label}</p>
//                     <p className="font-medium text-slate-700">{c.value}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contact form */}
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
//             <h3 className="font-bold text-slate-800 text-lg mb-6">Send us a message</h3>
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-600 mb-1">First name</label>
//                   <input className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Sara" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-600 mb-1">Last name</label>
//                   <input className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Ait Ali" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
//                 <input type="email" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="you@example.com" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">Message</label>
//                 <textarea rows={4} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none" placeholder="Tell us about your project..." />
//               </div>
//               <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition">
//                 Send Message
//               </button>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* ══════════ CTA BANNER ══════════ */}
//       <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
//         <div className="max-w-4xl mx-auto text-center px-6">
//           <h2 className="text-5xl font-black">Ready to generate climate data?</h2>
//           <p className="mt-4 text-emerald-100 text-lg">Start your first TMY in under 5 minutes.</p>
//           <Link
//             href="/generate"
//             className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-8 py-4 rounded-xl mt-8 hover:bg-emerald-50 transition shadow-lg"
//           >
//             Start Now <ArrowRight />
//           </Link>
//         </div>
//       </section>

//       {/* ══════════ FOOTER ══════════ */}
//       <footer className="bg-slate-950 text-slate-300">

//         {/* Sponsors row */}
//         <div className="border-b border-slate-800">
//           <div className="max-w-7xl mx-auto px-6 py-8">
//             <p className="text-center text-slate-500 text-xs uppercase tracking-widest mb-6">Supported by</p>
//             <div className="flex flex-wrap justify-center items-center gap-10">

//               {/*
//                 ── SPONSOR IMAGE INSTRUCTIONS ──
//                 Place your sponsor logos in /public/sponsors/:
//                   /public/sponsors/sponsor1.png
//                   /public/sponsors/sponsor2.png
//                 They will appear as small logos below.
//               */}
//               {[
//                 { src: '/sponsors/sponsor1.png', name: 'IRESEN' },
//                 { src: '/sponsors/sponsor2.png', name: 'UM6P' },
//               ].map((sp) => (
//                 <div key={sp.name} className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition">
//                   <div className="h-10 w-28 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
//                     <img
//                       src={sp.src}
//                       alt={sp.name}
//                       className="h-8 object-contain"
//                       onError={(e) => { e.target.style.display = 'none'; }}
//                     />
//                     {/* Fallback text if image not loaded */}
//                     <span className="text-slate-400 text-sm font-medium">{sp.name}</span>
//                   </div>
//                 </div>
//               ))}

//             </div>
//           </div>
//         </div>

//         {/* Main footer */}
//         <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

//           {/* Brand */}
//           <div className="md:col-span-1">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
//                 <Sun className="w-4 h-4 text-white" />
//               </div>
//               <span className="text-white font-extrabold text-lg">
//                 Clima<span className="text-emerald-400">Sphere</span>
//               </span>
//             </div>
//             <p className="text-slate-400 text-sm leading-relaxed">
//               Advanced Climate & TMY Generation Platform. Built for solar energy and climate research professionals.
//             </p>
//           </div>

//           {/* Product */}
//           <div>
//             <h4 className="text-white font-semibold mb-4">Product</h4>
//             <ul className="space-y-2 text-sm text-slate-400">
//               {['Generate TMY', 'Job History', 'Export Formats', 'API Access'].map((l) => (
//                 <li key={l}><a href="#" className="hover:text-emerald-400 transition">{l}</a></li>
//               ))}
//             </ul>
//           </div>

//           {/* About */}
//           <div>
//             <h4 className="text-white font-semibold mb-4">About</h4>
//             <p className="text-slate-400 text-sm leading-relaxed">
//               ClimaSphere is developed at the{' '}
//               <span className="text-emerald-400">Green Energy Park</span> — Africa's first renewable energy R&D platform, located in Ben Guerir, Morocco. A joint initiative by IRESEN and UM6P.
//             </p>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="text-white font-semibold mb-4">Contact</h4>
//             <ul className="space-y-3 text-sm text-slate-400">
//               <li className="flex items-start gap-2">
//                 <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-none" />
//                 Green Energy Park, Ben Guerir, Morocco
//               </li>
//               <li className="flex items-center gap-2">
//                 <Mail className="w-4 h-4 text-emerald-400 flex-none" />
//                 contact@climasphere.com
//               </li>
//             </ul>
//           </div>

//         </div>

//         {/* Bottom bar */}
//         <div className="border-t border-slate-800">
//           <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-500">
//             <p>© 2026 ClimaSphere — Green Energy Park</p>
//             <p>Built with Next.js · Django · ERA5 · CAMS</p>
//           </div>
//         </div>

//       </footer>

//       <style jsx global>{`
//         .hide-scrollbar::-webkit-scrollbar { display: none; }
//         .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//     </main>
//   );
// }

'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Sun, Cloud, Globe, BarChart3, Database,
  FileText, ArrowRight, Wind, Thermometer,
  Mail, MapPin, Phone,
} from 'lucide-react';

/* ── Green Energy Park brand colors ──
   primary:  #7dc142  (lime grass green — matches logo)
   dark:     #3a6b1a  (deep forest green)
   light:    #f0f7e8  (baby green tint)
   accent:   #a0d060  (light lime)
*/

/* ─── CAROUSEL — scrolls ONLY inside its own container ─── */
function ClimateCarousel() {
  const slides = [
    { id: 1, label: 'Solar Farm Analysis',    caption: 'Morocco – Ouarzazate',      src: '/carousel/solar-farm.jpg'   },
    { id: 2, label: 'Wind Resource Mapping',  caption: 'Atlas Mountains Region',    src: '/carousel/wind-mapping.jpg' },
    { id: 3, label: 'ERA5 Data Retrieval',    caption: 'Copernicus Climate Store',  src: '/carousel/era5-data.jpg'    },
    { id: 4, label: 'TMY Report Output',      caption: 'PVsyst · SAM · PVGIS',      src: '/carousel/tmy-report.jpg'   },
    { id: 5, label: 'Building Simulation',    caption: 'Energy Performance Studies',src: '/carousel/building-sim.jpg' },
  ];

  const trackRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [active, setActive] = useState(0);

  /* scroll INSIDE the track div — never touches window scroll */
  const goTo = (i: number) => {
  const track = trackRef.current;
  if (!track) return;

  const card = track.children[i] as HTMLElement;
  if (!card) return;

  const offset =
    card.offsetLeft -
    track.offsetLeft -
    track.clientWidth / 2 +
    card.clientWidth / 2;

  track.scrollTo({
    left: offset,
    behavior: 'smooth',
  });

  setActive(i);
};

  /* auto-advance only after user has been on page 2 s */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % slides.length;
        goTo(next);
        return next;
      });
    }, 3800);
    return () => {
  if (timerRef.current) {
    clearInterval(timerRef.current);
  }
};
  }, []);                     // ← empty deps: only runs once on mount

  return (
    <div className="relative select-none">
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {slides.map((s, i) => (
          <div
            key={s.id}
            onClick={() => {
                if (timerRef.current) clearInterval(timerRef.current);
                goTo(i);
              }}
            className="snap-center flex-none w-72 md:w-96 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
            style={{
              boxShadow: active === i ? '0 0 0 4px #7dc142' : 'none',
              transform:  active === i ? 'scale(1.02)' : 'scale(1)',
              opacity:    active === i ? 1 : 0.75,
            }}
          >
            <div className="relative h-52 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3a6b1a, #7dc142)' }}>
              <img src={s.src} alt={s.label}
                className="w-full h-full object-cover absolute inset-0"
                onError={(e) => {(e.currentTarget as HTMLImageElement).style.display = 'none';}} />
              <Sun className="w-16 h-16 relative z-10" style={{ color: 'rgba(255,255,255,0.2)' }} />
            </div>
            <div className="bg-white p-4">
              <p className="font-semibold text-slate-800">{s.label}</p>
              <p className="text-sm text-slate-400 mt-1">{s.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button key={i} onClick={() => { if (timerRef.current) {clearInterval(timerRef.current);} goTo(i); }}
            className="rounded-full transition-all duration-300"
            style={{
              width:  active === i ? '24px' : '8px',
              height: '8px',
              background: active === i ? '#7dc142' : '#cbd5e1',
            }} />
        ))}
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function HomePage() {
  /* Fix hydration: don't touch localStorage during SSR */
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => { setMounted(true); }, []);

  
  const GRN   = '#7dc142';
  const DGRN  = '#3a6b1a';

  return (
    <main className="min-h-screen bg-slate-50 font-sans">

      {/* ══════════ NAVBAR ══════════ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${GRN}, ${DGRN})` }}>
              <Sun className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Clima<span style={{ color: GRN }}>Sphere</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {['#features:Features','#how:How it works','#gallery:Gallery','#contact:Contact'].map(s => {
              const [href, label] = s.split(':');
              return <a key={href} href={href} className="hover:text-green-600 transition">{label}</a>;
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login"
              className="text-sm font-medium text-slate-600 hover:text-green-600 transition px-3 py-2">
              Sign in
            </Link>
            <Link href="/generate"
              className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition shadow-sm"
              style={{ background: GRN }}>
              Try Now →
            </Link>
          </div>

        </div>
      </header>

      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden text-white"
        style={{ background: `linear-gradient(135deg, #2d5a1b 0%, #4a8c20 50%, #3a7018 100%)` }}>

        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `radial-gradient(circle at 15% 50%, ${GRN} 0%, transparent 55%), radial-gradient(circle at 85% 20%, #8bc34a 0%, transparent 45%)` }} />

        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-3xl">

            <span className="inline-flex items-center gap-2 border px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{ background: 'rgba(92,184,92,0.15)', borderColor: 'rgba(92,184,92,0.4)', color: '#a8e6a8' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: GRN }} />
              ERA5 · CAMS · Copernicus Data
            </span>

            <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight">
              Clima
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(90deg, ${GRN}, #8bc34a)` }}>
                Sphere
              </span>
            </h1>

            <p className="text-2xl font-light mt-4" style={{ color: '#b8d4b8' }}>
              Generate Typical Meteorological Year data<br />for any location on Earth.
            </p>

            <p className="mt-5 text-lg leading-relaxed max-w-xl" style={{ color: '#8aaa8a' }}>
              Built for solar engineers, climate researchers, and energy consultants.
              Powered by ERA5 reanalysis and CAMS solar radiation databases.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/generate"
                className="flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl transition"
                style={{ background: GRN, color: 'white' }}>
                Generate TMY <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/register"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl transition"
                style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}>
                Get Started Free
              </Link>
            </div>

            {/* <div className="flex flex-wrap gap-8 mt-14 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {[['20+','Years of climate data'],['4','Export formats'],['∞','Global coverage']].map(([n,l]) => (
                <div key={l}>
                  <div className="text-3xl font-black" style={{ color: GRN }}>{n}</div>
                  <div className="text-sm mt-1" style={{ color: '#8aaa8a' }}>{l}</div>
                </div>
              ))}
            </div> */}

          </div>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="font-semibold text-sm uppercase tracking-widest mb-2" style={{ color: GRN }}>What we offer</p>
          <h2 className="text-4xl font-bold text-slate-800">Powerful Climate Data Tools</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">Everything you need to generate reliable meteorological datasets.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: <Sun className="w-8 h-8" style={{color:'#f59e0b'}} />,       title: 'Solar Radiation',    desc: 'High-resolution GHI, DNI, DHI data from CAMS satellite datasets.' },
            { icon: <Cloud className="w-8 h-8" style={{color:'#3b82f6'}} />,     title: 'Climate Analysis',   desc: 'Long-term ERA5 reanalysis: temperature, wind, humidity, pressure.' },
            { icon: <Globe className="w-8 h-8" style={{color: GRN}} />,          title: 'Global Coverage',    desc: 'Any coordinates on Earth, from deserts to Arctic regions.' },
            { icon: <BarChart3 className="w-8 h-8" style={{color:'#a855f7'}} />, title: 'P50–P99 Scenarios',  desc: 'Statistical TMY with median and pessimistic yield scenarios.' },
            { icon: <Database className="w-8 h-8" style={{color:'#0d9488'}} />,  title: 'Multi-format Export',desc: 'Compatible with PVsyst, SAM, PVGIS and custom formats.' },
            { icon: <FileText className="w-8 h-8" style={{color:'#ef4444'}} />,  title: 'Auto Reports',       desc: 'Full Word report with charts, tables and uncertainty analysis.' },
            { icon: <Wind className="w-8 h-8" style={{color:'#06b6d4'}} />,      title: 'Wind Data',          desc: 'ERA5 wind speed and direction at 10m and 100m height.' },
            { icon: <Thermometer className="w-8 h-8" style={{color:'#f97316'}}/>,title: 'Thermal Analysis',   desc: 'Dew point, relative humidity, and air temperature profiles.' },
          ].map((f) => (
            <div key={f.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-bold text-slate-800">{f.title}</h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section id="how" className="py-24" style={{ background: 'linear-gradient(135deg, #f0f7e8, #f5faf0)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-semibold text-sm uppercase tracking-widest mb-2" style={{ color: GRN }}>Process</p>
            <h2 className="text-4xl font-bold text-slate-800">From coordinates to TMY in minutes</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step:'01', icon:<MapPin className="w-8 h-8"/>,   title:'Select Location', desc:'Click the interactive map or enter coordinates manually.' },
              { step:'02', icon:<Cloud className="w-8 h-8"/>,    title:'Retrieve Data',   desc:'ERA5 and CAMS data downloaded from Copernicus automatically.' },
              { step:'03', icon:<BarChart3 className="w-8 h-8"/>,title:'Generate TMY',    desc:'Sandia/NREL method selects the most representative months.' },
              { step:'04', icon:<FileText className="w-8 h-8"/>, title:'Download',        desc:'Get TMY files and a full Word report instantly.' },
            ].map((s) => (
              <div key={s.step} className="relative bg-white rounded-2xl p-7 shadow-sm"
                style={{ border: `1px solid rgba(92,184,92,0.2)` }}>
                <span className="absolute top-4 right-4 text-5xl font-black select-none"
                  style={{ color: '#e8f5e9' }}>{s.step}</span>
                <div className="mb-4" style={{ color: GRN }}>{s.icon}</div>
                <h3 className="font-bold text-slate-800 text-lg">{s.title}</h3>
                <p className="text-slate-500 text-sm mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ GALLERY ══════════ */}
      <section id="gallery" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <p className="font-semibold text-sm uppercase tracking-widest mb-2" style={{ color: GRN }}>Gallery</p>
          <h2 className="text-4xl font-bold text-slate-800">See ClimaSphere in action</h2>
          <p className="text-slate-500 mt-3">Real outputs from our climate generation pipeline.</p>
        </div>
        {/*
          Place images in /public/carousel/:
            solar-farm.jpg · wind-mapping.jpg · era5-data.jpg · tmy-report.jpg · building-sim.jpg
        */}
        <ClimateCarousel />
      </section>

      {/* ══════════ APPLICATIONS ══════════ */}
      <section className="py-24" style={{ background: '#f9f7f2' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-semibold text-sm uppercase tracking-widest mb-2" style={{ color: GRN }}>Use cases</p>
            <h2 className="text-4xl font-bold text-slate-800">Built for every climate project</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { e:'', t:'Solar Energy',        d:'Evaluate solar power potential, optimize PV systems, and run yield simulations with bankable TMY data.' },
              { e:'', t:'Building Simulation', d:'Accurate weather files for EnergyPlus, IDA ICE, and other building energy performance tools.' },
              { e:'', t:'Climate Research',    d:'Long-term meteorological studies, environmental assessments, and climate change impact analysis.' },
            ].map((a) => (
              <div key={a.t} className="rounded-2xl p-8 bg-white transition hover:shadow-md"
                style={{ border: '1px solid #e8e0d0' }}>
                <span className="text-4xl">{a.e}</span>
                <h3 className="text-xl font-bold mt-4 mb-3 text-slate-800">{a.t}</h3>
                <p className="text-slate-500 leading-relaxed">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: GRN }}>Contact us</p>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Have a project in mind?</h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Need a custom TMY dataset, technical support, or want to integrate ClimaSphere into your workflow? We're here to help.
            </p>
            <div className="space-y-4">
              {[
                { icon:<Mail className="w-5 h-5"/>,   label:'Email',    value:'contact@climasphere.com' },
                { icon:<MapPin className="w-5 h-5"/>, label:'Location', value:'Green Energy Park, Ben Guerir, Morocco' },
                { icon:<Phone className="w-5 h-5"/>,  label:'Phone',    value:'+212 5XX XXX XXX' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: '#e8f5e9', color: GRN }}>{c.icon}</div>
                  <div>
                    <p className="text-xs text-slate-400">{c.label}</p>
                    <p className="font-medium text-slate-700">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h3 className="font-bold text-slate-800 text-lg mb-6">Send us a message</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">First name</label>
                  <input className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2" placeholder="Sara" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Last name</label>
                  <input className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2" placeholder="Ait Ali" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                <input type="email" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Message</label>
                <textarea rows={4} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 resize-none" placeholder="Tell us about your project..." />
              </div>
              <button className="w-full font-semibold py-3 rounded-xl text-white transition"
                style={{ background: GRN }}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <div style={{ background: '#f9f7f2', paddingBottom: '0' }}>
        <div style={{
          height: '80px',
          background: `linear-gradient(135deg, #4a8c20, #7dc142)`,
          clipPath: 'ellipse(55% 100% at 50% 100%)',
          marginBottom: '-2px'
        }} />
      </div>
      <section className="text-white pt-16 pb-20"
        style={{ background: `linear-gradient(135deg, #4a8c20, #7dc142)` }}>
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-black">Ready to generate climate data?</h2>
          <p className="mt-4 text-lg" style={{ color: '#d4f0b0' }}>Start your first TMY in under 5 minutes.</p>
          <Link href="/generate"
            className="inline-flex items-center gap-2 bg-white font-bold px-8 py-4 rounded-xl mt-8 transition hover:bg-slate-100 shadow-lg"
            style={{ color: '#3a6b1a' }}>
            Start Now <ArrowRight />
          </Link>
        </div>
      </section>

      {/* White gap between green CTA and dark footer */}
      <div style={{ height: '60px', background: '#ffffff' }} />

      {/* Gap between CTA and footer */}
      <div style={{ height: '48px', background: '#1e1e14' }} />

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ background: '#1e1e14' }} className="text-slate-300">

        {/* Sponsors */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <p className="text-center text-xs uppercase tracking-widest mb-6" style={{ color: '#a09070' }}>Supported by</p>
            <div className="flex flex-wrap justify-center items-center gap-10">
              {/*
                Place sponsor logos in /public/sponsors/:
                  sponsor1.png  (e.g. IRESEN)
                  sponsor2.png  (e.g. UM6P)
              */}
              {[
                { src: '/sponsors/sponsor2.png', name: 'IRESEN' },
                { src: '/sponsors/sponsor1.png', name: 'GEP'   },
              ].map((sp) => (
                <div key={sp.name} className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition">
                  <div className="h-10 w-32 rounded-lg flex items-center justify-center overflow-hidden px-3"
                    style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <img src={sp.src} alt={sp.name}
                      className="h-7 object-contain"
                      onError={(e) => {
  (e.currentTarget as HTMLImageElement).style.display = 'none';
}} />
                    <span className="text-slate-400 text-sm font-semibold">{sp.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${GRN}, ${DGRN})` }}>
                <Sun className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-extrabold text-lg">
                Clima<span style={{ color: GRN }}>Sphere</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#6a8a6a' }}>
              Advanced Climate & TMY Generation Platform. Built for solar energy and climate research professionals.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm" style={{ color: '#b0a080' }}>
              {['Generate TMY','Job History','Export Formats','API Access'].map(l => (
                <li key={l}><a href="#" className="hover:text-green-400 transition">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <p className="text-sm leading-relaxed" style={{ color: '#6a8a6a' }}>
              ClimaSphere is developed at the{' '}
              <span style={{ color: GRN }}>Green Energy Park</span> — Africa's first renewable energy R&D platform in Ben Guerir, Morocco. A joint initiative by IRESEN and UM6P.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm" style={{ color: '#b0a080' }}>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-none" style={{ color: GRN }} />
                Green Energy Park, Ben Guerir, Morocco
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-none" style={{ color: GRN }} />
                contact@climasphere.com
              </li>
            </ul>
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs"
            style={{ color: '#908060' }}>
            <p>© 2026 ClimaSphere — Green Energy Park</p>
            
          </div>
        </div>

      </footer>

      <style jsx global>{`
        *::-webkit-scrollbar { display: none; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease both; }
        section { transition: background 0.3s ease; }
      `}</style>

    </main>
  );
}