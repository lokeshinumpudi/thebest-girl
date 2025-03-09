import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Create placeholder assets using Phaser graphics
    this.createPlaceholderAssets();
    
    // Load background
    this.load.image('garden-bg', 'src/assets/images/garden-bg.png');
    
    // Load character sprites
    this.load.image('girl', 'src/assets/images/girl.png');
    this.load.image('boy', 'src/assets/images/boy.png');
    this.load.image('girl-happy', 'src/assets/images/girl-happy.png');
    this.load.image('girl-sad', 'src/assets/images/girl-sad.png');
    
    // Load interactive elements
    this.load.image('bench', 'src/assets/images/bench.png');
    this.load.image('flower', 'src/assets/images/flower.png');
    this.load.image('fountain', 'src/assets/images/fountain.png');
    this.load.image('vase', 'src/assets/images/vase.png');
    
    // Load UI elements
    this.load.image('dialogue-box', 'src/assets/images/dialogue-box.png');
    this.load.image('button', 'src/assets/images/button.png');
    this.load.image('title-bg', 'src/assets/images/title-bg.png');
    
    // Load audio
    this.load.audio('bg-music', 'src/assets/audio/bg-music.mp3');
    this.load.audio('click', 'src/assets/audio/click.mp3');
    this.load.audio('surprise', 'src/assets/audio/surprise.mp3');
  }

  create() {
    // Remove the loading screen
    const bootScene = this.scene.get('BootScene');
    if (bootScene.loadingScreen) {
      bootScene.loadingScreen.remove();
    }
    
    // Start with the title scene
    this.scene.start('TitleScene');
  }
  
  createPlaceholderAssets() {
    // Create placeholder images for development
    this.createPlaceholderImage('garden-bg', 800, 600, '#e6f3ff', 'Garden');
    this.createPlaceholderImage('girl', 100, 200, '#ffc0cb', 'Girl');
    this.createPlaceholderImage('boy', 100, 200, '#add8e6', 'Boy');
    this.createPlaceholderImage('girl-happy', 100, 200, '#ffc0cb', 'Girl Happy');
    this.createPlaceholderImage('girl-sad', 100, 200, '#ffc0cb', 'Girl Sad');
    this.createPlaceholderImage('bench', 200, 80, '#8b4513', 'Bench');
    this.createPlaceholderImage('flower', 50, 50, '#ff69b4', 'Flower');
    this.createPlaceholderImage('fountain', 150, 150, '#87cefa', 'Fountain');
    this.createPlaceholderImage('vase', 80, 100, '#dda0dd', 'Vase');
    this.createPlaceholderImage('dialogue-box', 600, 150, '#ffffff', 'Dialogue');
    this.createPlaceholderImage('button', 150, 50, '#ff6b81', 'Button');
    this.createPlaceholderImage('title-bg', 800, 600, '#fce2e6', 'Title');
    
    // Create placeholder audio
    this.createPlaceholderAudio('bg-music');
    this.createPlaceholderAudio('click');
    this.createPlaceholderAudio('surprise');
  }
  
  createPlaceholderImage(key, width, height, color, text) {
    // Create a canvas for the placeholder
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Fill with color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    
    // Add border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, width - 4, height - 4);
    
    // Add text
    ctx.fillStyle = '#000000';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
    
    // Convert to data URL and add to cache
    const dataURL = canvas.toDataURL();
    this.textures.addBase64(key, dataURL);
  }
  
  createPlaceholderAudio(key) {
    // Create a silent audio buffer
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 44100, 44100);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    
    // Convert to blob URL
    const arrayBuffer = buffer.getChannelData(0);
    const blob = new Blob([arrayBuffer], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    
    // Add to cache
    this.cache.audio.add(key, url);
  }
} 