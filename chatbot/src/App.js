import React from 'react';
import './App.css';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💬 React ChatBot</h1>
        <p>Your friendly AI assistant</p>
      </header>
      <main className="app-main">
        <ChatBot />
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 FSWD Practical Project. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
