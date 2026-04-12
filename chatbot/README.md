# React ChatBot - FSWD Practical Project

A simple yet effective React-based chatbot application built for Full-Stack Web Development (FSWD) practical.

## Features

✨ **Interactive Chat Interface** - Real-time messaging with smooth animations
🤖 **Intelligent Responses** - Bot responds to various keywords and queries
💬 **Message Timestamps** - Each message shows the time it was sent
📱 **Responsive Design** - Works great on desktop, tablet, and mobile devices
🎨 **Modern UI** - Beautiful gradient design with smooth transitions
⌨️ **Clear Chat** - Reset conversation history with one click
✅ **Type Indicators** - Visual feedback when bot is typing
🎯 **Auto-scroll** - Automatically scrolls to latest messages

## Bot Capabilities

The chatbot can respond to:
- **Greetings**: Hello, Hi, Hey, etc.
- **Help Requests**: What can you do?, Help, Capabilities
- **Time & Date**: What time is it?, What's the date?
- **React Questions**: Questions about React framework
- **JavaScript Questions**: Questions about JavaScript
- **Jokes**: Ask for a joke!
- **Gratitude**: Thank you, Thanks, Appreciate
- **Goodbye**: Bye, Goodbye, See you, etc.

## Project Structure

```
chatbot/
├── public/
│   └── index.html           # Main HTML file
├── src/
│   ├── components/
│   │   ├── ChatBot.js       # Main chatbot component
│   │   └── ChatBot.css      # Chatbot styles
│   ├── App.js               # Main app component
│   ├── App.css              # App styles
│   └── index.js             # React entry point
├── package.json             # Dependencies
└── README.md                # This file
```

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Steps to Run

1. **Navigate to the project directory:**
   ```bash
   cd chatbot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to that URL

## Technologies Used

- **React** - JavaScript library for building user interfaces
- **CSS3** - Modern styling with gradients, animations, and flexbox
- **JavaScript ES6+** - Modern JavaScript features
- **React Hooks** - useState, useRef, useEffect for state management

## Code Highlights

### ChatBot Component Features:
- **useState**: Manages messages and input state
- **useRef**: Reference to auto-scroll to latest messages
- **useEffect**: Auto-scroll effect when messages change
- **Message Management**: Efficiently handles user and bot messages
- **Typing Simulation**: 800ms delay to simulate bot thinking
- **Keyword Matching**: Intelligent response selection based on keywords

## Sample Conversations

```
User: Hello
Bot: Hey there! Nice to meet you! 😊

User: What can you do?
Bot: I'm here to help! You can ask me about React, JavaScript, Web Development, or just chat with me!

User: Tell me a joke
Bot: Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂

User: What time is it?
Bot: The current time is [current time]
```

## Customization

### Add More Bot Responses:
Edit the `getBotResponse()` function in `ChatBot.js`:
```javascript
const responses = {
  newKeyword: [
    'Response 1',
    'Response 2',
  ],
};
```

### Change Colors:
Modify the gradient colors in `App.css` and `ChatBot.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adjust Chat Window Size:
Update the `.chatbot-container` styles in `ChatBot.css`:
```css
max-width: 700px; /* Change this value */
height: 600px;   /* And this */
```

## Future Enhancements

- 🔌 Integration with real AI/ML API
- 💾 Local storage for chat history
- 🔐 User authentication and profiles
- 📊 Message statistics and analytics
- 🎵 Sound notifications for new messages
- 🌙 Dark/Light mode toggle
- 🌐 Multi-language support
- 📱 PWA (Progressive Web App) support

## Performance Tips

- Messages are efficiently managed with unique IDs
- CSS animations use GPU acceleration
- Smooth scrolling behavior
- Optimized re-renders with React hooks

## Troubleshooting

**Issue: Port 3000 already in use**
```bash
# Use a different port
PORT=3001 npm start
```

**Issue: npm install fails**
```bash
# Clear npm cache
npm cache clean --force
npm install
```

**Issue: Blank screen in browser**
- Check browser console for errors
- Ensure JavaScript is enabled
- Try clearing browser cache and reloading

## Learning Resources

- [React Documentation](https://react.dev)
- [JavaScript MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [CSS Tricks](https://css-tricks.com)
- [React Hooks Guide](https://react.dev/reference/react/hooks)

## License

This project is open source and available for educational purposes.

## Author

FSWD Practical - 2024

---

**Built with ❤️ using React and CSS**
