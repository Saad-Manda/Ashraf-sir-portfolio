// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { Mail, Phone, ExternalLink, FileText, Users, Award, Trophy, Github, Linkedin, GraduationCap, ChevronRight, Menu, X, BookOpen, Cpu, Zap, Code2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// // Register GSAP plugins
// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// const Home = () => {
//   const [currentText, setCurrentText] = useState("");
//   const [textIndex, setTextIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [charIndex, setCharIndex] = useState(0);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navRef = useRef<HTMLElement>(null);
//   const heroRef = useRef<HTMLDivElement>(null);
//   const aboutRef = useRef<HTMLElement>(null);
//   const skillsRef = useRef<HTMLElement>(null);
//   const mousePos = useRef({ x: 0, y: 0 });

//   const texts = [
//     'Research Scholar in Electrical Engineering',
//     'Semiconductor Physics & VLSI Design',
//     'IEEE EDS Chapter Chair',
//     'Published Research Scholar'
//   ];

//   useEffect(() => {
//     const speed = isDeleting ? 50 : 100;
//     const timeout = setTimeout(() => {
//       const currentFullText = texts[textIndex];

//       if (isDeleting) {
//         setCurrentText(currentFullText.substring(0, charIndex - 1));
//         setCharIndex(charIndex - 1);
//       } else {
//         setCurrentText(currentFullText.substring(0, charIndex + 1));
//         setCharIndex(charIndex + 1);
//       }

//       if (!isDeleting && charIndex === currentFullText.length) {
//         setTimeout(() => setIsDeleting(true), 2000);
//       } else if (isDeleting && charIndex === 0) {
//         setIsDeleting(false);
//         setTextIndex((textIndex + 1) % texts.length);
//       }
//     }, speed);

//     return () => clearTimeout(timeout);
//   }, [charIndex, isDeleting, textIndex, texts]);

//   useEffect(() => {
//     // Initialize GSAP animations
//     const ctx = gsap.context(() => {
//       // Hero section animations
//       const tl = gsap.timeline();

//       tl.fromTo(".hero-greeting", {
//         opacity: 0,
//         y: 30
//       }, {
//         opacity: 1,
//         y: 0,
//         duration: 1,
//         ease: "power3.out"
//       })
//         .fromTo(".hero-name", {
//           opacity: 0,
//           y: 60
//         }, {
//           opacity: 1,
//           y: 0,
//           duration: 1.2,
//           ease: "power3.out"
//         }, "-=0.7")
//         .fromTo(".hero-description", {
//           opacity: 0,
//           y: 40
//         }, {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           ease: "power3.out"
//         }, "-=0.8")
//         .fromTo(".hero-buttons", {
//           opacity: 0,
//           y: 30
//         }, {
//           opacity: 1,
//           y: 0,
//           duration: 0.8,
//           ease: "power3.out"
//         }, "-=0.5");

//       // Floating particles animation
//       gsap.to(".particle", {
//         y: -20,
//         duration: 6,
//         ease: "power1.inOut",
//         stagger: {
//           each: 0.5,
//           yoyo: true,
//           repeat: -1
//         }
//       });

//       // Navigation scroll effect
//       ScrollTrigger.create({
//         trigger: heroRef.current,
//         start: "top top",
//         end: "bottom top",
//         onUpdate: (self) => {
//           const progress = self.progress;
//           if (navRef.current) {
//             gsap.to(navRef.current, {
//               y: progress > 0.1 ? 0 : -100,
//               duration: 0.6,
//               ease: "power3.out"
//             });
//           }
//         }
//       });

//       // Section animations
//       ScrollTrigger.batch(".animate-on-scroll", {
//         onEnter: (elements) => {
//           gsap.fromTo(elements, {
//             opacity: 0,
//             y: 60
//           }, {
//             opacity: 1,
//             y: 0,
//             duration: 1,
//             stagger: 0.1,
//             ease: "power3.out"
//           });
//         },
//         start: "top 85%"
//       });


//       // Enhanced floating background elements with wider range
//       gsap.set(".bg-particle", {
//         scale: 0,
//         rotation: 0
//       });

//       gsap.to(".bg-particle", {
//         scale: "random(0.8, 1.5)",
//         rotation: 360,
//         x: "random(-100, 100)",
//         y: "random(-50, 50)",
//         duration: "random(15, 25)",
//         ease: "none",
//         repeat: -1,
//         stagger: {
//           each: 2,
//           from: "random"
//         }
//       });

//       // Floating geometric shapes with expanded movement
//       gsap.to(".floating-shape", {
//         y: "random(-80, 80)",
//         x: "random(-60, 60)",
//         rotation: "random(-45, 45)",
//         scale: "random(0.8, 1.3)",
//         duration: "random(6, 12)",
//         ease: "sine.inOut",
//         repeat: -1,
//         yoyo: true,
//         stagger: {
//           each: 0.5,
//           from: "random"
//         }
//       });

//       // Simple tile hover effect - just raise slightly
//       const skillCards = document.querySelectorAll(".skill-card");
//       skillCards.forEach((card) => {
//         const cardElement = card as HTMLElement;

//         cardElement.addEventListener("mouseenter", () => {
//           gsap.to(cardElement, {
//             y: -8,
//             scale: 1.02,
//             duration: 0.3,
//             ease: "power2.out"
//           });
//         });

//         cardElement.addEventListener("mouseleave", () => {
//           gsap.to(cardElement, {
//             y: 0,
//             scale: 1,
//             duration: 0.3,
//             ease: "power2.out"
//           });
//         });
//       });

//       // Academic Journey animation - only animate in on scroll down
//       const educationCards = document.querySelectorAll(".education-card");
//       educationCards.forEach((card, index) => {
//         const cardElement = card as HTMLElement;
//         const isLeft = index % 2 === 0;

//         // Initial hidden state
//         const initialState = {
//           opacity: 0,
//           y: 60,
//           x: window.innerWidth > 768 ? (isLeft ? -80 : 80) : 0,
//           scale: 0.95,
//           rotation: 0
//         };

//         const animatedState = {
//           opacity: 1,
//           y: 0,
//           x: 0,
//           scale: 1,
//           rotation: 0
//         };

//         // Set initial state
//         gsap.set(cardElement, initialState);

//         // Animation only plays when scrolling down into view
//         ScrollTrigger.create({
//           trigger: cardElement,
//           start: "top 85%",
//           onEnter: () => {
//             // Only animate in when scrolling down
//             gsap.to(cardElement, {
//               ...animatedState,
//               duration: 0.8,
//               ease: "power2.out",
//               delay: index * 0.1
//             });
//           },
//           onLeaveBack: () => {
//             // Reset to initial state when scrolling up past the element
//             gsap.set(cardElement, initialState);
//           }
//         });
//       });

//       // Global mouse tracking for subtle parallax effects
//       const handleMouseMove = (e: MouseEvent) => {
//         mousePos.current = { x: e.clientX, y: e.clientY };

//         const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
//         const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

//         gsap.to(".parallax-light", {
//           x: xPercent * 50,
//           y: yPercent * 50,
//           duration: 0.8,
//           ease: "power2.out"
//         });

