import type { PopUpQuest, SystemNotification } from '../types';

interface SystemOverlayProps {
  notifications: SystemNotification[];
  activeQuest?: PopUpQuest;
  onDismiss: (id: string) => void;
  onAccept: () => void;
  onDecline: () => void;
}

export default function SystemOverlay({ notifications, activeQuest, onDismiss, onAccept, onDecline }: SystemOverlayProps) {
  return (
    <div className="system-overlay">
      {activeQuest && (
        <div className="overlay-card quest-card">
          <div className="overlay-title">Pop-up Quest</div>
          <div className="overlay-copy">
            <strong>{activeQuest.title}</strong>
            <p>{activeQuest.description}</p>
          </div>
          <div className="quest-actions">
            <button type="button" onClick={onAccept} className="primary-button">
              Accept
            </button>
            <button type="button" onClick={onDecline} className="secondary-button">
              Decline
            </button>
          </div>
        </div>
      )}

      <div className="notifications-stack">
        {notifications.map((notification) => (
          <div key={notification.id} className={`overlay-card notification-card ${notification.type}`}>
            <div className="overlay-title">{notification.title}</div>
            <p>{notification.message}</p>
            <button type="button" className="dismiss-button" onClick={() => onDismiss(notification.id)}>
              Dismiss
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
