// courtesy: https://github.com/tldraw/make-real-starter

import { SEPARATOR } from './const';
import { formatPrompt, SYSTEM_PROMPT } from './prompt';


async function fetchFromOpenAi(
  providedApiKey: string,
  body: JSON,
) {
  const apiKey = providedApiKey ?? process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error(
      'You need to provide an API key. Make sure OPENAI_API_KEY is set in your .env file.'
    )
  }
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    })
    return await response.json()
  } catch (e) {
    console.error(e)
    throw new Error('Sorry, there was an error fetching from OpenAI')
  }
}

// todo: option type
export async function makeReal(userMessage: string, opts: any) {
  if (!opts.apikey) {
    alert('Please enter an OpenAI API key');
    return;
  }
  // first, we build the prompt that we'll send to openai.
  const seedPrompt: string = SYSTEM_PROMPT + formatPrompt(opts.text, opts.case, opts.indent, opts.whitespace, opts.attrs);
  let chatGptResponse;
  try {
    console.debug('seed prompt:', seedPrompt);
    console.debug('sending concept seed to chatgpt...');
    // make a request to openai. `fetchFromOpenAi` is a next.js server action,
    // so our api key is hidden.
    const openAiResponse = await fetchFromOpenAi(opts.apikey, {
      model: 'gpt-4-1106-preview',
      max_tokens: 4096,
      temperature: 0,
      messages: [
        { role: 'system', content: seedPrompt },
        { role: 'user', content: userMessage },
      ],
    });
    chatGptResponse = openAiResponse.choices[0].message.content;
    console.debug('chatgpt: ', openAiResponse);
    console.debug('chatgpt response: ', chatGptResponse);
  } catch (e) {
    return 'something went wrong with chatgpt -- oh no! 😲';
    throw e;
  }
  return chatGptResponse;
}