//         gsap.to(".parallax-medium", {
//           x: xPercent * 30,
//           y: yPercent * 30,
//           duration: 0.6,
//           ease: "power2.out"
//         });

//         gsap.to(".parallax-heavy", {
//           x: xPercent * 15,
//           y: yPercent * 15,
//           duration: 0.4,
//           ease: "power2.out"
//         });
//       };

//       window.addEventListener("mousemove", handleMouseMove);

//       return () => {
//         window.removeEventListener("mousemove", handleMouseMove);
//       };

//     }, [heroRef, navRef, aboutRef, skillsRef]);

//     return () => ctx.revert();
//   }, []);

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       const targetY = element.offsetTop - 80;
//       gsap.to(window, {
//         scrollTo: { y: targetY, autoKill: false },
//         duration: 1.5,
//         ease: "power3.inOut"
//       });
//     }
//     setMobileMenuOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-50 font-body overflow-x-hidden">
//       {/* Floating Island Navigation */}
//       <nav
//         ref={navRef}
//         className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300"
//         style={{ transform: "translateX(-50%) translateY(0px)" }}
//       >
//         <div className="glass-nav rounded-full px-6 py-3 shadow-2xl">
//           <div className="flex items-center space-x-8">
//             <div className="text-base font-bold text-gradient-blue font-display">
//               Ashraf Maniyar
//             </div>

//             <div className="hidden md:flex space-x-4">
//               {['Home', 'About', 'Skills', 'Education', 'Publications', 'Experience', 'Contact'].map((item) => (
//                 <button
//                   key={item}
//                   onClick={() => scrollToSection(item.toLowerCase())}
//                   className="text-slate-300 hover:text-blue-400 transition-all duration-300 text-xs font-medium tracking-wide hover:scale-105"
//                   data-testid={`nav-${item.toLowerCase()}`}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>

//             <button
//               className="md:hidden text-slate-300 hover:text-blue-400 transition-colors duration-300"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               data-testid="mobile-menu-toggle"
//             >
//               {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="absolute top-full left-0 right-0 mt-2 glass-nav rounded-2xl p-4 shadow-2xl md:hidden">
//             <div className="space-y-4">
//               {['Home', 'About', 'Skills', 'Education', 'Publications', 'Experience', 'Contact'].map((item) => (
//                 <button
//                   key={item}
//                   onClick={() => scrollToSection(item.toLowerCase())}
//                   className="block w-full text-left text-slate-300 hover:text-blue-400 transition-colors duration-300 py-2 text-xs font-medium"
//                   data-testid={`mobile-nav-${item.toLowerCase()}`}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <section ref={heroRef} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08),transparent_50%)]"></div>

//         {/* Enhanced floating particles and background elements */}
//         <div className="absolute inset-0">
//           {[...Array(12)].map((_, i) => (
//             <div
//               key={i}
//               className={`particle absolute w-1 h-1 bg-blue-400/60 rounded-full blur-sm parallax-light`}
//               style={{
//                 top: `${5 + (i * 8)}%`,
//                 left: `${3 + (i * 8.5)}%`,
//               }}
//             />
//           ))}

//           {/* Geometric floating shapes */}
//           {[...Array(6)].map((_, i) => (
//             <div
//               key={`shape-${i}`}
//               className={`floating-shape absolute parallax-medium`}
//               style={{
//                 top: `${15 + (i * 15)}%`,
//                 left: `${10 + (i * 15)}%`,
//                 width: `${8 + (i * 3)}px`,
//                 height: `${8 + (i * 3)}px`,
//               }}
//             >
//               {i % 3 === 0 && (
//                 <div className="w-full h-full border border-blue-400/30 rounded-full animate-pulse" />
//               )}
//               {i % 3 === 1 && (
//                 <div className="w-full h-full border border-purple-400/30 rotate-45" />
//               )}
//               {i % 3 === 2 && (
//                 <div className="w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded" />
//               )}
//             </div>
//           ))}

//           {/* Larger background particles */}
//           {[...Array(8)].map((_, i) => (
//             <div
//               key={`bg-${i}`}
//               className={`bg-particle absolute parallax-heavy`}
//               style={{
//                 top: `${20 + (i * 12)}%`,
//                 left: `${15 + (i * 10)}%`,
//                 width: `${20 + (i * 5)}px`,
//                 height: `${20 + (i * 5)}px`,
//               }}
//             >
//               <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full blur-xl" />
//             </div>
//           ))}

//           {/* Quirky professional elements - floating code snippets */}
//           <div className="absolute top-20 right-10 parallax-light opacity-20">
//             <div className="font-mono text-blue-400/40 text-xs rotate-12 animate-pulse">
//               {'{ research: "nanowire" }'}
//             </div>
//           </div>

//           <div className="absolute bottom-32 left-16 parallax-medium opacity-20">
//             <div className="font-mono text-purple-400/40 text-xs -rotate-6 animate-pulse">
//               PhD.execute();
//             </div>
//           </div>

//           <div className="absolute top-1/3 right-1/4 parallax-heavy opacity-20">
//             <div className="font-mono text-green-400/40 text-xs rotate-3 animate-pulse">
//               IEEE.publish(research);
//             </div>
//           </div>
//         </div>

//         <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="hero-greeting mb-8">
//           </div>

//           <h1 className="hero-name text-6xl md:text-8xl font-black mb-8 font-display leading-none">
//             <span className="text-white drop-shadow-2xl" style={{ textShadow: '0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(59,130,246,0.4)' }}>Ashraf</span>
//             <br />
//             <span className="text-gradient-blue opacity-90">Maniyar</span>
//           </h1>

//           <div className="hero-description text-xl md:text-3xl text-slate-300 mb-12 h-20 font-light">
//             <span className="border-r-2 border-blue-400 pr-2 font-mono" data-testid="typewriter-text">
//               {currentText}
//             </span>
//           </div>

//           <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center items-center">
//             <Button
//               onClick={() => scrollToSection('contact')}
//               className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center"
//               data-testid="button-contact"
//             >
//               Get In Touch
//             </Button>
//             <a
//               href="/assets/Ashraf cv__1755283681744.pdf"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-full sm:w-auto inline-block"
//             >
//               <Button
//                 variant="outline"
//                 className="w-full sm:w-auto border-slate-600 hover:border-blue-400 text-slate-300 hover:text-blue-400 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm hover:backdrop-blur-md transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
//                 data-testid="button-resume"
//               >
//                 See Resumé <FileText className="w-5 h-5" />
//               </Button>
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section ref={aboutRef} id="about" className="py-32 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="animate-on-scroll text-center mb-20">
//             <h2 className="text-5xl md:text-6xl font-black mb-6 font-display text-gradient">About Me</h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
//             <div className="animate-on-scroll perspective-1000">
//               <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto rounded-3xl glass p-2 sm:p-3 overflow-hidden transform hover:rotateY-6 transition-all duration-500 preserve-3d">
//                 <img 
//                   src="/ashraf-photo.jpg" 
//                   alt="Ashraf Maniyar" 
//                   className="w-full h-full object-cover rounded-2xl shadow-2xl"
//                 />
//               </div>
//             </div>

