import { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState('');

  const fullText = 'Modeling Quantum Tunneling and Hydrogen Adsorption in MOF–Aerogel Composite Materials';

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      color: string;
      canvasWidth: number;
      canvasHeight: number;

      constructor(w: number, h: number) {
        this.canvasWidth = w;
        this.canvasHeight = h;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.8 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        const colors = ['0, 240, 255', '157, 78, 221', '67, 97, 238'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 12000));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const interests = [
    { icon: '⚛️', title: 'Hydrogen Storage', desc: 'Advanced materials for clean energy' },
    { icon: '🔬', title: 'MOF Materials', desc: 'Metal-organic frameworks' },
    { icon: '🌐', title: 'Aerogel Composites', desc: 'Nanoporous structures' },
    { icon: '🌀', title: 'Quantum Tunneling', desc: 'Cryogenic quantum effects' },
    { icon: '📊', title: 'Adsorption Dynamics', desc: 'Surface interaction kinetics' },
    { icon: '💻', title: 'Molecular Simulation', desc: 'Computational modeling' },
    { icon: '❄️', title: 'Cryogenic Physics', desc: 'Ultra-low temperature systems' },
    { icon: '🧮', title: 'Density Functional Theory', desc: 'Electronic structure calculations' },
    { icon: '🔍', title: 'Nanomaterials', desc: 'Advanced material characterization' },
  ];

  const publications = [
    {
      title: 'Quantum Tunneling Effects in MOF-Aerogel Composites at Cryogenic Temperatures',
      journal: 'Journal of Materials Science & Engineering (In Preparation)',
      desc: 'Investigating hydrogen diffusion mechanisms through nanoporous networks using density functional theory and molecular dynamics simulations.',
    },
    {
      title: 'Computational Modeling of Hydrogen Adsorption in Hybrid Nanomaterials',
      journal: 'Advanced Materials Research Conference 2024',
      desc: 'Presentation on Monte Carlo simulations of hydrogen storage capacity in composite materials at ultra-low temperatures.',
    },
    {
      title: 'Thermodynamic Analysis of Cryogenic Hydrogen Storage Systems',
      journal: 'Graduate Research Project',
      desc: 'Comprehensive study of adsorption-desorption isotherms and energy barriers in MOF-aerogel architectures.',
    },
  ];

  const coreSkills = [
    { title: 'Scientific Writing', desc: 'Research papers & documentation' },
    { title: 'Computational Modeling', desc: 'DFT, MD, Monte Carlo' },
    { title: 'Material Characterization', desc: 'XRD, SEM, BET analysis' },
    { title: 'Thermodynamic Analysis', desc: 'Phase equilibria & kinetics' },
  ];

  const tools = [
    { title: 'ORCA', desc: 'Quantum chemistry' },
    { title: 'MATLAB', desc: 'Numerical computing' },
    { title: 'Python', desc: 'Data analysis & simulation' },
    { title: 'VMD', desc: 'Molecular visualization' },
    { title: 'GROMACS', desc: 'Molecular dynamics' },
    { title: 'VESTA', desc: 'Crystal structure visualization' },
  ];

  const mofCards = [
    {
      icon: '🏗️',
      title: 'MOF Framework',
      desc: 'Crystalline porous coordination polymers with tunable pore sizes and high surface areas for hydrogen adsorption.',
      color: 'var(--primary-cyan)',
    },
    {
      icon: '🕸️',
      title: 'Aerogel Matrix',
      desc: 'Ultra-lightweight nanoporous networks providing structural support and enhanced thermal insulation at cryogenic conditions.',
      color: 'var(--quantum-purple)',
    },
    {
      icon: '⚡',
      title: 'Hybrid Composite',
      desc: 'Synergistic integration of MOF and aerogel phases for optimized hydrogen storage capacity and diffusion kinetics.',
      color: 'var(--glow-blue)',
    },
  ];

  return (
    <>
      {/* Particle Background Canvas */}
      <canvas id="particle-canvas" ref={canvasRef}></canvas>

      {/* Navigation */}
      <nav className="nav">
        <ul className="nav-list">
          <li><button className="nav-link" onClick={() => scrollTo('home')}>Home</button></li>
          <li><button className="nav-link" onClick={() => scrollTo('about')}>About</button></li>
          <li><button className="nav-link" onClick={() => scrollTo('research')}>Research</button></li>
          <li><button className="nav-link" onClick={() => scrollTo('publications')}>Publications</button></li>
          <li><button className="nav-link" onClick={() => scrollTo('skills')}>Skills</button></li>
          <li><button className="nav-link" onClick={() => scrollTo('contact')}>Contact</button></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-grid-bg"></div>
        <div className="molecular-bg">
          <div className="atom" style={{ width: 30, height: 30, background: 'var(--primary-cyan)', color: 'var(--primary-cyan)', top: '20%', left: '30%', animationDelay: '0s' }}></div>
          <div className="atom" style={{ width: 22, height: 22, background: 'var(--quantum-purple)', color: 'var(--quantum-purple)', top: '40%', left: '55%', animationDelay: '1s' }}></div>
          <div className="atom" style={{ width: 35, height: 35, background: 'var(--glow-blue)', color: 'var(--glow-blue)', top: '65%', left: '70%', animationDelay: '2s' }}></div>
          <div className="atom" style={{ width: 25, height: 25, background: 'var(--primary-cyan)', color: 'var(--primary-cyan)', top: '80%', left: '35%', animationDelay: '3s' }}></div>
          <div className="atom" style={{ width: 28, height: 28, background: 'var(--quantum-purple)', color: 'var(--quantum-purple)', top: '30%', left: '75%', animationDelay: '4s' }}></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">◈ Quantum Materials Researcher</div>
          <h1 className="hero-title-glow">Cao Minh Trung</h1>
          <h2>MATERIALS SCIENCE ENGINEER</h2>
          <p className="hero-subtitle">
            <span className="typewriter">{typedText}</span>
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title reveal">
              About <span className="section-title-accent">Me</span>
            </h2>
            <span className="section-divider"></span>
            <p className="section-subtitle reveal">A glimpse into my research journey</p>
          </div>
          <div className="glass-card reveal">
            <p className="about-text">
              I am a <strong>materials science researcher</strong> focused on hydrogen storage, MOF-aerogel composite materials, adsorption-diffusion dynamics, and <strong>quantum tunneling effects</strong> at cryogenic temperatures. My research combines <strong>computational modeling</strong>, thermodynamics, and nanomaterial engineering for future clean energy systems. Working at the intersection of quantum physics and materials science, I strive to unlock new pathways for sustainable hydrogen storage technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section id="research">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title reveal">
              Research <span className="section-title-accent">Interests</span>
            </h2>
            <span className="section-divider"></span>
            <p className="section-subtitle reveal">Exploring the frontiers of quantum materials science</p>
          </div>
          <div className="interests-grid">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="interest-card reveal"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="interest-icon">{interest.icon}</div>
                <h3>{interest.title}</h3>
                <p>{interest.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quantum Tunneling Visualization */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title reveal">
              Quantum Tunneling <span className="section-title-accent">Visualization</span>
            </h2>
            <span className="section-divider"></span>
            <p className="section-subtitle reveal">Simulated hydrogen diffusion through nanoporous networks</p>
          </div>

          <div className="tunneling-viz reveal">
            <div className="potential-barrier">
              <div className="potential-barrier-label">POTENTIAL BARRIER</div>
            </div>
            <div className="wave-function" style={{ top: '25%' }}></div>
            <div className="wave-function" style={{ top: '50%', animationDelay: '1.3s' }}></div>
            <div className="wave-function" style={{ top: '75%', animationDelay: '2.6s' }}></div>
            <div className="tunneling-particle" style={{ top: 'calc(25% - 6px)' }}></div>
            <div className="tunneling-particle" style={{ top: 'calc(50% - 6px)', animationDelay: '1.3s' }}></div>
            <div className="tunneling-particle" style={{ top: 'calc(75% - 6px)', animationDelay: '2.6s' }}></div>
          </div>

          <div className="glass-card reveal">
            <h3 style={{ color: 'var(--primary-cyan)', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: 700 }}>
              ⚡ Hydrogen Diffusion Through Nanoporous Networks
            </h3>
            <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              The visualization above demonstrates <strong style={{ color: 'var(--primary-cyan)' }}>quantum tunneling effects</strong> where hydrogen atoms penetrate through potential energy barriers in MOF-aerogel composite structures at cryogenic temperatures. This phenomenon is crucial for understanding low-temperature hydrogen storage mechanisms and is governed by the <strong style={{ color: 'var(--quantum-purple)' }}>Schrödinger equation</strong> and wave-function propagation through classically forbidden regions.
            </p>
          </div>
        </div>
      </section>

      {/* MOF-Aerogel Display */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title reveal">
              MOF–Aerogel <span className="section-title-accent">Composite Structures</span>
            </h2>
            <span className="section-divider"></span>
            <p className="section-subtitle reveal">Building blocks of next-generation hydrogen storage</p>
          </div>
          <div className="mof-grid">
            {mofCards.map((card, index) => (
              <div key={index} className="mof-card reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="mof-icon" style={{ color: card.color }}>{card.icon}</div>
                <h3 style={{ color: card.color }}>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title reveal">
              Publications & <span className="section-title-accent">Projects</span>
            </h2>
            <span className="section-divider"></span>
            <p className="section-subtitle reveal">Selected academic contributions and ongoing work</p>
          </div>
          {publications.map((pub, index) => (
            <div key={index} className="publication-item reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
              <h3>{pub.title}</h3>
              <p className="publication-journal">{pub.journal}</p>
              <p>{pub.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title reveal">
              Skills & <span className="section-title-accent">Computational Tools</span>
            </h2>
            <span className="section-divider"></span>
            <p className="section-subtitle reveal">Technical expertise in materials modeling</p>
          </div>
          <div className="skills-wrapper">
            <div className="glass-card reveal">
              <h3 className="skills-card-title" style={{ color: 'var(--primary-cyan)' }}>
                ◈ Core Competencies
              </h3>
              <div className="skills-grid">
                {coreSkills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <h4>{skill.title}</h4>
                    <p>{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card reveal" style={{ transitionDelay: '0.2s' }}>
              <h3 className="skills-card-title" style={{ color: 'var(--quantum-purple)' }}>
                ◈ Software & Tools
              </h3>
              <div className="skills-grid">
                {tools.map((tool, index) => (
                  <div key={index} className="skill-item">
                    <h4>{tool.title}</h4>
                    <p>{tool.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title reveal">
              <span className="section-title-accent">Education</span>
            </h2>
            <span className="section-divider"></span>
          </div>
          <div className="glass-card reveal">
            <div className="timeline">
              <div className="timeline-item">
                <h3>Master of Science in Chemical Engineering</h3>
                <h4>Can Tho University</h4>
                <p><strong>Expected Graduation:</strong> 2024</p>
                <p><strong>Laboratory:</strong> Advanced Material Laboratory</p>
                <p><strong>Advisor:</strong> Associate Professor, PhD. Doan Van Hong Thien</p>
                <p className="timeline-focus">
                  Research Focus: Quantum tunneling and hydrogen adsorption-diffusion dynamics in MOF-aerogel composite materials at cryogenic temperatures
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title reveal">
              Get In <span className="section-title-accent">Touch</span>
            </h2>
            <span className="section-divider"></span>
          </div>
          <div className="glass-card reveal">
            <div className="contact-content">
              <h3>Let's Collaborate on Quantum Materials Research</h3>
              <p>
                Interested in hydrogen storage, MOF materials, or quantum tunneling research? Feel free to reach out for academic collaboration and research opportunities.
              </p>
              <div className="contact-links">
                <a href="mailto:trungm3825010@gstudent.ctu.edu.vn" className="contact-link">
                  <span>📧</span> Email
                </a>
                <a href="https://github.com/minhtrungengineer" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span>💻</span> GitHub
                </a>
                <a href="https://www.ctu.edu.vn" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span>🎓</span> Can Tho University
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2024 <strong style={{ color: 'var(--primary-cyan)' }}>Cao Minh Trung</strong> · Materials Science Research</p>
          <p className="tagline">// Exploring Quantum Frontiers in Clean Energy Materials</p>
        </div>
      </footer>
    </>
  );
}

export default App;
