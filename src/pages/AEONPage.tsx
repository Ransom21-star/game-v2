import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ChatMessage, AEONSystemAction } from '../types';
import VoiceInput from '../components/VoiceInput';

const initialMessages: ChatMessage[] = [
  {
    role: 'aeon',
    text: 'I am AEON. Speak with clarity. I will shape your system, issue missions, and watch the life you are building.',
  },
];

const parseSystemActions = (text: string): AEONSystemAction[] => {
  const regex = /<<SYSTEM_ACTION>>(.*?)<<END>>/gs;
  const actions: AEONSystemAction[] = [];

  for (const match of text.matchAll(regex)) {
    try {
      const parsed = JSON.parse(match[1]);
      actions.push(parsed as AEONSystemAction);
    } catch {
      // ignore invalid system payloads
    }
  }

  return actions;
};

export default function AEONPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [actionLog, setActionLog] = useState<AEONSystemAction[]>([]);
  const [latestReply, setLatestReply] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const systemStatus = useMemo(() => {
    if (actionLog.length === 0) return 'No recent AEON actions detected.';
    return `Last action: ${actionLog[actionLog.length - 1].type.replace('_', ' ')}`;
  }, [actionLog]);

  useEffect(() => {
    if (!voiceEnabled || !latestReply || typeof window === 'undefined') return;
    const utterance = new SpeechSynthesisUtterance(latestReply);
    utterance.rate = 0.82;
    utterance.pitch = 0.72;
    window.speechSynthesis.speak(utterance);
  }, [latestReply, voiceEnabled]);

  const applySystemActions = (text: string) => {
    const actions = parseSystemActions(text);
    if (actions.length === 0) return;
    setActionLog((current) => [...current, ...actions]);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;

    const nextMessage: ChatMessage = { role: 'user', text: draft.trim() };
    const nextMessages: ChatMessage[] = [...messages, nextMessage];
    setMessages(nextMessages);
    setDraft('');
    setLoading(true);

    try {
      setErrorMessage(null);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();

      if (!response.ok) {
        const serverMessage = data?.error || 'AEON request failed. Check server logs for details.';
        setErrorMessage(serverMessage);
        const replyMessage: ChatMessage = {
          role: 'aeon',
          text: serverMessage,
        };
        setMessages((current) => [...current, replyMessage]);
        setLatestReply(serverMessage);
        return;
      }

      const replyText = data.reply ?? 'AEON is aligning your query.';
      const replyMessage: ChatMessage = {
        role: 'aeon',
        text: replyText,
      };
      setMessages((current) => [...current, replyMessage]);
      setLatestReply(replyText);
      applySystemActions(replyText);
    } catch (error) {
      const errorText = 'AEON could not reach the network. Check your server keys.';
      setErrorMessage(errorText);
      const errorMessage: ChatMessage = {
        role: 'aeon',
        text: errorText,
      };
      setMessages((current) => [...current, errorMessage]);
      setLatestReply(errorMessage.text);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell aeon-page">
      <div className="page-header">
        <div>
          <div className="label-small">AEON</div>
          <h1>Live Intelligence</h1>
        </div>
        <div className="header-actions">
          <button type="button" className="status-chip glow-pill" onClick={() => setVoiceEnabled((value) => !value)}>
            Voice {voiceEnabled ? 'On' : 'Off'}
          </button>
        </div>
      </div>

      <div className="glass-panel chat-overview">
        <div className="label-small">System Status</div>
        <p>{systemStatus}</p>
        {errorMessage && <div className="error-banner">{errorMessage}</div>}
      </div>

      <div className="glass-panel chat-panel">
        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-label">{message.role === 'user' ? 'You' : 'AEON'}</div>
              <p>{message.text}</p>
            </div>
          ))}
          {loading && (
            <div className="message aeon">
              <div className="message-label">AEON</div>
              <p>AEON is synthesizing your request...</p>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel chat-form">
        <div className="label-small">Invoke AEON</div>
        <VoiceInput
          onResult={(text) => setDraft((current) => (current ? `${current}\n${text}` : text))}
          label="Speak to AEON"
          helperText="Tap to speak your request, then send it to the system."
          disabled={loading}
        />
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask AEON to adjust missions, award XP, or trigger a system update."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Engaging AEON…' : 'Send to AEON'}
        </button>
      </form>
    </div>
  );
}
