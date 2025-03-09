import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    // Add background
    this.add.image(400, 300, 'title-bg').setDisplaySize(800, 600);
    
    // Add title text
    const titleText = this.add.text(400, 150, 'A Heartfelt Apology', {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#ff6b81',
      stroke: '#ffffff',
      strokeThickness: 6,
      shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 5, stroke: true, fill: true }
    }).setOrigin(0.5);
    
    // Add subtitle
    const subtitleText = this.add.text(400, 220, 'For Kru', {
      fontFamily: 'Arial',
      fontSize: '32px',
      color: '#ff6b81',
      stroke: '#ffffff',
      strokeThickness: 4
    }).setOrigin(0.5);
    
    // Create a simple heart shape using graphics
    const heart = this.add.graphics();
    heart.fillStyle(0xff6b81, 1);
    
    // Draw a simple heart shape
    heart.beginPath();
    heart.arc(380, 280, 30, 0, Math.PI, true);
    heart.arc(420, 280, 30, 0, Math.PI, true);
    heart.lineTo(400, 340);
    heart.closePath();
    heart.fillPath();
    
    // Add start button
    const startButton = this.add.image(400, 450, 'button').setDisplaySize(200, 60);
    const startText = this.add.text(400, 450, 'Start', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    // Make button interactive
    startButton.setInteractive({ useHandCursor: true });
    
    // Add hover effect
    startButton.on('pointerover', () => {
      startButton.setTint(0xe05a70);
      startText.setScale(1.1);
    });
    
    startButton.on('pointerout', () => {
      startButton.clearTint();
      startText.setScale(1);
    });
    
    // Add click effect
    startButton.on('pointerdown', () => {
      startButton.setTint(0xd04060);
      startText.setScale(0.9);
    });
    
    // Start game on button release
    startButton.on('pointerup', () => {
      // Try to play click sound, but don't fail if it doesn't work
      try {
        this.sound.play('click');
      } catch (error) {
        console.warn('Could not play click sound:', error);
      }
      
      // Transition to game scene
      this.cameras.main.fadeOut(500, 255, 255, 255);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('GameScene');
      });
    });
    
    // Add subtle animations
    this.tweens.add({
      targets: heart,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    this.tweens.add({
      targets: titleText,
      y: 140,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Fade in
    this.cameras.main.fadeIn(1000, 255, 255, 255);
    
    // Try to start background music, but don't fail if it doesn't work
    try {
      if (!this.sound.get('bg-music')) {
        const music = this.sound.add('bg-music', {
          volume: 0.5,
          loop: true
        });
        music.play();
      }
    } catch (error) {
      console.warn('Could not play background music:', error);
    }
  }
} 