//             <div className="animate-on-scroll space-y-6 lg:space-y-8">
//               <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light">
//                 I am a dedicated <span className="text-blue-400 font-semibold">PhD researcher</span> in Electrical Engineering at IIT Patna, specializing in <span className="text-blue-400 font-semibold">semiconductor device physics</span> and <span className="text-blue-400 font-semibold">VLSI design</span>. My research focuses on nanowire GAA MOSFETs, with particular emphasis on process-induced effects and their impact on device performance.
//               </p>
//               <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light">
//                 With a strong academic background including an M.Tech in VLSI Design from NIT Kurukshetra and B.Tech in Electronics and Communication from NIT Nagaland, I bring both theoretical knowledge and practical experience to my research.
//               </p>
//               <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light">
//                 Currently serving as <span className="text-blue-400 font-semibold">Chair of the IEEE EDS student branch chapter</span> at IIT Patna, I am passionate about advancing semiconductor technology and contributing to the scientific community through high-impact research publications.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Skills Section */}
//       <section ref={skillsRef} id="skills" className="py-32">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="animate-on-scroll text-center mb-20">
//             <h2 className="text-5xl md:text-6xl font-black mb-6 font-display text-gradient">Technical Skills</h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
//           </div>

//           {/* Software Tools */}
//           <div className="animate-on-scroll mb-20">
//             <h3 className="text-3xl font-bold mb-12 text-blue-400 font-display text-center">Software Tools</h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 perspective-1000">
//               {[
//                 { name: 'MATLAB', icon: Code2, color: 'from-orange-500 to-red-500' },
//                 { name: 'TCAD', icon: Cpu, color: 'from-blue-500 to-cyan-500' },
//                 { name: 'XILINX', icon: Zap, color: 'from-purple-500 to-pink-500' },
//                 { name: 'Cadence Virtuoso', icon: FileText, color: 'from-green-500 to-teal-500' },
//                 { name: 'ATLAS', icon: BookOpen, color: 'from-indigo-500 to-purple-500' },
//                 { name: 'MS Office', icon: FileText, color: 'from-yellow-500 to-orange-500' }
//               ].map((tool, index) => (
//                 <div
//                   key={tool.name}
//                   className="skill-card glass p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 text-center group cursor-pointer preserve-3d"
//                   data-testid={`skill-${tool.name.toLowerCase().replace(' ', '-')}`}
//                 >
//                   <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${tool.color} rounded-2xl mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
//                     <tool.icon className="text-white w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
//                   </div>
//                   <p className="text-sm sm:text-base lg:text-lg font-semibold group-hover:text-blue-400 transition-colors duration-300">{tool.name}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Research Areas */}
//           <div className="animate-on-scroll mb-20">
//             <h3 className="text-3xl font-bold mb-12 text-blue-400 font-display text-center">Research Areas</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1000">
//               {[
//                 {
//                   name: 'Machine Learning',
//                   desc: 'Applied ML techniques in semiconductor device modeling and analysis',
//                   icon: Award,
//                   color: 'from-emerald-500 to-teal-500'
//                 },
//                 {
//                   name: 'User Research',
//                   desc: 'Research methodology and experimental design for academic studies',
//                   icon: Users,
//                   color: 'from-blue-500 to-indigo-500'
//                 },
//                 {
//                   name: 'Numerical Methods',
//                   desc: 'Advanced mathematical modeling and computational analysis',
//                   icon: Trophy,
//                   color: 'from-purple-500 to-pink-500'
//                 }
//               ].map((area, index) => (
//                 <div
//                   key={area.name}
//                   className="skill-card glass p-6 lg:p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 group cursor-pointer preserve-3d"
//                   data-testid={`research-${area.name.toLowerCase().replace(' ', '-')}`}
//                 >
//                   <div className={`w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${area.color} rounded-2xl mb-4 lg:mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
//                     <area.icon className="text-white w-7 h-7 lg:w-8 lg:h-8" />
//                   </div>
//                   <h4 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3 group-hover:text-blue-400 transition-colors duration-300">{area.name}</h4>
//                   <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{area.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Core Sciences */}
//           <div className="animate-on-scroll">
//             <h3 className="text-3xl font-bold mb-12 text-blue-400 font-display text-center">Core Sciences</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto perspective-1000">
//               {[
//                 {
//                   name: 'Physics',
//                   desc: 'Specialization in semiconductor physics and quantum mechanics',
//                   color: 'from-cyan-500 to-blue-500'
//                 },
//                 {
//                   name: 'Chemistry',
//                   desc: 'Understanding of materials science and chemical processes',
//                   color: 'from-rose-500 to-orange-500'
//                 }
//               ].map((science, index) => (
//                 <div
//                   key={science.name}
//                   className="skill-card glass p-6 lg:p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 group cursor-pointer preserve-3d"
//                   data-testid={`science-${science.name.toLowerCase()}`}
//                 >
//                   <div className={`w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${science.color} rounded-2xl mb-4 lg:mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
//                     <GraduationCap className="text-white w-7 h-7 lg:w-8 lg:h-8" />
//                   </div>
//                   <h4 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3 group-hover:text-blue-400 transition-colors duration-300">{science.name}</h4>
//                   <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{science.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Education Section */}
//       <section id="education" className="py-32 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="animate-on-scroll text-center mb-20">
//             <h2 className="text-5xl md:text-6xl font-black mb-6 font-display text-gradient">Academic Journey</h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
//           </div>

//           <div className="relative max-w-6xl mx-auto">
//             {/* Enhanced timeline with flowing elements */}
//             <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-500"></div>

//             {/* Enhanced flowing orbs along timeline */}
//             <div className="absolute left-1/2 top-10 w-3 h-3 bg-blue-400/40 rounded-full animate-pulse parallax-light" style={{ transform: 'translateX(-50%)' }}></div>
//             <div className="absolute left-1/2 top-1/3 w-2 h-2 bg-purple-400/40 rounded-full animate-pulse parallax-medium" style={{ transform: 'translateX(-50%)', animationDelay: '1s' }}></div>
//             <div className="absolute left-1/2 top-2/3 w-2 h-2 bg-indigo-400/40 rounded-full animate-pulse parallax-light" style={{ transform: 'translateX(-50%)', animationDelay: '1.5s' }}></div>
//             <div className="absolute left-1/2 bottom-20 w-4 h-4 bg-cyan-400/40 rounded-full animate-pulse parallax-heavy" style={{ transform: 'translateX(-50%)', animationDelay: '2s' }}></div>

