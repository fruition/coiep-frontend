'use client';

import { useState, useEffect, useCallback } from 'react';

const CORRECT_PASSWORD = 'coiep2026';
const COOKIE_NAME = 'presentation_auth';
const COOKIE_DAYS = 7;

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/presentation`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export default function PresentationPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 12;

  useEffect(() => {
    const auth = getCookie(COOKIE_NAME);
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setCookie(COOKIE_NAME, 'true', COOKIE_DAYS);
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const showSlide = useCallback((n: number) => {
    let newSlide = n;
    if (n > totalSlides) newSlide = 1;
    if (n < 1) newSlide = totalSlides;
    setCurrentSlide(newSlide);
  }, [totalSlides]);

  const nextSlide = useCallback(() => showSlide(currentSlide + 1), [currentSlide, showSlide]);
  const prevSlide = useCallback(() => showSlide(currentSlide - 1), [currentSlide, showSlide]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated, nextSlide, prevSlide]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0A3161',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif' }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A3161 0%, #0d4a8a 50%, #0A3161 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
      }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '48px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        }}>
          <div style={{
            marginBottom: '24px',
            fontSize: '2.5rem',
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
          }}>
            <span style={{ color: '#A67C52' }}>Co</span>
            <span style={{ color: '#0A3161' }}>IEP</span>
          </div>
          <h1 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#333333',
            marginBottom: '8px',
            fontFamily: 'Georgia, serif',
          }}>
            Progress Presentation
          </h1>
          <p style={{
            color: '#666666',
            marginBottom: '32px',
            fontSize: '0.95rem',
          }}>
            Enter password to view
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '1rem',
                border: '2px solid #E5E5E5',
                borderRadius: '8px',
                background: '#F9F9F9',
                color: '#333333',
                outline: 'none',
                marginBottom: '16px',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#A67C52'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'}
              autoFocus
            />
            {error && (
              <p style={{ color: '#DC3545', marginBottom: '16px', fontSize: '0.9rem' }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px 24px',
                fontSize: '1rem',
                fontWeight: 600,
                background: '#0A3161',
                border: 'none',
                borderRadius: '8px',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#0d4a8a'}
              onMouseOut={(e) => e.currentTarget.style.background = '#0A3161'}
            >
              View Presentation
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, -apple-system, BlinkMacSystemFont, sans-serif; background: #0A3161; color: #333333; overflow: hidden; }
        .slide-container { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; }
        .slide { display: none; width: 100%; height: 100%; padding: 60px 80px; animation: fadeIn 0.5s ease-in-out; }
        .slide.active { display: flex; flex-direction: column; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        /* Title Slides - Dark background */
        .title-slide { justify-content: center; align-items: center; text-align: center; background: linear-gradient(135deg, #0A3161 0%, #0d4a8a 50%, #0A3161 100%); color: #FFFFFF; }
        .title-slide h1 { font-size: 4rem; font-weight: 700; margin-bottom: 20px; font-family: Georgia, serif; color: #FFFFFF; }
        .title-slide h2 { font-size: 2rem; font-weight: 400; color: rgba(255,255,255,0.85); margin-bottom: 40px; }
        .title-slide .subtitle { font-size: 1.2rem; color: rgba(255,255,255,0.7); }

        .logo-text { font-size: 5rem; font-weight: 700; font-family: Georgia, serif; margin-bottom: 20px; }
        .logo-co { color: #A67C52; }
        .logo-iep { color: #FFFFFF; }

        /* Content Slides - Light background */
        .content-slide { background: #F2F2F2; color: #333333; }
        .slide-header { margin-bottom: 40px; }
        .slide-header h2 { font-size: 2.5rem; font-weight: 600; color: #0A3161; margin-bottom: 10px; font-family: Georgia, serif; }
        .slide-header .accent-bar { width: 80px; height: 4px; background: #A67C52; border-radius: 2px; }

        .content-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; flex: 1; }
        .content-grid.three-col { grid-template-columns: repeat(3, 1fr); }
        .content-grid.four-col { grid-template-columns: repeat(4, 1fr); }
        .content-grid.single { grid-template-columns: 1fr; }

        .card { background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 12px; padding: 28px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1); }
        .card-icon { width: 52px; height: 52px; background: #0A3161; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; font-size: 1.4rem; color: #FFFFFF; }
        .card-icon.accent { background: #A67C52; }
        .card h3 { font-size: 1.2rem; font-weight: 600; margin-bottom: 10px; color: #0A3161; font-family: Georgia, serif; }
        .card p { color: #555555; line-height: 1.6; font-size: 0.95rem; }
        .card ul { list-style: none; color: #555555; }
        .card ul li { padding: 6px 0; padding-left: 22px; position: relative; line-height: 1.5; font-size: 0.95rem; }
        .card ul li::before { content: "✓"; position: absolute; left: 0; color: #A67C52; font-weight: bold; }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 40px; }
        .stat-card { background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 12px; padding: 28px; text-align: center; }
        .stat-number { font-size: 3rem; font-weight: 700; color: #0A3161; margin-bottom: 8px; font-family: Georgia, serif; }
        .stat-number.accent { color: #A67C52; }
        .stat-label { color: #555555; font-size: 0.95rem; }

        .timeline { display: flex; justify-content: space-between; position: relative; margin-top: 40px; }
        .timeline::before { content: ""; position: absolute; top: 30px; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #A67C52 0%, #A67C52 75%, #0A3161 75%, #0A3161 100%); border-radius: 2px; }
        .timeline-item { text-align: center; flex: 1; position: relative; }
        .timeline-dot { width: 24px; height: 24px; background: #A67C52; border-radius: 50%; margin: 0 auto 20px; position: relative; z-index: 1; border: 4px solid #F2F2F2; }
        .timeline-dot.current { background: #0A3161; box-shadow: 0 0 20px rgba(10, 49, 97, 0.4); }
        .timeline-dot.future { background: #CCCCCC; }
        .timeline-date { font-size: 0.85rem; color: #888888; margin-bottom: 6px; }
        .timeline-title { font-weight: 600; color: #0A3161; margin-bottom: 4px; font-family: Georgia, serif; }
        .timeline-desc { font-size: 0.8rem; color: #666666; }

        .agent-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .agent-card { background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 10px; padding: 18px; text-align: center; }
        .agent-card .icon { font-size: 1.8rem; margin-bottom: 10px; }
        .agent-card h4 { font-size: 0.95rem; font-weight: 600; color: #0A3161; margin-bottom: 6px; font-family: Georgia, serif; }
        .agent-card p { font-size: 0.8rem; color: #666666; }
        .status-badge { display: inline-block; padding: 4px 10px; background: rgba(166, 124, 82, 0.15); color: #A67C52; border-radius: 16px; font-size: 0.7rem; font-weight: 600; margin-top: 8px; text-transform: uppercase; }

        .quote-section { background: #FFFFFF; border-left: 4px solid #A67C52; padding: 28px 36px; border-radius: 0 12px 12px 0; margin: 30px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .quote-text { font-size: 1.3rem; font-style: italic; color: #333333; line-height: 1.6; margin-bottom: 14px; font-family: Georgia, serif; }
        .quote-author { color: #888888; font-size: 0.95rem; }

        .nav-controls { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); display: flex; gap: 20px; align-items: center; z-index: 100; background: rgba(255,255,255,0.95); padding: 12px 24px; border-radius: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .nav-btn { background: #0A3161; border: none; color: #FFFFFF; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: all 0.2s ease; }
        .nav-btn:hover { background: #0d4a8a; }
        .slide-counter { color: #666666; font-size: 0.9rem; min-width: 60px; text-align: center; }
        .progress-bar { position: fixed; top: 0; left: 0; height: 4px; background: #A67C52; transition: width 0.3s ease; z-index: 1000; }

        .feature-list { display: flex; flex-direction: column; gap: 14px; }
        .feature-item { display: flex; align-items: flex-start; gap: 14px; padding: 14px; background: #F9F9F9; border-radius: 10px; border: 1px solid #E5E5E5; }
        .feature-icon { width: 36px; height: 36px; background: #A67C52; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #FFFFFF; font-size: 1rem; }
        .feature-content h4 { color: #0A3161; margin-bottom: 4px; font-size: 1rem; font-family: Georgia, serif; }
        .feature-content p { color: #666666; font-size: 0.85rem; }

        .impact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .impact-card { background: #FFFFFF; border: 2px solid #0A3161; border-radius: 12px; padding: 28px; text-align: center; }
        .impact-card .number { font-size: 2.8rem; font-weight: 700; color: #0A3161; margin-bottom: 8px; font-family: Georgia, serif; }
        .impact-card .label { color: #555555; font-size: 1rem; }

        .two-column { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; flex: 1; }
        .column h3 { font-size: 1.4rem; font-weight: 600; color: #0A3161; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #A67C52; font-family: Georgia, serif; }

        .cta-section { text-align: center; padding: 50px; background: #FFFFFF; border-radius: 16px; margin-top: 30px; border: 2px solid #A67C52; }
        .cta-section h3 { font-size: 1.8rem; margin-bottom: 14px; color: #0A3161; font-family: Georgia, serif; }
        .cta-section p { color: #555555; font-size: 1.1rem; max-width: 600px; margin: 0 auto; }

        .built-by { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 30px; color: rgba(255,255,255,0.7); font-size: 1rem; }
        .built-by strong { color: #A67C52; }

        .value-highlight { background: linear-gradient(135deg, #0A3161 0%, #0d4a8a 100%); color: #FFFFFF; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 30px; }
        .value-highlight .big-number { font-size: 3.5rem; font-weight: 700; font-family: Georgia, serif; }
        .value-highlight .label { font-size: 1.1rem; opacity: 0.9; margin-top: 8px; }
      `}</style>

      <div className="progress-bar" style={{ width: `${(currentSlide / totalSlides) * 100}%` }} />

      <div className="slide-container">
        {/* Slide 1: Title */}
        <div className={`slide title-slide ${currentSlide === 1 ? 'active' : ''}`}>
          <div className="logo-text">
            <span className="logo-co">Co</span>
            <span className="logo-iep">IEP</span>
          </div>
          <h2>Collaborative Individualized Education Program Platform</h2>
          <p className="subtitle">Progress Report &amp; Investment Impact<br />University of Wyoming | February 2026</p>
          <div className="built-by">
            Built by <strong>Fruition</strong> &bull; Denver, Colorado
          </div>
        </div>

        {/* Slide 2: Executive Summary */}
        <div className={`slide content-slide ${currentSlide === 2 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Executive Summary</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">9</div>
              <div className="stat-label">AI Agents Built</div>
            </div>
            <div className="stat-card">
              <div className="stat-number accent">50</div>
              <div className="stat-label">States Supported</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">300+</div>
              <div className="stat-label">Development Hours</div>
            </div>
            <div className="stat-card">
              <div className="stat-number accent">100%</div>
              <div className="stat-label">Production Ready</div>
            </div>
          </div>
          <div className="quote-section">
            <p className="quote-text">&ldquo;CoIEP represents a transformative approach to IEP development, combining the expertise of special education professionals with the power of AI to create better outcomes for students with disabilities.&rdquo;</p>
            <p className="quote-author">University of Wyoming Special Education Department</p>
          </div>
        </div>

        {/* Slide 3: Investment Value */}
        <div className={`slide content-slide ${currentSlide === 3 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Exceptional Investment Value</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="number">300+</div>
              <div className="label">Hours of Expert Development</div>
            </div>
            <div className="impact-card">
              <div className="number" style={{ color: '#A67C52' }}>&lt;$50</div>
              <div className="label">Effective Hourly Rate</div>
            </div>
            <div className="impact-card">
              <div className="number">$150K+</div>
              <div className="label">Market Value Delivered</div>
            </div>
          </div>
          <div className="two-column" style={{ marginTop: '30px' }}>
            <div className="card">
              <div className="card-icon accent">&#x1F4B0;</div>
              <h3>Discounted Partnership Rate</h3>
              <p>As a mission-driven project with the University of Wyoming, Fruition provided significantly discounted rates&mdash;delivering enterprise-grade software at a fraction of typical development costs.</p>
            </div>
            <div className="card">
              <div className="card-icon">&#x1F3C6;</div>
              <h3>Enterprise-Quality Platform</h3>
              <p>Built with the same technologies and standards used by Fortune 500 companies. Production-ready, scalable, and secure from day one.</p>
            </div>
          </div>
        </div>

        {/* Slide 4: The Challenge */}
        <div className={`slide content-slide ${currentSlide === 4 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>The Challenge We&apos;re Addressing</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="content-grid">
            <div className="card">
              <div className="card-icon">&#x23F0;</div>
              <h3>Time-Intensive Process</h3>
              <p>Creating quality IEPs requires significant time investment from educators who are already stretched thin. Teachers spend hours on documentation instead of instruction.</p>
            </div>
            <div className="card">
              <div className="card-icon accent">&#x1F4DA;</div>
              <h3>Training Gap</h3>
              <p>Pre-service teachers lack exposure to real-world IEP examples. Limited access to quality training materials hinders professional development.</p>
            </div>
            <div className="card">
              <div className="card-icon">&#x1F512;</div>
              <h3>Privacy Constraints</h3>
              <p>Working with real student data creates privacy concerns. Training with anonymous data while maintaining authenticity is challenging.</p>
            </div>
            <div className="card">
              <div className="card-icon accent">&#x1F4CA;</div>
              <h3>Quality Consistency</h3>
              <p>IEP quality varies significantly across districts and educators. No standardized way to evaluate and improve IEP components.</p>
            </div>
          </div>
        </div>

        {/* Slide 5: Our Solution */}
        <div className={`slide content-slide ${currentSlide === 5 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>The CoIEP Solution</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="two-column">
            <div className="column">
              <h3>AI-Powered Assistance</h3>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">&#x2728;</div>
                  <div className="feature-content">
                    <h4>Intelligent Document Generation</h4>
                    <p>AI agents create high-quality IEP components based on student needs and state standards</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">&#x1F4DD;</div>
                  <div className="feature-content">
                    <h4>Automated Evaluation</h4>
                    <p>Real-time feedback on IEP quality with specific recommendations for improvement</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">&#x1F3AF;</div>
                  <div className="feature-content">
                    <h4>All 50 States Supported</h4>
                    <p>Standards database ready for all US states with Kansas, New Jersey, and Wyoming fully imported</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h3>User-Centered Design</h3>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">&#x1F504;</div>
                  <div className="feature-content">
                    <h4>Seamless Workflow</h4>
                    <p>Intuitive step-by-step process guides users through IEP creation</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">&#x1F6E1;&#xFE0F;</div>
                  <div className="feature-content">
                    <h4>Privacy First</h4>
                    <p>FERPA-ready architecture with anonymous data mode for training</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">&#x1F465;</div>
                  <div className="feature-content">
                    <h4>Parent Sharing</h4>
                    <p>Secure shareable links allow parents to view IEP progress without platform access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 6: AI Agents */}
        <div className={`slide content-slide ${currentSlide === 6 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>9 Specialized AI Agents</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="agent-grid">
            <div className="agent-card">
              <div className="icon">&#x1F4AC;</div>
              <h4>General Chat</h4>
              <p>Context-aware assistant</p>
              <span className="status-badge">Operational</span>
            </div>
            <div className="agent-card">
              <div className="icon">&#x1F4CB;</div>
              <h4>PLAAFP Writer</h4>
              <p>Present Levels generation</p>
              <span className="status-badge">Operational</span>
            </div>
            <div className="agent-card">
              <div className="icon">&#x2705;</div>
              <h4>PLAAFP Evaluator</h4>
              <p>Reviews &amp; feedback</p>
              <span className="status-badge">Operational</span>
            </div>
            <div className="agent-card">
              <div className="icon">&#x1F3AF;</div>
              <h4>Goals Writer</h4>
              <p>SMART IEP goals</p>
              <span className="status-badge">Operational</span>
            </div>
            <div className="agent-card">
              <div className="icon">&#x1F4CA;</div>
              <h4>Goals Evaluator</h4>
              <p>6-dimension assessment</p>
              <span className="status-badge">Operational</span>
            </div>
            <div className="agent-card">
              <div className="icon">&#x1F4D0;</div>
              <h4>SDI Writer</h4>
              <p>Specialized instruction</p>
              <span className="status-badge">Operational</span>
            </div>
            <div className="agent-card">
              <div className="icon">&#x1F50D;</div>
              <h4>SDI Evaluator</h4>
              <p>Instruction review</p>
              <span className="status-badge">Operational</span>
            </div>
            <div className="agent-card">
              <div className="icon">&#x1F6E0;&#xFE0F;</div>
              <h4>SAS Writer</h4>
              <p>Aids &amp; Services</p>
              <span className="status-badge">Operational</span>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '24px', color: '#666666' }}>+ SAS Evaluator &amp; Case Manager completing the comprehensive IEP workflow</p>
        </div>

        {/* Slide 7: Scalability & Architecture */}
        <div className={`slide content-slide ${currentSlide === 7 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Built for Scale</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="value-highlight">
            <div className="big-number">100,000+</div>
            <div className="label">Users Supported with Auto-Scaling Architecture</div>
          </div>
          <div className="content-grid three-col">
            <div className="card">
              <div className="card-icon">&#x2601;&#xFE0F;</div>
              <h3>Kubernetes Infrastructure</h3>
              <ul>
                <li>Runs on enterprise Kubernetes (K8s)</li>
                <li>Auto-scaling pods for demand</li>
                <li>Zero-downtime deployments</li>
                <li>Self-healing architecture</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon accent">&#x26A1;</div>
              <h3>Burst Capacity</h3>
              <ul>
                <li>Handles semester start surges</li>
                <li>IEP deadline peak periods</li>
                <li>Training cohort onboarding</li>
                <li>Scales to meet demand</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon">&#x1F512;</div>
              <h3>Enterprise Security</h3>
              <ul>
                <li>Multi-tenant data isolation</li>
                <li>FERPA-ready architecture</li>
                <li>Encrypted data at rest</li>
                <li>Role-based access control</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slide 8: Integration Capabilities */}
        <div className={`slide content-slide ${currentSlide === 8 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Integration &amp; Interoperability</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="content-grid">
            <div className="card">
              <div className="card-icon">&#x1F517;</div>
              <h3>Public REST API</h3>
              <ul>
                <li>API key authentication</li>
                <li>Student roster sync from SIS</li>
                <li>IEP import/export capabilities</li>
                <li>Webhook event notifications</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon accent">&#x1F4E4;</div>
              <h3>Export Formats</h3>
              <ul>
                <li>JSON for system integration</li>
                <li>XML for legacy systems</li>
                <li>CSV for reporting</li>
                <li>PDF for documentation</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon">&#x1F3EB;</div>
              <h3>Platform Integration</h3>
              <ul>
                <li>Student Information Systems</li>
                <li>Learning Management Systems</li>
                <li>Frontline, PowerSchool ready</li>
                <li>District portal embedding</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon accent">&#x1F46A;</div>
              <h3>Parent Engagement</h3>
              <ul>
                <li>Secure shareable links</li>
                <li>Time-limited access tokens</li>
                <li>No login required for parents</li>
                <li>Progress visibility</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slide 9: Technical Stack */}
        <div className={`slide content-slide ${currentSlide === 9 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Enterprise Technology Stack</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="content-grid">
            <div className="card">
              <div className="card-icon">&#x1F3D7;&#xFE0F;</div>
              <h3>Modern Architecture</h3>
              <ul>
                <li>Next.js 15 Frontend (React)</li>
                <li>NestJS 11 Backend API</li>
                <li>PostgreSQL with Prisma ORM</li>
                <li>Redis caching layer</li>
                <li>Docker containerization</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon accent">&#x1F916;</div>
              <h3>AI Integration</h3>
              <ul>
                <li>OpenAI GPT-4 integration</li>
                <li>Pinecone vector database</li>
                <li>Evidence-based practice search</li>
                <li>Real-time streaming (SSE)</li>
                <li>Multi-agent orchestration</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon">&#x1F4C1;</div>
              <h3>Document Processing</h3>
              <ul>
                <li>PDF extraction &amp; analysis</li>
                <li>Word document support</li>
                <li>Image OCR capabilities</li>
                <li>MDT report imports</li>
                <li>Up to 10MB file size</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon accent">&#x1F4CA;</div>
              <h3>State Standards</h3>
              <ul>
                <li>All 50 states in database</li>
                <li>Grade-level targeting</li>
                <li>Subject categorization</li>
                <li>Version history tracking</li>
                <li>Automated alignment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slide 10: Development Timeline */}
        <div className={`slide content-slide ${currentSlide === 10 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Development Journey</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="timeline" style={{ marginTop: '50px' }}>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Apr 2025</div>
              <div className="timeline-title">Project Kickoff</div>
              <div className="timeline-desc">Discovery &amp; Architecture</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Jun 2025</div>
              <div className="timeline-title">Core Platform</div>
              <div className="timeline-desc">Auth, Sessions, UI</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Aug 2025</div>
              <div className="timeline-title">AI Integration</div>
              <div className="timeline-desc">All 9 Agents Deployed</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Oct 2025</div>
              <div className="timeline-title">50-State Support</div>
              <div className="timeline-desc">Standards Database</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot current"></div>
              <div className="timeline-date">Feb 2026</div>
              <div className="timeline-title">Demo Ready</div>
              <div className="timeline-desc">Production Stable</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot future"></div>
              <div className="timeline-date">2026+</div>
              <div className="timeline-title">Expansion</div>
              <div className="timeline-desc">Scale &amp; Features</div>
            </div>
          </div>
          <div style={{ marginTop: '60px', textAlign: 'center' }}>
            <p style={{ color: '#555555', fontSize: '1.1rem' }}>Total Development: <span style={{ color: '#0A3161', fontWeight: 700 }}>300+ hours</span> &bull; Built by <span style={{ color: '#A67C52', fontWeight: 700 }}>Fruition</span> (Denver, CO)</p>
          </div>
        </div>

        {/* Slide 11: Impact & Value */}
        <div className={`slide content-slide ${currentSlide === 11 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Impact &amp; Future</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="impact-grid" style={{ marginBottom: '30px' }}>
            <div className="impact-card">
              <div className="number">50%</div>
              <div className="label">Reduction in IEP creation time</div>
            </div>
            <div className="impact-card">
              <div className="number" style={{ color: '#A67C52' }}>&#x221E;</div>
              <div className="label">Scalability for growth</div>
            </div>
            <div className="impact-card">
              <div className="number">24/7</div>
              <div className="label">AI assistance availability</div>
            </div>
          </div>
          <div className="two-column">
            <div className="card">
              <h3>For Pre-Service Teachers</h3>
              <ul>
                <li>Practice with realistic anonymous cases</li>
                <li>Receive immediate AI feedback</li>
                <li>Learn from exemplary IEP examples</li>
                <li>Build confidence before classrooms</li>
              </ul>
            </div>
            <div className="card">
              <h3>For In-Service Teachers</h3>
              <ul>
                <li>Evaluate and improve existing IEPs</li>
                <li>Access evidence-based practices</li>
                <li>Share progress with parents easily</li>
                <li>Integrate with existing systems</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slide 12: Demo & Thank You */}
        <div className={`slide title-slide ${currentSlide === 12 ? 'active' : ''}`}>
          <div className="logo-text">
            <span className="logo-co">Co</span>
            <span className="logo-iep">IEP</span>
          </div>
          <h1 style={{ fontSize: '3rem' }}>Ready for Demonstration</h1>
          <h2>Production-ready and available for live demo</h2>
          <div style={{ marginTop: '30px' }}>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.2rem', marginBottom: '16px' }}>
              Staging Environment: <span style={{ color: '#A67C52', fontWeight: 600 }}>uw-coiep.staging.fruitionqa.com</span>
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>
              Your investment has built a scalable, AI-powered platform<br />
              that will transform IEP development and educator training.
            </p>
          </div>
          <div className="cta-section" style={{ marginTop: '40px', padding: '36px', maxWidth: '700px', background: 'rgba(255,255,255,0.95)' }}>
            <h3>Thank You for Your Support</h3>
            <p style={{ marginTop: '12px' }}>Your continued investment will help us expand to more states,<br />add advanced features, and impact more students&apos; lives.</p>
          </div>
          <div className="built-by" style={{ marginTop: '40px' }}>
            Built with &#x2764;&#xFE0F; by <strong>Fruition</strong> &bull; Denver, Colorado
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="nav-controls">
        <button className="nav-btn" onClick={prevSlide}>&larr; Previous</button>
        <span className="slide-counter">{currentSlide} / {totalSlides}</span>
        <button className="nav-btn" onClick={nextSlide}>Next &rarr;</button>
      </div>
    </>
  );
}
