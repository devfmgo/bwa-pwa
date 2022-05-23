import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './tailwind.css';
import App from './App';
import * as ServiceWorkerRegistration from './serviceWorkerRegistration';
const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<App />);

ServiceWorkerRegistration.register('root');