//             {/* Education entries */}
//             {[
//               {
//                 degree: 'Ph.D. in Electrical Engineering',
//                 institution: 'Indian Institute of Technology Patna',
//                 year: 'Expected: May 2025',
//                 grade: 'CGPA: 7.75',
//                 description: 'Research focus on nanowire GAA MOSFETs and semiconductor device physics',
//                 side: 'left'
//               },
//               {
//                 degree: 'Research Publications',
//                 institution: 'International Journals & Conferences',
//                 year: '2021-2024',
//                 grade: '15+ Publications',
//                 description: 'Contributing to cutting-edge research in VLSI and semiconductor technology',
//                 side: 'right'
//               },
//               {
//                 degree: 'M.Tech in VLSI Design',
//                 institution: 'National Institute of Technology Kurukshetra',
//                 year: '2020',
//                 grade: 'CGPA: 8.42',
//                 extra: '5th Rank in Department',
//                 description: 'Specialized in advanced VLSI design methodologies and semiconductor devices',
//                 side: 'left'
//               },
//               {
//                 degree: 'IEEE EDS Chapter Leadership',
//                 institution: 'Student Branch Chapter Chair',
//                 year: '2022-Present',
//                 grade: 'Leadership Role',
//                 description: 'Leading student initiatives and promoting semiconductor education',
//                 side: 'right'
//               },
//               {
//                 degree: 'B.Tech in Electronics and Communication',
//                 institution: 'National Institute of Technology Nagaland',
//                 year: '2016',
//                 grade: 'Percentage: 80.00%',
//                 extra: '2nd Rank in Department',
//                 description: 'Foundation in electronics, communication systems, and digital signal processing',
//                 side: 'left'
//               }
//             ].map((edu, index) => (
//               <div
//                 key={edu.degree}
//                 className="education-card flex flex-col md:flex-row items-center mb-24 relative"
//               >
//                 <div className={`md:w-1/2 ${edu.side === 'left' ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-3'} mb-8 md:mb-0`}>
//                   <Card className="skill-card glass border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-blue-500/20">
//                     <CardContent className="p-8">
//                       <div className="flex items-center justify-between mb-4">
//                         <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">{edu.year}</span>
//                         <GraduationCap className="text-blue-400" size={28} />
//                       </div>
//                       <h3 className="text-2xl font-bold text-blue-400 mb-4 font-display">{edu.degree}</h3>
//                       <p className="text-slate-300 mb-3 text-lg font-medium">{edu.institution}</p>
//                       <p className="text-blue-300 font-semibold text-lg mb-3">{edu.grade}</p>
//                       {edu.description && (
//                         <p className="text-slate-400 text-sm leading-relaxed mb-3 italic">{edu.description}</p>
//                       )}
//                       {edu.extra && (
//                         <p className="text-green-400 font-medium text-sm bg-green-500/15 px-3 py-2 rounded-full inline-block border border-green-500/30">{edu.extra}</p>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </div>
//                 <div className="relative md:order-2 z-10">
//                   <div className="timeline-orb w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full border-4 border-slate-950 shadow-lg transition-all duration-300"></div>
//                 </div>
//                 <div className={`md:w-1/2 ${edu.side === 'right' ? 'md:pr-12' : 'md:pl-12'}`}></div>
//               </div>
//             ))}
//           </div>

//           {/* Achievements */}
//           <div className="animate-on-scroll mt-24">
//             <h3 className="text-3xl font-bold mb-12 text-blue-400 text-center font-display">Academic Achievements</h3>
//             <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//               <Card className="skill-card glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
//                 <CardContent className="p-8">
//                   <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl mb-6 flex items-center justify-center shadow-lg">
//                     <Trophy className="text-white" size={32} />
//                   </div>
//                   <h4 className="text-2xl font-bold mb-3">GATE Qualified</h4>
//                   <p className="text-slate-400">GATE-2016, 2018 (Electronics and Communication Engineering)</p>
//                 </CardContent>
//               </Card>
//               <Card className="skill-card glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
//                 <CardContent className="p-8">
//                   <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-6 flex items-center justify-center shadow-lg">
//                     <Award className="text-white" size={32} />
//                   </div>
//                   <h4 className="text-2xl font-bold mb-3">UGC PG Scholarship</h4>
//                   <p className="text-slate-400">GATE-based fellowship for pursuing M.Tech degree</p>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Publications Section */}
//       <section id="publications" className="py-32">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="animate-on-scroll text-center mb-20">
//             <h2 className="text-5xl md:text-6xl font-black mb-6 font-display text-gradient">Publications</h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
//           </div>

//           {/* Journal Papers */}
//           <div className="animate-on-scroll mb-20">
//             <h3 className="text-3xl font-bold mb-12 text-blue-400 font-display">Journal Papers</h3>
//             <div className="space-y-8">
//               {[
//                 {
//                   title: "Impact of Process-Induced Inclined Side-Walls on Gate-Induced Drain Leakage (GIDL) Current of Nanowire GAA MOSFETs",
//                   authors: "A. Maniyar, P. S. T. N. Srinivas, K. -S. Chang-Liao, and P. K. Tiwari",
//                   journal: "IEEE Transactions on Electron Devices, 2022",
//                   color: "from-blue-500 to-cyan-500",
//                   href: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=K5JC1goAAAAJ&authuser=1&citation_for_view=K5JC1goAAAAJ:d1gkVwhDpl0C'
//                 },
//                 {
//                   title: "Impact of Process-Induced Inclined Sidewalls on Gate Leakage Current of Nanowire GAA MOSFETs",
//                   authors: "A. Maniyar, P. S. T. N. Srinivas, K. -S. Chang-Liao, and P. K. Tiwari",
//                   journal: "IEEE Transactions on Electron Devices, 2024",
//                   color: "from-purple-500 to-pink-500",
//                   href: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=K5JC1goAAAAJ&authuser=1&citation_for_view=K5JC1goAAAAJ:2osOgNQ5qMEC'
//                 },
//                 {
//                   title: "Visible region absorption in TMDs/phosphorene heterostructures for use in solar energy conversion applications",
//                   authors: "A. Maniyar, and Sudhanshu Choudhary",
//                   journal: "RSC Advances, 2020",
//                   color: "from-green-500 to-teal-500",
//                   href: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=K5JC1goAAAAJ&authuser=1&citation_for_view=K5JC1goAAAAJ:u-x6o8ySG0sC'
//                 },
//                 {
//                   title: "Si/SiGe Superlattice-Based Double Gate Feedback Field-Effect Transistor and its application in 1T-DRAM",
//                   authors: "Subir Das, Ashraf Maniyar, Pushp Raj, Jawar Singh, Pramod Kumar Tiwari",
//                   journal: "Microelectronics Journal",
//                   color: "from-blue-500 to-cyan-500",
//                   href: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=K5JC1goAAAAJ&authuser=1&citation_for_view=K5JC1goAAAAJ:qjMakFHDy7sC'
//                 }
//               ].map((paper, index) => (
//                 <a
//                   key={paper.title}
//                   href={paper.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block hover:no-underline"
//                 >
//                   <Card className="skill-card glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] group">
//                     <CardContent className="p-8">
//                       <div className="flex items-start gap-6">
//                         <div className={`w-14 h-14 bg-gradient-to-br ${paper.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0 mt-1`}>
//                           <FileText className="text-white" size={24} />
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="text-xl font-bold mb-3 text-slate-200 group-hover:text-blue-400 transition-colors duration-300 leading-tight">{paper.title}</h4>
//                           <p className="text-slate-400 mb-3">{paper.authors}</p>
//                           <p className="text-blue-300 font-semibold">
//                             {paper.journal}
//                             <ExternalLink className="inline-block ml-2 w-4 h-4 text-blue-300 group-hover:text-blue-400" />
//                           </p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Conference Papers */}
//           <div className="animate-on-scroll">
//             <h3 className="text-3xl font-bold mb-12 text-blue-400 font-display">Conference Papers</h3>
//             <div className="space-y-8">
//               {[
//                 // {
//                 //   title: "Impact of Substrate Doping on Gate-Induced Drain Leakage Current in FD SOI MOSFETs",
//                 //   authors: "A. Maniyar, P. S. T. N. Srinivas, and P. K. Tiwari",
//                 //   conference: "International Conference on Electrical Engineering (ICEE), Bangalore, 2022",
//                 //   color: "from-orange-500 to-red-500",
//                 //   href: ''
//                 // },
//                 {
//                   title: "Impact of Process-Induced Inclined Sidewalls on Small Signal Parameters of Silicon Nanowire GAAMOSFET",
//                   authors: "A. Maniyar, P. S. T. N. Srinivas, and P. K. Tiwari",
//                   conference: "TENCON 2023 - 2023 IEEE Region 10 Conference, Chiang Mai, Thailand, 2023",
//                   color: "from-indigo-500 to-purple-500",
//                   href: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=K5JC1goAAAAJ&authuser=1&citation_for_view=K5JC1goAAAAJ:9yKSN-GCB0IC'
//                 }

