import React from 'react';
import ReactDOM from 'react-dom/client';
import { InvoiceApp } from './InvoiceApp';
import { CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CardApp from './CardApp';
import { BrowserRouter } from 'react-router-dom';
import { UserApp } from './UserApp';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline/>
      {/* <InvoiceApp /> */}
      {/* <CardApp /> */}
        <UserApp/>
    </BrowserRouter>
  </React.StrictMode>
)
