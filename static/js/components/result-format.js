function safelyRemoveChild(parentId, childId) {
  // Get the parent and child elements by their IDs
  const parentElement = document.getElementById(parentId);
  const childElement = document.getElementById(childId);

  // Check if both elements exist and if the child is indeed a child of the parent
  if (parentElement && childElement && parentElement.contains(childElement)) {
    // Remove the child element
    parentElement.removeChild(childElement);
  } else {
    parentElement.innerHTML = '';
  }
}
function appendSvgToResultBox() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("id", "markmap");
  svg.setAttribute("style", "width: 800px; height: 800px");

  // Get the 'resultBox' element
  const resultBox = document.getElementById("resultBox");

  // Append the SVG element to the 'resultBox'
  resultBox.appendChild(svg);
}
async function createMarkmap(markdown) {
  const { Markmap, Transformer, loadCSS, loadJS } = window.markmap;
  const transformer = new Transformer();
  const { root, features } = transformer.transform(markdown);
  appendSvgToResultBox();
  return Markmap.create('#markmap', null, root);
}

const resultFormatButton = document.getElementById('resultFormatButton');

resultFormatButton.addEventListener('click', async function() {
  const markdownIcon = isDark ? './img/icons/icons8-markdown-30-dark.png' : './img/icons/icons8-markdown-30-light.png';
  const mindmapIcon = isDark ? './img/icons/icons8-mind-map-30-dark.png' : './img/icons/icons8-mind-map-30-light.png';
  const icon = document.getElementById('resultFormatIcon');
  const resultBox = document.getElementById('resultBox');

  isMarkdown = !isMarkdown;
  localStorage.setItem('is-markdown', isMarkdown);
  icon.src = isMarkdown ? mindmapIcon : markdownIcon;
  safelyRemoveChild("resultBox", "markmap");
  // update
  if (isMarkdown) {
    resultBox.innerHTML = resultMkdn;
  } else {
    await createMarkmap(resultMkdn);
  }
});
