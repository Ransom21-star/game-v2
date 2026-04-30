const GEMINI_MODEL = 'gemini-1.5-flash';

function createGeminiPayload(prompt: string) {
  return {
    prompt: { text: prompt },
    temperature: 0.78,
    maxOutputTokens: 400,
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { messages } = req.body || {};
  const geminiKey = process.env.GEMINI_API_KEY;
  const prompt = (messages || [])
    .map((item: { role: string; text: string }) => `${item.role === 'user' ? 'User' : 'AEON'}: ${item.text}`)
    .join('\n') + '\nAEON:';

  if (!geminiKey) {
    res.status(200).json({ reply: 'AEON is offline. GEMINI_API_KEY is not configured.' });
    return;
  }

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
      throw new Error('Gemini API response error');
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.output?.[0]?.content?.text || data?.output?.[0]?.content || 'AEON could not form a response.';

    res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat endpoint failed', error);
    res.status(200).json({ reply: 'AEON could not reach Gemini. Check your API configuration.' });
  }
}