//               ].map((paper, index) => (
//                 <a
//                   key={paper.title}
//                   href={paper.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block hover:no-underline"
//                 >
//                   <Card className="skill-card glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] group">
//                     <CardContent className="p-8">
//                       <div className="flex items-start gap-6">
//                         <div className={`w-14 h-14 bg-gradient-to-br ${paper.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0 mt-1`}>
//                           <FileText className="text-white" size={24} />
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="text-xl font-bold mb-3 text-slate-200 group-hover:text-blue-400 transition-colors duration-300 leading-tight">{paper.title}</h4>
//                           <p className="text-slate-400 mb-3">{paper.authors}</p>
//                           <p className="text-blue-300 font-semibold">
//                             {paper.conference}
//                             <ExternalLink className="inline-block ml-2 w-4 h-4 text-blue-300 group-hover:text-blue-400" />
//                           </p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Work Experience Section */}
//       <section id="experience" className="py-32 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="animate-on-scroll text-center mb-20">
//             <h2 className="text-5xl md:text-6xl font-black mb-6 font-display text-gradient">Work Experience</h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
//           </div>

//           <div className="space-y-12">
//             {[
//               {
//                 role: "Chair, IEEE EDS Student Branch Chapter",
//                 organization: "IIT Patna",
//                 period: "2024 - Present",
//                 description: "Leading student activities and research initiatives in electron devices society",
//                 color: "from-blue-500 to-indigo-500"
//               },
//               {
//                 role: "Aircraft Systems Testing Engineer",
//                 organization: "Hindustan Aeronautics Limited, Korwa (U.P.)",
//                 period: "Aug 2017 - Aug 2018",
//                 description: "Testing of Auto computer and Roll computer units of Jaguar Aircraft, assembling and testing of various electronic modules",
//                 color: "from-green-500 to-teal-500"
//               },
//               {
//                 role: "Teaching Assistant",
//                 organization: "IIT Patna",
//                 period: "PhD Duration",
//                 description: "Teaching subjects: Engineering Physics, Basic Semiconductor devices, Linear Integrated Circuit Design, Digital electronics, Integrated Circuit Design, Basic Electronics, Circuit Theory",
//                 color: "from-purple-500 to-pink-500"
//               }
//             ].map((exp, index) => (
//               <div key={exp.role} className="animate-on-scroll">
//                 <Card className="skill-card glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] group">
//                   <CardContent className="p-8">
//                     <div className="flex items-start gap-6">
//                       <div className={`w-16 h-16 bg-gradient-to-br ${exp.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0`}>
//                         <Users className="text-white" size={32} />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-2xl font-bold mb-2 text-blue-400 font-display">{exp.role}</h3>
//                         <p className="text-xl text-slate-300 mb-2">{exp.organization}</p>
//                         <p className="text-slate-400 mb-4 font-mono">{exp.period}</p>
//                         <p className="text-slate-300 leading-relaxed">{exp.description}</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-32">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="animate-on-scroll text-center mb-20">
//             <h2 className="text-5xl md:text-6xl font-black mb-6 font-display text-gradient">Let's Connect</h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8"></div>
//             <p className="text-xl text-slate-300 max-w-3xl mx-auto">
//               Interested in collaboration, research opportunities, or have questions about my work? Let's start a conversation.
//             </p>
//           </div>

//           <div className="animate-on-scroll max-w-4xl mx-auto">
//             <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
//               {[
//                 {
//                   icon: Mail,
//                   label: "Email",
//                   value: "ashrafchand14@gmail.com",
//                   href: "mailto:ashrafchand14@gmail.com",
//                   color: "from-blue-500 to-cyan-500"
//                 },
//                 {
//                   icon: Phone,
//                   label: "Phone",
//                   value: "+91-8619990216",
//                   href: "tel:+918619990216",
//                   color: "from-green-500 to-teal-500"
//                 }
//               ].map((contact, index) => (
//                 <Card
//                   key={contact.label}
//                   className="skill-card glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
//                 >
//                   <CardContent className="p-8 text-center">
//                     <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
//                       <contact.icon className="text-white" size={32} />
//                     </div>
//                     <h3 className="text-xl font-bold mb-2 text-blue-400">{contact.label}</h3>
//                     <p className="text-slate-300">{contact.value}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             <div className="text-center mt-16">
//               <h3 className="text-2xl font-bold mb-8 text-blue-400">Connect With Me</h3>
//               <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
//                 <a
//                   href="https://linkedin.com/in/ashraf-maniyar-82845191"
//                   className="block"
//                   data-testid="linkedin-card"
//                 >
//                   <Card className="skill-card glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 group cursor-pointer h-full">
//                     <CardContent className="p-6 text-center">
//                       <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
//                         <Linkedin className="text-white" size={32} />
//                       </div>
//                       <h4 className="text-xl font-bold mb-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">LinkedIn</h4>
//                       <p className="text-slate-400 text-sm">Connect with me professionally and view my career journey</p>
//                       <div className="mt-4 flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
//                         <span className="text-sm font-medium">View Profile</span>
//                         <ExternalLink className="w-4 h-4 ml-2" />
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </a>
//                 <a
//                   href="https://scholar.google.com/citations?user=K5JC1goAAAAJ"
//                   className="block"
//                   data-testid="scholar-card"
//                 >
//                   <Card className="skill-card glass border border-slate-700/50 hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 group cursor-pointer h-full">
//                     <CardContent className="p-6 text-center">
//                       <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
//                         <GraduationCap className="text-white" size={32} />
//                       </div>
//                       <h4 className="text-xl font-bold mb-2 text-red-400 group-hover:text-red-300 transition-colors duration-300">Google Scholar</h4>
//                       <p className="text-slate-400 text-sm">Explore my research publications and academic contributions</p>
//                       <div className="mt-4 flex items-center justify-center text-red-400 group-hover:text-red-300 transition-colors duration-300">
//                         <span className="text-sm font-medium">View Publications</span>
//                         <ExternalLink className="w-4 h-4 ml-2" />
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;



import React, { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone, ExternalLink, FileText, Users, Award, Trophy, Linkedin, GraduationCap, Menu, X, BookOpen, Cpu, Zap, Code2, Sun, Moon, LucideIcon } from "lucide-react";

