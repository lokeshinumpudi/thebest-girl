import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Load minimal assets needed for the loading screen
    this.load.svg('heart', '/heart.svg');
  }

  create() {
    // Set up any game configurations
    this.scale.refresh();
    
    // Create a loading screen in HTML (outside of Phaser)
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    
    const loadingHeart = document.createElement('div');
    loadingHeart.className = 'loading-heart';
    loadingHeart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
      <path fill="#ff6b81" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>`;
    
    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'Loading...';
    
    loadingScreen.appendChild(loadingHeart);
    loadingScreen.appendChild(loadingText);
    document.body.appendChild(loadingScreen);
    
    // Store reference to loading screen
    this.loadingScreen = loadingScreen;
    
    // Proceed to the preload scene
    this.scene.start('PreloadScene');
  }
} 