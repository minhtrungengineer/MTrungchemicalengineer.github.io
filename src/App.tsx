import { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tunnelCanvasRef = useRef<HTMLCanvasElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [typedText, setTypedText] = useState('');

  // Typing animation
  useEffect(() => {
    const fullText = 'Exploring Quantum Frontiers in Hydrogen Storage';
    let idx = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseTime = 3000;

    const type = () => {
      if (!isDeleting) {
        setTypedText(fullText.slice(0, idx + 1));
        idx++;
        if (idx === fullText.length) {
          setTimeout(() => { isDeleting = true; type(); }, pauseTime);
          return;
        }
        setTimeout(type, typeSpeed);
      } else {
        setTypedText(fullText.slice(0, idx));
        idx--;
        if (idx === 0) {
          isDeleting = false;
          setTimeout(type, 500);
          return;
        }
        setTimeout(type, deleteSpeed);
      }
    };
    setTimeout(type, 1500);
  }, []);

  // Quantum particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
      pulse: number; pulseSpeed: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['rgba(0,240,255,', 'rgba(139,92,246,', 'rgba(0,255,163,'];
    
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, p.color + currentOpacity + ')');
        gradient.addColorStop(1, p.color + '0)');
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = p.color + currentOpacity + ')';
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = p.color + (0.08 * (1 - dist / 150)) + ')';
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Quantum tunnel visualization
  useEffect(() => {
    const canvas = tunnelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = 400;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      time += 0.02;

      // Potential barrier
      const barrierX = W * 0.45;
      const barrierW = W * 0.1;
      const barrierGrad = ctx.createLinearGradient(barrierX, 0, barrierX + barrierW, 0);
      barrierGrad.addColorStop(0, 'rgba(139, 92, 246, 0.05)');
      barrierGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.15)');
      barrierGrad.addColorStop(1, 'rgba(139, 92, 246, 0.05)');
      ctx.fillStyle = barrierGrad;
      ctx.fillRect(barrierX, H * 0.15, barrierW, H * 0.7);

      // Barrier border
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(barrierX, H * 0.15, barrierW, H * 0.7);
      ctx.setLineDash([]);

      // Barrier label
      ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('V(x)', barrierX + barrierW / 2, H * 0.12);

      // Wave function (incident)
      ctx.beginPath();
      const midY = H * 0.5;
      for (let x = 0; x < W; x++) {
        const relX = x / W;
        let amplitude: number;
        let wavelength: number;
        let decay = 1;

        if (relX < 0.45) {
          amplitude = 40;
          wavelength = 25;
        } else if (relX < 0.55) {
          // Inside barrier - exponential decay
          const barrierPos = (relX - 0.45) / 0.1;
          amplitude = 40 * Math.exp(-barrierPos * 2);
          wavelength = 25;
          decay = Math.exp(-barrierPos * 1.5);
        } else {
          // Transmitted wave
          amplitude = 40 * Math.exp(-2) * 1.5;
          wavelength = 25;
          decay = 1;
        }

        const y = midY + amplitude * decay * Math.sin((x / wavelength) * Math.PI * 2 - time * 3);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      const waveGrad = ctx.createLinearGradient(0, 0, W, 0);
      waveGrad.addColorStop(0, 'rgba(0, 240, 255, 0.8)');
      waveGrad.addColorStop(0.45, 'rgba(0, 240, 255, 0.6)');
      waveGrad.addColorStop(0.55, 'rgba(139, 92, 246, 0.5)');
      waveGrad.addColorStop(1, 'rgba(0, 255, 163, 0.4)');
      ctx.strokeStyle = waveGrad;
      ctx.lineWidth = 2;
      ctx.stroke();

      // |ψ|² probability density fill
      ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const relX = x / W;
        let amplitude: number;
        let decay = 1;

        if (relX < 0.45) {
          amplitude = 40;
        } else if (relX < 0.55) {
          const barrierPos = (relX - 0.45) / 0.1;
          amplitude = 40 * Math.exp(-barrierPos * 2);
          decay = Math.exp(-barrierPos * 1.5);
        } else {
          amplitude = 40 * Math.exp(-2) * 1.5;
        }

        const y = midY + amplitude * decay * Math.sin((x / 25) * Math.PI * 2 - time * 3);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(W, midY);
      ctx.lineTo(0, midY);
      ctx.closePath();
      const fillGrad = ctx.createLinearGradient(0, 0, W, 0);
      fillGrad.addColorStop(0, 'rgba(0, 240, 255, 0.08)');
      fillGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)');
      fillGrad.addColorStop(1, 'rgba(0, 255, 163, 0.03)');
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Hydrogen particle
      const particleX = (W * 0.15 + time * 40) % (W * 1.2) - W * 0.1;
      const particleY = midY + 15 * Math.sin(time * 2);

      // Particle glow
      const pGlow = ctx.createRadialGradient(particleX, particleY, 0, particleX, particleY, 20);
      pGlow.addColorStop(0, 'rgba(0, 240, 255, 0.6)');
      pGlow.addColorStop(0.5, 'rgba(0, 240, 255, 0.1)');
      pGlow.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = pGlow;
      ctx.beginPath();
      ctx.arc(particleX, particleY, 20, 0, Math.PI * 2);
      ctx.fill();

      // Particle core
      ctx.beginPath();
      ctx.fillStyle = '#00f0ff';
      ctx.arc(particleX, particleY, 5, 0, Math.PI * 2);
      ctx.fill();

      // H label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('H', particleX, particleY + 3);

      // Axis labels
      ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('ψ(x)', 10, 25);
      ctx.fillText('Incident Wave', 30, H - 20);
      ctx.textAlign = 'right';
      ctx.fillText('Transmitted Wave', W - 30, H - 20);

      // Energy level lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 0.5;
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(W, midY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(148, 163, 184, 0.3)';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('E = 0', W - 10, midY - 5);

      // Equation
      ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('T = |ψ_t/ψ_i|² ∝ e^(-2κL)', W / 2, H * 0.08);

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Animate skill bars
          if (entry.target.querySelector('.skill-bar')) {
            entry.target.querySelectorAll('.skill-bar').forEach(bar => {
              const el = bar as HTMLElement;
              el.style.width = el.dataset.width || '0%';
            });
          }
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Smooth scroll for nav
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const researchInterests = [
    { icon: '⚛️', title: 'Hydrogen Storage', desc: 'Advanced materials for safe, efficient hydrogen energy storage systems' },
    { icon: '🔬', title: 'MOF Materials', desc: 'Metal-Organic Frameworks with tunable porosity and surface chemistry' },
    { icon: '🧊', title: 'Aerogel Composites', desc: 'Ultra-lightweight porous materials for thermal insulation and catalysis' },
    { icon: '🌀', title: 'Quantum Tunneling', desc: 'Quantum mechanical effects in hydrogen diffusion at cryogenic temperatures' },
    { icon: '📊', title: 'Adsorption Dynamics', desc: 'Kinetics and thermodynamics of gas-solid interactions in nanopores' },
    { icon: '🧬', title: 'Molecular Simulation', desc: 'Computational modeling of molecular behavior in confined spaces' },
    { icon: '❄️', title: 'Cryogenic Physics', desc: 'Low-temperature phenomena and their impact on material properties' },
    { icon: '📐', title: 'Density Functional Theory', desc: 'First-principles calculations of electronic structure and bonding' },
    { icon: '🔩', title: 'Nanomaterials', desc: 'Design and characterization of functional nanostructured materials' },
  ];

  const tools = [
    { icon: '🧮', name: 'ORCA' },
    { icon: '📈', name: 'MATLAB' },
    { icon: '🐍', name: 'Python' },
    { icon: '⚡', name: 'LAMMPS' },
    { icon: '🔬', name: 'VASP' },
    { icon: '📊', name: 'Origin' },
    { icon: '🧪', name: 'Gaussian' },
    { icon: '💻', name: 'LaTeX' },
    { icon: '📉', name: 'Monte Carlo' },
    { icon: '🧬', name: 'VMD' },
  ];

  return (
    <>
      {/* Quantum Particle Background */}
      <canvas ref={canvasRef} id="quantum-canvas" />

      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
            CMT<span style={{ color: 'rgba(0,240,255,0.4)', margin: '0 2px' }}>.</span>Lab
          </a>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            {['About', 'Research', 'Quantum', 'Publications', 'Gallery', 'Skills', 'Contact'].map(item => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} onClick={(e) => { e.preventDefault(); scrollTo(item.toLowerCase()); }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-bg-grid" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot" />
            Materials Science Research
          </div>
          <h1 className="hero-name">
            <span className="first-name">Cao Minh</span>
            <span className="last-name">Trung</span>
          </h1>
          <p className="hero-title">Materials Science Engineer</p>
          <p className="hero-tagline">
            <span className="typed-text">{typedText}</span>
          </p>
          <div className="hero-buttons">
            <a href="#research" className="btn-primary btn-cyan" onClick={(e) => { e.preventDefault(); scrollTo('research'); }}>
              ⟐ View Research
            </a>
            <a href="#contact" className="btn-primary btn-purple" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
              ✉ Get in Touch
            </a>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* About Section */}
      <section className="section" id="about">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">// About Me</span>
            <h2 className="section-title">Researcher Profile</h2>
            <div className="section-line" />
          </div>
          <div className="about-grid">
            <div className="about-image-container reveal">
              <div className="about-image-glow" />
              <div className="about-image-frame">
                <img src="images/researcher-avatar.jpg" alt="Cao Minh Trung" />
              </div>
              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-number">MOF</div>
                  <div className="stat-label">Focus Area</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">H₂</div>
                  <div className="stat-label">Storage</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">DFT</div>
                  <div className="stat-label">Methods</div>
                </div>
              </div>
            </div>
            <div className="glass-card reveal reveal-delay-2">
              <p className="about-text" style={{ marginBottom: '1.5rem' }}>
                I am a <span className="highlight">materials science researcher</span> focused on{' '}
                <span className="highlight">hydrogen storage</span>,{' '}
                <span className="highlight">MOF–aerogel composite materials</span>,{' '}
                adsorption–diffusion dynamics, and{' '}
                <span className="highlight">quantum tunneling effects at cryogenic temperatures</span>.
              </p>
              <p className="about-text" style={{ marginBottom: '1.5rem' }}>
                My research integrates <span className="highlight">computational modeling</span>,{' '}
                thermodynamics, and nanomaterial engineering for future{' '}
                <span className="highlight">clean energy systems</span>.
              </p>
              <p className="about-text">
                Currently pursuing my Master's degree at{' '}
                <span className="highlight">Can Tho University</span>, I work at the{' '}
                <span className="highlight">Advanced Material Laboratory</span> under the guidance of{' '}
                <span className="highlight">Associate Professor, PhD. Doan Van Hong Thien</span>,
                developing novel approaches to model quantum mechanical phenomena in nanoporous materials
                for next-generation hydrogen storage technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Research Section */}
      <section className="section" id="research">
        <div className="mof-lattice-bg" />
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">// Research Focus</span>
            <h2 className="section-title">Research Interests</h2>
            <div className="section-line" />
          </div>

          {/* Main Research Title */}
          <div className="glass-card reveal" style={{ marginBottom: '3rem', textAlign: 'center', padding: '3rem 2rem' }}>
            <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.75rem', color: '#00f0ff', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Primary Research
            </p>
            <h3 style={{ fontFamily: '"Orbitron", monospace', fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 700, lineHeight: 1.6, color: '#e2e8f0' }}>
              Modeling Quantum Tunneling and Hydrogen Adsorption
              <br />
              <span style={{ background: 'linear-gradient(135deg, #00f0ff, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                in MOF–Aerogel Composite Materials
              </span>
            </h3>
          </div>

          <div className="research-grid">
            {researchInterests.map((item, idx) => (
              <div key={idx} className={`glass-card research-card reveal reveal-delay-${(idx % 5) + 1}`}>
                <div className="card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Quantum Tunneling Visualization */}
      <section className="section" id="quantum">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">// Interactive Visualization</span>
            <h2 className="section-title">Quantum Tunneling Effect</h2>
            <div className="section-line" />
          </div>
          <div className="quantum-vis-container reveal">
            <canvas ref={tunnelCanvasRef} id="quantum-tunnel-canvas" />
            <div className="quantum-vis-overlay">
              <h3>Hydrogen Quantum Tunneling Through Potential Barrier</h3>
              <p>
                Visualization of hydrogen wave function (ψ) encountering a potential energy barrier V(x). 
                At cryogenic temperatures, quantum tunneling enables hydrogen atoms to penetrate barriers 
                that would be classically forbidden, with transmission probability T ∝ e<sup>−2κL</sup>.
              </p>
            </div>
          </div>

          {/* Additional info cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            <div className="glass-card reveal reveal-delay-1" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontFamily: '"Orbitron", monospace', fontSize: '0.8rem', color: '#00f0ff', marginBottom: '0.75rem' }}>
                ❄️ Cryogenic Regime
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.7 }}>
                At temperatures below 77K, thermal energy becomes insufficient for classical barrier crossing, 
                making quantum tunneling the dominant diffusion mechanism for hydrogen.
              </p>
            </div>
            <div className="glass-card reveal reveal-delay-2" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontFamily: '"Orbitron", monospace', fontSize: '0.8rem', color: '#8b5cf6', marginBottom: '0.75rem' }}>
                🌀 Wave-Particle Duality
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.7 }}>
                Hydrogen's wave nature allows non-zero probability of existing beyond potential barriers, 
                enabling transport through MOF pore structures at rates exceeding classical predictions.
              </p>
            </div>
            <div className="glass-card reveal reveal-delay-3" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontFamily: '"Orbitron", monospace', fontSize: '0.8rem', color: '#00ffa3', marginBottom: '0.75rem' }}>
                📐 Computational Model
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.7 }}>
                Using DFT and path-integral molecular dynamics (PIMD) to capture nuclear quantum effects 
                in hydrogen adsorption–diffusion within MOF–aerogel composites.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Publications */}
      <section className="section" id="publications">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">// Academic Work</span>
            <h2 className="section-title">Publications & Projects</h2>
            <div className="section-line" />
          </div>

          <div className="pub-card glass-card reveal">
            <div className="pub-year">2024</div>
            <div className="pub-content">
              <h3>Quantum Tunneling Effects on Hydrogen Diffusion in MOF–Aerogel Composites at Cryogenic Temperatures</h3>
              <p className="pub-authors">
                <strong>Cao Minh Trung</strong>, Doan Van Hong Thien
              </p>
              <p className="pub-journal">MSc Thesis — Can Tho University, Department of Chemical Engineering</p>
              <div className="pub-tags">
                <span className="pub-tag">Quantum Tunneling</span>
                <span className="pub-tag">MOF</span>
                <span className="pub-tag">Hydrogen Storage</span>
                <span className="pub-tag">DFT</span>
                <span className="pub-tag">Cryogenics</span>
              </div>
            </div>
          </div>

          <div className="pub-card glass-card reveal reveal-delay-1">
            <div className="pub-year">2024</div>
            <div className="pub-content">
              <h3>Computational Modeling of Adsorption–Diffusion Dynamics in Nanoporous MOF–Aerogel Hybrid Materials</h3>
              <p className="pub-authors">
                <strong>Cao Minh Trung</strong>, Doan Van Hong Thien
              </p>
              <p className="pub-journal">Research Project — Advanced Material Laboratory, Can Tho University</p>
              <div className="pub-tags">
                <span className="pub-tag">Molecular Simulation</span>
                <span className="pub-tag">Adsorption</span>
                <span className="pub-tag">Monte Carlo</span>
                <span className="pub-tag">Nanomaterials</span>
              </div>
            </div>
          </div>

          <div className="pub-card glass-card reveal reveal-delay-2">
            <div className="pub-year">2024</div>
            <div className="pub-content">
              <h3>First-Principles Study of Hydrogen Binding Sites in Functionalized Metal-Organic Frameworks</h3>
              <p className="pub-authors">
                <strong>Cao Minh Trung</strong>, Doan Van Hong Thien
              </p>
              <p className="pub-journal">Research Project — Advanced Material Laboratory, Can Tho University</p>
              <div className="pub-tags">
                <span className="pub-tag">DFT</span>
                <span className="pub-tag">ORCA</span>
                <span className="pub-tag">Binding Energy</span>
                <span className="pub-tag">MOF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Molecular Simulation Gallery */}
      <section className="section" id="gallery">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">// Visual Library</span>
            <h2 className="section-title">MOF–Aerogel Material Showcase</h2>
            <div className="section-line" />
          </div>
          <div className="gallery-grid">
            <div className="gallery-item reveal" onClick={() => setLightboxSrc('images/mof-structure.jpg')}>
              <div style={{ overflow: 'hidden' }}>
                <img src="images/mof-structure.jpg" alt="MOF Crystal Structure" />
              </div>
              <div className="gallery-item-info">
                <h3>MOF Crystal Structure</h3>
                <p>3D visualization of Metal-Organic Framework lattice with hydrogen adsorption sites and pore network topology.</p>
              </div>
            </div>
            <div className="gallery-item reveal reveal-delay-1" onClick={() => setLightboxSrc('images/quantum-tunnel.jpg')}>
              <div style={{ overflow: 'hidden' }}>
                <img src="images/quantum-tunnel.jpg" alt="Quantum Tunneling Visualization" />
              </div>
              <div className="gallery-item-info">
                <h3>Quantum Tunneling Visualization</h3>
                <p>Wave function probability density of hydrogen tunneling through potential barrier in nanopore confinement.</p>
              </div>
            </div>
            <div className="gallery-item reveal reveal-delay-2" onClick={() => setLightboxSrc('images/aerogel-texture.jpg')}>
              <div style={{ overflow: 'hidden' }}>
                <img src="images/aerogel-texture.jpg" alt="Aerogel Nanostructure" />
              </div>
              <div className="gallery-item-info">
                <h3>Aerogel Nanostructure</h3>
                <p>Microscopic visualization of silica aerogel matrix with embedded MOF nanocrystals and hydrogen diffusion pathways.</p>
              </div>
            </div>
            <div className="gallery-item reveal reveal-delay-3" onClick={() => setLightboxSrc('images/molecular-sim.jpg')}>
              <div style={{ overflow: 'hidden' }}>
                <img src="images/molecular-sim.jpg" alt="Molecular Simulation" />
              </div>
              <div className="gallery-item-info">
                <h3>Molecular Dynamics Simulation</h3>
                <p>Computational trajectory analysis of hydrogen molecule dynamics within MOF–aerogel composite at 20K.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Skills Section */}
      <section className="section" id="skills">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">// Expertise</span>
            <h2 className="section-title">Skills & Computational Tools</h2>
            <div className="section-line" />
          </div>

          {/* Research Skills */}
          <div className="rskill-grid reveal" style={{ marginBottom: '3rem' }}>
            <div className="glass-card rskill-item">
              <div className="rskill-icon">📝</div>
              <div className="rskill-text">
                <h4>Scientific Writing</h4>
                <p>Academic papers, thesis, and technical documentation</p>
              </div>
            </div>
            <div className="glass-card rskill-item">
              <div className="rskill-icon">💻</div>
              <div className="rskill-text">
                <h4>Computational Modeling</h4>
                <p>DFT, MD simulations, and quantum calculations</p>
              </div>
            </div>
            <div className="glass-card rskill-item">
              <div className="rskill-icon">🔬</div>
              <div className="rskill-text">
                <h4>Material Characterization</h4>
                <p>XRD, SEM, BET, TGA, and spectroscopic analysis</p>
              </div>
            </div>
            <div className="glass-card rskill-item">
              <div className="rskill-icon">📊</div>
              <div className="rskill-text">
                <h4>Thermodynamic Analysis</h4>
                <p>Adsorption isotherms, kinetics, and phase equilibria</p>
              </div>
            </div>
          </div>

          {/* Skill Bars */}
          <div className="skills-container reveal">
            <div className="glass-card skill-category">
              <h3>Computational Methods</h3>
              {[
                { name: 'Density Functional Theory', w: '92%' },
                { name: 'Molecular Dynamics', w: '88%' },
                { name: 'Monte Carlo Simulation', w: '85%' },
                { name: 'Path Integral MD', w: '78%' },
                { name: 'Ab Initio Calculations', w: '82%' },
              ].map((s, i) => (
                <div className="skill-item" key={i}>
                  <div className="skill-info">
                    <div className="skill-dot" />
                    <span className="skill-name">{s.name}</span>
                  </div>
                  <div className="skill-bar-container">
                    <div className="skill-bar" data-width={s.w} />
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card skill-category">
              <h3>Programming & Software</h3>
              {[
                { name: 'Python', w: '90%' },
                { name: 'MATLAB', w: '88%' },
                { name: 'ORCA', w: '85%' },
                { name: 'LAMMPS', w: '80%' },
                { name: 'LaTeX', w: '92%' },
              ].map((s, i) => (
                <div className="skill-item" key={i}>
                  <div className="skill-info">
                    <div className="skill-dot" style={{ background: '#8b5cf6' }} />
                    <span className="skill-name">{s.name}</span>
                  </div>
                  <div className="skill-bar-container">
                    <div className="skill-bar" data-width={s.w} style={{ background: 'linear-gradient(90deg, #8b5cf6, #00f0ff)' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card skill-category">
              <h3>Research Areas</h3>
              {[
                { name: 'Hydrogen Storage', w: '95%' },
                { name: 'MOF Materials', w: '92%' },
                { name: 'Quantum Effects', w: '88%' },
                { name: 'Nanomaterials', w: '85%' },
                { name: 'Cryogenic Physics', w: '82%' },
              ].map((s, i) => (
                <div className="skill-item" key={i}>
                  <div className="skill-info">
                    <div className="skill-dot" style={{ background: '#00ffa3' }} />
                    <span className="skill-name">{s.name}</span>
                  </div>
                  <div className="skill-bar-container">
                    <div className="skill-bar" data-width={s.w} style={{ background: 'linear-gradient(90deg, #00ffa3, #00f0ff)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="reveal" style={{ marginTop: '3rem' }}>
            <h3 style={{ fontFamily: '"Orbitron", monospace', fontSize: '1rem', color: '#00f0ff', textAlign: 'center', marginBottom: '2rem', letterSpacing: '2px' }}>
              Computational Tools & Software
            </h3>
            <div className="tools-grid">
              {tools.map((t, i) => (
                <div className="tool-item" key={i}>
                  <span className="tool-icon">{t.icon}</span>
                  <span className="tool-name">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Education */}
      <section className="section" id="education">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">// Academic Background</span>
            <h2 className="section-title">Education</h2>
            <div className="section-line" />
          </div>
          <div className="education-card glass-card reveal">
            <div className="edu-timeline">
              <div className="edu-icon">🎓</div>
              <div className="edu-content">
                <h3>Can Tho University</h3>
                <h4>MSc. in Chemical Engineering</h4>
                <ul className="edu-details">
                  <li>
                    <span className="detail-icon">📅</span>
                    Expected Graduation: 2024
                  </li>
                  <li>
                    <span className="detail-icon">🔬</span>
                    Lab: Advanced Material Laboratory
                  </li>
                  <li>
                    <span className="detail-icon">👨‍🏫</span>
                    Advisor: Associate Professor, PhD. Doan Van Hong Thien
                  </li>
                  <li>
                    <span className="detail-icon">📚</span>
                    Thesis: Modeling Quantum Tunneling and Hydrogen Adsorption in MOF–Aerogel Composite Materials
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Contact */}
      <section className="section" id="contact">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">// Get in Touch</span>
            <h2 className="section-title">Contact & Links</h2>
            <div className="section-line" />
          </div>
          <div className="contact-grid">
            <div className="contact-info-card glass-card reveal">
              <h3>Academic Links</h3>
              <a href="mailto:trungm3825010@gstudent.ctu.edu.vn" className="contact-link">
                <div className="link-icon">📧</div>
                <div>
                  <div className="link-label">Email</div>
                  <div className="link-text">trungm3825010@gstudent.ctu.edu.vn</div>
                </div>
              </a>
              <a href="https://github.com/minhtrungengineer" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="link-icon">💻</div>
                <div>
                  <div className="link-label">GitHub</div>
                  <div className="link-text">github.com/minhtrungengineer</div>
                </div>
              </a>
              <a href="https://www.ctu.edu.vn" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="link-icon">🏫</div>
                <div>
                  <div className="link-label">University</div>
                  <div className="link-text">Can Tho University</div>
                </div>
              </a>
              <div className="contact-link" style={{ cursor: 'default' }}>
                <div className="link-icon">🔬</div>
                <div>
                  <div className="link-label">Laboratory</div>
                  <div className="link-text">Advanced Material Laboratory</div>
                </div>
              </div>
            </div>
            <div className="contact-form-card glass-card reveal reveal-delay-2">
              <h3>Send a Message</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const subject = encodeURIComponent(`Research Inquiry from ${formData.get('name')}`);
                const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`);
                window.location.href = `mailto:trungm3825010@gstudent.ctu.edu.vn?subject=${subject}&body=${body}`;
              }}>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="your@email.com" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" placeholder="Your message about research collaboration..." required />
                </div>
                <button type="submit" className="btn-primary btn-cyan" style={{ width: '100%', cursor: 'pointer' }}>
                  ✉ Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">CMT.Lab</div>
          <p className="footer-text">
            Cao Minh Trung — Materials Science Engineer
          </p>
          <p className="footer-text" style={{ fontSize: '0.75rem' }}>
            Modeling Quantum Tunneling & Hydrogen Adsorption in MOF–Aerogel Composites
          </p>
          <div className="footer-links">
            <a href="mailto:trungm3825010@gstudent.ctu.edu.vn">Email</a>
            <a href="https://github.com/minhtrungengineer" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.ctu.edu.vn" target="_blank" rel="noopener noreferrer">University</a>
          </div>
          <p className="footer-text" style={{ marginTop: '1.5rem', fontSize: '0.7rem', color: '#475569' }}>
            © 2024 Cao Minh Trung. Advanced Material Laboratory, Can Tho University.
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      <div className={`lightbox-overlay ${lightboxSrc ? 'active' : ''}`} onClick={() => setLightboxSrc(null)}>
        <button className="lightbox-close" onClick={() => setLightboxSrc(null)}>✕</button>
        {lightboxSrc && <img src={lightboxSrc} alt="Gallery" onClick={(e) => e.stopPropagation()} />}
      </div>
    </>
  );
}

export default App;
