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
    this.currentBackground = 'garden';
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
    // Create container for all scene elements
    this.sceneContainer = this.add.container(0, 0);
    
    // Create garden scene
    this.createGardenScene();
    
    // Create airport scene (initially hidden)
    this.createAirportScene();
    
    // Initialize dialogue box (always visible)
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
  
  createGardenScene() {
    // Create container for garden scene
    this.gardenContainer = this.add.container(0, 0);
    this.sceneContainer.add(this.gardenContainer);
    
    // Add background
    const gardenBg = this.add.image(400, 300, 'garden-bg').setDisplaySize(800, 600);
    this.gardenContainer.add(gardenBg);
    
    // Add bench
    this.elements.bench = this.add.image(400, 450, 'bench').setDisplaySize(250, 100);
    this.gardenContainer.add(this.elements.bench);
    
    // Add girl character (initially sad)
    this.characters.girl = this.add.image(350, 380, 'girl-sad').setDisplaySize(120, 240);
    this.gardenContainer.add(this.characters.girl);
    
    // Add boy character (initially off-screen)
    this.characters.boy = this.add.image(-100, 380, 'boy').setDisplaySize(120, 240);
    this.gardenContainer.add(this.characters.boy);
    
    // Create hidden surprises
    this.surprises.flower = this.add.image(400, 350, 'flower').setDisplaySize(60, 60).setVisible(false);
    this.gardenContainer.add(this.surprises.flower);
    
    this.surprises.fountain = this.add.image(600, 300, 'fountain').setDisplaySize(180, 180).setAlpha(0);
    this.gardenContainer.add(this.surprises.fountain);
    
    // Create vase for optional task
    this.elements.vase = this.add.image(600, 450, 'vase').setDisplaySize(80, 100).setVisible(false);
    this.gardenContainer.add(this.elements.vase);
    
    // Create draggable flowers for optional task
    this.elements.draggableFlowers = [];
  }
  
  createAirportScene() {
    // Create container for airport scene
    this.airportContainer = this.add.container(0, 0);
    this.sceneContainer.add(this.airportContainer);
    
    // Add background
    const airportBg = this.add.image(400, 300, 'airport-bg').setDisplaySize(800, 600);
    this.airportContainer.add(airportBg);
    
    // Add characters
    this.characters.airportGirl = this.add.image(350, 400, 'girl-happy').setDisplaySize(120, 240);
    this.airportContainer.add(this.characters.airportGirl);
    
    this.characters.airportBoy = this.add.image(450, 400, 'boy').setDisplaySize(120, 240);
    this.airportContainer.add(this.characters.airportBoy);
    
    // Add car
    this.elements.car = this.add.image(200, 450, 'car').setDisplaySize(200, 120);
    this.airportContainer.add(this.elements.car);
    
    // Hide airport scene initially
    this.airportContainer.setVisible(false);
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
        
      case 'airport_scene':
        // Transition to airport scene
        this.cameras.main.fadeOut(500);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          // Switch scenes
          this.gardenContainer.setVisible(false);
          this.airportContainer.setVisible(true);
          this.currentBackground = 'airport';
          
          // Fade back in
          this.cameras.main.fadeIn(500);
        });
        break;
        
      case 'car_ride':
        // Animate car ride
        this.tweens.add({
          targets: this.elements.car,
          x: 600,
          duration: 3000,
          ease: 'Power1'
        });
        
        // Move characters with car
        this.tweens.add({
          targets: [this.characters.airportGirl, this.characters.airportBoy],
          x: '+=400',
          duration: 3000,
          ease: 'Power1'
        });
        break;
        
      case 'return_garden':
        // Transition back to garden scene
        this.cameras.main.fadeOut(500);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          // Switch scenes
          this.airportContainer.setVisible(false);
          this.gardenContainer.setVisible(true);
          this.currentBackground = 'garden';
          
          // Reset car and characters for next time
          this.elements.car.x = 200;
          this.characters.airportGirl.x = 350;
          this.characters.airportBoy.x = 450;
          
          // Fade back in
          this.cameras.main.fadeIn(500);
        });
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
    // Clear any existing draggable flowers
    if (this.elements.draggableFlowers.length > 0) {
      this.elements.draggableFlowers.forEach(flower => {
        flower.destroy();
      });
      this.elements.draggableFlowers = [];
    }
    
    // Create 3 draggable flowers
    const colors = ['#ff69b4', '#ff1493', '#db7093'];
    
    for (let i = 0; i < 3; i++) {
      // Create flower with custom color
      const canvas = document.createElement('canvas');
      canvas.width = 50;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');
      
      // Draw flower petals
      ctx.fillStyle = colors[i];
      for (let j = 0; j < 8; j++) {
        const angle = (j * Math.PI) / 4;
        const x = 25 + Math.cos(angle) * 15;
        const y = 25 + Math.sin(angle) * 15;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw flower center
      ctx.fillStyle = '#ffff00';
      ctx.beginPath();
      ctx.arc(25, 25, 8, 0, Math.PI * 2);
      ctx.fill();
      
      const dataURL = canvas.toDataURL();
      const key = `flower-drag-${i}`;
      this.textures.addBase64(key, dataURL);
      
      // Create draggable flower sprite
      const flower = this.add.image(200 + i * 80, 450, key).setDisplaySize(50, 50);
      flower.setInteractive({ draggable: true, useHandCursor: true });
      
      this.input.setDraggable(flower);
      
      // Add to array and container
      this.elements.draggableFlowers.push(flower);
      this.gardenContainer.add(flower);
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
      
      if (distance < 80) { // Increased distance for easier placement
        // Place in vase
        gameObject.input.enabled = false;
        
        // Position in vase with slight offset for each flower
        const index = this.elements.draggableFlowers.indexOf(gameObject);
        gameObject.x = this.elements.vase.x + (index - 1) * 15;
        gameObject.y = this.elements.vase.y - 30;
        
        // Add a small animation
        this.tweens.add({
          targets: gameObject,
          y: this.elements.vase.y - 40,
          duration: 300,
          yoyo: true,
          ease: 'Sine.easeOut'
        });
        
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