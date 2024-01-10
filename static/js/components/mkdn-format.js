// modal

const mkdnFormatButton = document.getElementById('mkdnFormatButton');
const mkdnFormatModal = document.querySelector('.mkdn-format-modal');
const mkdnFormatModalClose = document.querySelectorAll('.mkdn-format-modal-close');

mkdnFormatButton.addEventListener('click', function(){
  mkdnFormatModal.classList.remove('opacity-0');
  mkdnFormatModal.classList.remove('pointer-events-none');
  document.body.classList.add('modal-active');
});

mkdnFormatModalClose.forEach(function(el){
  el.addEventListener('click', function(){
    mkdnFormatModal.classList.add('opacity-0');
    mkdnFormatModal.classList.add('pointer-events-none');
    document.body.classList.remove('modal-active');
  });
});

document.onkeydown = function(evt) {
  evt = evt || window.event;
  let isEscape = false;
  if ('key' in evt) {
      isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
  } else {
      isEscape = (evt.keyCode === 27);
  }
  if (isEscape && document.body.classList.contains('modal-active')) {
      mkdnFormatModal.classList.add('opacity-0');
      mkdnFormatModal.classList.add('pointer-events-none');
      document.body.classList.remove('modal-active');
  }
};

// logic

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
