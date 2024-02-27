import { createClient } from '@connect2ic/core';
import { PlugWallet } from '@connect2ic/core/providers/plug-wallet';
import { Connect2ICProvider } from '@connect2ic/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingProvider } from './contexts/loading-context';

import OverlayPage from './pages/overlay-page';
import MainRoute from './route';
import MainTemplate from './templates/main-template';

function App() {
  const client = createClient({
    providers: [new PlugWallet()],
    globalProviderConfig: {
      dev: import.meta.env.DEV,
    },
  });

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Connect2ICProvider client={client}>
          <LoadingProvider>
            <Routes>
              <Route path='/overlay' element={<OverlayPage/>}/>
              <Route path='/*' element={<MainTemplate><MainRoute></MainRoute></MainTemplate>}/>
            </Routes>
          </LoadingProvider>
        </Connect2ICProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
