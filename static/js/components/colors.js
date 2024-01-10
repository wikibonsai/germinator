const colorsButton = document.getElementById('colorsButton');

function setTheme() {
  const favicon = document.querySelector('[rel="icon"]');
  const logo = document.getElementById('wikibonsai-logo');
  const helpIcon = document.getElementById('helpIcon');
  const resultFormatIcon = document.getElementById('resultFormatIcon');
  const mkdnFormatIcon = document.getElementById('mkdnFormatIcon');
  const copyIcon = document.getElementById('copyIcon');
  // dark
  if (isDark) {
    favicon.setAttribute('href', './favicon-dark.png');
    document.body.classList.add('dark');
    colorsButton.innerHTML = '☀️';
    logo.src = './img/logo/wikibonsai-dark.svg';
    helpIcon.src = './img/icons/icons8-help-50-dark.png';
    resultFormatIcon.src = isMarkdown ? './img/icons/icons8-mind-map-30-dark.png' : './img/icons/icons8-markdown-30-dark.png';
    mkdnFormatIcon.src = './img/icons/icons8-adjust-30-dark.png';
    copyIcon.src = './img/icons/icons8-copy-30-dark.png';
  // light
  } else {
    favicon.setAttribute('href', './favicon-light.png');
    document.body.classList.remove('dark');
    colorsButton.innerHTML = '🌘';
    logo.src = './img/logo/wikibonsai-light.svg';
    helpIcon.src = './img/icons/icons8-help-50-light.png';
    resultFormatIcon.src = isMarkdown ? './img/icons/icons8-mind-map-30-light.png' : './img/icons/icons8-markdown-30-light.png';
    mkdnFormatIcon.src = './img/icons/icons8-adjust-30-light.png';
    copyIcon.src = './img/icons/icons8-copy-30-light.png';
  }
}

colorsButton.addEventListener('click', function () {
  isDark = !isDark;
  setTheme();
  localStorage.setItem('is-dark', isDark);
});
