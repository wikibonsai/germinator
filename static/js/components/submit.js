async function goai() {
  // If you're using the API key input, we preference the key from there.
  const apiKeyFromDangerousApiKeyInput = document.body.querySelector('#openai_key_risky_but_cool')?.value;
  if (!apiKeyFromDangerousApiKeyInput) {
    alert('Please enter an OpenAI API key');
  }
  const userMsg = document.getElementById('input').value;
  let result = document.getElementById('resultBox');
  safelyRemoveChild("resultBox", "markmap");  
  resultMkdn = await makeReal(
    userMsg,
    {
      apikey: apiKeyFromDangerousApiKeyInput,
      indent: indentKind,
      text: textKind,
      case: caseKind,
      whitespace: whiteSpaceKind,
    },
  );
  if (isMarkdown) {
    result.innerHTML = resultMkdn;
  } else {
    await createMarkmap(resultMkdn);
  }
}

const growButton = document.getElementById('growButton');
growButton.addEventListener('click', goai);
window.addEventListener('keypress', async function () {
  if (event.key === 'Enter') {
    event.preventDefault();
    goai();
  }
});