// Type definitions
interface Tool {
  name: string;
  icon: LucideIcon;
  color: string;
}

interface ResearchArea {
  name: string;
  desc: string;
  icon: LucideIcon;
  color: string;
}

interface Science {
  name: string;
  desc: string;
  color: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  grade: string;
  extra?: string;
  description?: string;
}

interface Publication {
  title: string;
  authors: string;
  journal?: string;
  conference?: string;
  color: string;
  href: string;
}

interface Experience {
  role: string;
  organization: string;
  period: string;
  description: string;
  color: string;
}

interface Contact {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  color: string;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline';
  className?: string;
  [key: string]: any;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const Home: React.FC = () => {
  const [currentText, setCurrentText] = useState<string>("");
  const [textIndex, setTextIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);

  const texts: string[] = [
    'Research Scholar in Electrical Engineering',
    'Semiconductor Physics & VLSI Design',
    'IEEE EDS Chapter Chair',
    'Published Research Scholar'
  ];

  const toggleTheme = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const speed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      const currentFullText = texts[textIndex];

      if (isDeleting) {
        setCurrentText(currentFullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setCurrentText(currentFullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex === currentFullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Theme classes
  const themeClasses = isDarkMode 
    ? "min-h-screen bg-slate-950 text-slate-50" 
    : "min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900";

  const cardClass = isDarkMode 
    ? "bg-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 backdrop-blur-sm rounded-xl" 
    : "bg-white/70 border border-blue-200/50 hover:border-blue-400/70 backdrop-blur-sm shadow-lg hover:shadow-blue-200/50 rounded-xl";

  const navClass = isDarkMode 
    ? "bg-slate-900/80 border border-slate-700/30 backdrop-blur-md" 
    : "bg-white/80 border border-blue-200/30 shadow-lg backdrop-blur-md";

  const textGradient = isDarkMode 
    ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" 
    : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent";

  const primaryText = isDarkMode ? "text-slate-300" : "text-gray-700";
  const secondaryText = isDarkMode ? "text-slate-400" : "text-gray-600";
  const accentColor = isDarkMode ? "text-blue-400" : "text-blue-600";

  const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'default', className, ...props }) => {
    const baseClasses = "px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105";
    const variantClasses = variant === 'outline' 
      ? `border ${isDarkMode ? 'border-slate-600 hover:border-blue-400 text-slate-300 hover:text-blue-400' : 'border-blue-300 hover:border-blue-500 text-blue-700 hover:text-blue-800 hover:bg-blue-50'}`
      : `${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white' : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'} shadow-xl hover:shadow-2xl`;
    
    return (
      <button 
        onClick={onClick} 
        className={`${baseClasses} ${variantClasses} ${className || ''}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  const Card: React.FC<CardProps> = ({ children, className }) => (
    <div className={`${className} transition-all duration-300`}>
      {children}
    </div>
  );

  const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
    <div className={`p-6 ${className || ''}`}>
      {children}
    </div>
  );

  // Data arrays with proper typing
  const tools: Tool[] = [
    { name: 'MATLAB', icon: Code2, color: 'from-orange-500 to-red-500' },
    { name: 'TCAD', icon: Cpu, color: 'from-blue-500 to-cyan-500' },
    { name: 'XILINX', icon: Zap, color: 'from-purple-500 to-pink-500' },
    { name: 'Cadence Virtuoso', icon: FileText, color: 'from-green-500 to-teal-500' },
    { name: 'ATLAS', icon: BookOpen, color: 'from-indigo-500 to-purple-500' },
    { name: 'MS Office', icon: FileText, color: 'from-yellow-500 to-orange-500' }
  ];

  const researchAreas: ResearchArea[] = [
    {
      name: 'Machine Learning',
      desc: 'Applied ML techniques in semiconductor device modeling and analysis',
      icon: Award,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      name: 'User Research',
      desc: 'Research methodology and experimental design for academic studies',
      icon: Users,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Numerical Methods',
      desc: 'Advanced mathematical modeling and computational analysis',
      icon: Trophy,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const sciences: Science[] = [
    {
      name: 'Physics',
      desc: 'Specialization in semiconductor physics and quantum mechanics',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Chemistry',
      desc: 'Understanding of materials science and chemical processes',
      color: 'from-rose-500 to-orange-500'
    }
  ];

  const educationData: Education[] = [
    {
      degree: 'Ph.D. in Electrical Engineering',
      institution: 'Indian Institute of Technology Patna',
      year: 'Expected: May 2025',
      grade: 'CGPA: 7.75',
      description: 'Research focus on nanowire GAA MOSFETs and semiconductor device physics'
    },
    {
      degree: 'M.Tech in VLSI Design',
      institution: 'National Institute of Technology Kurukshetra',
      year: '2020',
      grade: 'CGPA: 8.42',
      extra: '5th Rank in Department',
      description: 'Specialized in advanced VLSI design methodologies and semiconductor devices'
    },
    {
      degree: 'B.Tech in Electronics and Communication',
      institution: 'National Institute of Technology Nagaland',
      year: '2016',
      grade: 'Percentage: 80.00%',
      extra: '2nd Rank in Department',
      description: 'Foundation in electronics, communication systems, and digital signal processing'
    }
  ];

  const journalPapers: Publication[] = [
    {
      title: "Impact of Process-Induced Inclined Side-Walls on Gate-Induced Drain Leakage (GIDL) Current of Nanowire GAA MOSFETs",
      authors: "A. Maniyar, P. S. T. N. Srinivas, K. -S. Chang-Liao, and P. K. Tiwari",
      journal: "IEEE Transactions on Electron Devices, 2022",
      color: "from-blue-500 to-cyan-500",
      href: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=K5JC1goAAAAJ&authuser=1&citation_for_view=K5JC1goAAAAJ:d1gkVwhDpl0C'
    },
    {
      title: "Impact of Process-Induced Inclined Sidewalls on Gate Leakage Current of Nanowire GAA MOSFETs",
      authors: "A. Maniyar, P. S. T. N. Srinivas, K. -S. Chang-Liao, and P. K. Tiwari",
      journal: "IEEE Transactions on Electron Devices, 2024",
      color: "from-purple-500 to-pink-500",
      href: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=K5JC1goAAAAJ&authuser=1&citation_for_view=K5JC1goAAAAJ:2osOgNQ5qMEC'
    },
    {
      title: "Visible region absorption in TMDs/phosphorene heterostructures for use in solar energy conversion applications",
      authors: "A. Maniyar, and Sudhanshu Choudhary",
      journal: "RSC Advances, 2020",
      color: "from-green-500 to-teal-500",
      href: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=K5JC1goAAAAJ&authuser=1&citation_for_view=K5JC1goAAAAJ:u-x6o8ySG0sC'
    }
  ];

  const conferencePapers: Publication[] = [
    {
      title: "Impact of Process-Induced Inclined Sidewalls on Small Signal Parameters of Silicon Nanowire GAAMOSFET",
      authors: "A. Maniyar, P. S. T. N. Srinivas, and P. K. Tiwari",
      conference: "TENCON 2023 - 2023 IEEE Region 10 Conference, Chiang Mai, Thailand, 2023",
      color: "from-indigo-500 to-purple-500",
      href: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=K5JC1goAAAAJ&authuser=1&citation_for_view=K5JC1goAAAAJ:9yKSN-GCB0IC'
    }
  ];

  const experiences: Experience[] = [
    {
      role: "Chair, IEEE EDS Student Branch Chapter",
      organization: "IIT Patna",
      period: "2024 - Present",
      description: "Leading student activities and research initiatives in electron devices society",
      color: "from-blue-500 to-indigo-500"
    },
    {
      role: "Aircraft Systems Testing Engineer",
      organization: "Hindustan Aeronautics Limited, Korwa (U.P.)",
      period: "Aug 2017 - Aug 2018",
      description: "Testing of Auto computer and Roll computer units of Jaguar Aircraft, assembling and testing of various electronic modules",
      color: "from-green-500 to-teal-500"
    },
    {
      role: "Teaching Assistant",
      organization: "IIT Patna",
      period: "PhD Duration",
      description: "Teaching subjects: Engineering Physics, Basic Semiconductor devices, Linear Integrated Circuit Design, Digital electronics, Integrated Circuit Design, Basic Electronics, Circuit Theory",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const contactInfo: Contact[] = [
    {
      icon: Mail,
      label: "Email",
      value: "ashrafchand14@gmail.com",
      href: "mailto:ashrafchand14@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-8619990216",
      href: "tel:+918619990216",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "IIT Patna, Bihar",
      href: "#",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const menuItems: string[] = ['Home', 'About', 'Skills', 'Education', 'Publications', 'Experience', 'Contact'];

  return (
    <div className={`font-sans overflow-x-hidden transition-all duration-500 ${themeClasses}`}>
      {/* Navigation */}
      <nav
        ref={navRef}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300"
      >
        <div className={`rounded-full px-4 md:px-6 py-3 shadow-2xl ${navClass}`}>
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className={`text-sm md:text-base font-bold ${textGradient}`}>
              Ashraf Maniyar
            </div>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-blue-100'}`}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              )}
            </button>

            <div className="hidden lg:flex space-x-3">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-all duration-300 text-xs font-medium tracking-wide hover:scale-105 ${primaryText} ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className={`lg:hidden transition-colors duration-300 ${primaryText} ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl p-4 shadow-2xl lg:hidden ${navClass}`}>
            <div className="space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left transition-colors duration-300 py-2 text-sm font-medium ${primaryText} ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}></div>
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]' : 'bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]'}`}></div>

        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full blur-sm animate-pulse ${isDarkMode ? 'bg-blue-400/60' : 'bg-blue-500/40'}`}
              style={{
                top: `${10 + (i * 12)}%`,
                left: `${5 + (i * 11)}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 lg:mb-8 leading-none">
            <span className={`drop-shadow-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Ashraf
            </span>
            <br />
            <span className={textGradient}>Maniyar</span>
          </h1>

          <div className="text-lg sm:text-xl lg:text-3xl mb-8 lg:mb-12 h-16 lg:h-20 font-light">
            <span className={`border-r-2 pr-2 font-mono ${isDarkMode ? 'border-blue-400 text-slate-300' : 'border-blue-500 text-gray-700'}`}>
              {currentText}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <Button onClick={() => scrollToSection('contact')}>
              Get In Touch
            </Button>
            <Button variant="outline">
              See Resumé
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className={`py-16 lg:py-32 ${isDarkMode ? 'bg-gradient-to-br from-slate-900/50 to-slate-800/30' : 'bg-gradient-to-br from-white/50 to-blue-50/30'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className={`text-3xl sm:text-4xl lg:text-6xl font-black mb-4 lg:mb-6 ${textGradient}`}>About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Card className={`w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 mx-auto transition-all duration-500 ${cardClass}`}>
                <CardContent className="flex items-center justify-center h-full">
                  <GraduationCap size={80} className={`${isDarkMode ? 'text-blue-400/80' : 'text-blue-500/80'}`} />
                </CardContent>
              </Card>
            </div>

            <div className="order-1 lg:order-2 space-y-4 lg:space-y-6">
              <p className={`text-base lg:text-xl leading-relaxed font-light ${primaryText}`}>
                I am a dedicated <span className={`font-semibold ${accentColor}`}>PhD researcher</span> in Electrical Engineering at IIT Patna, specializing in <span className={`font-semibold ${accentColor}`}>semiconductor device physics</span> and <span className={`font-semibold ${accentColor}`}>VLSI design</span>. My research focuses on nanowire GAA MOSFETs, with particular emphasis on process-induced effects and their impact on device performance.
              </p>
              <p className={`text-base lg:text-xl leading-relaxed font-light ${primaryText}`}>
                With a strong academic background including an M.Tech in VLSI Design from NIT Kurukshetra and B.Tech in Electronics and Communication from NIT Nagaland, I bring both theoretical knowledge and practical experience to my research.
              </p>
              <p className={`text-base lg:text-xl leading-relaxed font-light ${primaryText}`}>
                Currently serving as <span className={`font-semibold ${accentColor}`}>Chair of the IEEE EDS student branch chapter</span> at IIT Patna, I am passionate about advancing semiconductor technology and contributing to the scientific community through high-impact research publications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="py-16 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className={`text-3xl sm:text-4xl lg:text-6xl font-black mb-4 lg:mb-6 ${textGradient}`}>Technical Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </div>

          <div className="mb-16 lg:mb-20">
            <h3 className={`text-2xl lg:text-3xl font-bold mb-8 lg:mb-12 text-center ${accentColor}`}>Software Tools</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-8">
              {tools.map((tool) => (
                <Card
                  key={tool.name}
                  className={`text-center group cursor-pointer transition-all duration-300 hover:scale-105 ${cardClass}`}
                >
                  <CardContent>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${tool.color} rounded-2xl mx-auto mb-3 lg:mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <tool.icon className="text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                    </div>
                    <p className={`text-xs sm:text-sm lg:text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'}`}>{tool.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16 lg:mb-20">
            <h3 className={`text-2xl lg:text-3xl font-bold mb-8 lg:mb-12 text-center ${accentColor}`}>Research Areas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {researchAreas.map((area) => (
                <Card
                  key={area.name}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${cardClass}`}
                >
                  <CardContent>
                    <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${area.color} rounded-2xl mb-4 lg:mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <area.icon className="text-white w-6 h-6 lg:w-8 lg:h-8" />
                    </div>
                    <h4 className={`text-lg lg:text-xl font-bold mb-2 lg:mb-3 transition-colors duration-300 ${isDarkMode ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'}`}>{area.name}</h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${secondaryText}`}>{area.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-2xl lg:text-3xl font-bold mb-8 lg:mb-12 text-center ${accentColor}`}>Core Sciences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {sciences.map((science) => (
                <Card
                  key={science.name}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${cardClass}`}
                >
                  <CardContent>
                    <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${science.color} rounded-2xl mb-4 lg:mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <GraduationCap className="text-white w-6 h-6 lg:w-8 lg:h-8" />
                    </div>
                    <h4 className={`text-lg lg:text-xl font-bold mb-2 lg:mb-3 transition-colors duration-300 ${isDarkMode ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'}`}>{science.name}</h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${secondaryText}`}>{science.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className={`py-16 lg:py-32 ${isDarkMode ? 'bg-gradient-to-br from-slate-900/50 to-slate-800/30' : 'bg-gradient-to-br from-white/50 to-blue-50/30'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className={`text-3xl sm:text-4xl lg:text-6xl font-black mb-4 lg:mb-6 ${textGradient}`}>Academic Journey</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </div>

          <div className="space-y-12">
            {educationData.map((edu) => (
              <Card key={edu.degree} className={`transition-all duration-500 transform hover:scale-105 shadow-xl ${cardClass}`}>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${isDarkMode ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300'}`}>{edu.year}</span>
                    <GraduationCap className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} size={24} />
                  </div>
                  <h3 className={`text-xl lg:text-2xl font-bold mb-4 ${accentColor}`}>{edu.degree}</h3>
                  <p className={`mb-3 text-lg font-medium ${primaryText}`}>{edu.institution}</p>
                  <p className={`font-semibold text-lg mb-3 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>{edu.grade}</p>
                  {edu.description && (
                    <p className={`text-sm leading-relaxed mb-3 italic ${secondaryText}`}>{edu.description}</p>
                  )}
                  {edu.extra && (
                    <p className={`font-medium text-sm px-3 py-2 rounded-full inline-block border ${isDarkMode ? 'text-green-400 bg-green-500/15 border-green-500/30' : 'text-green-600 bg-green-100 border-green-300'}`}>{edu.extra}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 lg:mt-24">
            <h3 className={`text-2xl lg:text-3xl font-bold mb-8 lg:mb-12 text-center ${accentColor}`}>Academic Achievements</h3>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              <Card className={`transition-all duration-300 transform hover:scale-105 ${cardClass}`}>
                <CardContent>
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl mb-4 lg:mb-6 flex items-center justify-center shadow-lg">
                    <Trophy className="text-white" size={24} />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold mb-3">GATE Qualified</h4>
                  <p className={secondaryText}>GATE-2016, 2018 (Electronics and Communication Engineering)</p>
                </CardContent>
              </Card>
              <Card className={`transition-all duration-300 transform hover:scale-105 ${cardClass}`}>
                <CardContent>
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-4 lg:mb-6 flex items-center justify-center shadow-lg">
                    <Award className="text-white" size={24} />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold mb-3">UGC PG Scholarship</h4>
                  <p className={secondaryText}>GATE-based fellowship for pursuing M.Tech degree</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-16 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className={`text-3xl sm:text-4xl lg:text-6xl font-black mb-4 lg:mb-6 ${textGradient}`}>Publications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </div>

          <div className="mb-16 lg:mb-20">
            <h3 className={`text-2xl lg:text-3xl font-bold mb-8 lg:mb-12 ${accentColor}`}>Journal Papers</h3>
            <div className="space-y-6 lg:space-y-8">
              {journalPapers.map((paper) => (
                <a
                  key={paper.title}
                  href={paper.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:no-underline"
                >
                  <Card className={`transition-all duration-300 transform hover:scale-[1.02] group ${cardClass}`}>
                    <CardContent>
                      <div className="flex items-start gap-4 lg:gap-6">
                        <div className={`w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${paper.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0 mt-1`}>
                          <FileText className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-lg lg:text-xl font-bold mb-3 leading-tight transition-colors duration-300 ${isDarkMode ? 'text-slate-200 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-600'}`}>{paper.title}</h4>
                          <p className={`mb-3 ${secondaryText}`}>{paper.authors}</p>
                          <p className={`font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                            {paper.journal}
                            <ExternalLink className={`inline-block ml-2 w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-blue-300 group-hover:text-blue-400' : 'text-blue-600 group-hover:text-blue-700'}`} />
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-2xl lg:text-3xl font-bold mb-8 lg:mb-12 ${accentColor}`}>Conference Papers</h3>
            <div className="space-y-6 lg:space-y-8">
              {conferencePapers.map((paper) => (
                <a
                  key={paper.title}
                  href={paper.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:no-underline"
                >
                  <Card className={`transition-all duration-300 transform hover:scale-[1.02] group ${cardClass}`}>
                    <CardContent>
                      <div className="flex items-start gap-4 lg:gap-6">
                        <div className={`w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${paper.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0 mt-1`}>
                          <FileText className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-lg lg:text-xl font-bold mb-3 leading-tight transition-colors duration-300 ${isDarkMode ? 'text-slate-200 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-600'}`}>{paper.title}</h4>
                          <p className={`mb-3 ${secondaryText}`}>{paper.authors}</p>
                          <p className={`font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                            {paper.conference}
                            <ExternalLink className={`inline-block ml-2 w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-blue-300 group-hover:text-blue-400' : 'text-blue-600 group-hover:text-blue-700'}`} />
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className={`py-16 lg:py-32 ${isDarkMode ? 'bg-gradient-to-br from-slate-900/50 to-slate-800/30' : 'bg-gradient-to-br from-white/50 to-blue-50/30'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className={`text-3xl sm:text-4xl lg:text-6xl font-black mb-4 lg:mb-6 ${textGradient}`}>Work Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </div>

          <div className="space-y-8 lg:space-y-12">
            {experiences.map((exp) => (
              <Card key={exp.role} className={`transition-all duration-300 transform hover:scale-[1.02] group ${cardClass}`}>
                <CardContent>
                  <div className="flex items-start gap-4 lg:gap-6">
                    <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${exp.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0`}>
                      <Users className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl lg:text-2xl font-bold mb-2 ${accentColor}`}>{exp.role}</h3>
                      <p className={`text-lg lg:text-xl mb-2 ${primaryText}`}>{exp.organization}</p>
                      <p className={`mb-4 font-mono text-sm lg:text-base ${secondaryText}`}>{exp.period}</p>
                      <p className={`leading-relaxed ${primaryText}`}>{exp.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className={`text-3xl sm:text-4xl lg:text-6xl font-black mb-4 lg:mb-6 ${textGradient}`}>Let's Connect</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8"></div>
            <p className={`text-lg lg:text-xl max-w-3xl mx-auto ${primaryText}`}>
              Interested in collaboration, research opportunities, or have questions about my work? Let's start a conversation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {contactInfo.map((contact) => (
                <Card
                  key={contact.label}
                  className={`transition-all duration-300 transform hover:scale-105 group cursor-pointer ${cardClass}`}
                >
                  <CardContent className="text-center">
                    <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${contact.color} rounded-2xl mx-auto mb-4 lg:mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <contact.icon className="text-white" size={24} />
                    </div>
                    <h3 className={`text-lg lg:text-xl font-bold mb-2 ${accentColor}`}>{contact.label}</h3>
                    <p className={primaryText}>{contact.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12 lg:mt-16">
              <div className="flex justify-center space-x-6 lg:space-x-8">
                <a
                  href="https://linkedin.com/in/ashraf-maniyar-82845191"
                  className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Linkedin className="text-white" size={24} />
                </a>
                <a
                  href="https://scholar.google.co.in/citations?user=P-ouprAAAAAJ&hl=en"
                  className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <GraduationCap className="text-white" size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;