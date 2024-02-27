import { createClient } from "@connect2ic/core";
import { PlugWallet } from "@connect2ic/core/providers/plug-wallet";
import { Connect2ICProvider } from "@connect2ic/react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth, { UserProvider } from "./contexts/auth-context";
import useLoading, { LoadingProvider } from "./contexts/loading-context";
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
import React from "react";
import TestSocketPage from "./pages/test-socket";

function App() {
  const client = createClient({
    providers: [new PlugWallet()],
    globalProviderConfig: {
      dev: import.meta.env.DEV,
    },
  });
  const { user } = useAuth();

  const GuestOnly = () => {
    if (user) {
      return <Navigate to={"/me"} />;
    }
    return <Outlet />;
  };

  const AuthenticatedOnly = () => {
    if (user) {
      return <Outlet />;
    }

    return <Navigate to={"/"} />;
  };

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Connect2ICProvider client={client}>
          <LoadingProvider>
            <MainTemplate>
              <Routes>
                <Route element={<GuestOnly />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/test-socket/:name" element={<TestSocketPage />} />
                </Route>
                <Route element={<AuthenticatedOnly />}>
                  <Route path="/me" element={<MePage />} />
                  <Route path="/cashflow" element={<CashflowPage />} />
                  <Route path="/donate/:name" element={<DonatePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/crowdfund" element={<CrowdfundPage />} />
                  <Route
                    path="/crowdfund/:id"
                    element={<CrowdfundDetailPage />}
                  />
                  <Route
                    path="/create-crowdfund"
                    element={<CreateCrowdfundPage />}
                  />
                </Route>
              </Routes>
            </MainTemplate>
          </LoadingProvider>
        </Connect2ICProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
