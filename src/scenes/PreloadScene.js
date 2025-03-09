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
    
    // Load background
    this.load.image('garden-bg', '/assets/images/garden-bg.png');
    this.load.image('title-bg', '/assets/images/title-bg.png');
    
    // Load character sprites
    this.load.image('girl-sad', '/assets/images/girl-sad.png');
    this.load.image('girl-happy', '/assets/images/girl-happy.png');
    this.load.image('boy', '/assets/images/boy.png');
    
    // Load interactive elements
    this.load.image('bench', '/assets/images/bench.png');
    this.load.image('flower', '/assets/images/flower.png');
    this.load.image('fountain', '/assets/images/fountain.png');
    this.load.image('vase', '/assets/images/vase.png');
    
    // Load UI elements
    this.load.image('dialogue-box', '/assets/images/dialogue-box.png');
    this.load.image('button', '/assets/images/button.png');
    
    // Load audio
    this.load.audio('bg-music', '/assets/audio/bg-music.mp3');
    this.load.audio('click', '/assets/audio/click.mp3');
    this.load.audio('surprise', '/assets/audio/surprise.mp3');
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