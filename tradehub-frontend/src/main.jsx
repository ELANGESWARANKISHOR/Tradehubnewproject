import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Find the root element in the HTML document.
const rootElement = document.getElementById('root');

// Create a React root for the application.
const root = ReactDOM.createRoot(rootElement);

// Render the App component inside the root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
