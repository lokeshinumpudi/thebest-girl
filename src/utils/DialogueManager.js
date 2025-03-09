export class DialogueManager {
  constructor(scene) {
    this.scene = scene;
    this.dialogueData = this.createDialogueData();
    this.currentChoiceButtons = [];
  }
  
  createDialogueData() {
    // Replace placeholders with actual values
    const playerName = window.gameData.playerName;
    const favoriteFlower = window.gameData.favoriteFlower;
    const sharedMemory = window.gameData.sharedMemory;
    
    // Return dialogue data with placeholders replaced
    return {
      start: {
        text: `Hey, ${playerName}, mind if I join you?`,
        choices: [
          { text: "Sure, have a seat", next: "apology" },
          { text: "I guess", next: "concern" }
        ]
      },
      concern: {
        text: "I can tell you're upset. I wanted to talk to you about that.",
        choices: [
          { text: "I'm listening", next: "apology" }
        ]
      },
      apology: {
        text: `I'm really sorry for hurting you, ${playerName}.`,
        choices: [
          { text: "It's okay", next: "flower" },
          { text: "Why did you do that?", next: "explain" }
        ]
      },
      explain: {
        text: "I didn't mean to. I messed up, and I regret it so much.",
        choices: [
          { text: "I forgive you", next: "flower" }
        ]
      },
      flower: {
        text: `I brought you something—a ${favoriteFlower}.`,
        choices: [
          { text: "Thank you!", next: "fountain" },
          { text: "It's beautiful", next: "fountain" }
        ]
      },
      fountain: {
        text: `Remember ${sharedMemory}? I want that again—with you.`,
        choices: [
          { text: "I'd like that too", next: "task" },
          { text: "Tell me more", next: "memory" }
        ]
      },
      memory: {
        text: "That was one of the happiest moments of my life. Being with you makes everything better.",
        choices: [
          { text: "You make me happy too", next: "task" }
        ]
      },
      task: {
        text: "I thought maybe we could do something together? How about arranging these flowers in the vase?",
        choices: [
          { text: "I'd love to", next: "task_wait" }
        ]
      },
      task_wait: {
        text: "Great! Just drag the flowers into the vase. I'll help you.",
        choices: []
      },
      task_complete: {
        text: "They look beautiful together, just like us.",
        choices: [
          { text: "You're sweet", next: "final" }
        ]
      },
      final: {
        text: `${playerName}, I promise to be better. To listen more, to understand you, and to always be there for you.`,
        choices: [
          { text: "I believe you", next: "end" },
          { text: "Let's try again", next: "end" }
        ]
      }
    };
  }
  
  showDialogue(dialogueId) {
    // Get dialogue data
    const dialogue = this.dialogueData[dialogueId];
    
    if (!dialogue) {
      console.error(`Dialogue with ID "${dialogueId}" not found.`);
      return;
    }
    
    // Clear previous choices
    this.clearChoices();
    
    // Set dialogue text with typing effect
    this.typeText(dialogue.text, () => {
      // Show choices after text is fully displayed
      this.showChoices(dialogue.choices);
    });
  }
  
  typeText(text, onComplete) {
    // Get dialogue text element
    const textElement = this.scene.elements.dialogueText;
    
    // Reset text
    textElement.setText('');
    
    // Create typing effect
    let currentChar = 0;
    const typingSpeed = 30; // ms per character
    
    const typingTimer = this.scene.time.addEvent({
      delay: typingSpeed,
      callback: () => {
        textElement.setText(text.substring(0, currentChar + 1));
        currentChar++;
        
        // Check if typing is complete
        if (currentChar === text.length) {
          typingTimer.destroy();
          if (onComplete) onComplete();
        }
      },
      repeat: text.length - 1
    });
    
    // Allow skipping the typing effect with a click/tap
    this.scene.input.once('pointerdown', () => {
      typingTimer.destroy();
      textElement.setText(text);
      if (onComplete) onComplete();
    });
  }
  
  showChoices(choices) {
    // If no choices, return
    if (!choices || choices.length === 0) {
      return;
    }
    
    // Get choices container
    const container = this.scene.elements.choicesContainer;
    
    // Calculate positions
    const buttonWidth = 150;
    const buttonHeight = 40;
    const padding = 10;
    const totalWidth = choices.length * (buttonWidth + padding) - padding;
    const startX = -totalWidth / 2 + buttonWidth / 2;
    
    // Create choice buttons
    choices.forEach((choice, index) => {
      // Create button
      const x = startX + index * (buttonWidth + padding);
      const button = this.scene.add.image(x, 0, 'button')
        .setDisplaySize(buttonWidth, buttonHeight)
        .setInteractive({ useHandCursor: true });
      
      // Create text
      const text = this.scene.add.text(x, 0, choice.text, {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: buttonWidth - 20 }
      }).setOrigin(0.5);
      
      // Add hover effect
      button.on('pointerover', () => {
        button.setTint(0xe05a70);
        text.setScale(1.1);
      });
      
      button.on('pointerout', () => {
        button.clearTint();
        text.setScale(1);
      });
      
      // Add click effect
      button.on('pointerdown', () => {
        button.setTint(0xd04060);
        text.setScale(0.9);
      });
      
      // Handle choice selection
      button.on('pointerup', () => {
        this.scene.handleChoice(choice);
      });
      
      // Add to container
      container.add(button);
      container.add(text);
      
      // Store reference for cleanup
      this.currentChoiceButtons.push({ button, text });
    });
  }
  
  clearChoices() {
    // Remove all choice buttons
    this.currentChoiceButtons.forEach(({ button, text }) => {
      button.destroy();
      text.destroy();
    });
    
    // Clear array
    this.currentChoiceButtons = [];
    
    // Clear container
    this.scene.elements.choicesContainer.removeAll();
  }
} 