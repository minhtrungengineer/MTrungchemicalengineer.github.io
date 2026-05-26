/* ===== Root Variables ===== */
:root {
    --primary-cyan: #00f0ff;
    --deep-blue: #0a1628;
    --deep-blue-2: #0d1f3c;
    --quantum-purple: #9d4edd;
    --glow-blue: #4361ee;
    --text-primary: #e0e0e0;
    --text-secondary: #a0a0a0;
    --glass-bg: rgba(10, 22, 40, 0.55);
    --glass-bg-strong: rgba(10, 22, 40, 0.8);
    --glass-border: rgba(0, 240, 255, 0.2);
    --glass-border-hover: rgba(0, 240, 255, 0.5);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    background: var(--deep-blue);
    color: var(--text-primary);
    overflow-x: hidden;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
}

/* ===== Particle Canvas ===== */
#particle-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0.5;
    pointer-events: none;
}

/* ===== Navigation ===== */
.nav {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(10, 22, 40, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 1000;
    border-bottom: 1px solid var(--glass-border);
}

.nav-list {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 1.2rem;
    gap: 2.5rem;
    flex-wrap: wrap;
}

.nav-link {
    color: var(--text-primary);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;
    letter-spacing: 0.5px;
}

.nav-link:hover {
    color: var(--primary-cyan);
    text-shadow: 0 0 10px rgba(0, 240, 255, 0.6);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary-cyan), var(--quantum-purple));
    transition: width 0.3s ease;
    box-shadow: 0 0 10px var(--primary-cyan);
}

.nav-link:hover::after {
    width: 100%;
}

/* ===== Container ===== */
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 10;
}

/* ===== Hero Section ===== */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-top: 80px;
    overflow: hidden;
}

.hero-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    z-index: 2;
}

.hero-content {
    text-align: center;
    z-index: 10;
    max-width: 1000px;
    padding: 2rem;
}

.hero-badge {
    display: inline-block;
    padding: 0.5rem 1.5rem;
    background: rgba(0, 240, 255, 0.1);
    border: 1px solid var(--primary-cyan);
    border-radius: 50px;
    font-size: 0.85rem;
    color: var(--primary-cyan);
    margin-bottom: 2rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    animation: fadeInDown 1s ease-out;
}

.hero h1 {
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #00f0ff 0%, #4361ee 50%, #9d4edd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -1px;
    line-height: 1.1;
    animation: fadeInUp 1s ease-out 0.2s both;
}

.hero-title-glow {
    animation: glowPulse 3s ease-in-out infinite;
    display: inline-block;
}

@keyframes glowPulse {
    0%, 100% { filter: drop-shadow(0 0 20px rgba(0, 240, 255, 0.4)); }
    50% { filter: drop-shadow(0 0 40px rgba(0, 240, 255, 0.8)); }
}

.hero h2 {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    color: var(--text-secondary);
    margin-bottom: 2rem;
    font-weight: 300;
    letter-spacing: 2px;
    animation: fadeInUp 1s ease-out 0.4s both;
}

.hero-subtitle {
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    color: var(--primary-cyan);
    max-width: 800px;
    margin: 0 auto 2.5rem;
    line-height: 1.8;
    font-family: 'JetBrains Mono', monospace;
    animation: fadeInUp 1s ease-out 0.6s both;
    text-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
}

.typewriter {
    display: inline-block;
    border-right: 2px solid var(--primary-cyan);
    animation: blink 1s infinite;
    padding-right: 4px;
}

@keyframes blink {
    0%, 50% { border-color: var(--primary-cyan); }
    51%, 100% { border-color: transparent; }
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Floating atoms */
.molecular-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    opacity: 0.2;
    z-index: 3;
    pointer-events: none;
}

.atom {
    position: absolute;
    border-radius: 50%;
    animation: float 8s ease-in-out infinite;
    box-shadow: 0 0 30px currentColor;
}

@keyframes float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-30px) scale(1.1); }
}

/* ===== Section Styling ===== */
section {
    padding: 6rem 0;
    position: relative;
    z-index: 10;
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.section-title {
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 700;
    display: inline-block;
    position: relative;
    color: var(--text-primary);
    letter-spacing: -0.5px;
}

.section-title-accent {
    background: linear-gradient(135deg, var(--primary-cyan), var(--quantum-purple));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 800;
}

.section-subtitle {
    color: var(--text-secondary);
    margin-top: 1rem;
    font-size: 1.05rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.section-divider {
    display: block;
    width: 100px;
    height: 3px;
    margin: 1.5rem auto 0;
    background: linear-gradient(90deg, transparent, var(--primary-cyan), var(--quantum-purple), transparent);
    border-radius: 3px;
    animation: slideWidth 3s ease-in-out infinite;
}

@keyframes slideWidth {
    0%, 100% { transform: scaleX(0.5); opacity: 0.6; }
    50% { transform: scaleX(1); opacity: 1; }
}

/* ===== Glass Card ===== */
.glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 2.5rem;
    margin-bottom: 2rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.glass-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.08), transparent);
    transition: left 0.6s ease;
}

