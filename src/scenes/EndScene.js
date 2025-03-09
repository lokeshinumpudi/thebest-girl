import Phaser from 'phaser';

export default class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }

  create() {
    // Add background with soft gradient
    const background = this.add.graphics();
    background.fillGradientStyle(0xfce2e6, 0xfce2e6, 0xe6f3ff, 0xe6f3ff, 1);
    background.fillRect(0, 0, 800, 600);
    
    // Add decorative elements
    this.addDecorativeElements();
    
    // Add heart particles
    this.createHeartParticles();
    
    // Add final message with soft styling
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
    const heart1 = this.add.graphics();
    heart1.fillStyle(0xff6b81, 0.7);
    this.drawHeart(heart1, 300, 450, 25);
    
    const heart2 = this.add.graphics();
    heart2.fillStyle(0xff6b81, 0.7);
    this.drawHeart(heart2, 500, 450, 25);
    
    // Add restart button with soft style
    const restartButton = this.add.graphics();
    restartButton.fillStyle(0xff6b81, 1);
    restartButton.fillRoundedRect(300, 520, 200, 60, 20);
    
    // Add highlight to button
    const buttonHighlight = this.add.graphics();
    buttonHighlight.fillStyle(0xffffff, 0.3);
    buttonHighlight.fillRoundedRect(300, 520, 200, 15, { tl: 20, tr: 20, bl: 0, br: 0 });
    
    const restartText = this.add.text(400, 550, 'Restart', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    // Make button interactive
    const buttonZone = this.add.zone(400, 550, 200, 60).setOrigin(0.5);
    buttonZone.setInteractive({ useHandCursor: true });
    
    // Add hover effect
    buttonZone.on('pointerover', () => {
      restartButton.clear();
      restartButton.fillStyle(0xe05a70, 1);
      restartButton.fillRoundedRect(300, 520, 200, 60, 20);
      restartText.setScale(1.1);
    });
    
    buttonZone.on('pointerout', () => {
      restartButton.clear();
      restartButton.fillStyle(0xff6b81, 1);
      restartButton.fillRoundedRect(300, 520, 200, 60, 20);
      restartText.setScale(1);
    });
    
    // Add click effect
    buttonZone.on('pointerdown', () => {
      restartButton.clear();
      restartButton.fillStyle(0xd04060, 1);
      restartButton.fillRoundedRect(300, 520, 200, 60, 20);
      restartText.setScale(0.9);
    });
    
    // Restart game on button release
    buttonZone.on('pointerup', () => {
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
    // Create a particle emitter for hearts
    const particles = this.add.particles(0, 0, 'button', {
      frame: 0,
      color: [ 0xff6b81, 0xffb8c6, 0xffd1dc ],
      colorEase: 'quad.out',
      lifespan: 3000,
      scale: { start: 0.1, end: 0 },
      speed: { min: 30, max: 70 },
      advance: 2000,
      blendMode: 'ADD',
      frequency: 500,
      alpha: { start: 0.6, end: 0 },
      emitZone: {
        type: 'random',
        source: new Phaser.Geom.Rectangle(0, 0, 800, 1),
        quantity: 10
      }
    });
    
    // Position the emitter at the top of the screen
    particles.setPosition(400, 0);
  }
  
  addDecorativeElements() {
    // Add some soft circles in the background
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(0, 800);
      const y = Phaser.Math.Between(0, 600);
      const radius = Phaser.Math.Between(30, 100);
      const alpha = Phaser.Math.FloatBetween(0.05, 0.1);
      
      const circle = this.add.graphics();
      const colors = [0xffd1dc, 0xffb8c6, 0xc5a3ff, 0xa3d9ff];
      const colorIndex = Phaser.Math.Between(0, colors.length - 1);
      
      circle.fillStyle(colors[colorIndex], alpha);
      circle.fillCircle(x, y, radius);
    }
    
    // Add some floating hearts
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(50, 750);
      const y = Phaser.Math.Between(50, 550);
      const size = Phaser.Math.Between(5, 15);
      const alpha = Phaser.Math.FloatBetween(0.2, 0.5);
      
      const heart = this.add.graphics();
      heart.fillStyle(0xff6b81, alpha);
      
      // Draw small heart
      this.drawHeart(heart, x, y, size);
      
      // Add floating animation
      this.tweens.add({
        targets: heart,
        y: y - Phaser.Math.Between(20, 50),
        duration: Phaser.Math.Between(2000, 5000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: Phaser.Math.Between(0, 1000)
      });
    }
  }
} 