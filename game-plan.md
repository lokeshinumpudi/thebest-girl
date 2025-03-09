# A Heartfelt Apology - 2D Game

This is a simple, narrative-driven 2D game designed as a personal apology and expression of love for my girlfriend. She plays as a girl character who interacts with a boy character through heartfelt conversations, surprises, and small moments of connection, all set in a beautiful, pastel-colored garden. This README provides a detailed blueprint to build the game using **HTML, CSS, and JavaScript**, with generic terms to ensure it can be created without relying on specific frameworks. The game will be lightweight, browser-based, and emotionally impactful.

## Game Concept

### Overview

The game is a **story-based experience** where the player controls a girl character who starts off feeling a bit upset. A boy character enters the scene, engaging her in **interactive conversations** with multiple-choice responses, offering **surprises** like gifts, and optionally helping her with a simple task. The focus is on creating a short, meaningful journey (5-10 minutes) with a beautiful visual style and a heartfelt message.

### Setting

- **Location**: A peaceful garden with flowers, trees, and a bench.
- **Visual Style**: Soft pastel colors (e.g., pinks, blues, lavenders) with a hand-drawn or illustrative look. Use simple shapes or images to represent the scene.

### Characters

- **Girl (Player Character)**:
  - Appearance: A small, gentle figure with long hair, wearing a dress in a pastel color (e.g., light pink).
  - Emotions: Starts with a neutral or slightly sad expression, transitions to smiling as the game progresses.
  - Movement: Static position on a bench, with optional subtle animations (e.g., head tilt when happy).
- **Boy (NPC)**:
  - Appearance: A kind-looking figure with short hair, in a complementary color (e.g., light blue shirt).
  - Actions: Enters from the side, sits next to the girl, and performs gestures (e.g., offering a flower).
  - Movement: Walks in, sits, and optionally moves to reveal a surprise.

### Gameplay

- **Core Mechanic**: The player clicks or taps on dialogue options to respond to the boy’s words. Choices influence his next lines or actions, guiding the story toward apologies and love.
- **Surprises**: Visual events like a flower appearing in the girl’s hands or a fountain fading into view.
- **Optional Task**: A basic interactive element, such as dragging flowers into a vase, where the boy “helps” by encouraging her.
- **Duration**: Short and sweet, taking 5-10 minutes to complete.

### Emotional Arc

- **Start**: The girl is alone, looking thoughtful or slightly sad.
- **Middle**: The boy arrives, apologizes, and offers surprises, lifting her mood.
- **End**: A loving conclusion with a personal message (e.g., “I’m sorry, and I love you”).

### Personal Touches

- Use a placeholder for **her name** (e.g., `[PLAYER_NAME]`) in the dialogue, which can be swapped out later.
- Include generic placeholders for personal details (e.g., `[FAVORITE_FLOWER]` or `[SHARED_MEMORY]`) to customize the experience.

## Development Plan

The game will be built using **HTML** for structure, **CSS** for styling and animations, and **JavaScript** for interactivity and logic. No external libraries or frameworks are required—just plain web technologies.

### 1. Project Setup

- **File Structure**:
  - `index.html`: The main page containing the game canvas and UI.
  - `styles.css`: Styles for the game scene, characters, and dialogue box.
  - `script.js`: Logic for game state, dialogue, interactions, and animations.
- **HTML Base**:
  - Create a `<div>` for the game container (e.g., `id="game"`).
  - Add a `<div>` for the background scene (e.g., `id="background"`).
  - Add `<div>` elements for the girl and boy characters (e.g., `id="girl"` and `id="boy"`).
  - Add a `<div>` for the dialogue box (e.g., `id="dialogue-box"`) with `<p>` for text and `<button>` elements for choices.

### 2. Game Scene Creation

- **Background**:
  - Use CSS to style the `#background` div with a pastel gradient (e.g., `linear-gradient(to bottom, #fce2e6, #e6f3ff)`) or an image (e.g., `background-image: url('garden.png')`).
  - Size it to fill the screen (e.g., `width: 100vw; height: 100vh`).
- **Characters**:
  - Style `#girl` and `#boy` as positioned elements (e.g., `position: absolute`).
  - Use CSS to place the girl on a bench (e.g., `bottom: 20%; left: 40%`) and the boy entering from the side (e.g., `left: -10%` initially).
  - Represent characters with simple shapes (e.g., `border-radius: 50%` for heads, `background-color` for bodies) or images (e.g., `<img>` tags inside the divs).
- **Basic Animations**:
  - Use CSS transitions to move the boy into place (e.g., `left: 50%; transition: left 1s ease`).
  - Change the girl’s “expression” by swapping background colors or images (e.g., neutral to smiling).

### 3. Dialogue System

- **Structure**:
  - Style `#dialogue-box` as a semi-transparent box at the bottom (e.g., `position: fixed; bottom: 0; width: 80%; background: rgba(255, 255, 255, 0.8)`).
  - Add a `<p>` for the current dialogue text (e.g., `id="dialogue-text"`).
  - Add `<button>` elements for choices (e.g., `class="choice-btn"`).
