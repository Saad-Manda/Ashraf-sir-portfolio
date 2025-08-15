import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, MapPin, Phone, ExternalLink, FileText, Users, Award, Trophy, Github, Linkedin, GraduationCap, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="text-xl font-bold text-blue-400"
              whileHover={{ scale: 1.05 }}
            >
              Ashraf Maniyar
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Education', 'Publications', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
                  data-testid={`nav-${item.toLowerCase()}`}
                >
                  {item}
                </button>
              ))}
            </div>
            
            <button
              className="md:hidden text-slate-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-slate-800/95 backdrop-blur-md border-t border-slate-700/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-6 py-4 space-y-3">
              {['Home', 'About', 'Skills', 'Education', 'Publications', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-slate-300 hover:text-blue-400 transition-colors duration-300"
                  data-testid={`mobile-nav-${item.toLowerCase()}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 bg-blue-400 rounded-full`}
              style={{
                top: `${20 + i * 20}%`,
                left: `${20 + i * 15}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 1.5
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div 
            className="mb-6"
            {...fadeInUp}
          >
            <span className="text-blue-400 text-lg font-medium">Hi 👋, I am</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ashraf Maniyar
          </motion.h1>
          
          <motion.div 
            className="text-xl md:text-2xl text-slate-300 mb-8 h-16"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="border-r-2 border-blue-400 pr-1" data-testid="typewriter-text">
              {currentText}
            </span>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 transform hover:scale-105 transition-all duration-300"
              data-testid="button-contact"
            >
              Get In Touch
            </Button>
            <Button 
              variant="outline"
              className="border-slate-600 hover:border-blue-400 text-slate-300 hover:text-blue-400 px-8 py-3 transform hover:scale-105 transition-all duration-300"
              data-testid="button-resume"
            >
              See Resumé
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-80 h-80 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-slate-700/20 flex items-center justify-center border border-slate-600/50">
                <GraduationCap size={96} className="text-slate-400" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                I am a dedicated PhD researcher in Electrical Engineering at IIT Patna, specializing in semiconductor device physics and VLSI design. My research focuses on nanowire GAA MOSFETs, with particular emphasis on process-induced effects and their impact on device performance.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                With a strong academic background including an M.Tech in VLSI Design from NIT Kurukshetra and B.Tech in Electronics and Communication from NIT Nagaland, I bring both theoretical knowledge and practical experience to my research.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Currently serving as Chair of the IEEE EDS student branch chapter at IIT Patna, I am passionate about advancing semiconductor technology and contributing to the scientific community through high-impact research publications.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>

          {/* Software Tools */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-8 text-blue-400">Software Tools</h3>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {['MATLAB', 'TCAD', 'XILINX', 'Cadence Virtuoso', 'ATLAS', 'MS Office'].map((tool, index) => (
                <motion.div
                  key={tool}
                  variants={fadeInUp}
                  className="skill-card bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 text-center"
                  data-testid={`skill-${tool.toLowerCase().replace(' ', '-')}`}
                >
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <FileText className="text-blue-400" size={24} />
                  </div>
                  <p className="text-sm font-medium">{tool}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Research Areas */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-8 text-blue-400">Research Areas</h3>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                { name: 'Machine Learning', desc: 'Applied ML techniques in semiconductor device modeling and analysis', icon: Award },
                { name: 'User Research', desc: 'Research methodology and experimental design for academic studies', icon: Users },
                { name: 'Numerical Methods', desc: 'Advanced mathematical modeling and computational analysis', icon: Trophy }
              ].map((area, index) => (
                <motion.div
                  key={area.name}
                  variants={fadeInUp}
                  className="skill-card bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
                  data-testid={`research-${area.name.toLowerCase().replace(' ', '-')}`}
                >
                  <area.icon className="text-blue-400 mb-4" size={32} />
                  <h4 className="text-lg font-semibold mb-2">{area.name}</h4>
                  <p className="text-slate-400 text-sm">{area.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Core Sciences */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-8 text-blue-400">Core Sciences</h3>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                { name: 'Physics', desc: 'Specialization in semiconductor physics and quantum mechanics' },
                { name: 'Chemistry', desc: 'Understanding of materials science and chemical processes' }
              ].map((science, index) => (
                <motion.div
                  key={science.name}
                  variants={fadeInUp}
                  className="skill-card bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
                  data-testid={`science-${science.name.toLowerCase()}`}
                >
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg mb-4 flex items-center justify-center">
                    <GraduationCap className="text-blue-400" size={24} />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{science.name}</h4>
                  <p className="text-slate-400 text-sm">{science.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Academic Journey</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500/30"></div>

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
              <motion.div 
                key={edu.degree}
                className="flex flex-col md:flex-row items-center mb-12"
                initial={{ opacity: 0, x: edu.side === 'left' ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className={`md:w-1/2 ${edu.side === 'left' ? 'md:pr-8 md:text-right' : 'md:pl-8 md:order-3'} mb-4 md:mb-0`}>
                  <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-blue-400 mb-2">{edu.degree}</h3>
                      <p className="text-slate-300 mb-2">{edu.institution}</p>
                      <p className="text-slate-400 text-sm mb-2">{edu.year}</p>
                      <p className="text-blue-300 font-semibold">{edu.grade}</p>
                      {edu.extra && <p className="text-slate-400 text-sm mt-2">{edu.extra}</p>}
                    </CardContent>
                  </Card>
                </div>
                <div className="relative md:order-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-900"></div>
                </div>
                <div className={`md:w-1/2 ${edu.side === 'right' ? 'md:pr-8' : 'md:pl-8'}`}></div>
              </motion.div>
            ))}
          </div>

          {/* Achievements */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-8 text-blue-400 text-center">Academic Achievements</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500 transition-all duration-300">
                <CardContent className="p-6">
                  <Trophy className="text-yellow-400 mb-3" size={24} />
                  <h4 className="text-lg font-semibold mb-2">GATE Qualified</h4>
                  <p className="text-slate-400 text-sm">GATE-2016, 2018 (Electronics and Communication Engineering)</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500 transition-all duration-300">
                <CardContent className="p-6">
                  <Award className="text-blue-400 mb-3" size={24} />
                  <h4 className="text-lg font-semibold mb-2">UGC PG Scholarship</h4>
                  <p className="text-slate-400 text-sm">GATE-based fellowship for pursuing M.Tech degree</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Publications</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>

          {/* Journal Papers */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-8 text-blue-400">Journal Papers</h3>
            <div className="space-y-6">
              {[
                {
                  title: "Impact of Process-Induced Inclined Side-Walls on Gate-Induced Drain Leakage (GIDL) Current of Nanowire GAA MOSFETs",
                  authors: "A. Maniyar, P. S. T. N. Srinivas, K. -S. Chang-Liao, and P. K. Tiwari",
                  journal: "IEEE Transactions on Electron Devices, 2022"
                },
                {
                  title: "Impact of Process-Induced Inclined Sidewalls on Gate Leakage Current of Nanowire GAA MOSFETs",
                  authors: "A. Maniyar, P. S. T. N. Srinivas, K. -S. Chang-Liao, and P. K. Tiwari",
                  journal: "IEEE Transactions on Electron Devices, 2024"
                },
                {
                  title: "Visible region absorption in TMDs/phosphorene heterostructures for use in solar energy conversion applications",
                  authors: "A. Maniyar, and Sudhanshu Choudhary",
                  journal: "RSC Advances, 2020"
                }
              ].map((paper, index) => (
                <motion.div
                  key={paper.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <FileText className="text-blue-400 mt-1" size={24} />
                        <div>
                          <h4 className="text-lg font-semibold mb-2 text-slate-200">{paper.title}</h4>
                          <p className="text-slate-400 text-sm mb-2">{paper.authors}</p>
                          <p className="text-blue-300 text-sm">{paper.journal}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Conference Papers */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-8 text-blue-400">Conference Papers</h3>
            <div className="space-y-6">
              {[
                {
                  title: "Impact of Substrate Doping on Gate-Induced Drain Leakage Current in FD SOI MOSFETs",
                  authors: "A. Maniyar, P. S. T. N. Srinivas, and P. K. Tiwari",
                  conference: "International Conference on Electrical Engineering (ICEE), Bangalore, 2022"
                },
                {
                  title: "Impact of Process-Induced Inclined Sidewalls on Small Signal Parameters of Silicon Nanowire GAAMOSFET",
                  authors: "A. Maniyar, P. S. T. N. Srinivas, and P. K. Tiwari",
                  conference: "TENCON 2023 - IEEE Region 10 Conference, Chiang Mai, Thailand, 2023"
                }
              ].map((paper, index) => (
                <motion.div
                  key={paper.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Users className="text-green-400 mt-1" size={24} />
                        <div>
                          <h4 className="text-lg font-semibold mb-2 text-slate-200">{paper.title}</h4>
                          <p className="text-slate-400 text-sm mb-2">{paper.authors}</p>
                          <p className="text-green-300 text-sm">{paper.conference}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                position: "Chair, IEEE EDS Student Branch Chapter",
                company: "IIT Patna",
                period: "2024 - Present",
                type: "current",
                description: "Leading the IEEE Electron Devices Society student chapter, organizing technical seminars, workshops, and research activities for graduate students in the electrical engineering department."
              },
              {
                position: "Teaching Assistant",
                company: "IIT Patna",
                period: "M.Tech & PhD",
                type: "academic",
                description: "Providing academic support and instruction across multiple courses in electrical engineering and electronics.",
                subjects: ["Engineering Physics", "Semiconductor Devices", "IC Design", "Digital Electronics", "Linear IC Design", "Circuit Theory"]
              },
              {
                position: "Engineering Trainee",
                company: "Hindustan Aeronautics Limited, Korwa (U.P.)",
                period: "Aug 2017 - Aug 2018",
                type: "industrial",
                description: "Gained hands-on experience in aerospace electronics and testing procedures.",
                responsibilities: [
                  "Testing of Auto computer and Roll computer units of Jaguar Aircraft",
                  "Assembling of Divider, Power supply and Output Modules",
                  "Testing of Divider Module and Power supply Module"
                ]
              }
            ].map((exp, index) => (
              <motion.div
                key={exp.position}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-blue-400 mb-2">{exp.position}</h3>
                        <p className="text-slate-300">{exp.company}</p>
                      </div>
                      <div className="text-slate-400 text-sm mt-2 md:mt-0">
                        <span className={`px-3 py-1 rounded-full ${
                          exp.type === 'current' ? 'bg-blue-600/20 text-blue-300' :
                          exp.type === 'academic' ? 'bg-green-600/20 text-green-300' :
                          'bg-purple-600/20 text-purple-300'
                        }`}>
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-400 leading-relaxed mb-4">{exp.description}</p>
                    
                    {exp.subjects && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {exp.subjects.map((subject) => (
                          <span key={subject} className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded text-sm text-center">
                            {subject}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {exp.responsibilities && (
                      <ul className="text-slate-400 leading-relaxed space-y-2">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start">
                            <ChevronRight className="text-blue-400 mt-1 mr-3 flex-shrink-0" size={16} />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-slate-300">Available for research collaboration and academic opportunities</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-8 text-blue-400">Get In Touch</h3>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "ashrafchand14@gmail.com", href: "mailto:ashrafchand14@gmail.com" },
                  { icon: MapPin, label: "Location", value: "IIT Patna, Bihta-801106" },
                  { icon: Phone, label: "Phone", value: "+91-8619990216", href: "tel:+918619990216" }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <contact.icon className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <p className="text-slate-300 font-medium">{contact.label}</p>
                      {contact.href ? (
                        <a href={contact.href} className="text-slate-400 hover:text-blue-400 transition-colors">
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-slate-400">{contact.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4 className="text-lg font-semibold mb-4 text-slate-300">Connect with me</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://linkedin.com/in/ashraf-maniyar-82845191" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-slate-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    data-testid="link-linkedin"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href="https://scholar.google.co.in/citations?user=P-ouprAAAAAJ&hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-slate-700 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    data-testid="link-scholar"
                  >
                    <GraduationCap size={20} />
                  </a>
                  <a 
                    href="mailto:ashrafchand14@gmail.com"
                    className="w-12 h-12 bg-slate-700 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    data-testid="link-email"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold mb-6 text-blue-400">Research Interests</h4>
                  <div className="space-y-4">
                    {[
                      { title: "Semiconductor Device Physics", desc: "Nanowire GAA MOSFETs, process-induced effects, device modeling" },
                      { title: "VLSI Design", desc: "Integrated circuit design, TCAD simulation, device optimization" },
                      { title: "Renewable Energy", desc: "TMDs/phosphorene heterostructures for solar energy applications" }
                    ].map((interest, index) => (
                      <motion.div
                        key={interest.title}
                        className="p-4 bg-slate-700/30 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <h5 className="font-medium text-slate-200 mb-2">{interest.title}</h5>
                        <p className="text-slate-400 text-sm">{interest.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900/50 border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-400">&copy; 2024 Ashraf Maniyar. All rights reserved.</p>
          <p className="text-slate-500 text-sm mt-2">PhD Candidate | Electrical Engineering | IIT Patna</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
