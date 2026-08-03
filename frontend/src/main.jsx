import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";

import { store } from './store/store';
import { Provider } from 'react-redux';
import './index.css'
import AppRoutes from './routes/AppRoutes';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <AppRoutes/>

    </Provider>
    
    </BrowserRouter>
  </StrictMode>,
)
