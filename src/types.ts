export interface ChatMessage {
  role: 'user' | 'aeon';
  text: string;
}

export interface VideoRecommendationRequest {
  topic: string;
  awareness: string;
  context: string;
}

export interface VideoRecommendationResponse {
  title: string;
  url?: string;
  channel: string;
  why: string;
  searchTerms?: string;
  mustCover?: string;
  quizQuestion?: string;
  quizHint?: string;
}

export interface SystemNotification {
  id: string;
  type: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
}

export interface PopUpQuest {
  id: string;
  title: string;
  description: string;
  timer: number;
  status: 'live' | 'pending' | 'expired';
}

export interface AEONSystemAction {
  type: 'award_xp' | 'award_solars' | 'trigger_alert' | 'update_frequency' | 'unlock_milestone' | 'add_mission' | 'remove_mission';
  payload: Record<string, unknown>;
}
