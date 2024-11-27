// courtesy: https://github.com/tldraw/make-real-starter

import type { Opts, OptLLM } from './$types';
import { URL_API_ANTHROPIC, URL_API_OPENAI, URL_API_XAI } from './const';
import { formatPrompt, IGNORE_LAZY, SYSTEM_PROMPT, TAKE_TIME, PEPTALK } from './prompt';

function validate(opts: OptLLM): void {
  if ((opts.provider !== 'anthropic') && (opts.provider !== 'openai') && (opts.provider !== 'xai')) {
    throw new Error(
      'You need to provide a valid llm provider. Make sure a valid provider is selected in your options.'
    );
  }
  const selectedProvider: string = opts.provider;
  if (opts[selectedProvider].apiKey === '') {
    throw new Error(
      'You need to provide an API key. Make sure valid api keys are set in your options.'
    );
  }
}

export async function germinate(userMessage: string, opts: Opts): Promise<string> {
  console.log('germinating with opts: ', opts);
  try {
    validate(opts.llm);
  } catch (e) {
    console.error('germinate error: ', e);
    return e.message;
  }
  const seedPrompt: string = SYSTEM_PROMPT
                            + formatPrompt(opts.mkdn)
                            + IGNORE_LAZY
                            + TAKE_TIME
                            + PEPTALK;
  console.debug('seed prompt:', seedPrompt);
  console.debug('sending concept seed to llm...');
  let request: RequestLLM | undefined = undefined;
  if (opts.llm.provider === 'anthropic') {
    request = prepAnthropic(opts.llm.anthropic.apiKey, opts.llm.anthropic.model, seedPrompt, userMessage);
  }
  if (opts.llm.provider === 'openai') {
    request = prepOpenAI(opts.llm.openai.apiKey, opts.llm.openai.model, seedPrompt, userMessage);
  }
  if (opts.llm.provider === 'xai') {
    request = prepXAI(opts.llm.xai.apiKey, opts.llm.xai.model, seedPrompt, userMessage);
  }
  const errorString: string = 'An error occurred with the LLM API';
  if (request === undefined) {
    return errorString;
  }
  let responseJSON: JSON;
  let responseStr: string;
  try {
    const response = await fetch(request.url, {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify(request.body),
    });
    responseJSON = await response.json();
    if (!response.ok) {
      throw new Error(responseJSON.error?.message || errorString);
    }
    // result format handling per provider
    if (opts.llm.provider === 'anthropic') {
      responseStr = responseJSON.content[0].text;
    // openai + xai
    } else {
      responseStr = responseJSON.choices[0].message.content;
    }
  } catch (e) {
    console.error(e);
    throw new Error('Sorry, there was an error fetching from ' + opts.llm.provider);
  }
  console.debug('response payload: ', responseJSON);
  console.debug('response string: ', responseStr);
  return responseStr;
}

interface RequestLLM {
  headers: any;
  body: JSON;
  url: string;
}

function prepAnthropic(
  apiKey: string,
  model: string,
  seedPrompt: string,
  userMessage: string,
): RequestLLM {
  return {
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'x-api-key': apiKey,
    },
    body: {
      model: model,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: "SEED PROMPT:\n\n" + seedPrompt
                  + "\n\nUSER MSG:\n\n" + userMessage,
        }
      ],
    },
    url: URL_API_ANTHROPIC,
  };
}

function prepOpenAI(
  apiKey: string,
  model: string,
  seedPrompt: string,
  userMessage: string,
): RequestLLM {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: {
      model: model,
      max_tokens: 4096,
      temperature: 0,
      messages: [
        { role: 'system', content: seedPrompt },
        { role: 'user', content: userMessage },
      ],
    },
    url: URL_API_OPENAI,
  };
}

function prepXAI(
  apiKey: string,
  model: string,
  seedPrompt: string,
  userMessage: string,
): RequestLLM {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: {
      model: model,
      stream: false,
      temperature: 0,
      messages: [
        { role: 'system', content: seedPrompt },
        { role: 'user', content: userMessage },
      ],
    },
    url: URL_API_XAI,
  };
}