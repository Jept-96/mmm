const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');

// Load the fixed base images

const baseImage2 = new Image();
baseImage2.src = 'assets/head.png'; // Path to the second base image

const baseImage3 = new Image();
baseImage3.src = 'assets/base.png'; // Path to the third base image

// Overlay assets
let selectedHat = null;
let selectedBackground = null;
let selectedClothing = null;
let selectedWing = null;
let selectedBg = null;

// Ensure the base images and selected assets are drawn in the correct order
function drawMeme() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw layers in the desired order
    // Background at the back

    // Draw base images
    if (selectedBg) ctx.drawImage(selectedBg, 0, 0, canvas.width, canvas.height); // bg
    if (selectedHat) ctx.drawImage(selectedHat, 0, 0, canvas.width, canvas.height); // Hat on top of base images
    ctx.drawImage(baseImage3, 0, 0, canvas.width, canvas.height); // Base Image 3

    if (selectedBackground) ctx.drawImage(selectedBackground, 0, 0, canvas.width, canvas.height);
    if (selectedClothing) ctx.drawImage(selectedClothing, 0, 0, canvas.width, canvas.height); // Clothing on top of base images
    ctx.drawImage(baseImage2, 0, 0, canvas.width, canvas.height); // Base Image 2
    if (selectedWing) ctx.drawImage(selectedWing, 0, 0, canvas.width, canvas.height); // Wing on top of base images
}

// Set the asset based on the category
function setAsset(type, assetPath) {
    const image = new Image();
    image.src = assetPath;

    // Wait for the image to load before updating the canvas
    image.onload = () => {
        switch (type) {
            case 'hat':
                selectedHat = image;
                break;
            case 'background':
                selectedBackground = image;
                break;
            case 'clothing':
                selectedClothing = image;
                break;
            case 'wing':
                selectedWing = image;
                break;
            case 'bg':
                selectedBg = image;
                break;    
        }
        drawMeme(); // Redraw the canvas every time an asset is set
    }
}

// Clear selected asset of a specific category
function clearAsset(type) {
    switch (type) {
        case 'hat':
            selectedHat = null;
            break;
        case 'background':
            selectedBackground = null;
            break;
        case 'clothing':
            selectedClothing = null;
            break;
        case 'wing':
            selectedWing = null;
            break;
        case 'bg':
            selectedBg = null;
            break;    
    }
    drawMeme(); // Redraw without the cleared asset
}

// Clear all assets and reset to only base images
function clearAll() {
    selectedHat = null;
    selectedBackground = null;
    selectedClothing = null;
    selectedWing = null;
    selectedBg = null;
    drawMeme();
}

// Ensure the base images are drawn when they load
baseImage2.onload = drawMeme;
baseImage3.onload = drawMeme;

// Download the current meme as a PNG file
function downloadMeme() {
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
}

