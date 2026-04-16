# Tic Tac Toe Game - React

An interactive two-player Tic Tac Toe game built with React JS featuring proper state management, winning logic, and a beautiful user interface.

## 🎮 Features

- **Two-Player Gameplay**: Players X and O take turns clicking on the board
- **Winning Logic**: Automatically detects winning combinations (horizontal, vertical, and diagonal)
- **Draw Detection**: Identifies when the board is full with no winner
- **State Management**: Uses React Hooks (useState) for efficient state management
- **Current Player Display**: Shows which player's turn it is
- **New Game Button**: Reset the game anytime to start fresh
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Beautiful UI**: Modern gradient background with smooth animations
- **Game Instructions**: Built-in guide for new players

## 📁 Project Structure

```
tic-tac-toe/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/
│   │   ├── Board.js        # Main game component with logic
│   │   └── Board.css       # Styling for game board
│   ├── App.js              # Root component
│   ├── App.css             # App styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Project dependencies
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Navigate to the project directory**:
   ```bash
   cd tic-tac-toe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser**:
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to that URL

## 🎯 How to Play

1. **Game Start**: Player X always goes first
2. **Taking Turns**: 
   - Click on any empty square to place your symbol
   - The turn automatically switches to the other player
3. **Winning**: Get three of your symbols in a row (horizontally, vertically, or diagonally) to win
4. **Draw**: If all squares are filled with no winner, it's a draw
5. **New Game**: Click the "New Game" button to restart

### Winning Combinations
- **Horizontal**: Three symbols in a row (top, middle, or bottom)
- **Vertical**: Three symbols in a column (left, middle, or right)
- **Diagonal**: Three symbols diagonally (top-left to bottom-right or top-right to bottom-left)

## 💻 Technical Details

### State Management
The game uses React's `useState` hook to manage:
- `squares`: Array of 9 values representing the board state
- `isXNext`: Boolean to track whose turn it is
- `gameOver`: Boolean to track if the game has been won

### Win Detection Algorithm
The `calculateWinner` function checks against 8 possible winning combinations:
```javascript
const lines = [
  [0, 1, 2],  // Top row
  [3, 4, 5],  // Middle row
  [6, 7, 8],  // Bottom row
  [0, 3, 6],  // Left column
  [1, 4, 7],  // Middle column
  [2, 5, 8],  // Right column
  [0, 4, 8],  // Diagonal (top-left to bottom-right)
  [2, 4, 6],  // Diagonal (top-right to bottom-left)
];
```

### Key Features in Code

1. **Square Click Handler**: Prevents moves on filled squares and when game is won
2. **Winner Calculation**: Checks all winning combinations
3. **Board Full Check**: Uses `every()` method to check if draw condition is met
4. **Status Display**: Shows current player, winner, or draw status with emojis

## 🎨 Styling Features

- **Gradient Background**: Beautiful purple gradient backdrop
- **Hover Effects**: Squares respond to mouse over with color change and scale
- **Button Animation**: Reset button has smooth hover and click animations
- **Responsive Layout**: Adapts to different screen sizes
- **Box Shadows**: Adds depth and dimension to elements

## 📱 Responsive Design

The game is fully responsive with breakpoints for:
- **Desktop**: Full-size squares (100x100px)
- **Mobile**: Smaller squares (80x80px) to fit smaller screens
- Adjusted font sizes and spacing for better mobile experience

## 🛠️ Build for Production

To create an optimized production build:

```bash
npm run build
```

This will create a `build` folder with optimized files ready for deployment.

## 📚 Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Creates an optimized production build
- `npm test`: Runs the test suite
- `npm eject`: Exposes all configuration (irreversible - use with caution)

## 🐛 Future Enhancements

- Score tracking for multiple games
- AI opponent with difficulty levels
- Game history and replay functionality
- Multiplayer online support
- Undo/Redo moves
- Custom themes and color schemes
- Sound effects and animations
- Mobile app version

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 💡 Tips

- The game automatically prevents invalid moves
- The status bar always shows the current game state clearly
- Try different strategies - the center square is a strong opening move!
- Have fun playing with friends!

---

**Enjoy playing Tic Tac Toe! 🎉**
