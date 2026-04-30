import { useEffect, useRef, useState } from 'react';

interface VoiceInputProps {
  onResult: (text: string) => void;
  label?: string;
  helperText?: string;
  disabled?: boolean;
}

export default function VoiceInput({ onResult, label = 'Voice Input', helperText, disabled }: VoiceInputProps) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join(' ');
      if (transcript.trim()) {
        onResult(transcript.trim());
      }
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    setSupported(true);
  }, [onResult]);

  const toggleListening = () => {
    if (!supported || disabled) return;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
    } else {
      recognitionRef.current?.start();
      setListening(true);
    }
  };

  return (
    <div className="voice-toolbar">
      <button type="button" className={`voice-button ${listening ? 'active' : ''}`} onClick={toggleListening} disabled={disabled || !supported}>
        {listening ? 'Listening…' : 'Voice'}
      </button>
      <div className="voice-meta">
        <span>{label}</span>
        {helperText && <small>{helperText}</small>}
      </div>
    </div>
  );
}
