// Copy (markdown) Button

async function svgToPngAndCopyToClipboard(svgElement, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Create an image and set the SVG data as the source
  const img = new Image();
  img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(svgElement))));
  
    img.onload = () => {
      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas to PNG
      canvas.toBlob(async (blob) => {
        try {
          // Copy the PNG blob to the clipboard
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob
            })
          ]).then(() => {
            if (blob) {
              console.debug('Semantict tree PNG copied to clipboard');
              copied();
            }
          })
          .catch(err => {
            console.error('Error in copying text: ', err);
          });
        } catch (err) {
          console.error('Could not copy PNG to clipboard', err);
        }
      }, 'image/png');
    };
}
function copyMkdnToClipBoard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      if (text.length > 0) {
        console.debug('Semantic tree Markdown copied to clipboard');
        copied();
      }
    })
    .catch(err => {
      console.error('Error in copying text: ', err);
    });
}
function copied() {
  const icon = document.getElementById('copyIcon');
  const copyIcon = isDark ? './img/icons/icons8-copy-30-dark.png' : './img/icons/icons8-copy-30-light.png';
  const checkImg = './img/icons/icons8-check-30.png';
  icon.src = checkImg;
  setTimeout(function() {
    icon.src = copyIcon;
  }, 2000);
}

const copyButton = document.getElementById('copyButton');
copyButton.addEventListener('click', function() {
  let semtree;
  if (isMarkdown) {
    semtree = document.getElementById('resultBox').innerHTML;
    copyMkdnToClipBoard(semtree);
  } else {
    const svgElement = document.getElementById('markmap');
    const width = 800;
    const height = 800;
    svgToPngAndCopyToClipboard(svgElement, width, height);
  }
});
