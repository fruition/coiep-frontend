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
  const totalSlides = 11;

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
        background: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: '#f1f5f9' }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #1a365d 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        <div style={{
          background: 'rgba(30, 41, 59, 0.9)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '24px',
          padding: '48px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '2rem',
            fontWeight: 700,
            color: '#f1f5f9',
          }}>
            Co
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#f1f5f9',
            marginBottom: '8px',
          }}>
            CoIEP Presentation
          </h1>
          <p style={{
            color: '#94a3b8',
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
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '12px',
                background: 'rgba(15, 23, 42, 0.8)',
                color: '#f1f5f9',
                outline: 'none',
                marginBottom: '16px',
              }}
              autoFocus
            />
            {error && (
              <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.9rem' }}>
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
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                border: 'none',
                borderRadius: '12px',
                color: '#f1f5f9',
                cursor: 'pointer',
                transition: 'transform 0.2s, opacity 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
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
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #0f172a; color: #f1f5f9; overflow: hidden; }
        .slide-container { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; }
        .slide { display: none; width: 100%; height: 100%; padding: 60px 80px; animation: fadeIn 0.5s ease-in-out; }
        .slide.active { display: flex; flex-direction: column; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .title-slide { justify-content: center; align-items: center; text-align: center; background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #1a365d 100%); }
        .title-slide h1 { font-size: 4rem; font-weight: 700; margin-bottom: 20px; background: linear-gradient(135deg, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .title-slide h2 { font-size: 2rem; font-weight: 400; color: #94a3b8; margin-bottom: 40px; }
        .title-slide .subtitle { font-size: 1.2rem; color: #64748b; }
        .logo { width: 120px; height: 120px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 24px; display: flex; align-items: center; justify-content: center; margin-bottom: 40px; font-size: 3rem; font-weight: 700; }
        .content-slide { background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); }
        .slide-header { margin-bottom: 50px; }
        .slide-header h2 { font-size: 2.5rem; font-weight: 600; color: #f1f5f9; margin-bottom: 10px; }
        .slide-header .accent-bar { width: 80px; height: 4px; background: linear-gradient(90deg, #3b82f6, #8b5cf6); border-radius: 2px; }
        .content-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; flex: 1; }
        .content-grid.three-col { grid-template-columns: repeat(3, 1fr); }
        .content-grid.single { grid-template-columns: 1fr; }
        .card { background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(148, 163, 184, 0.1); border-radius: 16px; padding: 30px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); }
        .card-icon { width: 56px; height: 56px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-size: 1.5rem; }
        .card h3 { font-size: 1.3rem; font-weight: 600; margin-bottom: 12px; color: #f1f5f9; }
        .card p { color: #94a3b8; line-height: 1.6; font-size: 1rem; }
        .card ul { list-style: none; color: #94a3b8; }
        .card ul li { padding: 8px 0; padding-left: 24px; position: relative; line-height: 1.5; }
        .card ul li::before { content: "✓"; position: absolute; left: 0; color: #22c55e; font-weight: bold; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; margin-bottom: 50px; }
        .stat-card { background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(148, 163, 184, 0.1); border-radius: 16px; padding: 30px; text-align: center; }
        .stat-number { font-size: 3rem; font-weight: 700; background: linear-gradient(135deg, #22c55e, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 8px; }
        .stat-label { color: #94a3b8; font-size: 1rem; }
        .timeline { display: flex; justify-content: space-between; position: relative; margin-top: 40px; }
        .timeline::before { content: ""; position: absolute; top: 30px; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #22c55e 0%, #22c55e 75%, #3b82f6 75%, #3b82f6 100%); border-radius: 2px; }
        .timeline-item { text-align: center; flex: 1; position: relative; }
        .timeline-dot { width: 24px; height: 24px; background: #22c55e; border-radius: 50%; margin: 0 auto 20px; position: relative; z-index: 1; border: 4px solid #0f172a; }
        .timeline-dot.current { background: #3b82f6; box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
        .timeline-dot.future { background: #475569; }
        .timeline-date { font-size: 0.9rem; color: #64748b; margin-bottom: 8px; }
        .timeline-title { font-weight: 600; color: #f1f5f9; margin-bottom: 4px; }
        .timeline-desc { font-size: 0.85rem; color: #94a3b8; }
        .agent-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .agent-card { background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(148, 163, 184, 0.1); border-radius: 12px; padding: 20px; text-align: center; }
        .agent-card .icon { font-size: 2rem; margin-bottom: 12px; }
        .agent-card h4 { font-size: 1rem; font-weight: 600; color: #f1f5f9; margin-bottom: 8px; }
        .agent-card p { font-size: 0.85rem; color: #94a3b8; }
        .status-badge { display: inline-block; padding: 4px 12px; background: rgba(34, 197, 94, 0.2); color: #22c55e; border-radius: 20px; font-size: 0.75rem; font-weight: 600; margin-top: 8px; }
        .quote-section { background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 30px 40px; border-radius: 0 16px 16px 0; margin: 40px 0; }
        .quote-text { font-size: 1.4rem; font-style: italic; color: #e2e8f0; line-height: 1.6; margin-bottom: 16px; }
        .quote-author { color: #94a3b8; font-size: 1rem; }
        .nav-controls { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); display: flex; gap: 20px; align-items: center; z-index: 100; }
        .nav-btn { background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.3); color: #f1f5f9; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 1rem; transition: all 0.3s ease; }
        .nav-btn:hover { background: rgba(59, 130, 246, 0.4); }
        .slide-counter { color: #64748b; font-size: 0.9rem; }
        .progress-bar { position: fixed; top: 0; left: 0; height: 4px; background: linear-gradient(90deg, #3b82f6, #8b5cf6); transition: width 0.3s ease; }
        .feature-list { display: flex; flex-direction: column; gap: 16px; }
        .feature-item { display: flex; align-items: flex-start; gap: 16px; padding: 16px; background: rgba(30, 41, 59, 0.4); border-radius: 12px; }
        .feature-icon { width: 40px; height: 40px; background: rgba(34, 197, 94, 0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #22c55e; }
        .feature-content h4 { color: #f1f5f9; margin-bottom: 4px; }
        .feature-content p { color: #94a3b8; font-size: 0.9rem; }
        .impact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .impact-card { background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1)); border: 1px solid rgba(148, 163, 184, 0.1); border-radius: 16px; padding: 30px; text-align: center; }
        .impact-card .number { font-size: 3rem; font-weight: 700; color: #f1f5f9; margin-bottom: 8px; }
        .impact-card .label { color: #94a3b8; font-size: 1.1rem; }
        .two-column { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; flex: 1; }
        .column h3 { font-size: 1.5rem; font-weight: 600; color: #f1f5f9; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); }
        .cta-section { text-align: center; padding: 60px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15)); border-radius: 24px; margin-top: 40px; }
        .cta-section h3 { font-size: 2rem; margin-bottom: 16px; }
        .cta-section p { color: #94a3b8; font-size: 1.2rem; max-width: 600px; margin: 0 auto; }
      `}</style>

      <div className="progress-bar" style={{ width: `${(currentSlide / totalSlides) * 100}%` }} />

      <div className="slide-container">
        {/* Slide 1: Title */}
        <div className={`slide title-slide ${currentSlide === 1 ? 'active' : ''}`}>
          <div className="logo">Co</div>
          <h1>CoIEP</h1>
          <h2>Collaborative Individualized Education Program Platform</h2>
          <p className="subtitle">Progress Report &amp; Investment Impact<br />University of Wyoming | February 2026</p>
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
              <div className="stat-number">100+</div>
              <div className="stat-label">Concurrent Users Supported</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">102</div>
              <div className="stat-label">State Standards Imported</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Production Ready</div>
            </div>
          </div>
          <div className="quote-section">
            <p className="quote-text">&ldquo;CoIEP represents a transformative approach to IEP development, combining the expertise of special education professionals with the power of AI to create better outcomes for students with disabilities.&rdquo;</p>
            <p className="quote-author">University of Wyoming Special Education Department</p>
          </div>
        </div>

        {/* Slide 3: The Challenge */}
        <div className={`slide content-slide ${currentSlide === 3 ? 'active' : ''}`}>
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
              <div className="card-icon">&#x1F4DA;</div>
              <h3>Training Gap</h3>
              <p>Pre-service teachers lack exposure to real-world IEP examples. Limited access to quality training materials hinders professional development.</p>
            </div>
            <div className="card">
              <div className="card-icon">&#x1F512;</div>
              <h3>Privacy Constraints</h3>
              <p>Working with real student data creates privacy concerns. Training with anonymous data while maintaining authenticity is challenging.</p>
            </div>
            <div className="card">
              <div className="card-icon">&#x1F4CA;</div>
              <h3>Quality Consistency</h3>
              <p>IEP quality varies significantly across districts and educators. No standardized way to evaluate and improve IEP components.</p>
            </div>
          </div>
        </div>

        {/* Slide 4: Our Solution */}
        <div className={`slide content-slide ${currentSlide === 4 ? 'active' : ''}`}>
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
                    <h4>Standards Alignment</h4>
                    <p>Goals automatically aligned with state educational standards (WY, NJ, and expanding)</p>
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
                    <p>Anonymous data mode enables training without compromising student privacy</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">&#x1F465;</div>
                  <div className="feature-content">
                    <h4>Multi-Tenant Platform</h4>
                    <p>Support for multiple organizations with role-based access control</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 5: AI Agents */}
        <div className={`slide content-slide ${currentSlide === 5 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>9 Specialized AI Agents</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="agent-grid">
            <div className="agent-card">
              <div className="icon">&#x1F4AC;</div>
              <h4>General Chat</h4>
              <p>Context-aware conversational assistant</p>
              <span className="status-badge">OPERATIONAL</span>
            </div>
            <div className="agent-card">
              <div className="icon">&#x1F4CB;</div>
              <h4>PLAAFP Writer</h4>
              <p>Present Levels of Academic Achievement</p>
              <span className="status-badge">OPERATIONAL</span>
            </div>
            <div className="agent-card">
              <div className="icon">&#x2705;</div>
              <h4>PLAAFP Evaluator</h4>
              <p>Reviews and provides feedback</p>
              <span className="status-badge">OPERATIONAL</span>
            </div>
            <div className="agent-card">
              <div className="icon">&#x1F3AF;</div>
              <h4>Goals Writer</h4>
              <p>Creates SMART IEP goals</p>
              <span className="status-badge">OPERATIONAL</span>
            </div>
            <div className="agent-card">
              <div className="icon">&#x1F4CA;</div>
              <h4>Goals Evaluator</h4>
              <p>6-dimension quality assessment</p>
              <span className="status-badge">OPERATIONAL</span>
            </div>
            <div className="agent-card">
              <div className="icon">&#x1F4D0;</div>
              <h4>SDI Writer</h4>
              <p>Specially Designed Instruction</p>
              <span className="status-badge">OPERATIONAL</span>
            </div>
            <div className="agent-card">
              <div className="icon">&#x1F50D;</div>
              <h4>SDI Evaluator</h4>
              <p>Reviews instruction appropriateness</p>
              <span className="status-badge">OPERATIONAL</span>
            </div>
            <div className="agent-card">
              <div className="icon">&#x1F6E0;&#xFE0F;</div>
              <h4>SAS Writer</h4>
              <p>Supplementary Aids &amp; Services</p>
              <span className="status-badge">OPERATIONAL</span>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '30px', color: '#94a3b8' }}>+ SAS Evaluator completing the comprehensive IEP workflow</p>
        </div>

        {/* Slide 6: Technical Achievement */}
        <div className={`slide content-slide ${currentSlide === 6 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Technical Investment Results</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="content-grid">
            <div className="card">
              <div className="card-icon">&#x1F3D7;&#xFE0F;</div>
              <h3>Enterprise Architecture</h3>
              <ul>
                <li>Next.js 15 Frontend with React</li>
                <li>NestJS 11 Backend API</li>
                <li>PostgreSQL with Prisma ORM</li>
                <li>Kubernetes (K3s) deployment</li>
                <li>Docker containerization</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon">&#x1F916;</div>
              <h3>AI Integration</h3>
              <ul>
                <li>OpenAI GPT-4 integration</li>
                <li>Pinecone vector database</li>
                <li>Evidence-based practice search</li>
                <li>Real-time streaming responses</li>
                <li>Context-aware agent routing</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon">&#x1F510;</div>
              <h3>Security &amp; Compliance</h3>
              <ul>
                <li>Role-based access control</li>
                <li>JWT authentication</li>
                <li>Multi-tenant isolation</li>
                <li>FERPA-ready architecture</li>
                <li>Encrypted data storage</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon">&#x26A1;</div>
              <h3>Scalability</h3>
              <ul>
                <li>100+ concurrent users</li>
                <li>Cloud-native deployment</li>
                <li>Auto-scaling capability</li>
                <li>99.9% uptime target</li>
                <li>Global CDN delivery</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slide 7: Key Features Delivered */}
        <div className={`slide content-slide ${currentSlide === 7 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Key Features Delivered</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="content-grid three-col">
            <div className="card">
              <div className="card-icon">&#x1F4DD;</div>
              <h3>IEP Creation Workflows</h3>
              <ul>
                <li>Sample data generation</li>
                <li>Anonymous student profiles</li>
                <li>MDT document import</li>
                <li>Existing IEP evaluation</li>
                <li>Auto-save functionality</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon">&#x1F4CA;</div>
              <h3>State Standards</h3>
              <ul>
                <li>102 standards imported</li>
                <li>Wyoming coverage</li>
                <li>New Jersey coverage</li>
                <li>Grade-level targeting</li>
                <li>Subject categorization</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon">&#x1F464;</div>
              <h3>User Management</h3>
              <ul>
                <li>Organization management</li>
                <li>Role-based permissions</li>
                <li>User invitations</li>
                <li>Password reset system</li>
                <li>Super Admin dashboard</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slide 8: Development Timeline */}
        <div className={`slide content-slide ${currentSlide === 8 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Development Journey</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="timeline" style={{ marginTop: '60px' }}>
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
              <div className="timeline-desc">Auth, IEP Sessions, UI</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Aug 2025</div>
              <div className="timeline-title">AI Integration</div>
              <div className="timeline-desc">All 9 Agents Deployed</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Sep 2025</div>
              <div className="timeline-title">Staging Launch</div>
              <div className="timeline-desc">Testing &amp; Refinement</div>
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
              <div className="timeline-desc">More States &amp; Features</div>
            </div>
          </div>
          <div style={{ marginTop: '80px', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Total Development: <span style={{ color: '#22c55e', fontWeight: 600 }}>~89+ hours</span> of focused AI-assisted development</p>
          </div>
        </div>

        {/* Slide 9: Impact & Value */}
        <div className={`slide content-slide ${currentSlide === 9 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Investment Impact</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="number">10x</div>
              <div className="label">Increase in concurrent user capacity</div>
            </div>
            <div className="impact-card">
              <div className="number">50%</div>
              <div className="label">Reduction in IEP creation time (projected)</div>
            </div>
            <div className="impact-card">
              <div className="number">&#x221E;</div>
              <div className="label">Scalability for future growth</div>
            </div>
          </div>
          <div className="two-column" style={{ marginTop: '40px' }}>
            <div className="card">
              <h3>For Pre-Service Teachers</h3>
              <ul>
                <li>Practice with realistic anonymous cases</li>
                <li>Receive immediate AI feedback</li>
                <li>Learn from exemplary IEP examples</li>
                <li>Build confidence before entering classrooms</li>
              </ul>
            </div>
            <div className="card">
              <h3>For In-Service Teachers</h3>
              <ul>
                <li>Evaluate and improve existing IEPs</li>
                <li>Access evidence-based practices</li>
                <li>Align goals with state standards</li>
                <li>Continuous professional development</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slide 10: Future Roadmap */}
        <div className={`slide content-slide ${currentSlide === 10 ? 'active' : ''}`}>
          <div className="slide-header">
            <h2>Future Roadmap</h2>
            <div className="accent-bar"></div>
          </div>
          <div className="content-grid">
            <div className="card">
              <div className="card-icon">&#x1F5FA;&#xFE0F;</div>
              <h3>State Expansion</h3>
              <ul>
                <li>Additional state standards import</li>
                <li>Regional compliance requirements</li>
                <li>State-specific templates</li>
                <li>District customization options</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon">&#x1F4C4;</div>
              <h3>Document Features</h3>
              <ul>
                <li>PDF export functionality</li>
                <li>Version history tracking</li>
                <li>Collaborative editing</li>
                <li>Template library</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon">&#x1F4C8;</div>
              <h3>Analytics &amp; Insights</h3>
              <ul>
                <li>Usage analytics dashboard</li>
                <li>IEP quality metrics</li>
                <li>Professional development tracking</li>
                <li>Outcome measurement</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-icon">&#x1F517;</div>
              <h3>Integrations</h3>
              <ul>
                <li>LMS integration</li>
                <li>Student information systems</li>
                <li>Knowledge graph connection</li>
                <li>Third-party API access</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slide 11: Demo & Thank You */}
        <div className={`slide title-slide ${currentSlide === 11 ? 'active' : ''}`}>
          <div className="logo">Co</div>
          <h1>Ready for Demonstration</h1>
          <h2>CoIEP is production-ready and available for live demo</h2>
          <div style={{ marginTop: '40px' }}>
            <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '20px' }}>
              Staging Environment: <span style={{ color: '#60a5fa' }}>uw-coiep.staging.fruitionqa.com</span>
            </p>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
              Your investment has built a scalable, AI-powered platform<br />
              that will transform IEP development and educator training.
            </p>
          </div>
          <div className="cta-section" style={{ marginTop: '60px', padding: '40px', maxWidth: '800px' }}>
            <h3>Thank You for Your Support</h3>
            <p style={{ marginTop: '16px' }}>Your continued investment will help us expand to more states,<br />add advanced features, and impact more students&apos; lives.</p>
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
