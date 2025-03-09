import Phaser from 'phaser';
import { DialogueManager } from '../utils/DialogueManager';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.dialogueManager = null;
    this.currentStep = 'start';
    this.characters = {};
    this.elements = {};
    this.surprises = {};
  }

  create() {
    // Initialize the scene
    this.initializeScene();
    
    // Create dialogue manager
    this.dialogueManager = new DialogueManager(this);
    
    // Start the first dialogue
    this.startDialogue();
    
    // Fade in
    this.cameras.main.fadeIn(1000);
  }
  
  initializeScene() {
    // Add background
    this.add.image(400, 300, 'garden-bg').setDisplaySize(800, 600);
    
    // Add bench
    this.elements.bench = this.add.image(400, 450, 'bench').setDisplaySize(250, 100);
    
    // Add girl character (initially sad)
    this.characters.girl = this.add.image(350, 380, 'girl-sad').setDisplaySize(120, 240);
    
    // Add boy character (initially off-screen)
    this.characters.boy = this.add.image(-100, 380, 'boy').setDisplaySize(120, 240);
    
    // Create hidden surprises
    this.surprises.flower = this.add.image(400, 350, 'flower').setDisplaySize(60, 60).setVisible(false);
    this.surprises.fountain = this.add.image(600, 300, 'fountain').setDisplaySize(180, 180).setAlpha(0);
    
    // Create vase for optional task
    this.elements.vase = this.add.image(600, 450, 'vase').setDisplaySize(80, 100).setVisible(false);
    
    // Create draggable flowers for optional task
    this.elements.draggableFlowers = [];
    
    // Initialize dialogue box
    this.elements.dialogueBox = this.add.image(400, 520, 'dialogue-box').setDisplaySize(700, 150);
    this.elements.dialogueText = this.add.text(400, 500, '', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#333333',
      wordWrap: { width: 650 }
    }).setOrigin(0.5, 0.5);
    
    // Initialize choice buttons container
    this.elements.choicesContainer = this.add.container(400, 550);
  }
  
  startDialogue() {
    // Start with the first dialogue step
    this.dialogueManager.showDialogue(this.currentStep);
  }
  
  // Method to handle dialogue choices
  handleChoice(choice) {
    // Try to play click sound, but don't fail if it doesn't work
    try {
      this.sound.play('click');
    } catch (error) {
      console.warn('Could not play click sound:', error);
    }
    
    // Store the choice
    window.gameData.dialogueChoices.push({
      step: this.currentStep,
      choice: choice.text
    });
    
    // Handle special events based on the dialogue step
    this.handleSpecialEvents(choice.next);
    
    // Move to the next dialogue
    this.currentStep = choice.next;
    this.dialogueManager.showDialogue(this.currentStep);
  }
  
  handleSpecialEvents(nextStep) {
    switch(nextStep) {
      case 'apology':
        // Boy walks in
        this.tweens.add({
          targets: this.characters.boy,
          x: 450,
          duration: 2000,
          ease: 'Power2'
        });
        break;
        
      case 'flower':
        // Show flower surprise
        this.surprises.flower.setVisible(true);
        this.surprises.flower.setScale(0);
        
        // Try to play surprise sound, but don't fail if it doesn't work
        try {
          this.sound.play('surprise');
        } catch (error) {
          console.warn('Could not play surprise sound:', error);
        }
        
        this.tweens.add({
          targets: this.surprises.flower,
          scale: 1,
          duration: 1000,
          ease: 'Back.out'
        });
        
        // Girl becomes happy
        this.characters.girl.setTexture('girl-happy');
        break;
        
      case 'fountain':
        // Reveal fountain
        this.tweens.add({
          targets: this.surprises.fountain,
          alpha: 1,
          duration: 2000,
          ease: 'Linear'
        });
        break;
        
      case 'task':
        // Show vase and create draggable flowers
        this.elements.vase.setVisible(true);
        this.createDraggableFlowers();
        break;
        
      case 'end':
        // Transition to end scene
        this.cameras.main.fadeOut(1000);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.start('EndScene');
        });
        break;
    }
  }
  
  createDraggableFlowers() {
    // Create 3 draggable flowers
    const colors = ['#ff69b4', '#ff1493', '#db7093'];
    
    for (let i = 0; i < 3; i++) {
      // Create flower with custom color
      const canvas = document.createElement('canvas');
      canvas.width = 50;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = colors[i];
      ctx.beginPath();
      ctx.arc(25, 25, 20, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#ffff00';
      ctx.beginPath();
      ctx.arc(25, 25, 10, 0, Math.PI * 2);
      ctx.fill();
      
      const dataURL = canvas.toDataURL();
      const key = `flower-drag-${i}`;
      this.textures.addBase64(key, dataURL);
      
      // Create draggable flower sprite
      const flower = this.add.image(200 + i * 80, 450, key).setDisplaySize(50, 50);
      flower.setInteractive({ draggable: true });
      
      this.input.setDraggable(flower);
      
      // Add to array
      this.elements.draggableFlowers.push(flower);
    }
    
    // Set up drag events
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    
    this.input.on('dragend', (pointer, gameObject) => {
      // Check if flower is placed in vase
      const distance = Phaser.Math.Distance.Between(
        gameObject.x, gameObject.y,
        this.elements.vase.x, this.elements.vase.y
      );
      
      if (distance < 50) {
        // Place in vase
        gameObject.input.enabled = false;
        
        // Position in vase with slight offset for each flower
        const index = this.elements.draggableFlowers.indexOf(gameObject);
        gameObject.x = this.elements.vase.x + (index - 1) * 15;
        gameObject.y = this.elements.vase.y - 30;
        
        // Check if all flowers are in vase
        const allPlaced = this.elements.draggableFlowers.every(flower => !flower.input.enabled);
        
        if (allPlaced) {
          // All flowers placed, move to next dialogue
          this.currentStep = 'task_complete';
          this.dialogueManager.showDialogue(this.currentStep);
        }
      }
    });
  }
  
  update() {
    // Any per-frame updates can go here
  }
} 