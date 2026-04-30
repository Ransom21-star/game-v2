import { NavLink } from 'react-router-dom';

type Page = { path: string; label: string };

interface SidebarProps {
  pages: Page[];
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ pages, open, onClose }: SidebarProps) {
  return (
    <aside className={`sidebar panel ${open ? 'open' : ''}`} aria-hidden={!open && 'true'}>
      <div className="sidebar-top">
        <div className="brand">
          <div className="brand-title">SOVEREIGN</div>
          <div className="label-small">AEON network • live RPG OS</div>
        </div>
        <button type="button" className="close-button" onClick={onClose} aria-label="Close menu">
          ×
        </button>
      </div>

      <div className="avatar-shell">
        <div className="avatar-glow">
          <div className="avatar-initials">RS</div>
        </div>
        <div>
          <div className="label-small">Ransom Star</div>
          <div className="status-chip glow-pill">Rank B • Astral Commander</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {pages.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={onClose}
          >
            {page.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="label-small">System Log</div>
        <div className="sidebar-copy">
          AEON is watching your missions, frequency, and growth path. The system responds as you move.
        </div>
      </div>
    </aside>
  );
}
