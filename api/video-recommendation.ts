const SERPER_SEARCH_URL = 'https://google.serper.dev/search';
const GEMINI_MODEL = 'gemini-1.5-flash';

function createGeminiPrompt(topic: string, awareness: string, context: string, searchResults: any[]) {
  return `You are AEON, a highly evolved life system. A user is building a sovereign lifestyle in the category of ${topic}. Their awareness level is ${awareness}. Use the live video search results below to select the single most relevant YouTube video recommendation for this exact moment.

Context: ${context}

Search results:
${searchResults
    .map(
      (result, index) =>
        `${index + 1}. ${result.title || 'Untitled'} — ${result.link || result.url || ''} — ${result.snippet || result.description || ''}`
    )
    .join('\n')}

Return a JSON object with keys title, url, channel, why, searchTerms, mustCover, quizQuestion, and quizHint.
If a single exact video can be recommended, provide its URL and leave searchTerms and mustCover empty.
If a precise video is not possible, set url to an empty string and provide strong searchTerms and mustCover guidance, plus a short quizQuestion that verifies the user watched or researched the recommended content.
`;
}

function buildVideoResponse(data: any) {
  if (!data?.output?.[0]?.content) return null;
  const text = data.output[0].content;
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
  } catch (error) {
    return null;
  }
  return null;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { topic, awareness, context } = req.body || {};
  const serperKey = process.env.SERPER_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!serperKey || !geminiKey) {
    res.status(200).json({
      title: 'Unable to build recommendation',
      url: '#',
      channel: 'AEON',
      why: 'SERPER_API_KEY and GEMINI_API_KEY must both be configured on the server.',
    });
    return;
  }

  try {
    const searchResponse = await fetch(SERPER_SEARCH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': serperKey,
      },
      body: JSON.stringify({ q: `${topic} ${awareness} level best YouTube video`, num: 6 }),
    });

    if (!searchResponse.ok) {
      throw new Error('Serper search failed');
    }

    const searchData = await searchResponse.json();
    const results = searchData?.video_results || searchData?.organic || [];
    const prompt = createGeminiPrompt(topic, awareness, context, results);

    const geminiResponse = await fetch(`https://gemini.googleapis.com/v1/models/${GEMINI_MODEL}:generate?key=${geminiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: { text: prompt }, temperature: 0.72, maxOutputTokens: 360 }),
    });

    if (!geminiResponse.ok) {
      throw new Error('Gemini selection failed');
    }

    const geminiData = await geminiResponse.json();
    const recommendation = buildVideoResponse(geminiData);

    if (recommendation) {
      res.status(200).json(recommendation);
      return;
    }

    res.status(200).json({
      title: 'No exact video could be recommended',
      url: '',
      channel: 'AEON',
      why: 'AEON could not find a precise match, so it is offering search guidance instead.',
      searchTerms: `${topic} ${awareness} video overview best practices`,
      mustCover: 'The result must explain the concept in practical terms, show real examples, and connect the material directly to the user’s growth category.',
      quizQuestion: 'After watching or searching, what is the single key insight you learned about this topic?',
      quizHint: 'Write a short sentence describing the core lesson you found.',
    });
  } catch (error) {
    console.error('Video recommendation failed', error);
    res.status(200).json({
      title: 'Video recommendation unavailable',
      url: '',
      channel: 'AEON',
      why: 'A server error occurred while generating your learning path recommendation. Use this guidance to continue.',
      searchTerms: `${req.body?.topic || 'learning'} ${req.body?.awareness || 'Intermediate'} video search`,
      mustCover: 'The result must cover the main concept with clear examples and show why it matters for your current level.',
      quizQuestion: 'What was the most important idea this content taught you?',
      quizHint: 'Answer using the main concept or example you found.',
    });
  }
}
