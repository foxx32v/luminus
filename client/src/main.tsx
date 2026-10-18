import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Page } from './C.pages/';
import './index.scss';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('root element not found')
createRoot(rootElement).render(
  <StrictMode>
    <Page />
  </StrictMode>
);