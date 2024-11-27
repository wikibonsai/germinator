import type { RequestHandler } from '@sveltejs/kit';
import type { Opts } from './types';
import { germinate } from '$lib/util/ai';
import { json } from '@sveltejs/kit';


export const POST: RequestHandler = async ({ request }) => {
  try {
    const { userMessage, opts } = await request.json();
    // Validate the request data
    if (!userMessage || !opts) {
      return json({ error: 'Invalid request data' }, { status: 400 });
    }
    const env = await import('$env/static/private');
    const apiKeyAnthropic: string = env.API_KEY_ANTHROPIC || '';
    const apiKeyOpenAI: string = env.API_KEY_OPENAI || '';
    const apiKeyXAI: string = env.API_KEY_XAI || '';
    if (opts.llm.anthropic.apiKey === '') {
      opts.llm.anthropic.apiKey = apiKeyAnthropic;
    }
    if (opts.llm.openai.apiKey === '') {
      opts.llm.openai.apiKey = apiKeyOpenAI;
    }
    if (opts.llm.xai.apiKey === '') {
      opts.llm.xai.apiKey = apiKeyXAI;
    }
    console.debug('opts: ', opts);
    const result: string = await germinate(userMessage, opts);
    return json({ result });
  } catch (error) {
    console.error('Error in \'/llm\' endpoint:', error);
    return json({ error: 'An error occurred while processing your request' }, { status: 500 });
  }
};
