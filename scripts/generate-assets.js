import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';

// Ensure the assets directories exist
const imagesDir = path.resolve('public/assets/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Helper function to save canvas as PNG
function saveCanvasAsPNG(canvas, filename) {
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(imagesDir, filename), buffer);
  console.log(`Created ${filename}`);
}

// Generate garden background
function createGardenBackground() {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext('2d');
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, 600);
  gradient.addColorStop(0, '#fce2e6');
  gradient.addColorStop(1, '#e6f3ff');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 600);
  
  // Add some grass
  ctx.fillStyle = '#c9e4ca';
  ctx.beginPath();
  ctx.moveTo(0, 450);
  ctx.bezierCurveTo(200, 430, 600, 470, 800, 450);
  ctx.lineTo(800, 600);
  ctx.lineTo(0, 600);
  ctx.closePath();
  ctx.fill();
  
  // Add some clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  // Cloud 1
  drawCloud(ctx, 100, 100, 80, 40);
  // Cloud 2
  drawCloud(ctx, 400, 70, 100, 50);
  // Cloud 3
  drawCloud(ctx, 700, 120, 90, 45);
  
  // Add some flowers in the background
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * 800;
    const y = 450 + Math.random() * 100;
    const size = 5 + Math.random() * 10;
    const color = ['#ff6b81', '#ffb8c6', '#c5a3ff', '#a3d9ff'][Math.floor(Math.random() * 4)];
    
    drawFlower(ctx, x, y, size, color);
  }
  
  // Add some trees
  drawTree(ctx, 50, 400, 100, 200);
  drawTree(ctx, 750, 420, 80, 180);
  
  saveCanvasAsPNG(canvas, 'garden-bg.png');
}

// Helper function to draw a cloud
function drawCloud(ctx, x, y, width, height) {
  const numCircles = Math.floor(width / 15);
  for (let i = 0; i < numCircles; i++) {
    const circleX = x + (i * width / numCircles);
    const circleY = y + Math.sin(i * Math.PI / numCircles) * height / 4;
    const radius = height / 2 + Math.sin(i * Math.PI / numCircles) * height / 4;
    ctx.beginPath();
    ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Helper function to draw a simple flower
function drawFlower(ctx, x, y, size, color) {
  // Flower petals
  ctx.fillStyle = color;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    const angle = (i * Math.PI * 2) / 5;
    const petalX = x + Math.cos(angle) * size;
    const petalY = y + Math.sin(angle) * size;
    ctx.arc(petalX, petalY, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Flower center
  ctx.fillStyle = '#ffff00';
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.fill();
}

// Helper function to draw a tree
function drawTree(ctx, x, y, width, height) {
  // Tree trunk
  ctx.fillStyle = '#8b4513';
  ctx.fillRect(x - width / 8, y - height / 4, width / 4, height / 2);
  
  // Tree foliage
  ctx.fillStyle = '#a0d9a0';
  ctx.beginPath();
  ctx.arc(x, y - height / 2, width / 2, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x - width / 3, y - height / 3, width / 3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x + width / 3, y - height / 3, width / 3, 0, Math.PI * 2);
  ctx.fill();
}

// Generate title background
function createTitleBackground() {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext('2d');
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, 600);
  gradient.addColorStop(0, '#fce2e6');
  gradient.addColorStop(1, '#e6f3ff');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 600);
  
  // Add decorative hearts
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * 800;
    const y = Math.random() * 600;
    const size = 5 + Math.random() * 15;
    const opacity = 0.2 + Math.random() * 0.5;
    
    drawHeart(ctx, x, y, size, `rgba(255, 107, 129, ${opacity})`);
  }
  
  saveCanvasAsPNG(canvas, 'title-bg.png');
}

