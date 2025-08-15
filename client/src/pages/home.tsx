import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone, ExternalLink, FileText, Users, Award, Trophy, Github, Linkedin, GraduationCap, ChevronRight, Menu, X, BookOpen, Cpu, Zap, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const texts = [
    'PhD Researcher in Electrical Engineering',
    'Semiconductor Device Physics Expert', 
    'VLSI Design Specialist',
    'IEEE EDS Chapter Chair',
    'Published Research Scholar'
  ];

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

  useEffect(() => {
    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Hero section animations
      const tl = gsap.timeline();
      
      tl.fromTo(".hero-greeting", {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .fromTo(".hero-name", {
        opacity: 0,
        y: 60
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.7")
      .fromTo(".hero-description", {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .fromTo(".hero-buttons", {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");

      // Floating particles animation
      gsap.to(".particle", {
        y: -20,
        duration: 6,
        ease: "power1.inOut",
        stagger: {
          each: 0.5,
          yoyo: true,
          repeat: -1
        }
      });

      // Navigation scroll effect
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          if (navRef.current) {
            gsap.to(navRef.current, {
              y: progress > 0.1 ? 0 : -100,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });

      // Section animations
      ScrollTrigger.batch(".animate-on-scroll", {
        onEnter: (elements) => {
          gsap.fromTo(elements, {
            opacity: 0,
            y: 60
          }, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
          });
        },
        start: "top 85%"
      });

      // Enhanced floating background elements
      gsap.set(".bg-particle", { 
        scale: 0,
        rotation: 0
      });
      
      gsap.to(".bg-particle", {
        scale: 1,
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
        stagger: {
          each: 2,
          from: "random"
        }
      });

      // Floating geometric shapes
      gsap.to(".floating-shape", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(4, 8)",
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.3,
          from: "random"
        }
      });

      // Skill cards cursor-following hover animations
      const skillCards = document.querySelectorAll(".skill-card");
      skillCards.forEach((card) => {
        const cardElement = card as HTMLElement;
        
        cardElement.addEventListener("mousemove", (e) => {
          const rect = cardElement.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          const rotateX = -(y / rect.height) * 20;
          const rotateY = (x / rect.width) * 20;
          
          gsap.to(cardElement, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.2,
            ease: "power2.out"
          });
        });
        
        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });

      // Global mouse tracking for subtle parallax effects
      const handleMouseMove = (e: MouseEvent) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
        
        const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;
        
        gsap.to(".parallax-light", {
          x: xPercent * 50,
          y: yPercent * 50,
          duration: 1,
          ease: "power2.out"
        });
        
        gsap.to(".parallax-medium", {
          x: xPercent * 30,
          y: yPercent * 30,
          duration: 1,
          ease: "power2.out"
        });
        
        gsap.to(".parallax-heavy", {
          x: xPercent * 15,
          y: yPercent * 15,
          duration: 1,
          ease: "power2.out"
        });
      };
      
      window.addEventListener("mousemove", handleMouseMove);
      
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };

    }, [heroRef, navRef, aboutRef, skillsRef]);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, offsetY: 80 },
        duration: 1.2,
        ease: "power3.inOut"
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-body overflow-x-hidden">
      {/* Floating Island Navigation */}
      <nav 
        ref={navRef}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300"
        style={{ transform: "translateX(-50%) translateY(-100px)" }}
      >
        <div className="glass-nav rounded-full px-8 py-4 shadow-2xl">
          <div className="flex items-center space-x-8">
            <div className="text-lg font-bold text-gradient-blue font-display">
              Ashraf Maniyar
            </div>
            
            <div className="hidden md:flex space-x-6">
              {['Home', 'About', 'Skills', 'Education', 'Publications', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-slate-300 hover:text-blue-400 transition-all duration-300 text-sm font-medium tracking-wide hover:scale-105"
                  data-testid={`nav-${item.toLowerCase()}`}
                >
                  {item}
                </button>
              ))}
            </div>
            
            <button
              className="md:hidden text-slate-300 hover:text-blue-400 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 glass-nav rounded-2xl p-6 shadow-2xl md:hidden">
            <div className="space-y-4">
              {['Home', 'About', 'Skills', 'Education', 'Publications', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-slate-300 hover:text-blue-400 transition-colors duration-300 py-2 text-sm font-medium"
                  data-testid={`mobile-nav-${item.toLowerCase()}`}
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08),transparent_50%)]"></div>
        
        {/* Enhanced floating particles and background elements */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`particle absolute w-1 h-1 bg-blue-400/60 rounded-full blur-sm parallax-light`}
              style={{
                top: `${5 + (i * 8)}%`,
                left: `${3 + (i * 8.5)}%`,
              }}
            />
          ))}
          
          {/* Geometric floating shapes */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`shape-${i}`}
              className={`floating-shape absolute parallax-medium`}
              style={{
                top: `${15 + (i * 15)}%`,
                left: `${10 + (i * 15)}%`,
                width: `${8 + (i * 3)}px`,
                height: `${8 + (i * 3)}px`,
              }}
            >
              {i % 3 === 0 && (
                <div className="w-full h-full border border-blue-400/30 rounded-full animate-pulse" />
              )}
              {i % 3 === 1 && (
                <div className="w-full h-full border border-purple-400/30 rotate-45" />
              )}
              {i % 3 === 2 && (
                <div className="w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded" />
              )}
            </div>
          ))}
          
          {/* Larger background particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`bg-${i}`}
              className={`bg-particle absolute parallax-heavy`}
              style={{
                top: `${20 + (i * 12)}%`,
                left: `${15 + (i * 10)}%`,
                width: `${20 + (i * 5)}px`,
                height: `${20 + (i * 5)}px`,
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full blur-xl" />
            </div>
          ))}
          
          {/* Quirky professional elements - floating code snippets */}
          <div className="absolute top-20 right-10 parallax-light opacity-20">
            <div className="font-mono text-blue-400/40 text-xs rotate-12 animate-pulse">
              {'{ research: "nanowire" }'}
            </div>
          </div>
          
          <div className="absolute bottom-32 left-16 parallax-medium opacity-20">
            <div className="font-mono text-purple-400/40 text-xs -rotate-6 animate-pulse">
              PhD.execute();
            </div>
          </div>
          
          <div className="absolute top-1/3 right-1/4 parallax-heavy opacity-20">
            <div className="font-mono text-green-400/40 text-xs rotate-3 animate-pulse">
              IEEE.publish(research);
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <div className="hero-greeting mb-8">
            <span className="text-blue-400 text-xl font-medium tracking-wide">Hi 👋, I am</span>
          </div>
          
          <h1 className="hero-name text-6xl md:text-8xl font-black mb-8 font-display leading-none">
            <span className="text-gradient-blue">Ashraf</span>
            <br />
            <span className="text-white drop-shadow-2xl" style={{ textShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(59,130,246,0.3)' }}>Maniyar</span>
          </h1>
          
          <div className="hero-description text-xl md:text-3xl text-slate-300 mb-12 h-20 font-light">
            <span className="border-r-2 border-blue-400 pr-2 font-mono" data-testid="typewriter-text">
              {currentText}
            </span>
          </div>
          
          <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              data-testid="button-contact"
            >
              Get In Touch
            </Button>
            <Button 
              variant="outline"
              className="border-slate-600 hover:border-blue-400 text-slate-300 hover:text-blue-400 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm hover:backdrop-blur-md transform hover:scale-105 transition-all duration-300"
              data-testid="button-resume"
            >
              See Resumé
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-32 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 font-display text-gradient">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll perspective-1000">
              <div className="w-96 h-96 mx-auto rounded-3xl glass p-8 flex items-center justify-center transform hover:rotateY-6 transition-all duration-500 preserve-3d">
                <GraduationCap size={120} className="text-blue-400/80" />
              </div>
            </div>
            
            <div className="animate-on-scroll space-y-8">
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                I am a dedicated <span className="text-blue-400 font-semibold">PhD researcher</span> in Electrical Engineering at IIT Patna, specializing in <span className="text-blue-400 font-semibold">semiconductor device physics</span> and <span className="text-blue-400 font-semibold">VLSI design</span>. My research focuses on nanowire GAA MOSFETs, with particular emphasis on process-induced effects and their impact on device performance.
              </p>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                With a strong academic background including an M.Tech in VLSI Design from NIT Kurukshetra and B.Tech in Electronics and Communication from NIT Nagaland, I bring both theoretical knowledge and practical experience to my research.
              </p>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                Currently serving as <span className="text-blue-400 font-semibold">Chair of the IEEE EDS student branch chapter</span> at IIT Patna, I am passionate about advancing semiconductor technology and contributing to the scientific community through high-impact research publications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 font-display text-gradient">Technical Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </div>

          {/* Software Tools */}
          <div className="animate-on-scroll mb-20">
            <h3 className="text-3xl font-bold mb-12 text-blue-400 font-display text-center">Software Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 perspective-1000">
              {[
                { name: 'MATLAB', icon: Code2, color: 'from-orange-500 to-red-500' },
                { name: 'TCAD', icon: Cpu, color: 'from-blue-500 to-cyan-500' },
                { name: 'XILINX', icon: Zap, color: 'from-purple-500 to-pink-500' },
                { name: 'Cadence Virtuoso', icon: FileText, color: 'from-green-500 to-teal-500' },
                { name: 'ATLAS', icon: BookOpen, color: 'from-indigo-500 to-purple-500' },
                { name: 'MS Office', icon: FileText, color: 'from-yellow-500 to-orange-500' }
              ].map((tool, index) => (
                <div
                  key={tool.name}
                  className="skill-card glass p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 text-center group cursor-pointer preserve-3d"
                  data-testid={`skill-${tool.name.toLowerCase().replace(' ', '-')}`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <tool.icon className="text-white" size={32} />
                  </div>
                  <p className="text-lg font-semibold group-hover:text-blue-400 transition-colors duration-300">{tool.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Research Areas */}
          <div className="animate-on-scroll mb-20">
            <h3 className="text-3xl font-bold mb-12 text-blue-400 font-display text-center">Research Areas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
              {[
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
              ].map((area, index) => (
                <div
                  key={area.name}
                  className="skill-card glass p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 group cursor-pointer preserve-3d"
                  data-testid={`research-${area.name.toLowerCase().replace(' ', '-')}`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <area.icon className="text-white" size={32} />
                  </div>
                  <h4 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">{area.name}</h4>
                  <p className="text-slate-400 leading-relaxed">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Sciences */}
          <div className="animate-on-scroll">
            <h3 className="text-3xl font-bold mb-12 text-blue-400 font-display text-center">Core Sciences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto perspective-1000">
              {[
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
              ].map((science, index) => (
                <div
                  key={science.name}
                  className="skill-card glass p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 group cursor-pointer preserve-3d"
                  data-testid={`science-${science.name.toLowerCase()}`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${science.color} rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <GraduationCap className="text-white" size={32} />
                  </div>
                  <h4 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">{science.name}</h4>
                  <p className="text-slate-400 leading-relaxed">{science.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 font-display text-gradient">Academic Journey</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Enhanced timeline with flowing elements */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-500"></div>
            
            {/* Flowing orbs along timeline */}
            <div className="absolute left-1/2 top-10 w-3 h-3 bg-blue-400/60 rounded-full animate-pulse parallax-light" style={{ transform: 'translateX(-50%)' }}></div>
            <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-purple-400/60 rounded-full animate-pulse parallax-medium" style={{ transform: 'translateX(-50%)', animationDelay: '1s' }}></div>
            <div className="absolute left-1/2 bottom-20 w-4 h-4 bg-indigo-400/60 rounded-full animate-pulse parallax-light" style={{ transform: 'translateX(-50%)', animationDelay: '2s' }}></div>

            {/* Education entries */}
            {[
              {
                degree: 'Ph.D. in Electrical Engineering',
                institution: 'Indian Institute of Technology Patna',
                year: 'Expected: May 2025',
                grade: 'CGPA: 7.75',
                side: 'left'
              },
              {
                degree: 'M.Tech in VLSI Design',
                institution: 'National Institute of Technology Kurukshetra',
                year: '2020',
                grade: 'CGPA: 8.42',
                extra: '5th Rank in Department',
                side: 'right'
              },
              {
                degree: 'B.Tech in Electronics and Communication',
                institution: 'National Institute of Technology Nagaland',
                year: '2016',
                grade: 'Percentage: 80.00%',
                extra: '2nd Rank in Department',
                side: 'left'
              }
            ].map((edu, index) => (
              <div 
                key={edu.degree}
                className="animate-on-scroll flex flex-col md:flex-row items-center mb-16 relative"
              >
                <div className={`md:w-1/2 ${edu.side === 'left' ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-3'} mb-8 md:mb-0`}>
                  <Card className="skill-card glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-blue-400 mb-3 font-display">{edu.degree}</h3>
                      <p className="text-slate-300 mb-3 text-lg">{edu.institution}</p>
                      <p className="text-slate-400 mb-3">{edu.year}</p>
                      <p className="text-blue-300 font-semibold text-lg">{edu.grade}</p>
                      {edu.extra && <p className="text-slate-400 mt-3">{edu.extra}</p>}
                    </CardContent>
                  </Card>
                </div>
                <div className="relative md:order-2 z-10">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full border-4 border-slate-950 shadow-lg"></div>
                </div>
                <div className={`md:w-1/2 ${edu.side === 'right' ? 'md:pr-12' : 'md:pl-12'}`}></div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="animate-on-scroll mt-24">
            <h3 className="text-3xl font-bold mb-12 text-blue-400 text-center font-display">Academic Achievements</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="skill-card glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl mb-6 flex items-center justify-center shadow-lg">
                    <Trophy className="text-white" size={32} />
                  </div>
                  <h4 className="text-2xl font-bold mb-3">GATE Qualified</h4>
                  <p className="text-slate-400">GATE-2016, 2018 (Electronics and Communication Engineering)</p>
                </CardContent>
              </Card>
              <Card className="skill-card glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-6 flex items-center justify-center shadow-lg">
                    <Award className="text-white" size={32} />
                  </div>
                  <h4 className="text-2xl font-bold mb-3">UGC PG Scholarship</h4>
                  <p className="text-slate-400">GATE-based fellowship for pursuing M.Tech degree</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 font-display text-gradient">Publications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </div>

          {/* Journal Papers */}
          <div className="animate-on-scroll mb-20">
            <h3 className="text-3xl font-bold mb-12 text-blue-400 font-display">Journal Papers</h3>
            <div className="space-y-8">
              {[
                {
                  title: "Impact of Process-Induced Inclined Side-Walls on Gate-Induced Drain Leakage (GIDL) Current of Nanowire GAA MOSFETs",
                  authors: "A. Maniyar, P. S. T. N. Srinivas, K. -S. Chang-Liao, and P. K. Tiwari",
                  journal: "IEEE Transactions on Electron Devices, 2022",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Impact of Process-Induced Inclined Sidewalls on Gate Leakage Current of Nanowire GAA MOSFETs",
                  authors: "A. Maniyar, P. S. T. N. Srinivas, K. -S. Chang-Liao, and P. K. Tiwari",
                  journal: "IEEE Transactions on Electron Devices, 2024",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  title: "Visible region absorption in TMDs/phosphorene heterostructures for use in solar energy conversion applications",
                  authors: "A. Maniyar, and Sudhanshu Choudhary",
                  journal: "RSC Advances, 2020",
                  color: "from-green-500 to-teal-500"
                }
              ].map((paper, index) => (
                <div key={paper.title} className="animate-on-scroll">
                  <Card className="skill-card glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] group">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className={`w-14 h-14 bg-gradient-to-br ${paper.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0 mt-1`}>
                          <FileText className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-3 text-slate-200 group-hover:text-blue-400 transition-colors duration-300 leading-tight">{paper.title}</h4>
                          <p className="text-slate-400 mb-3">{paper.authors}</p>
                          <p className="text-blue-300 font-semibold">{paper.journal}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Conference Papers */}
          <div className="animate-on-scroll">
            <h3 className="text-3xl font-bold mb-12 text-blue-400 font-display">Conference Papers</h3>
            <div className="space-y-8">
              {[
                {
                  title: "Impact of Substrate Doping on Gate-Induced Drain Leakage Current in FD SOI MOSFETs",
                  authors: "A. Maniyar, P. S. T. N. Srinivas, and P. K. Tiwari",
                  conference: "International Conference on Electrical Engineering (ICEE), Bangalore, 2022",
                  color: "from-orange-500 to-red-500"
                },
                {
                  title: "Impact of Process-Induced Inclined Sidewalls on Small Signal Parameters of Silicon Nanowire GAAMOSFET",
                  authors: "A. Maniyar, P. S. T. N. Srinivas, and P. K. Tiwari",
                  conference: "TENCON 2023 - 2023 IEEE Region 10 Conference, Chiang Mai, Thailand, 2023",
                  color: "from-indigo-500 to-purple-500"
                }
              ].map((paper, index) => (
                <div key={paper.title} className="animate-on-scroll">
                  <Card className="skill-card glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] group">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className={`w-14 h-14 bg-gradient-to-br ${paper.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0 mt-1`}>
                          <FileText className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-3 text-slate-200 group-hover:text-blue-400 transition-colors duration-300 leading-tight">{paper.title}</h4>
                          <p className="text-slate-400 mb-3">{paper.authors}</p>
                          <p className="text-blue-300 font-semibold">{paper.conference}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-32 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 font-display text-gradient">Work Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </div>

          <div className="space-y-12">
            {[
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
            ].map((exp, index) => (
              <div key={exp.role} className="animate-on-scroll">
                <Card className="skill-card glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] group">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${exp.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0`}>
                        <Users className="text-white" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2 text-blue-400 font-display">{exp.role}</h3>
                        <p className="text-xl text-slate-300 mb-2">{exp.organization}</p>
                        <p className="text-slate-400 mb-4 font-mono">{exp.period}</p>
                        <p className="text-slate-300 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 font-display text-gradient">Let's Connect</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8"></div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Interested in collaboration, research opportunities, or have questions about my work? Let's start a conversation.
            </p>
          </div>

          <div className="animate-on-scroll max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
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
              ].map((contact, index) => (
                <Card 
                  key={contact.label}
                  className="skill-card glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <contact.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-blue-400">{contact.label}</h3>
                    <p className="text-slate-300">{contact.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="flex justify-center space-x-8">
                <a 
                  href="https://linkedin.com/in/ashraf-maniyar-82845191" 
                  className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                  data-testid="linkedin-link"
                >
                  <Linkedin className="text-white" size={32} />
                </a>
                <a 
                  href="https://scholar.google.co.in/citations?user=P-ouprAAAAAJ&hl=en" 
                  className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                  data-testid="scholar-link"
                >
                  <GraduationCap className="text-white" size={32} />
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