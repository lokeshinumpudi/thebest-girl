import Phaser from 'phaser';

export default class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }

  create() {
    // Add background with gradient
    const background = this.add.graphics();
    background.fillGradientStyle(0xfce2e6, 0xfce2e6, 0xe6f3ff, 0xe6f3ff, 1);
    background.fillRect(0, 0, 800, 600);
    
    // Add heart particles
    this.createHeartParticles();
    
    // Add final message
    const message = `Dear ${window.gameData.playerName},\n\nI'm so sorry for everything. I love you more than words can say.\n\nThank you for giving me a chance to make things right.\n\nWith all my love,`;
    
    const messageText = this.add.text(400, 250, message, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#333333',
      align: 'center',
      wordWrap: { width: 600 }
    }).setOrigin(0.5);
    
    // Add signature
    const signature = this.add.text(400, 400, 'Your Love', {
      fontFamily: 'cursive',
      fontSize: '32px',
      color: '#ff6b81',
      fontStyle: 'italic'
    }).setOrigin(0.5);
    
    // Add decorative hearts
    const heart1 = this.add.image(300, 450, 'heart').setDisplaySize(50, 50);
    const heart2 = this.add.image(500, 450, 'heart').setDisplaySize(50, 50);
    
    // Add restart button
    const restartButton = this.add.image(400, 520, 'button').setDisplaySize(200, 60);
    const restartText = this.add.text(400, 520, 'Restart', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    // Make button interactive
    restartButton.setInteractive({ useHandCursor: true });
    
    // Add hover effect
    restartButton.on('pointerover', () => {
      restartButton.setTint(0xe05a70);
      restartText.setScale(1.1);
    });
    
    restartButton.on('pointerout', () => {
      restartButton.clearTint();
      restartText.setScale(1);
    });
    
    // Add click effect
    restartButton.on('pointerdown', () => {
      restartButton.setTint(0xd04060);
      restartText.setScale(0.9);
    });
    
    // Restart game on button release
    restartButton.on('pointerup', () => {
      // Play click sound
      this.sound.play('click');
      
      // Reset game data
      window.gameData.dialogueChoices = [];
      
      // Transition to title scene
      this.cameras.main.fadeOut(500, 255, 255, 255);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('TitleScene');
      });
    });
    
    // Add animations
    this.tweens.add({
      targets: [heart1, heart2],
      y: '-=20',
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    this.tweens.add({
      targets: signature,
      scale: 1.1,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Fade in
    this.cameras.main.fadeIn(1000);
  }
  
  createHeartParticles() {
    // Create heart particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 20;
    canvas.height = 20;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#ff6b81';
    ctx.beginPath();
    ctx.arc(10, 10, 5, 0, Math.PI * 2);
    ctx.fill();
    
    const dataURL = canvas.toDataURL();
    this.textures.addBase64('heart-particle', dataURL);
    
    // Create particle emitter
    const particles = this.add.particles('heart-particle');
    
    particles.createEmitter({
      x: { min: 0, max: 800 },
      y: -10,
      speedY: { min: 20, max: 50 },
      speedX: { min: -10, max: 10 },
      scale: { start: 0.5, end: 0 },
      lifespan: 10000,
      frequency: 500,
      blendMode: 'ADD'
    });
  }
} 