import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SystemOverlay from './components/SystemOverlay';
import DashboardPage from './pages/DashboardPage';
import AEONPage from './pages/AEONPage';
import JournalPage from './pages/JournalPage';
import MissionHubPage from './pages/MissionHubPage';
import SkillsGrowthPage from './pages/SkillsGrowthPage';
import KnowledgePage from './pages/KnowledgePage';
import SolarExchangePage from './pages/SolarExchangePage';
import NotFoundPage from './pages/NotFoundPage';
import type { PopUpQuest, SystemNotification } from './types';

const pages = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/aeon', label: 'AEON' },
  { path: '/journal', label: 'Journal' },
  { path: '/mission-hub', label: 'Mission Hub' },
  { path: '/skills-growth', label: 'Skills & Growth' },
  { path: '/knowledge', label: 'Knowledge' },
  { path: '/solar-exchange', label: 'Solar Exchange' },
];

function App() {
  const navPages = useMemo(() => pages, []);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: 'welcome',
      type: 'info',
      title: 'AEON initialized',
      message: 'Systems are online. Your HUD is active. AEON remains in control.',
    },
  ]);
  const [activeQuest, setActiveQuest] = useState<PopUpQuest | null>({
    id: 'pop-01',
    title: 'Ghost Signal Alert',
    description: 'A hidden opportunity has appeared. Decide within 10 minutes or it dissolves.',
    timer: 600,
    status: 'live',
  });

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleDismissNotification = (id: string) => {
    setNotifications((current) => current.filter((item) => item.id !== id));
  };

  const handleAcceptQuest = () => {
    setActiveQuest(null);
    setNotifications((current) => [
      ...current,
      {
        id: `quest-${Date.now()}`,
        type: 'warning',
        title: 'Quest Accepted',
        message: 'AEON has registered the challenge and injected rewards into the system.',
      },
    ]);
  };

  const handleDeclineQuest = () => {
    setActiveQuest(null);
    setNotifications((current) => [
      ...current,
      {
        id: `quest-failed-${Date.now()}`,
        type: 'critical',
        title: 'Quest Declined',
        message: 'AEON noted the refusal. A penalty protocol may begin if it repeats.',
      },
    ]);
  };

  return (
    <div className="app-shell">
      <Sidebar pages={navPages} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-panel">
        <header className="app-header">
          <button
            type="button"
            className={`header-button ${sidebarOpen ? 'active' : ''}`}
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
          <div className="header-brand">
            <div className="brand-heading">SOVEREIGN</div>
            <div className="brand-tagline">AEON · Living RPG Intelligence</div>
          </div>
          <div className="header-stats">
            <div className="status-chip glow-pill">Solars 1,260</div>
            <div className="status-chip glow-pill">Rank B</div>
          </div>
        </header>

        <div className="page-frame">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/aeon" element={<AEONPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/mission-hub" element={<MissionHubPage />} />
            <Route path="/skills-growth" element={<SkillsGrowthPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/solar-exchange" element={<SolarExchangePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>

      <SystemOverlay
        notifications={notifications}
        activeQuest={activeQuest ?? undefined}
        onDismiss={handleDismissNotification}
        onAccept={handleAcceptQuest}
        onDecline={handleDeclineQuest}
      />

      {sidebarOpen && <div className="mobile-backdrop" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}

export default App;
