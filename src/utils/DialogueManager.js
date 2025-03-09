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
          { text: "Thank you!", next: "dharamshala_memory" },
          { text: "It's beautiful", next: "dharamshala_memory" }
        ]
      },
      dharamshala_memory: {
        text: `Do you remember my late evening walks through Dharamshala lawn talking to you in the evenings? Feeling that cool breeze, talking for hours...`,
        choices: [
          { text: "I remember", next: "loki_letter" },
          { text: "Tell me more", next: "loki_letter" }
        ]
      },
      loki_letter: {
        text: `There's something about you that's so raw and pure, which is a rarity! From the moment we started spending more time together, sharing stories, talking about random things... I started getting closer to you, only wanting more of you.`,
        choices: [
          { text: "Continue", next: "loki_letter_2" }
        ]
      },
      loki_letter_2: {
        text: `I felt this new feeling that was quite hard to shake and contain within myself. I started writing them as letters to you! You gorgeous gorgeous soul!`,
        choices: [
          { text: "That's so sweet", next: "loki_letter_3" }
        ]
      },
      loki_letter_3: {
        text: `When you asked me back if I wanted to date you? I wanted to scream yes, squeeze you tight, lift you up into my arms and whisper slowly in your ears... hey girlfriend!`,
        choices: [
          { text: "I remember that day", next: "spotify_link" }
        ]
      },
      spotify_link: {
        text: `I even sent you a song: https://open.spotify.com/track/1wtOxkiel43cVs0Yux5Q4h?si=iLVyvtJhRHeyIGwdds5XWg`,
        choices: [
          { text: "I loved that song", next: "airport_memory" },
          { text: "Let's listen to it again", next: "airport_memory" }
        ]
      },
      airport_memory: {
        text: `Remember our first date at the airport? That was such a special day.`,
        choices: [
          { text: "I remember", next: "airport_scene" },
          { text: "Tell me more", next: "airport_scene" }
        ]
      },
      airport_scene: {
        text: `Let's go back there for a moment. I want to relive that special time with you.`,
        choices: [
          { text: "I'd love that", next: "car_ride" }
        ]
      },
      car_ride: {
        text: `*You both get in the car and drive to the airport*`,
        choices: [
          { text: "Continue", next: "at_airport" }
        ]
      },
      at_airport: {
        text: `Here we are. I remember how nervous I was that day. But seeing your smile made everything perfect.`,
        choices: [
          { text: "It was a wonderful day", next: "airport_moment" },
          { text: "You were so cute", next: "airport_moment" }
        ]
      },
      airport_moment: {
        text: `We watched the planes take off, dreaming about all the places we'd visit together someday.`,
        choices: [
          { text: "I still want that", next: "airport_promise" }
        ]
      },
      airport_promise: {
        text: `I promise we'll make those dreams come true. Let's plan our next adventure together.`,
        choices: [
          { text: "I'd love that", next: "return_garden" }
        ]
      },
      return_garden: {
        text: `*You both return to the garden, feeling closer*`,
        choices: [
          { text: "Continue", next: "fountain" }
        ]
      },
      fountain: {
        text: `Being with you makes everything better.`,
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
        text: `${playerName}, I promise to be better. To listen more, to understand you, and to always be there for you. Hey girlfriend!`,
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