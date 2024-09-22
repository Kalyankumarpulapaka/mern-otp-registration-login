import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Use createRoot API from React 18
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

