import './style.css'
import Phaser from 'phaser'
import BootScene from './scenes/BootScene.js'
import PreloadScene from './scenes/PreloadScene.js'
import TitleScene from './scenes/TitleScene.js'
import GameScene from './scenes/GameScene.js'
import EndScene from './scenes/EndScene.js'

// Game configuration
const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  backgroundColor: '#fce2e6',
  scene: [BootScene, PreloadScene, TitleScene, GameScene, EndScene],
  pixelArt: false,
  roundPixels: true,
  input: {
    activePointers: 3, // Support for multi-touch
    touch: {
      capture: true
    }
  }
}

// Create the game instance
const game = new Phaser.Game(config)

// Handle browser visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause the game when tab/window is not visible
    game.scene.scenes.forEach(scene => {
      if (scene.scene.isActive()) {
        scene.scene.pause()
      }
    })
  } else {
    // Resume the game when tab/window becomes visible again
    game.scene.scenes.forEach(scene => {
      if (scene.scene.isPaused()) {
        scene.scene.resume()
      }
    })
  }
})

// Handle window resize
window.addEventListener('resize', () => {
  game.scale.refresh()
})

// Prevent default touch behavior on mobile
window.addEventListener('touchstart', (e) => {
  if (e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA') {
    e.preventDefault()
  }
}, { passive: false })

// Global game data
window.gameData = {
  playerName: 'Kru',
  favoriteFlower: 'rose',
  sharedMemory: 'our first date',
  dialogueChoices: []
}
