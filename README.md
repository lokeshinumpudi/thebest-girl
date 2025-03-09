# A Heartfelt Apology - Interactive Game for Kru

A beautiful, narrative-driven 2D game designed as a personal apology and expression of love. This interactive experience allows the player to engage in heartfelt conversations, discover surprises, and share small moments of connection in a serene garden setting.

## Features

- **Immersive Storytelling**: A touching narrative with multiple dialogue choices that influence the story's progression
- **Beautiful Aesthetics**: Soft pastel colors and gentle animations create a warm, inviting atmosphere
- **Interactive Elements**: Surprises that appear throughout the story and a mini-game where you arrange flowers
- **Mobile-Friendly**: Fully responsive design with touch controls for mobile and tablet devices
- **Personalized Experience**: Customized with personal details to create a meaningful connection

## Technologies Used

- **Vite**: Fast, modern frontend build tool
- **Phaser 3**: Powerful HTML5 game framework
- **JavaScript**: Core programming language
- **HTML5 & CSS3**: Structure and styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/heartfelt-apology.git
   cd heartfelt-apology
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Start the development server

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## Customization

You can customize the game by editing the `window.gameData` object in `src/main.js`:

```javascript
window.gameData = {
  playerName: "Kru", // Change to the recipient's name
  favoriteFlower: "rose", // Change to their favorite flower
  sharedMemory: "our first date", // Change to a meaningful shared memory
  dialogueChoices: [],
};
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Created with love for Kru
- Inspired by the power of heartfelt apologies and second chances
- Special thanks to the Phaser community for their excellent documentation and examples