// Helper function to draw a heart
function drawHeart(ctx, x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y + size / 4);
  ctx.bezierCurveTo(
    x, y, 
    x - size, y, 
    x - size, y - size
  );
  ctx.bezierCurveTo(
    x - size, y - size * 2, 
    x, y - size * 1.5, 
    x, y - size / 2
  );
  ctx.bezierCurveTo(
    x, y - size * 1.5, 
    x + size, y - size * 2, 
    x + size, y - size
  );
  ctx.bezierCurveTo(
    x + size, y, 
    x, y, 
    x, y + size / 4
  );
  ctx.fill();
}

// Generate girl character
function createGirlCharacter() {
  // Create sad girl
  const sadCanvas = createCanvas(200, 400);
  const sadCtx = sadCanvas.getContext('2d');
  drawGirl(sadCtx, 100, 200, 'sad');
  saveCanvasAsPNG(sadCanvas, 'girl-sad.png');
  
  // Create happy girl
  const happyCanvas = createCanvas(200, 400);
  const happyCtx = happyCanvas.getContext('2d');
  drawGirl(happyCtx, 100, 200, 'happy');
  saveCanvasAsPNG(happyCanvas, 'girl-happy.png');
}

// Helper function to draw the girl character
function drawGirl(ctx, x, y, mood) {
  // Body (dress)
  ctx.fillStyle = '#ffb8c6';
  ctx.beginPath();
  ctx.moveTo(x - 40, y);
  ctx.lineTo(x + 40, y);
  ctx.lineTo(x + 50, y + 150);
  ctx.lineTo(x - 50, y + 150);
  ctx.closePath();
  ctx.fill();
  
  // Head
  ctx.fillStyle = '#ffe0bd';
  ctx.beginPath();
  ctx.arc(x, y - 60, 40, 0, Math.PI * 2);
  ctx.fill();
  
  // Hair
  ctx.fillStyle = '#8b4513';
  ctx.beginPath();
  ctx.arc(x, y - 70, 45, Math.PI, 0, true);
  ctx.fill();
  
  // Long hair strands
  ctx.beginPath();
  ctx.moveTo(x - 45, y - 70);
  ctx.quadraticCurveTo(x - 60, y, x - 40, y + 50);
  ctx.lineTo(x - 30, y + 50);
  ctx.quadraticCurveTo(x - 50, y, x - 35, y - 70);
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(x + 45, y - 70);
  ctx.quadraticCurveTo(x + 60, y, x + 40, y + 50);
  ctx.lineTo(x + 30, y + 50);
  ctx.quadraticCurveTo(x + 50, y, x + 35, y - 70);
  ctx.fill();
  
  // Arms
  ctx.fillStyle = '#ffe0bd';
  // Left arm
  ctx.beginPath();
  ctx.moveTo(x - 40, y + 20);
  ctx.quadraticCurveTo(x - 60, y + 70, x - 50, y + 100);
  ctx.lineTo(x - 40, y + 100);
  ctx.quadraticCurveTo(x - 50, y + 70, x - 30, y + 20);
  ctx.fill();
  
  // Right arm
  ctx.beginPath();
  ctx.moveTo(x + 40, y + 20);
  ctx.quadraticCurveTo(x + 60, y + 70, x + 50, y + 100);
  ctx.lineTo(x + 40, y + 100);
  ctx.quadraticCurveTo(x + 50, y + 70, x + 30, y + 20);
  ctx.fill();
  
  // Legs
  ctx.fillStyle = '#ffe0bd';
  // Left leg
  ctx.beginPath();
  ctx.moveTo(x - 30, y + 150);
  ctx.lineTo(x - 20, y + 150);
  ctx.lineTo(x - 10, y + 200);
  ctx.lineTo(x - 30, y + 200);
  ctx.closePath();
  ctx.fill();
  
  // Right leg
  ctx.beginPath();
  ctx.moveTo(x + 30, y + 150);
  ctx.lineTo(x + 20, y + 150);
  ctx.lineTo(x + 10, y + 200);
  ctx.lineTo(x + 30, y + 200);
  ctx.closePath();
  ctx.fill();
  
  // Face features
  // Eyes
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(x - 15, y - 65, 5, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x + 15, y - 65, 5, 0, Math.PI * 2);
  ctx.fill();
  
  // Mouth based on mood
  if (mood === 'happy') {
    // Happy mouth (smile)
    ctx.beginPath();
    ctx.arc(x, y - 45, 15, 0, Math.PI);
    ctx.stroke();
    
    // Blush
    ctx.fillStyle = 'rgba(255, 150, 150, 0.5)';
    ctx.beginPath();
    ctx.arc(x - 25, y - 55, 8, 0, Math.PI * 2);
    ctx.arc(x + 25, y - 55, 8, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Sad mouth (frown)
    ctx.beginPath();
    ctx.arc(x, y - 35, 15, Math.PI, Math.PI * 2);
    ctx.stroke();
  }
}

// Generate boy character
function createBoyCharacter() {
  const canvas = createCanvas(200, 400);
  const ctx = canvas.getContext('2d');
  
  // Body (shirt)
  ctx.fillStyle = '#a3d9ff';
  ctx.beginPath();
  ctx.moveTo(100 - 40, 200);
  ctx.lineTo(100 + 40, 200);
  ctx.lineTo(100 + 45, 350);
  ctx.lineTo(100 - 45, 350);
  ctx.closePath();
  ctx.fill();
  
  // Head
  ctx.fillStyle = '#ffe0bd';
  ctx.beginPath();
  ctx.arc(100, 140, 40, 0, Math.PI * 2);
  ctx.fill();
  
  // Hair
  ctx.fillStyle = '#333333';
  ctx.beginPath();
  ctx.arc(100, 130, 45, Math.PI, 0, true);
  ctx.fill();
  
  // Short hair details
  ctx.beginPath();
  ctx.moveTo(60, 130);
  ctx.lineTo(55, 150);
  ctx.lineTo(65, 150);
  ctx.closePath();
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(140, 130);
  ctx.lineTo(145, 150);
  ctx.lineTo(135, 150);
  ctx.closePath();
  ctx.fill();
  
  // Arms
  ctx.fillStyle = '#ffe0bd';
  // Left arm
  ctx.beginPath();
  ctx.moveTo(60, 220);
  ctx.quadraticCurveTo(40, 270, 50, 300);
  ctx.lineTo(60, 300);
  ctx.quadraticCurveTo(50, 270, 70, 220);
  ctx.fill();
  
  // Right arm
  ctx.beginPath();
  ctx.moveTo(140, 220);
  ctx.quadraticCurveTo(160, 270, 150, 300);
  ctx.lineTo(140, 300);
  ctx.quadraticCurveTo(150, 270, 130, 220);
  ctx.fill();
  
  // Pants
  ctx.fillStyle = '#5a7d9a';
  ctx.fillRect(55, 350, 90, 20);
  
  // Legs
  ctx.fillStyle = '#ffe0bd';
  // Left leg
  ctx.beginPath();
  ctx.moveTo(70, 370);
  ctx.lineTo(90, 370);
  ctx.lineTo(95, 400);
  ctx.lineTo(65, 400);
  ctx.closePath();
  ctx.fill();
  
  // Right leg
  ctx.beginPath();
  ctx.moveTo(110, 370);
  ctx.lineTo(130, 370);
  ctx.lineTo(135, 400);
  ctx.lineTo(105, 400);
  ctx.closePath();
  ctx.fill();
  
  // Face features
  // Eyes
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(85, 135, 5, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(115, 135, 5, 0, Math.PI * 2);
  ctx.fill();
  
  // Mouth (smile)
  ctx.beginPath();
  ctx.arc(100, 155, 15, 0, Math.PI);
  ctx.stroke();
  
  saveCanvasAsPNG(canvas, 'boy.png');
}

// Generate bench
function createBench() {
  const canvas = createCanvas(300, 150);
  const ctx = canvas.getContext('2d');
  
  // Bench seat
  ctx.fillStyle = '#8b4513';
  ctx.fillRect(20, 50, 260, 20);
  
  // Bench back
  ctx.fillRect(30, 20, 240, 10);
  ctx.fillRect(40, 30, 220, 10);
  ctx.fillRect(50, 40, 200, 10);
  
  // Bench legs
  ctx.fillRect(40, 70, 20, 50);
  ctx.fillRect(240, 70, 20, 50);
  
  // Add wood grain texture
  ctx.strokeStyle = '#6b3100';
  ctx.lineWidth = 1;
  
  // Grain on seat
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(20, 55 + i * 2);
    ctx.lineTo(280, 55 + i * 2);
    ctx.stroke();
  }
  
  // Grain on back
  for (let i = 0; i < 3; i++) {
    const y = 25 + i * 10;
    ctx.beginPath();
    ctx.moveTo(30 + i * 10, y);
    ctx.lineTo(270 - i * 10, y);
    ctx.stroke();
  }
  
  saveCanvasAsPNG(canvas, 'bench.png');
}

// Generate flower
function createFlower() {
  const canvas = createCanvas(100, 100);
  const ctx = canvas.getContext('2d');
  
  // Stem
  ctx.fillStyle = '#7cac7c';
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(50, 90);
  ctx.lineTo(45, 90);
  ctx.lineTo(45, 50);
  ctx.closePath();
  ctx.fill();
  
  // Leaf
  ctx.fillStyle = '#7cac7c';
  ctx.beginPath();
  ctx.moveTo(45, 70);
  ctx.quadraticCurveTo(20, 60, 30, 80);
  ctx.quadraticCurveTo(40, 75, 45, 80);
  ctx.fill();
  
  // Flower petals
  ctx.fillStyle = '#ff6b81';
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    const angle = (i * Math.PI) / 4;
    const x = 50 + Math.cos(angle) * 20;
    const y = 40 + Math.sin(angle) * 20;
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Flower center
  ctx.fillStyle = '#ffff00';
  ctx.beginPath();
  ctx.arc(50, 40, 10, 0, Math.PI * 2);
  ctx.fill();
  
  saveCanvasAsPNG(canvas, 'flower.png');
}

// Generate fountain
function createFountain() {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  
  // Base
  ctx.fillStyle = '#d3d3d3';
  ctx.beginPath();
  ctx.ellipse(100, 160, 70, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Middle tier
  ctx.fillStyle = '#e0e0e0';
  ctx.beginPath();
  ctx.ellipse(100, 120, 40, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Top tier
  ctx.fillStyle = '#f0f0f0';
  ctx.beginPath();
  ctx.ellipse(100, 90, 20, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Water in base
  ctx.fillStyle = '#a3d9ff';
  ctx.beginPath();
  ctx.ellipse(100, 160, 60, 25, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Water in middle tier
  ctx.fillStyle = '#a3d9ff';
  ctx.beginPath();
  ctx.ellipse(100, 120, 30, 15, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Water in top tier
  ctx.fillStyle = '#a3d9ff';
  ctx.beginPath();
  ctx.ellipse(100, 90, 15, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Water streams
  ctx.strokeStyle = '#a3d9ff';
  ctx.lineWidth = 2;
  
  // From top to middle
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const startX = 100 + Math.cos(angle) * 15;
    const startY = 90 + Math.sin(angle) * 7;
    const endX = 100 + Math.cos(angle) * 30;
    const endY = 120 + Math.sin(angle) * 15;
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(
      startX + Math.cos(angle) * 10,
      startY + Math.sin(angle) * 10 + 10,
      endX, endY
    );
    ctx.stroke();
  }
  
  // From middle to base
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;
    const startX = 100 + Math.cos(angle) * 30;
    const startY = 120 + Math.sin(angle) * 15;
    const endX = 100 + Math.cos(angle) * 60;
    const endY = 160 + Math.sin(angle) * 25;
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(
      startX + Math.cos(angle) * 15,
      startY + Math.sin(angle) * 15 + 10,
      endX, endY
    );
    ctx.stroke();
  }
  
  saveCanvasAsPNG(canvas, 'fountain.png');
}

// Generate vase
function createVase() {
  const canvas = createCanvas(150, 200);
  const ctx = canvas.getContext('2d');
  
  // Vase body
  const gradient = ctx.createLinearGradient(0, 0, 150, 0);
  gradient.addColorStop(0, '#dda0dd');
  gradient.addColorStop(0.5, '#e6a8e6');
  gradient.addColorStop(1, '#dda0dd');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.quadraticCurveTo(75, 30, 100, 50);
  ctx.quadraticCurveTo(120, 80, 120, 150);
  ctx.quadraticCurveTo(75, 170, 30, 150);
  ctx.quadraticCurveTo(30, 80, 50, 50);
  ctx.fill();
  
  // Vase opening
  ctx.fillStyle = '#f0e6f0';
  ctx.beginPath();
  ctx.ellipse(75, 50, 25, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Decorative pattern
  ctx.strokeStyle = '#c080c0';
  ctx.lineWidth = 2;
  
  // Horizontal lines
  for (let y = 70; y <= 140; y += 20) {
    ctx.beginPath();
    const startX = 30 + (y - 70) / 4;
    const endX = 120 - (y - 70) / 4;
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
  }
  
  // Vertical decorative elements
  for (let x = 45; x <= 105; x += 30) {
    ctx.beginPath();
    ctx.moveTo(x, 70);
    ctx.lineTo(x, 140);
    ctx.stroke();
    
    // Small flowers at intersections
    for (let y = 70; y <= 140; y += 20) {
      ctx.fillStyle = '#ff6b81';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  saveCanvasAsPNG(canvas, 'vase.png');
}

// Generate dialogue box
function createDialogueBox() {
  const canvas = createCanvas(600, 150);
  const ctx = canvas.getContext('2d');
  
  // Box background with rounded corners
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  roundRect(ctx, 0, 0, 600, 150, 15, true);
  
  // Border
  ctx.strokeStyle = '#ff6b81';
  ctx.lineWidth = 3;
  roundRect(ctx, 0, 0, 600, 150, 15, false, true);
  
  // Decorative hearts in corners
  ctx.fillStyle = 'rgba(255, 107, 129, 0.2)';
  drawHeart(ctx, 20, 20, 15, 'rgba(255, 107, 129, 0.2)');
  drawHeart(ctx, 580, 20, 15, 'rgba(255, 107, 129, 0.2)');
  drawHeart(ctx, 20, 130, 15, 'rgba(255, 107, 129, 0.2)');
  drawHeart(ctx, 580, 130, 15, 'rgba(255, 107, 129, 0.2)');
  
  saveCanvasAsPNG(canvas, 'dialogue-box.png');
}

// Helper function to draw rounded rectangles
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

// Generate button
function createButton() {
  const canvas = createCanvas(150, 50);
  const ctx = canvas.getContext('2d');
  
  // Button background with gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 50);
  gradient.addColorStop(0, '#ff6b81');
  gradient.addColorStop(1, '#e05a70');
  ctx.fillStyle = gradient;
  
  // Rounded button
  roundRect(ctx, 0, 0, 150, 50, 25, true);
  
  // Button border
  ctx.strokeStyle = '#d04060';
  ctx.lineWidth = 2;
  roundRect(ctx, 0, 0, 150, 50, 25, false, true);
  
  // Button highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(140, 10);
  ctx.quadraticCurveTo(130, 15, 120, 20);
  ctx.lineTo(20, 20);
  ctx.quadraticCurveTo(15, 15, 10, 10);
  ctx.fill();
  
  saveCanvasAsPNG(canvas, 'button.png');
}

// Generate all assets
async function generateAllAssets() {
  console.log('Generating game assets...');
  
  createGardenBackground();
  createTitleBackground();
  createGirlCharacter();
  createBoyCharacter();
  createBench();
  createFlower();
  createFountain();
  createVase();
  createDialogueBox();
  createButton();
  
  console.log('All assets generated successfully!');
}

// Run the asset generation
generateAllAssets(); 