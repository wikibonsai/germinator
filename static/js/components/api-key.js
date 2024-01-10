// openai api key

document.getElementById('openai_key_risky_but_cool').addEventListener('input', function (event) {
  const inputValue = event.target.value;
  localStorage.setItem('api-key', inputValue);
});
