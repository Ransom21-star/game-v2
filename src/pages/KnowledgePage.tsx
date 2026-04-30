import { useState } from 'react';
import type { VideoRecommendationResponse, VideoRecommendationRequest } from '../types';
import VoiceInput from '../components/VoiceInput';

const defaultCategories = ['Financial Freedom', 'Manifestation Mastery', 'Dream Body'];

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState('learning');
  const [topic, setTopic] = useState('Manifestation Mastery');
  const [customTopic, setCustomTopic] = useState('');
  const [awareness, setAwareness] = useState('Intermediate');
  const [recommendation, setRecommendation] = useState<VideoRecommendationResponse | null>(null);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const effectiveTopic = customTopic || topic;

  async function requestVideo() {
    setLoading(true);
    setErrorMessage(null);
    setRecommendation(null);
    setQuizAnswer('');
    setQuizSubmitted(false);
    setQuizResult(null);
    try {
      const payload: VideoRecommendationRequest = {
        topic: effectiveTopic,
        awareness,
        context: 'User is building a sovereign lifestyle system with a strong dedication to self-mastery and growth.',
      };
      const response = await fetch('/api/video-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        const message = data?.error || data?.why || `${response.status} ${response.statusText}`;
        setErrorMessage(message);
        setRecommendation({
          title: 'Unable to recommend video at this time',
          url: '#',
          channel: 'AEON',
          why: message,
        });
        return;
      }

      setRecommendation(data);
    } catch (error) {
      const message = 'Video recommendation failed. Check your network or server settings.';
      setErrorMessage(message);
      setRecommendation({
        title: 'Unable to recommend video at this time',
        url: '#',
        channel: 'AEON',
        why: message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell knowledge-page">
      <div className="page-header">
        <div>
          <div className="label-small">Knowledge</div>
          <h1>Learning & Books</h1>
        </div>
        <div className="status-chip glow-pill">Dynamic video intelligence</div>
      </div>

      <div className="glass-panel">
        <div className="tab-bar" style={{ marginBottom: 20 }}>
          <button type="button" className={`tab-button ${activeTab === 'learning' ? 'active' : ''}`} onClick={() => setActiveTab('learning')}>
            Learning Path
          </button>
          <button type="button" className={`tab-button ${activeTab === 'books' ? 'active' : ''}`} onClick={() => setActiveTab('books')}>
            Books
          </button>
          <button type="button" className={`tab-button ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => setActiveTab('finance')}>
            Finance Tracker
          </button>
        </div>

        {activeTab === 'learning' && (
          <div className="glass-panel">
            <div className="section-title">Adaptive video recommendation</div>
            <p>AEON evaluates your awareness, current rhythms, and goal category before recommending the exact video you need.</p>
            <div className="feature-grid">
              <div>
                <label className="label-small">Goal Category</label>
                <select value={topic} onChange={(event) => setTopic(event.target.value)}>
                  {defaultCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-small">Voice Topic</label>
                <VoiceInput
                  onResult={(text) => {
                    setCustomTopic(text);
                    setTopic(text);
                  }}
                  label="Speak a topic"
                  helperText="Tell AEON what you want to learn next."
                />
                {customTopic && <p className="voice-meta">Using spoken topic: {customTopic}</p>}
              </div>
              <div>
                <label className="label-small">Current awareness</label>
                <select value={awareness} onChange={(event) => setAwareness(event.target.value)}>
                  {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="button" onClick={requestVideo} disabled={loading}>
              {loading ? 'Assessing the best video…' : 'Recommend Next Video'}
            </button>
            {errorMessage && <div className="error-banner" style={{ marginTop: 16 }}>{errorMessage}</div>}
            {recommendation && (
              <div className="video-card panel" style={{ marginTop: 20 }}>
                <div className="label-small">Adaptive Recommendation</div>
                <h3>{recommendation.title}</h3>
                <p style={{ marginTop: 10, color: '#c7d1ff' }}>Channel: {recommendation.channel}</p>
                <p style={{ marginTop: 10 }}>{recommendation.why}</p>
                {recommendation.url ? (
                  <a href={recommendation.url} target="_blank" rel="noreferrer">
                    Watch on YouTube
                  </a>
                ) : (
                  <div style={{ marginTop: 18 }}>
                    <div className="label-small">Search Guidance</div>
                    <p>{recommendation.searchTerms}</p>
                    <p style={{ marginTop: 8, color: '#c7d1ff' }}>{recommendation.mustCover}</p>
                  </div>
                )}
                {recommendation.quizQuestion && (
                  <div style={{ marginTop: 22 }}>
                    <div className="label-small">Verification Quiz</div>
                    <p>{recommendation.quizQuestion}</p>
                    <textarea
                      value={quizAnswer}
                      onChange={(event) => setQuizAnswer(event.target.value)}
                      placeholder={recommendation.quizHint || 'Answer in a sentence to confirm you watched or searched.'}
                      disabled={quizSubmitted}
                      style={{ marginTop: 10 }}
                    />
                    <button
                      type="button"
                      style={{ marginTop: 10 }}
                      onClick={() => {
                        if (!quizAnswer.trim()) {
                          setQuizResult('Answer the quiz to move to the next recommendation.');
                          return;
                        }
                        setQuizSubmitted(true);
                        setQuizResult('Answer recorded. AEON will use this to move you to the next learning step.');
                      }}
                      disabled={quizSubmitted}
                    >
                      {quizSubmitted ? 'Quiz Completed' : 'Submit Answer'}
                    </button>
                    {quizResult && <p style={{ marginTop: 10, color: '#a4b0ff' }}>{quizResult}</p>}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'books' && (
          <div className="glass-panel">
            <div className="section-title">Books curated by AEON</div>
            <div className="feature-grid">
              {[
                { title: 'The Power of Now', reason: 'Build an unshakable inner presence.' },
                { title: 'Atomic Habits', reason: 'Transform small daily rituals into huge momentum.' },
                { title: 'Becoming Supernatural', reason: 'Align energy, manifestation, and science.' },
                { title: 'Meditations', reason: 'Sharpen discipline through stoic clarity.' },
              ].map((book) => (
                <div key={book.title} className="book-card">
                  <strong>{book.title}</strong>
                  <p style={{ marginTop: 10, color: '#c7d1ff' }}>{book.reason}</p>
                  <button>Track Progress</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="glass-panel">
            <div className="section-title">Finance Tracker</div>
            <div className="feature-grid">
              <div className="glass-panel mini-card">
                <div className="label-small">Monthly Income</div>
                <h3>$1,820</h3>
              </div>
              <div className="glass-panel mini-card">
                <div className="label-small">Expenses</div>
                <h3>$860</h3>
              </div>
              <div className="glass-panel mini-card">
                <div className="label-small">Savings Rate</div>
                <h3>28%</h3>
              </div>
            </div>
            <button>Ask AEON to analyse finances</button>
          </div>
        )}
      </div>
    </div>
  );
}
