import React from 'react';
import {
  Navigate,
  Outlet,
  Route,
  Routes
} from 'react-router-dom';
import useAuth from './contexts/auth-context';
import CashflowPage from './pages/cashflow-page/cashflow-page';
import CreateCrowdfundPage from './pages/create-crowdfund-page';
import CrowdfundDetailPage from './pages/crowdfund-detail-page/crowdfund-detail-page';
import CrowdfundPage from './pages/crowdfund-page/crowdfund-page';
import DonatePage from './pages/donate-page/donate-page';
import HomePage from './pages/home-page/home-page';
import MePage from './pages/me-page/me-page';
import NotFoundPage from './pages/not-found-page';
import OverlaySettingPage from './pages/overlay-setting-page';
import ProfilePage from './pages/profile-page';
import RegisterPage from './pages/register-page';
import TestSocketPage from './pages/test-socket';

export default function MainRoute() {
  const { user } = useAuth();
  
  const GuestOnly = () => {
    if (user) {
      return <Navigate to={'/me'} />;
    }
    return <Outlet />;
  };

  const AuthenticatedOnly = () => {
    if (user) {
      return <Outlet />;
    }

    return <Navigate to={'/'} />;
  };
  
  return (
    <Routes>
      <Route path="/donate/:name" element={<DonatePage />} />
      <Route path="/crowdfund" element={<CrowdfundPage />} />
      <Route
        path="/crowdfund/:id"
        element={<CrowdfundDetailPage />}
      />
      <Route element={<GuestOnly />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/test-socket/:name"
          element={<TestSocketPage />}
        />
      </Route>
      <Route element={<AuthenticatedOnly />}>
        <Route path="/overlay" element={<OverlaySettingPage />} />
        <Route path="/me" element={<MePage />} />
        <Route path="/cashflow" element={<CashflowPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/create-crowdfund"
          element={<CreateCrowdfundPage />}
        />
      </Route>
      <Route path='/*' element={<NotFoundPage/>}></Route>
    </Routes>
  )
}
