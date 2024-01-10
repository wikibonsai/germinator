const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedIsDark = localStorage.getItem('is-dark');

var isDark = (storedIsDark !== null) ? (storedIsDark === 'true') : prefersDarkScheme;
var isMarkdown = localStorage.getItem('is-markdown') === 'true';

var indentKind = localStorage.getItem('indent') ? localStorage.getItem('indent') : '2 spaces';
var textKind = localStorage.getItem('text') ? localStorage.getItem('text') : '[[wiki text]]';
var caseKind = localStorage.getItem('case') ? localStorage.getItem('case') : 'lower';
var whiteSpaceKind = localStorage.getItem('whitespace') ? localStorage.getItem('whitespace') : 'kabob-space';

var resultMkdn = '';
var resultMap = '';

function init() {
  // api key
  const apiKey = localStorage.getItem('api-key');
  document.getElementById('openai_key_risky_but_cool').value = apiKey;
  // theme colors
  setTheme();
  // markdown formatting
  document.getElementById('indentSelect').value = indentKind;
  document.getElementById('wikiSelect').value = textKind;
  document.getElementById('caseSelect').value = caseKind;
  document.getElementById('whitespaceSelect').value = whiteSpaceKind;
  // result formatting
  if (isMarkdown) {
    document.getElementById('resultFormatIcon').src = isDark ? './img/icons/icons8-mind-map-30-dark.png' : './img/icons/icons8-mind-map-30-light.png';
  } else {
    document.getElementById('resultFormatIcon').src = isDark ? './img/icons/icons8-markdown-30-dark.png' : './img/icons/icons8-markdown-30-light.png';
  }
  // mkdn-format
  document.getElementById('saveButton').addEventListener('click', function() {
    indentKind = document.getElementById('indentSelect').value;
    textKind = document.getElementById('wikiSelect').value;
    caseKind = document.getElementById('caseSelect').value;
    whiteSpaceKind = document.getElementById('whitespaceSelect').value;
    localStorage.setItem('indent', indentKind);
    localStorage.setItem('text', textKind);
    localStorage.setItem('case', caseKind);
    localStorage.setItem('whitespace', whiteSpaceKind);
    console.log(indentKind, textKind, caseKind, whiteSpaceKind);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(init(), 2000);
  // init();
});

console.log("!!!!!!!!! EXECUTED BABY !!!!!!!!!!");
