# Red Snake Game

A fully red-themed snake game built with HTML, CSS, and JavaScript. Everything is red - the snake, the background, the food, and all UI elements!

## Features

- 🔴 **Complete Red Theme**: Every element is styled in various shades of red
- 🐍 **Classic Snake Gameplay**: Grow your snake by eating food
- 🎮 **Multiple Control Options**: Arrow keys, WASD, or on-screen buttons
- 📊 **Score Tracking**: Current score and persistent high score
- ⚡ **Progressive Difficulty**: Game speeds up as you grow
- 🎯 **Smooth Canvas Graphics**: 20x20 grid with visual effects
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 💾 **High Score Persistence**: Your best score is saved locally
- 🎨 **Visual Effects**: Glowing effects, shadows, and animations

## How to Play

### Starting the Game
1. Open `index.html` in your web browser
2. Press **SPACE** or click the **START** button
3. Use controls to guide your snake

### Controls

#### Keyboard
- **Arrow Keys**: Move the snake (Up, Down, Left, Right)
- **SPACE**: Start game / Pause / Resume
- **ESC**: Reset game

#### On-Screen Buttons
- Use the directional buttons (▲ ▼ ◄ ►) to control snake
- Click **START** to begin
- Click **PAUSE** to pause during gameplay

### Gameplay Rules
1. 🍎 Eat the red food to grow your snake and increase your score
2. 🚫 Don't hit the walls - the game will end
3. 🚫 Don't run into yourself - the snake can't cross its own body
4. ⚡ The snake gets faster as you eat more food
5. 🏆 Try to beat your high score!

## Scoring System

- **+10 points** for each food item eaten
- **High Score** is automatically saved in browser localStorage
- Score persists between game sessions

## Red Theme Details

The game features a complete red color scheme:

- **Background**: Dark red gradient (#660000 to #8b0000)
- **Canvas**: Deep red (#4d0000) with darker red grid lines
- **Snake Head**: Bright red (#ff3333) with glowing effect
- **Snake Body**: Medium red (#c00000) with gradient opacity
- **Food**: Primary red (#ff0000) with pulsing glow
- **UI Elements**: Various red shades for buttons and text
- **Effects**: Red shadows, glows, and animations throughout

## Technical Details

### Built With
- **HTML5**: Canvas API for game rendering
- **CSS3**: Modern styling with red color scheme, animations, flexbox
- **JavaScript (ES6+)**: Game logic with class-based architecture

### Game Configuration
```javascript
{
    gridSize: 20,        // 20x20 grid
    tileSize: 20,        // 20px per tile
    initialSpeed: 150,   // Starting speed (ms)
    speedIncrease: 5,    // Speed increase per food
    minSpeed: 60         // Maximum speed (fastest)
}
```

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Structure

```
red-snake-game/
│
├── index.html          # Game structure and layout
├── styles.css          # Complete red theme styling
├── script.js           # Game logic and controls
└── README.md          # Documentation
```

## Game Architecture

### SnakeGame Class
The game uses an object-oriented approach with a main `SnakeGame` class that manages:

- **State Management**: Snake position, direction, food, score
- **Game Loop**: RequestAnimationFrame for smooth 60fps rendering
- **Collision Detection**: Wall and self-collision checking
- **Input Handling**: Keyboard and button event listeners
- **Rendering**: Canvas drawing with red theme effects
- **Storage**: LocalStorage for high score persistence

### Key Methods

- `init()`: Initialize game and setup event listeners
- `gameLoop()`: Main game loop using requestAnimationFrame
- `update()`: Update game state (move snake, check collisions)
- `draw()`: Render game on canvas with red theme
- `generateFood()`: Create new food at random position
- `changeDirection()`: Handle direction changes with validation
- `endGame()`: Handle game over state
- `reset()`: Reset game to initial state

## Features Implementation

### Collision Detection
- **Wall Collision**: Checks if snake head exits grid boundaries
- **Self Collision**: Checks if snake head intersects with body
- Both result in immediate game over

### Food Generation
- Random placement within grid
- Ensures food never spawns on snake body
- New food appears immediately after consumption

### Speed Progression
- Starts at 150ms per frame
- Decreases by 5ms with each food eaten
- Minimum speed of 60ms (maximum difficulty)

### Visual Effects
- Glowing effects on snake head and food
- Gradient opacity on snake body
- Pulsing title animation
- High score celebration animation
- Red shadows and highlights throughout

### Responsive Design
Optimized for multiple screen sizes:
- Desktop: Full-size canvas (400x400px)
- Tablet: Adjusted button sizes
- Mobile: Scaled canvas and compact layout

## Customization

### Adjusting Game Speed
Edit the CONFIG object in `script.js`:
```javascript
const CONFIG = {
    initialSpeed: 150,    // Make game easier (higher) or harder (lower)
    speedIncrease: 5,     // How much faster per food
    minSpeed: 60          // Maximum speed cap
};
```

### Changing Red Shades
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-red: #ff0000;
    --dark-red: #8b0000;
    --medium-red: #c00000;
    /* Customize your red palette */
}
```

### Grid Size
Modify CONFIG in `script.js`:
```javascript
const CONFIG = {
    gridSize: 20,    // Change grid dimensions (e.g., 30 for 30x30)
    tileSize: 20,    // Adjust tile size accordingly
};
```

## Future Enhancements

Possible improvements for future versions:
- Power-ups (speed boost, invincibility, etc.)
- Different game modes (timed, obstacle course)
- Sound effects and background music
- Multiple difficulty levels
- Leaderboard system
- Touch swipe controls for mobile
- Additional color themes (blue snake, green snake, etc.)

## Browser Storage

The game uses `localStorage` to save your high score:
- Key: `redSnakeHighScore`
- Persists between sessions
- Clear browser data to reset high score

## Performance

- Uses `requestAnimationFrame` for optimal rendering
- Efficient collision detection
- Minimal DOM manipulation
- Canvas-based graphics for smooth animation
- Optimized for 60fps gameplay

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## Credits

Built with ❤️ using HTML, CSS, and JavaScript

---

**Live Demo**: Open `index.html` in your browser to start playing!

Enjoy the Red Snake Game! 🔴🐍
