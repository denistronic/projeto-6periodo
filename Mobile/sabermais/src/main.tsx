import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './theme/variables.css';
import './theme/core.css';
import './styles/style.css';   // <<< aqui entra o seu CSS

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