.glass-card:hover {
    transform: translateY(-5px);
    border-color: var(--glass-border-hover);
    box-shadow: 0 15px 50px rgba(0, 240, 255, 0.15);
}

.glass-card:hover::before {
    left: 100%;
}

/* ===== About ===== */
.about-text {
    font-size: 1.15rem;
    line-height: 2;
    color: var(--text-primary);
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
}

.about-text strong {
    color: var(--primary-cyan);
    font-weight: 600;
}

/* ===== Research Interests Grid ===== */
.interests-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.interest-card {
    background: var(--glass-bg);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 2rem 1.5rem;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.interest-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.15), transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
}

.interest-card:hover {
    transform: translateY(-8px);
    border-color: var(--quantum-purple);
    box-shadow: 0 15px 50px rgba(157, 78, 221, 0.3);
}

.interest-card:hover::after {
    opacity: 1;
}

.interest-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: inline-block;
    transition: transform 0.4s ease;
    filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.5));
}

.interest-card:hover .interest-icon {
    transform: scale(1.2) rotate(10deg);
}

.interest-card h3 {
    color: var(--primary-cyan);
    margin-bottom: 0.5rem;
    font-size: 1.15rem;
    font-weight: 600;
}

.interest-card p {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

/* ===== Quantum Tunneling Visualization ===== */
.tunneling-viz {
    position: relative;
    height: 320px;
    background: linear-gradient(135deg, rgba(10, 22, 40, 0.8), rgba(13, 31, 60, 0.6));
    backdrop-filter: blur(15px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    overflow: hidden;
    margin: 2rem 0;
}

.tunneling-viz::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(0, 240, 255, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 240, 255, 0.08) 1px, transparent 1px);
    background-size: 30px 30px;
    opacity: 0.5;
}

.potential-barrier {
    position: absolute;
    left: 50%;
    top: 10%;
    bottom: 10%;
    width: 60px;
    transform: translateX(-50%);
    background: linear-gradient(180deg,
        rgba(157, 78, 221, 0.1),
        rgba(157, 78, 221, 0.4),
        rgba(157, 78, 221, 0.1));
    border-left: 2px dashed var(--quantum-purple);
    border-right: 2px dashed var(--quantum-purple);
    box-shadow: 0 0 30px rgba(157, 78, 221, 0.4);
}

.potential-barrier-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--quantum-purple);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    letter-spacing: 2px;
    font-weight: 600;
    text-shadow: 0 0 10px var(--quantum-purple);
}

.wave-function {
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg,
        transparent 0%,
        var(--primary-cyan) 20%,
        var(--quantum-purple) 50%,
        var(--primary-cyan) 80%,
        transparent 100%);
    box-shadow: 0 0 15px var(--primary-cyan);
    animation: waveTravel 4s ease-in-out infinite;
    opacity: 0.8;
}

@keyframes waveTravel {
    0% { transform: translateX(-30%) scaleY(1); opacity: 0.3; }
    50% { transform: translateX(0) scaleY(2); opacity: 0.9; }
    100% { transform: translateX(30%) scaleY(1); opacity: 0.3; }
}

.tunneling-particle {
    position: absolute;
    width: 12px;
    height: 12px;
    background: radial-gradient(circle, var(--primary-cyan), transparent);
    border-radius: 50%;
    box-shadow: 0 0 25px var(--primary-cyan), 0 0 50px var(--primary-cyan);
    animation: tunnel 5s ease-in-out infinite;
}

@keyframes tunnel {
    0% { left: 5%; opacity: 1; }
    45% { left: 45%; opacity: 1; }
    50% { left: 50%; opacity: 0.2; }
    55% { left: 55%; opacity: 1; }
    100% { left: 95%; opacity: 1; }
}

/* ===== MOF Grid ===== */
.mof-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.mof-card {
    background: var(--glass-bg);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 2.5rem 2rem;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.mof-card::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, var(--primary-cyan), var(--quantum-purple));
    border-radius: 16px;
    opacity: 0;
    z-index: -1;
    transition: opacity 0.4s ease;
}

.mof-card:hover {
    transform: scale(1.03) translateY(-5px);
    border-color: transparent;
}

.mof-card:hover::before {
    opacity: 0.3;
}

.mof-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    display: inline-block;
    filter: drop-shadow(0 0 15px currentColor);
    animation: rotateSlow 20s linear infinite;
}

@keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.mof-card h3 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
    font-weight: 700;
}

.mof-card p {
    color: var(--text-secondary);
    line-height: 1.7;
    font-size: 0.95rem;
}

/* ===== Publications ===== */
.publication-item {
    background: var(--glass-bg);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
    position: relative;
    border-left: 3px solid var(--primary-cyan);
}

.publication-item:hover {
    border-left-color: var(--quantum-purple);
    transform: translateX(8px);
    box-shadow: 0 10px 40px rgba(157, 78, 221, 0.2);
}

