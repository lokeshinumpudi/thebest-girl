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
    
    // Create heart shapes
    const heart1 = this.add.graphics();
    heart1.fillStyle(0xff6b81, 0.7);
    this.drawHeart(heart1, 300, 450, 25);
    
    const heart2 = this.add.graphics();
    heart2.fillStyle(0xff6b81, 0.7);
    this.drawHeart(heart2, 500, 450, 25);
    
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
      // Try to play click sound, but don't fail if it doesn't work
      try {
        this.sound.play('click');
      } catch (error) {
        console.warn('Could not play click sound:', error);
      }
      
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
  
  // Helper method to draw a heart shape
  drawHeart(graphics, x, y, size) {
    graphics.beginPath();
    graphics.arc(x - size/2, y - size/2, size, 0, Math.PI, true);
    graphics.arc(x + size/2, y - size/2, size, 0, Math.PI, true);
    graphics.lineTo(x, y + size);
    graphics.closePath();
    graphics.fillPath();
  }
  
  createHeartParticles() {
    // Create a simple circle particle
    const particles = this.add.particles(0, 0, 'button', {
      frame: 0,
      color: [ 0xff6b81 ],
      colorEase: 'quad.out',
      lifespan: 2000,
      scale: { start: 0.1, end: 0 },
      speed: { min: 50, max: 100 },
      advance: 2000,
      blendMode: 'ADD',
      frequency: 500,
      emitZone: {
        type: 'random',
        source: new Phaser.Geom.Rectangle(0, 0, 800, 1),
        quantity: 10
      }
    });
    
    // Position the emitter at the top of the screen
    particles.setPosition(400, 0);
  }
} 