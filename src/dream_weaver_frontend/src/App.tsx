import { createClient } from "@connect2ic/core";
import { PlugWallet } from "@connect2ic/core/providers/plug-wallet";
import { Connect2ICProvider } from "@connect2ic/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "./contexts/auth-context";
import { LoadingProvider } from "./contexts/loading-context";
import CashflowPage from "./pages/cashflow-page";
import CreateCrowdfundPage from "./pages/create-crowdfund-page";
import CrowdfundDetailPage from "./pages/crowdfund-detail-page";
import CrowdfundPage from "./pages/crowdfund-page/crowdfund-page";
import DonatePage from "./pages/donate-page/donate-page";
import HomePage from "./pages/home-page";
import MePage from "./pages/me-page/me-page";
import ProfilePage from "./pages/profile-page";
import RegisterPage from "./pages/register-page";
import MainTemplate from "./templates/main-template";
import React from 'react'

function App() {
  const client = createClient({
    providers: [new PlugWallet()],
    globalProviderConfig: {
      dev: import.meta.env.DEV,
    },
  })

  return <>
      <BrowserRouter>
      <ToastContainer/>
        <Connect2ICProvider client={client}>
          <LoadingProvider>
            <UserProvider>
              <MainTemplate>
                <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/me" element={<MePage/>}/>
                  <Route path="/cashflow" element={<CashflowPage/>}/>
                  <Route path="/donate/:name" element={<DonatePage/>}/>
                  <Route path="/profile" element={<ProfilePage/>}/>
                  <Route path="/crowdfund" element={<CrowdfundPage/>}/>
                  <Route path="/crowdfund/:id" element={<CrowdfundDetailPage/>}/>
                  <Route path="/create-crowdfund" element={<CreateCrowdfundPage/>}/>
                  <Route path="/register" element={<RegisterPage/>}/>
                </Routes>
              </MainTemplate>
            </UserProvider>
          </LoadingProvider>
        </Connect2ICProvider>
      </BrowserRouter>
  </>
}

export default App;
