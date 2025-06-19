import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return <window.TicTacToe />;
}

createRoot(document.getElementById('renderDiv')).render(<App />);