- **Logic**:
  - Use JavaScript to store dialogue in an object with text and choices (e.g., `{ id: "start", text: "Hey, mind if I join you?", choices: ["Sure", "I guess"] }`).
  - Display the current dialogue by updating `#dialogue-text` and creating buttons dynamically.
  - Handle clicks on buttons to move to the next dialogue state.
- **Example Dialogue Flow**:
  ```javascript
  const dialogue = {
    start: {
      text: "Hey, [PLAYER_NAME], mind if I join you?",
      choices: [
        { text: "Sure, have a seat", next: "apology" },
        { text: "I guess", next: "concern" },
      ],
    },
    apology: {
      text: "I’m really sorry for hurting you, [PLAYER_NAME].",
      choices: [
        { text: "It’s okay", next: "flower" },
        { text: "Why did you do that?", next: "explain" },
      ],
    },
    explain: {
      text: "I didn’t mean to. I messed up, and I regret it so much.",
      choices: [{ text: "I forgive you", next: "flower" }],
    },
    flower: {
      text: "I brought you something—a [FAVORITE_FLOWER].",
      choices: [{ text: "Thank you!", next: "fountain" }],
    },
  };
  ```

4. Surprises
   Flower Gift:
   Create a <div> or <img> for a flower (e.g., id="flower").
   Initially hide it (display: none), then show it and animate it to the girl’s position (e.g., top: 50%; left: 45%; transition: all 1s ease) when triggered.
   Fountain Reveal:
   Add a <div> for a fountain (e.g., id="fountain") with opacity: 0 initially.
   Fade it in (e.g., opacity: 1; transition: opacity 2s) during the relevant dialogue step.
   Logic:
   Tie surprises to specific dialogue choices in JavaScript (e.g., when reaching "flower", show the flower).
5. Optional Task (Flower Arranging)
   Structure:
   Add a <div> for a vase (e.g., id="vase") and several flower <div>s (e.g., class="draggable-flower").
   Style the vase as a target area and flowers as movable elements.
   Interactivity:
   Use JavaScript to make flowers draggable (e.g., onmousedown, onmousemove, onmouseup events).
   Check if a flower overlaps the vase (e.g., compare bounding box coordinates).
   Display a success message (e.g., “Great job, [PLAYER_NAME]!”) when all flowers are placed.
   Boy’s Help:
   Update dialogue to encourage her (e.g., “Let me help you with that!”) during the task.
6. Audio (Optional)
   Background Music:
   Add an <audio> element in HTML (e.g., <audio id="bg-music" src="music.mp3" loop>).
   Play it with JavaScript on game start (e.g., document.getElementById('bg-music').play()).
   Sound Effects:
   Add <audio> elements for clicks or surprises (e.g., <audio id="click-sound" src="click.mp3">).
   Trigger them on button clicks or events (e.g., clickSound.play()).
7. Testing and Polish
   Testing:
   Ensure the game works in modern browsers (e.g., Chrome, Firefox).
   Test on desktop and mobile by resizing the window or using dev tools.
   Polish:
   Add smooth transitions for all movements (e.g., transition: all 0.5s ease).
   Include a final screen with a <div> for a personal message (e.g., id="end-screen") that fades in at the end.
   Message Example:
   “Dear [PLAYER_NAME], I’m so sorry for everything. I love you more than words can say.”
8. Deployment
   Package the index.html, styles.css, script.js, and any assets (images, audio) into a folder.
   Open index.html in a browser to play locally, or upload to a free hosting service (e.g., GitHub Pages) later.
   Sample Narrative Flow
   Start:
   Scene: Girl on a bench, boy walks in from the left.
   Text: "Hey, [PLAYER_NAME], mind if I join you?"
   Choices: "Sure, have a seat" / "I guess"
   Apology:
   Boy sits down.
   Text: "I’m really sorry for hurting you, [PLAYER_NAME]."
   Choices: "It’s okay" / "Why did you do that?"
   (If "Why"): "I didn’t mean to. I messed up, and I regret it so much."
   Surprise:
   Text: "I brought you something—a [FAVORITE_FLOWER]."
   Action: Flower appears near the girl.
   Choices: "Thank you!" / "It’s beautiful."
   Connection:
   Text: "Remember [SHARED_MEMORY]? I want that again—with you."
   Action: Fountain fades in.
   Choices: Lead to a loving exchange.
   End:
   Text: "Thank you for giving me a chance. I love you more than anything."
   Action: Screen fades to a personal message.
   Technical Notes
   Assets: Use simple CSS shapes (e.g., circles, rectangles) if images aren’t available. Replace with images like girl.png, boy.png, or flower.png later.
   Styling: Keep it responsive with percentage-based sizes (e.g., width: 80%) and max-width for larger screens.
   JavaScript: Store game state in a global object (e.g., let gameState = { currentDialogue: 'start' }) to track progress.
   Performance: Limit animations to basic CSS transitions to keep it lightweight.