.publication-item h3 {
    color: var(--primary-cyan);
    margin-bottom: 0.8rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.publication-journal {
    color: var(--quantum-purple);
    font-style: italic;
    margin-bottom: 0.8rem;
    font-size: 0.95rem;
    font-family: 'JetBrains Mono', monospace;
}

.publication-item p:last-child {
    color: var(--text-secondary);
    line-height: 1.7;
}

/* ===== Skills ===== */
.skills-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

@media (max-width: 768px) {
    .skills-wrapper {
        grid-template-columns: 1fr;
    }
}

.skills-card-title {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
}

.skill-item {
    background: rgba(0, 240, 255, 0.05);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 1.5rem 1rem;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.skill-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--primary-cyan), var(--quantum-purple));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
}

.skill-item:hover {
    transform: translateY(-5px);
    border-color: var(--quantum-purple);
    box-shadow: 0 0 25px rgba(157, 78, 221, 0.25);
}

.skill-item:hover::before {
    transform: scaleX(1);
}

.skill-item h4 {
    color: var(--primary-cyan);
    margin-bottom: 0.5rem;
    font-size: 1.05rem;
    font-weight: 600;
}

.skill-item p {
    color: var(--text-secondary);
    font-size: 0.85rem;
}

/* ===== Education Timeline ===== */
.timeline {
    position: relative;
    padding-left: 3rem;
    max-width: 800px;
    margin: 0 auto;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, var(--primary-cyan), var(--quantum-purple), transparent);
    box-shadow: 0 0 10px var(--primary-cyan);
}

.timeline-item {
    position: relative;
    margin-bottom: 2rem;
}

.timeline-item::before {
    content: '';
    position: absolute;
    left: -3.4rem;
    top: 0.7rem;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--primary-cyan);
    box-shadow: 0 0 20px var(--primary-cyan), 0 0 40px var(--primary-cyan);
    animation: pulseDot 2s ease-in-out infinite;
}

@keyframes pulseDot {
    0%, 100% { transform: scale(1); box-shadow: 0 0 20px var(--primary-cyan); }
    50% { transform: scale(1.2); box-shadow: 0 0 30px var(--primary-cyan), 0 0 50px var(--primary-cyan); }
}

.timeline-item h3 {
    color: var(--primary-cyan);
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    font-weight: 700;
}

.timeline-item h4 {
    color: var(--quantum-purple);
    margin-bottom: 1rem;
    font-size: 1.1rem;
    font-weight: 500;
}

.timeline-item p {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    line-height: 1.7;
}

.timeline-item p strong {
    color: var(--text-primary);
}

.timeline-focus {
    margin-top: 1.5rem;
    padding: 1rem 1.5rem;
    background: rgba(0, 240, 255, 0.05);
    border-left: 2px solid var(--primary-cyan);
    border-radius: 0 8px 8px 0;
    color: var(--text-primary) !important;
    font-style: italic;
}

/* ===== Contact ===== */
.contact-content {
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
}

.contact-content h3 {
    color: var(--primary-cyan);
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: 700;
}

.contact-content > p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    margin-bottom: 2.5rem;
    line-height: 1.8;
}

.contact-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.contact-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: var(--glass-bg);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    color: var(--primary-cyan);
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 600;
    font-size: 0.95rem;
}

.contact-link:hover {
    background: var(--primary-cyan);
    color: var(--deep-blue);
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 240, 255, 0.5);
    border-color: var(--primary-cyan);
}

/* ===== Footer ===== */
.footer {
    text-align: center;
    padding: 3rem 0 2rem;
    border-top: 1px solid var(--glass-border);
    color: var(--text-secondary);
    position: relative;
    z-index: 10;
}

.footer p {
    margin-bottom: 0.5rem;
}

.footer .tagline {
    color: var(--primary-cyan);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    letter-spacing: 1px;
}

/* ===== Scrollbar ===== */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: var(--deep-blue);
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, var(--primary-cyan), var(--quantum-purple));
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--quantum-purple);
}

/* ===== Reveal Animation ===== */
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
    .nav-list {
        gap: 1.2rem;
        padding: 1rem 0.5rem;
        font-size: 0.8rem;
    }

    .nav-link {
        font-size: 0.85rem;
    }

    section {
        padding: 4rem 0;
    }

    .container {
        padding: 0 1.2rem;
    }

    .glass-card {
        padding: 1.8rem 1.5rem;
    }

    .interests-grid {
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .interest-card {
        padding: 1.5rem 1rem;
    }

    .interest-icon {
        font-size: 2rem;
    }

    .timeline {
        padding-left: 2rem;
    }

    .timeline-item::before {
        left: -2.4rem;
    }

    .molecular-bg {
        width: 400px;
        height: 400px;
    }
}

@media (max-width: 480px) {
    .interests-grid {
        grid-template-columns: 1fr;
    }

    .contact-links {
        flex-direction: column;
        align-items: center;
    }

    .contact-link {
        width: 100%;
        max-width: 300px;
        justify-content: center;
    }
}
