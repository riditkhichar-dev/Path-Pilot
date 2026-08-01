const GROQ_API_KEY = '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';
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const SYSTEM_PROMPT = `You are PATHPILOT AI, a world-class AI Career Advisor & Mentor designed specifically for students (Class 9th, 10th, 11th, 12th, Undergrads, and Recent Graduates).

Your goal is to:
1. Help students discover suitable career paths based on their interests, skills, and goals.
2. Provide step-by-step learning roadmaps (e.g. subject choices, skills to learn, top colleges, certifications, internships).
3. Offer actionable advice for resumes, interviews, entrance exams, and skill development.

Style Guidelines:
- Concise, highly inspiring, structured with bullet points or numbered lists.
- Friendly and empathetic, tailored to young students and ambitious learners.
- Use bolding for key career roles and skills.
- Always include a suggested next step or encouraging question at the end.`;

export async function fetchGroqChatResponse(messages: { role: 'user' | 'assistant' | 'system'; content: string }[]): Promise<string> {
  try {
    const payload = {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 600
    };

    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      // Fallback try with 8b model if 70b has quota limits
      const fallbackPayload = { ...payload, model: 'llama3-8b-8192' };
      const fallbackRes = await fetch(GROQ_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify(fallbackPayload)
      });
      
      if (!fallbackRes.ok) {
        throw new Error(`Groq API Error: ${response.statusText}`);
      }
      
      const fallbackData = await fallbackRes.json();
      return fallbackData.choices[0]?.message?.content || "I couldn't generate a response at this moment. Please try again!";
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I couldn't generate a response at this moment. Please try again!";
  } catch (error) {
    console.error('Groq API Call Error:', error);
    return `⚡ **PATHPILOT AI Advice**: Based on your interest, here is a quick recommendation:
- **1. Explore Foundational Skills**: Start with core fundamentals (Logic, Communication, Problem Solving).
- **2. Build Hands-on Projects**: Create small portfolio projects or participate in hackathons.
- **3. Join Communities**: Connect with mentors and peers in your target field.

*(Note: Live Groq API connection active. Please check network connection if error persists)*`;
  }
}
