import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! 👋 I am your React ChatBot. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Chatbot responses
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    const responses = {
      greeting: [
        'Hey there! Nice to meet you! 😊',
        'Hello! How\'s it going? 👋',
        'Hi! Great to see you! 🎉',
      ],
      help: [
        'I\'m here to help! You can ask me about React, JavaScript, Web Development, or just chat with me!',
        'Feel free to ask me anything! I love answering questions about web development! 🚀',
      ],
      time: [
        `The current time is ${new Date().toLocaleTimeString()}`,
        `It's ${new Date().toLocaleTimeString()} right now!`,
      ],
      date: [
        `Today is ${new Date().toLocaleDateString()}`,
        `The date is ${new Date().toLocaleDateString()}`,
      ],
      react: [
        'React is a JavaScript library for building user interfaces with reusable components! ⚛️',
        'React makes it easy to build interactive UIs. Each component manages its own state and props! 🎨',
      ],
      javascript: [
        'JavaScript is a versatile programming language that powers interactive web applications! 💻',
        'JS is awesome for both frontend and backend development! 🌟',
      ],
      joke: [
        'Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂',
        'How many programmers does it take to change a light bulb? None, that\'s a hardware problem! 💡',
        'Why did the developer go broke? Because he used up all his cache! 💰',
      ],
      thanks: [
        'You\'re welcome! Glad I could help! 😊',
        'Happy to assist! Feel free to ask anytime! 🤗',
      ],
      goodbye: [
        'Goodbye! It was nice chatting with you! See you soon! 👋',
        'Take care! Thanks for the conversation! 🌟',
      ],
      default: [
        'That\'s interesting! Tell me more about that. 🤔',
        'I see! Can you explain that a bit more? 😊',
        'Hmm, I\'m not sure about that. Try asking me about React, JavaScript, or web development! 💭',
      ],
    };

    // Check for keywords in user message
    if (
      lowerMessage.match(/hi|hello|hey|greetings/i) &&
      !lowerMessage.match(/goodbye|bye|bye-bye/i)
    ) {
      return responses.greeting[
        Math.floor(Math.random() * responses.greeting.length)
      ];
    }

    if (lowerMessage.match(/help|what can you do|capabilities/i)) {
      return responses.help[Math.floor(Math.random() * responses.help.length)];
    }

    if (lowerMessage.match(/time|what time/i)) {
      return responses.time[Math.floor(Math.random() * responses.time.length)];
    }

    if (lowerMessage.match(/date|today|day/i)) {
      return responses.date[Math.floor(Math.random() * responses.date.length)];
    }

    if (lowerMessage.match(/react/i)) {
      return responses.react[Math.floor(Math.random() * responses.react.length)];
    }

    if (lowerMessage.match(/javascript|js|javascript\?/i)) {
      return responses.javascript[
        Math.floor(Math.random() * responses.javascript.length)
      ];
    }

    if (lowerMessage.match(/joke|funny|laugh|haha/i)) {
      return responses.joke[Math.floor(Math.random() * responses.joke.length)];
    }

    if (lowerMessage.match(/thanks|thank you|appreciate/i)) {
      return responses.thanks[Math.floor(Math.random() * responses.thanks.length)];
    }

    if (lowerMessage.match(/bye|goodbye|see you|farewell/i)) {
      return responses.goodbye[
        Math.floor(Math.random() * responses.goodbye.length)
      ];
    }

    return responses.default[
      Math.floor(Math.random() * responses.default.length)
    ];
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: 'Hello! 👋 I am your React ChatBot. How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>ChatBot Assistant</h2>
        <button
          className="clear-btn"
          onClick={handleClearChat}
          title="Clear chat history"
        >
          🗑️ Clear
        </button>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender}-message`}
          >
            <div className="message-avatar">
              {message.sender === 'bot' ? '🤖' : '👤'}
            </div>
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message bot-message">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className="input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="message-input"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
        />
        <button
          type="submit"
          className="send-btn"
          disabled={!input.trim() || isTyping}
        >
          Send 📤
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
