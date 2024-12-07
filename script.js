/* This version use picsum.photos/ to generate photos
 * You can change to api.unsplash.com/search/photos?query= 
 */

let selectedStyle = 'realistic';
let selectedDimension = '2D';

function selectStyle(element, style) {
  document.querySelectorAll('.style-option').forEach(el => el.classList.remove('active'));
  element.classList.add('active');
  selectedStyle = style;
}

function selectDimension(element, dimension) {
  document.querySelectorAll('.dimension-option').forEach(el => el.classList.remove('active'));
  element.classList.add('active');
  selectedDimension = dimension;
}

function generateImages() {
  const prompt = document.getElementById('prompt-input').value;
  const imageCount = parseInt(document.getElementById('image-count').value);
  const viewpoint = document.getElementById('viewpoint').value;
  const imagesPerRow = parseInt(document.getElementById('images-per-row').value);
  const lighting = document.getElementById('lighting').value;
  const aspectRatio = document.getElementById('aspect-ratio').value;
  const loadingDiv = document.getElementById('loading');
  const generatedImagesDiv = document.getElementById('generated-images');

  if (prompt.trim() === '') {
    alert('Please enter a description for the image.');
    return;
  }

  if (imageCount < 1 || imageCount > 100) {
    alert('Please select a number of images between 1 and 100.');
    return;
  }

  loadingDiv.style.display = 'block';
  loadingDiv.classList.add('pulse');
  generatedImagesDiv.innerHTML = '';

  generatedImagesDiv.style.gridTemplateColumns = `repeat(${imagesPerRow}, 1fr)`;

  setTimeout(() => {
    loadingDiv.style.display = 'none';
    loadingDiv.classList.remove('pulse');

    for (let i = 0; i < imageCount; i++) {
      const imageContainer = document.createElement('div');
      imageContainer.className = 'image-container';

      const img = document.createElement('img');
      img.className = 'generated-image';
      img.src = `https://picsum.photos/seed/${Math.random()}/${getAspectRatioDimensions(aspectRatio)}`;
      img.alt = `${prompt} in ${selectedStyle} style (${selectedDimension}, ${viewpoint}, ${lighting})`;

      const downloadBtn = document.createElement('button');
      downloadBtn.className = 'download-btn';
      downloadBtn.innerHTML = '⭳';
      downloadBtn.onclick = () => downloadImage(img.src, `${prompt}_${selectedStyle}_${selectedDimension}_${i+1}.jpg`);

      imageContainer.appendChild(img);
      imageContainer.appendChild(downloadBtn);
      generatedImagesDiv.appendChild(imageContainer);
    }
  }, Math.random() * 3000 + 2000);
}

function getAspectRatioDimensions(aspectRatio) {
  const baseWidth = 400;
  switch (aspectRatio) {
    case '1:1': return `${baseWidth}/${baseWidth}`;
    case '4:3': return `${baseWidth}/${Math.round(baseWidth * 3 / 4)}`;
    case '16:9': return `${baseWidth}/${Math.round(baseWidth * 9 / 16)}`;
    case '21:9': return `${baseWidth}/${Math.round(baseWidth * 9 / 21)}`;
    case '9:16': return `${Math.round(baseWidth * 9 / 16)}/${baseWidth}`;
    default: return `${baseWidth}/${baseWidth}`;
  }
}

function downloadImage(imageSrc, fileName) {
  fetch(imageSrc)
    .then(response => response.blob())
    .then(blob => {
    saveAs(blob, fileName);
  })
    .catch(error => {
    console.error('Error downloading the image:', error);
    alert('There was an error downloading the image. Please try again.');
  });
}

function importImages() {
  const fileInput = document.getElementById('image-upload');
  const files = fileInput.files;
  const importedImagesDiv = document.getElementById('imported-images');

  if (files.length === 0) {
    alert('Please select at least one image to import.');
    return;
  }

  importedImagesDiv.innerHTML = '';

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function(e) {
      const imageContainer = document.createElement('div');
      imageContainer.className = 'image-container';

      const img = document.createElement('img');
      img.className = 'imported-image';
      img.src = e.target.result;
      img.alt = `Imported image ${i+1}`;

      const downloadBtn = document.createElement('button');
      downloadBtn.className = 'download-btn';
      downloadBtn.innerHTML = '⭳';
      downloadBtn.onclick = () => downloadImage(img.src, `imported_image_${i+1}.jpg`);

      const improveBtn = document.createElement('button');
      improveBtn.className = 'improve-btn';
      improveBtn.innerHTML = '↑';
      improveBtn.onclick = () => improveImage(img);

      imageContainer.appendChild(img);
      imageContainer.appendChild(downloadBtn);
      imageContainer.appendChild(improveBtn);
      importedImagesDiv.appendChild(imageContainer);
    };

    reader.readAsDataURL(file);
  }
}

function improveImage(img) {
  const loadingDiv = document.getElementById('loading');
  loadingDiv.style.display = 'block';
  loadingDiv.classList.add('pulse');
  loadingDiv.textContent = 'Enhancing image...';

  setTimeout(() => {
    loadingDiv.style.display = 'none';
    loadingDiv.classList.remove('pulse');
    loadingDiv.textContent = 'Generating images...';

    // Simulate image enhancement by applying a brightness filter
    img.style.filter = 'brightness(1.2) contrast(1.1)';
    alert('The image has been successfully enhanced!');
  }, Math.random() * 2000 + 1000);
}

// Initialize the background animation with Vanta.js
VANTA.NET({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x4CAF50,
  backgroundColor: 0x1a1a1a,
  points: 20.00,
  maxDistance: 23.00,
  spacing: 16.00
});