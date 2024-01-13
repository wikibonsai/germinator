// courtesy: https://github.com/tldraw/make-real-starter

import { SYSTEM_PROMPT } from './prompt';


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
  let formatPrompt = `\n\nMARKDOWN FORMATTING:\nMake sure to format the markdown of the semantic tree using ${opts.indent} for each level, make each word begin with ${opts.case} case, and whitespace between words should be converted to '${opts.whitespace}'.`;
  if (opts.text === '[[wiki text]]') {
    formatPrompt += '\n\nAlso, be sure to surround each entry in the tree with double square brackets [[like this]] to make them wiki-friendly.'
  }
  const seedPrompt = SYSTEM_PROMPT + formatPrompt;
  let chatGptResponse;
  try {
    console.debug('seed prompt:', seedPrompt);
    console.debug('sending concept seed to chatgpt...');
    // make a request to openai. `fetchFromOpenAi` is a next.js server action,
    // so our api key is hidden.
    showLoader();
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
  hideLoader();
  return chatGptResponse;
}

function showLoader(resultBox) {
  document.getElementById('resultBox').style.display = 'none';
  document.getElementById('loader').style.display = 'flex';
}

function hideLoader(resultBox) {
  document.getElementById('loader').style.display = 'none';
  document.getElementById('resultBox').style.display = 'flex';
}
