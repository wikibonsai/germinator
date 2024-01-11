var isMarkdown = localStorage.getItem('is-markdown') === 'true';

var resultMkdn = '';

function init() {
  // result formatting
  if (isMarkdown) {
    document.getElementById('resultFormatIcon').src = false ? './img/icons/icons8-mind-map-30-dark.png' : './img/icons/icons8-mind-map-30-light.png';
  } else {
    document.getElementById('resultFormatIcon').src = false ? './img/icons/icons8-markdown-30-dark.png' : './img/icons/icons8-markdown-30-light.png';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  init();
});

