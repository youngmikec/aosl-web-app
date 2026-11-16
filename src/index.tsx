import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import reportWebVitals from './reportWebVitals';

// REACT_APP_UI_VERSION=v1 renders the original app; anything else renders the redesigned v2 app.
const UI_VERSION = process.env.REACT_APP_UI_VERSION || 'v2';

const V1Root = lazy(() => import('./V1Root'));
const V2App = lazy(() => import('./v2/V2App'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      {UI_VERSION === 'v1' ? <V1Root /> : <V2App />}
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
