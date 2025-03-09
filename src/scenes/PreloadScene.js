import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Create loading progress bar
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);
    
    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
      font: '20px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5, 0.5);
    
    // Loading progress events
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xff6b81, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });
    
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });
    
    // Get the base path for assets (works in both dev and prod)
    const basePath = './assets';
    
    // Load backgrounds
    this.load.image('garden-bg', `${basePath}/images/garden-bg.png`);
    this.load.image('title-bg', `${basePath}/images/title-bg.png`);
    this.load.image('airport-bg', `${basePath}/images/airport-bg.png`);
    
    // Load character sprites
    this.load.image('girl-sad', `${basePath}/images/girl-sad.png`);
    this.load.image('girl-happy', `${basePath}/images/girl-happy.png`);
    this.load.image('boy', `${basePath}/images/boy.png`);
    
    // Load interactive elements
    this.load.image('bench', `${basePath}/images/bench.png`);
    this.load.image('flower', `${basePath}/images/flower.png`);
    this.load.image('fountain', `${basePath}/images/fountain.png`);
    this.load.image('vase', `${basePath}/images/vase.png`);
    this.load.image('car', `${basePath}/images/car.png`);
    
    // Load UI elements
    this.load.image('dialogue-box', `${basePath}/images/dialogue-box.png`);
    this.load.image('button', `${basePath}/images/button.png`);
    
    // Load audio (WAV instead of MP3)
    this.load.audio('bg-music', `${basePath}/audio/bg-music.wav`);
    this.load.audio('click', `${basePath}/audio/click.wav`);
    this.load.audio('surprise', `${basePath}/audio/surprise.wav`);
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
} 