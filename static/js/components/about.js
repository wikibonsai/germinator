const aboutButton = document.getElementById('aboutButton');
const aboutModal = document.querySelector('.about-modal');
const aboutModalClose = document.querySelectorAll('.about-modal-close');

aboutButton.addEventListener('click', function(){
  aboutModal.classList.remove('opacity-0');
  aboutModal.classList.remove('pointer-events-none');
  document.body.classList.add('modal-active');
});

aboutModalClose.forEach(function(el){
  el.addEventListener('click', function(){
    aboutModal.classList.add('opacity-0');
    aboutModal.classList.add('pointer-events-none');
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
      aboutModalClose.classList.add('opacity-0');
      aboutModalClose.classList.add('pointer-events-none');
      document.body.classList.remove('modal-active');
  }
};
