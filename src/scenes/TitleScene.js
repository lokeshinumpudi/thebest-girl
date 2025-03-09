import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    // Add background with soft gradient
    const background = this.add.graphics();
    background.fillGradientStyle(0xfce2e6, 0xfce2e6, 0xe6f3ff, 0xe6f3ff, 1);
    background.fillRect(0, 0, 800, 600);
    
    // Add decorative elements
    this.addDecorativeElements();
    
    // Add title text with soft shadow
    const titleText = this.add.text(400, 150, 'A Heartfelt Apology', {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#ff6b81',
      stroke: '#ffffff',
      strokeThickness: 2,
      shadow: { offsetX: 2, offsetY: 2, color: 'rgba(0,0,0,0.3)', blur: 5, stroke: true, fill: true }
    }).setOrigin(0.5);
    
    // Add subtitle
    const subtitleText = this.add.text(400, 220, 'For Kru', {
      fontFamily: 'Arial',
      fontSize: '32px',
      color: '#ff6b81',
      stroke: '#ffffff',
      strokeThickness: 1
    }).setOrigin(0.5);
    
    // Create heart shape
    const heart = this.add.graphics();
    heart.fillStyle(0xff6b81, 1);
    
    // Draw a simple heart shape
    heart.beginPath();
    heart.arc(380, 280, 30, 0, Math.PI, true);
    heart.arc(420, 280, 30, 0, Math.PI, true);
    heart.lineTo(400, 340);
    heart.closePath();
    heart.fillPath();
    
    // Add start button with soft style
    const startButton = this.add.graphics();
    startButton.fillStyle(0xff6b81, 1);
    startButton.fillRoundedRect(300, 450, 200, 60, 20);
    
    // Add highlight to button
    const buttonHighlight = this.add.graphics();
    buttonHighlight.fillStyle(0xffffff, 0.3);
    buttonHighlight.fillRoundedRect(300, 450, 200, 15, { tl: 20, tr: 20, bl: 0, br: 0 });
    
    const startText = this.add.text(400, 480, 'Start', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    // Make button interactive
    const buttonZone = this.add.zone(400, 480, 200, 60).setOrigin(0.5);
    buttonZone.setInteractive({ useHandCursor: true });
    
    // Add hover effect
    buttonZone.on('pointerover', () => {
      startButton.clear();
      startButton.fillStyle(0xe05a70, 1);
      startButton.fillRoundedRect(300, 450, 200, 60, 20);
      startText.setScale(1.1);
    });
    
    buttonZone.on('pointerout', () => {
      startButton.clear();
      startButton.fillStyle(0xff6b81, 1);
      startButton.fillRoundedRect(300, 450, 200, 60, 20);
      startText.setScale(1);
    });
    
    // Add click effect
    buttonZone.on('pointerdown', () => {
      startButton.clear();
      startButton.fillStyle(0xd04060, 1);
      startButton.fillRoundedRect(300, 450, 200, 60, 20);
      startText.setScale(0.9);
    });
    
    // Start game on button release
    buttonZone.on('pointerup', () => {
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
  
  addDecorativeElements() {
    // Add some floating hearts
    for (let i = 0; i < 15; i++) {
      const x = Phaser.Math.Between(50, 750);
      const y = Phaser.Math.Between(50, 550);
      const size = Phaser.Math.Between(5, 15);
      const alpha = Phaser.Math.FloatBetween(0.2, 0.5);
      
      const heart = this.add.graphics();
      heart.fillStyle(0xff6b81, alpha);
      
      // Draw small heart
      heart.beginPath();
      heart.arc(x - size/4, y - size/4, size/2, 0, Math.PI, true);
      heart.arc(x + size/4, y - size/4, size/2, 0, Math.PI, true);
      heart.lineTo(x, y + size/2);
      heart.closePath();
      heart.fillPath();
      
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
  }
} 