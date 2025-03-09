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
  // Improved cute girl design
  
  // Body (dress)
  ctx.fillStyle = '#ffb8c6';
  ctx.beginPath();
  ctx.moveTo(x - 40, y);
  ctx.quadraticCurveTo(x - 50, y + 75, x - 60, y + 150);
  ctx.quadraticCurveTo(x, y + 160, x + 60, y + 150);
  ctx.quadraticCurveTo(x + 50, y + 75, x + 40, y);
  ctx.closePath();
  ctx.fill();
  
  // Add dress details - cute pattern
  ctx.fillStyle = '#ffd1dc';
  for (let i = 0; i < 5; i++) {
    const patternX = x - 30 + i * 15;
    const patternY = y + 100;
    ctx.beginPath();
    ctx.arc(patternX, patternY, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Add a cute bow on dress
  ctx.fillStyle = '#ff8fa2';
  ctx.beginPath();
  ctx.ellipse(x, y + 30, 15, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(x, y + 30);
  ctx.lineTo(x - 10, y + 20);
  ctx.lineTo(x - 15, y + 30);
  ctx.lineTo(x - 10, y + 40);
  ctx.lineTo(x, y + 30);
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(x, y + 30);
  ctx.lineTo(x + 10, y + 20);
  ctx.lineTo(x + 15, y + 30);
  ctx.lineTo(x + 10, y + 40);
  ctx.lineTo(x, y + 30);
  ctx.fill();
  
  // Head - make it rounder and cuter
  ctx.fillStyle = '#ffe0bd';
  ctx.beginPath();
  ctx.arc(x, y - 60, 45, 0, Math.PI * 2);
  ctx.fill();
  
  // Hair - softer, more styled
  ctx.fillStyle = '#8b4513';
  ctx.beginPath();
  ctx.arc(x, y - 70, 50, Math.PI, 0, true);
  ctx.fill();
  
  // Add hair bangs
  ctx.beginPath();
  ctx.moveTo(x - 45, y - 70);
  ctx.quadraticCurveTo(x - 30, y - 100, x, y - 100);
  ctx.quadraticCurveTo(x + 30, y - 100, x + 45, y - 70);
  ctx.lineTo(x + 45, y - 70);
  ctx.quadraticCurveTo(x + 30, y - 85, x, y - 85);
  ctx.quadraticCurveTo(x - 30, y - 85, x - 45, y - 70);
  ctx.fill();
  
  // Long hair strands - softer curves
  ctx.beginPath();
  ctx.moveTo(x - 45, y - 70);
  ctx.quadraticCurveTo(x - 60, y, x - 40, y + 80);
  ctx.lineTo(x - 30, y + 80);
  ctx.quadraticCurveTo(x - 50, y, x - 35, y - 70);
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(x + 45, y - 70);
  ctx.quadraticCurveTo(x + 60, y, x + 40, y + 80);
  ctx.lineTo(x + 30, y + 80);
  ctx.quadraticCurveTo(x + 50, y, x + 35, y - 70);
  ctx.fill();
  
  // Arms - more delicate
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
  
  // Legs - more stylized
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
  
  // Add cute shoes
  ctx.fillStyle = '#ff8fa2';
  ctx.beginPath();
  ctx.ellipse(x - 20, y + 200, 15, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(x + 20, y + 200, 15, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Face features - bigger, more anime-style eyes
  // Eyes
  ctx.fillStyle = '#000000';
  
  if (mood === 'happy') {
    // Happy eyes (bigger, sparkly)
    ctx.beginPath();
    ctx.ellipse(x - 15, y - 65, 8, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(x + 15, y - 65, 8, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Add eye highlights
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x - 17, y - 68, 3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x + 13, y - 68, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Happy mouth (cute smile)
    ctx.fillStyle = '#ff6b81';
    ctx.beginPath();
    ctx.arc(x, y - 40, 15, 0, Math.PI);
    ctx.fill();
    
    // Blush
    ctx.fillStyle = 'rgba(255, 150, 150, 0.5)';
    ctx.beginPath();
    ctx.arc(x - 25, y - 45, 10, 0, Math.PI * 2);
    ctx.arc(x + 25, y - 45, 10, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Sad eyes (downturned)
    ctx.beginPath();
    ctx.ellipse(x - 15, y - 65, 8, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(x + 15, y - 65, 8, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Add eye highlights
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x - 17, y - 68, 3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x + 13, y - 68, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Sad mouth (cute frown)
    ctx.strokeStyle = '#ff6b81';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y - 35, 10, Math.PI, Math.PI * 2);
    ctx.stroke();
    
    // Add a tear
    ctx.fillStyle = 'rgba(150, 200, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(x - 20, y - 55, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Tear drop
    ctx.beginPath();
    ctx.moveTo(x - 20, y - 52);
    ctx.quadraticCurveTo(x - 22, y - 45, x - 20, y - 40);
    ctx.quadraticCurveTo(x - 18, y - 45, x - 20, y - 52);
    ctx.fill();
  }
  
  // Add cute eyebrows
  ctx.strokeStyle = '#8b4513';
  ctx.lineWidth = 2;
  
  if (mood === 'happy') {
    // Happy eyebrows
    ctx.beginPath();
    ctx.moveTo(x - 25, y - 80);
    ctx.quadraticCurveTo(x - 15, y - 85, x - 5, y - 80);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x + 25, y - 80);
    ctx.quadraticCurveTo(x + 15, y - 85, x + 5, y - 80);
    ctx.stroke();
  } else {
    // Sad eyebrows
    ctx.beginPath();
    ctx.moveTo(x - 25, y - 85);
    ctx.quadraticCurveTo(x - 15, y - 80, x - 5, y - 85);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x + 25, y - 85);
    ctx.quadraticCurveTo(x + 15, y - 80, x + 5, y - 85);
    ctx.stroke();
  }
}

// Generate boy character
function createBoyCharacter() {
  const canvas = createCanvas(200, 400);
  const ctx = canvas.getContext('2d');
  
  // Improved cute boy design
  const x = 100;
  const y = 200;
  
  // Body (shirt) - more stylized
  ctx.fillStyle = '#a3d9ff';
  ctx.beginPath();
  ctx.moveTo(x - 40, y);
  ctx.quadraticCurveTo(x - 45, y + 75, x - 50, y + 150);
  ctx.lineTo(x + 50, y + 150);
  ctx.quadraticCurveTo(x + 45, y + 75, x + 40, y);
  ctx.closePath();
  ctx.fill();
  
  // Add shirt details
  ctx.fillStyle = '#7fc9ff';
  ctx.beginPath();
  ctx.moveTo(x - 10, y);
  ctx.lineTo(x + 10, y);
  ctx.lineTo(x + 10, y + 80);
  ctx.lineTo(x - 10, y + 80);
  ctx.closePath();
  ctx.fill();
  
  // Add collar
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(x - 20, y);
  ctx.lineTo(x, y + 20);
  ctx.lineTo(x + 20, y);
  ctx.closePath();
  ctx.fill();
  
  // Head - rounder, cuter
  ctx.fillStyle = '#ffe0bd';
  ctx.beginPath();
  ctx.arc(x, y - 60, 45, 0, Math.PI * 2);
  ctx.fill();
  
  // Hair - more styled
  ctx.fillStyle = '#333333';
  ctx.beginPath();
  ctx.arc(x, y - 70, 50, Math.PI, 0, true);
  ctx.fill();
  
  // Add hair styling - cute messy look
  ctx.beginPath();
  ctx.moveTo(x - 50, y - 70);
  ctx.quadraticCurveTo(x - 30, y - 110, x, y - 110);
  ctx.quadraticCurveTo(x + 30, y - 110, x + 50, y - 70);
  ctx.lineTo(x + 50, y - 70);
  ctx.quadraticCurveTo(x + 30, y - 95, x, y - 95);
  ctx.quadraticCurveTo(x - 30, y - 95, x - 50, y - 70);
  ctx.fill();
  
  // Add some hair spikes for style
  ctx.beginPath();
  ctx.moveTo(x - 20, y - 100);
  ctx.lineTo(x - 15, y - 115);
  ctx.lineTo(x - 10, y - 100);
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(x + 10, y - 100);
  ctx.lineTo(x + 15, y - 120);
  ctx.lineTo(x + 20, y - 100);
  ctx.fill();
  
  // Arms - more defined
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
  
  // Pants - more stylish
  ctx.fillStyle = '#5a7d9a';
  ctx.beginPath();
  ctx.moveTo(x - 50, y + 150);
  ctx.lineTo(x + 50, y + 150);
  ctx.lineTo(x + 45, y + 170);
  ctx.lineTo(x - 45, y + 170);
  ctx.closePath();
  ctx.fill();
  
  // Legs
  ctx.fillStyle = '#ffe0bd';
  // Left leg
  ctx.beginPath();
  ctx.moveTo(x - 30, y + 170);
  ctx.lineTo(x - 10, y + 170);
  ctx.lineTo(x - 5, y + 200);
  ctx.lineTo(x - 35, y + 200);
  ctx.closePath();
  ctx.fill();
  
  // Right leg
  ctx.beginPath();
  ctx.moveTo(x + 30, y + 170);
  ctx.lineTo(x + 10, y + 170);
  ctx.lineTo(x + 5, y + 200);
  ctx.lineTo(x + 35, y + 200);
  ctx.closePath();
  ctx.fill();
  
  // Add cute shoes
  ctx.fillStyle = '#5a7d9a';
  ctx.beginPath();
  ctx.ellipse(x - 20, y + 200, 20, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(x + 20, y + 200, 20, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Face features - bigger, more anime-style eyes
  // Eyes
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.ellipse(x - 15, y - 65, 8, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(x + 15, y - 65, 8, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Add eye highlights
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x - 17, y - 68, 3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x + 13, y - 68, 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Mouth (cute smile)
  ctx.fillStyle = '#ff6b81';
  ctx.beginPath();
  ctx.arc(x, y - 40, 10, 0, Math.PI);
  ctx.fill();
  
  // Add cute eyebrows
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 25, y - 80);
  ctx.quadraticCurveTo(x - 15, y - 85, x - 5, y - 80);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(x + 25, y - 80);
  ctx.quadraticCurveTo(x + 15, y - 85, x + 5, y - 80);
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

// Generate car for date scene
function createCar() {
  const canvas = createCanvas(300, 200);
  const ctx = canvas.getContext('2d');
  
  // Car body
  ctx.fillStyle = '#3498db';
  ctx.beginPath();
  ctx.moveTo(50, 120);
  ctx.lineTo(50, 150);
  ctx.lineTo(250, 150);
  ctx.lineTo(250, 120);
  ctx.quadraticCurveTo(220, 80, 180, 80);
  ctx.lineTo(120, 80);
  ctx.quadraticCurveTo(80, 80, 50, 120);
  ctx.closePath();
  ctx.fill();
  
  // Car windows
  ctx.fillStyle = '#d5f5ff';
  ctx.beginPath();
  ctx.moveTo(120, 85);
  ctx.lineTo(180, 85);
  ctx.quadraticCurveTo(210, 85, 230, 120);
  ctx.lineTo(70, 120);
  ctx.quadraticCurveTo(90, 85, 120, 85);
  ctx.closePath();
  ctx.fill();
  
  // Car details - headlights
  ctx.fillStyle = '#f1c40f';
  ctx.beginPath();
  ctx.arc(60, 130, 10, 0, Math.PI * 2);
  ctx.fill();
  
  // Car details - taillights
  ctx.fillStyle = '#e74c3c';
  ctx.beginPath();
  ctx.arc(240, 130, 10, 0, Math.PI * 2);
  ctx.fill();
  
  // Car wheels
  ctx.fillStyle = '#2c3e50';
  ctx.beginPath();
  ctx.arc(80, 150, 20, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(220, 150, 20, 0, Math.PI * 2);
  ctx.fill();
  
  // Wheel details
  ctx.fillStyle = '#95a5a6';
  ctx.beginPath();
  ctx.arc(80, 150, 10, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(220, 150, 10, 0, Math.PI * 2);
  ctx.fill();
  
  saveCanvasAsPNG(canvas, 'car.png');
}

// Generate airport background
function createAirportBackground() {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext('2d');
  
  // Sky gradient
  const skyGradient = ctx.createLinearGradient(0, 0, 0, 400);
  skyGradient.addColorStop(0, '#87ceeb');
  skyGradient.addColorStop(1, '#e0f7ff');
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, 800, 400);
  
  // Ground
  ctx.fillStyle = '#8fc69f';
  ctx.fillRect(0, 400, 800, 200);
  
  // Airport runway
  ctx.fillStyle = '#555555';
  ctx.fillRect(100, 350, 600, 100);
  
  // Runway markings
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 10; i++) {
    ctx.fillRect(150 + i * 60, 395, 30, 10);
  }
  
  // Airport terminal building
  ctx.fillStyle = '#dddddd';
  ctx.fillRect(500, 250, 250, 150);
  
  // Terminal windows
  ctx.fillStyle = '#a3d9ff';
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.fillRect(520 + i * 30, 270 + j * 40, 20, 30);
    }
  }
  
  // Control tower
  ctx.fillStyle = '#bbbbbb';
  ctx.fillRect(650, 150, 50, 100);
  
  // Control tower top
  ctx.fillStyle = '#dddddd';
  ctx.beginPath();
  ctx.arc(675, 150, 30, 0, Math.PI * 2);
  ctx.fill();
  
  // Clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  drawCloud(ctx, 100, 100, 80, 40);
  drawCloud(ctx, 400, 70, 100, 50);
  drawCloud(ctx, 700, 120, 90, 45);
  
  // Airplane
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(200, 150);
  ctx.lineTo(300, 150);
  ctx.lineTo(320, 170);
  ctx.lineTo(180, 170);
  ctx.closePath();
  ctx.fill();
  
  // Airplane wings
  ctx.beginPath();
  ctx.moveTo(220, 160);
  ctx.lineTo(180, 200);
  ctx.lineTo(200, 200);
  ctx.lineTo(260, 160);
  ctx.closePath();
  ctx.fill();
  
  // Airplane tail
  ctx.beginPath();
  ctx.moveTo(300, 150);
  ctx.lineTo(330, 120);
  ctx.lineTo(320, 170);
  ctx.closePath();
  ctx.fill();
  
  // Airplane windows
  ctx.fillStyle = '#a3d9ff';
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(210 + i * 20, 160, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  
  saveCanvasAsPNG(canvas, 'airport-bg.png');
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
  createCar();
  createAirportBackground();
  
  console.log('All assets generated successfully!');
}

// Run the asset generation
generateAllAssets(); 