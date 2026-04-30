const GEMINI_MODEL = 'gemini-1.5-flash';

function createGeminiPayload(prompt: string) {
  return {
    prompt: { text: prompt },
    temperature: 0.78,
    maxOutputTokens: 400,
  };
}

function extractGeminiReply(data: any) {
  if (!data) return '';

  const candidates = data?.candidates || data?.output;
  if (Array.isArray(candidates)) {
    for (const candidate of candidates) {
      const content = candidate?.content;
      if (typeof content === 'string' && content.trim()) {
        return content.trim();
      }
      if (Array.isArray(content)) {
        for (const part of content) {
          if (typeof part?.text === 'string' && part.text.trim()) {
            return part.text.trim();
          }
        }
      }
      if (typeof candidate?.text === 'string' && candidate.text.trim()) {
        return candidate.text.trim();
      }
    }
  }

  if (typeof data?.output === 'string' && data.output.trim()) {
    return data.output.trim();
  }

  if (typeof data?.text === 'string' && data.text.trim()) {
    return data.text.trim();
  }

  return '';
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages)) {
    res.status(400).json({ error: 'Request body must include a messages array.' });
    return;
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    console.error('Missing GEMINI_API_KEY');
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    return;
  }

  const prompt = messages
    .map((item: { role: string; text: string }) => `${item.role === 'user' ? 'User' : 'AEON'}: ${item.text}`)
    .join('\n') + '\nAEON:';

  try {
    const response = await fetch(
      `https://gemini.googleapis.com/v1/models/${GEMINI_MODEL}:generate?key=${geminiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createGeminiPayload(prompt)),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      res.status(502).json({ error: 'Gemini API request failed.', details: errorText });
      return;
    }

    const data = await response.json();
    const reply = extractGeminiReply(data) || 'AEON could not form a response.';

    res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat endpoint failed', error);
    res.status(502).json({ error: 'AEON could not reach Gemini. Check your API configuration.' });
  }
}
