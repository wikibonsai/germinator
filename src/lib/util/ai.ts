// courtesy: https://github.com/tldraw/make-real-starter

import type { Opts, OptLLM } from './$types';
import { URL_API_ANTHROPIC, URL_API_OPENAI } from './const';
import { formatPrompt, SYSTEM_PROMPT, PEPTALK } from './prompt';


function validate(opts: OptLLM): void {
  if ((opts.provider !== 'anthropic') && (opts.provider !== 'openai')) {
    throw new Error(
      'You need to provide a valid llm provider. Make sure a valid provider is selected in your options.'
    )
  }
  const selectedProvider: string = opts.provider;
  if (opts[selectedProvider].apiKey === '') {
    throw new Error(
      'You need to provide an API key. Make sure valid api keys are set in your options.'
    )
  }
}

export async function germinate(userMessage: string, opts: Opts): Promise<string> {
  console.debug('germinating with opts: ', opts);
  try {
    validate(opts.llm);
  } catch (e) {
    console.error('germinate error: ', e);
    return e.message;
  }
  // first, we build the prompt that we'll send to openai.
  const seedPrompt: string = SYSTEM_PROMPT + formatPrompt(opts.mkdn) + PEPTALK;
  let responseStr: string = '';
  console.debug('seed prompt:', seedPrompt);
  console.debug('sending concept seed to llm...');
  let body: JSON;
  let responseJSON: JSON;
  if (opts.llm.provider === 'anthropic') {
    body = {
      model: opts.llm.anthropic.model,
      max_tokens: 4096,
      messages: [
        { role: 'user', content: "SEED PROMPT:\n\n" + seedPrompt + "\n\nUSER MSG:\n\n" + userMessage }
      ],
    };

    try {
      const response = await fetch(URL_API_ANTHROPIC, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          'x-api-key': opts.llm.anthropic.apiKey,
        },
        body: JSON.stringify(body),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.error?.message || 'An error occurred with the Anthropic API');
      }
      responseStr = responseJSON.content[0].text;
      console.debug('claude response payload: ', responseJSON);
      console.debug('claude response string: ', responseStr);
    } catch (e) {
      console.error(e);
      throw new Error('Sorry, there was an error fetching from ' + opts.llm.provider);
    }
  }
  if (opts.llm.provider === 'openai') {
    body = {
      model: opts.llm.openai.model,
      max_tokens: 4096,
      temperature: 0,
      messages: [
        { role: 'system', content: seedPrompt },
        { role: 'user', content: userMessage },
      ],
    };
    // make a request to openai. `fetchFromOpenAi` is a next.js server action,
    // so our api key is hidden.
    try {
      const response = await fetch(URL_API_OPENAI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${opts.llm.openai.apiKey}`,
        },
        body: JSON.stringify(body),
      });
      responseJSON = await response.json();
    } catch (e) {
      console.error(e, opts.llm.openai.apiKey);
      throw new Error('Sorry, there was an error fetching from ' + opts.llm.provider)
    }
    if (responseJSON.error) {
      responseStr = responseJSON.error.message;
    } else {
      responseStr = responseJSON.choices[0].message.content;
    }
    console.debug('chatgpt response payload: ', responseJSON);
    console.debug('chatgpt response string: ', responseStr);
  }
  return responseStr;
}
