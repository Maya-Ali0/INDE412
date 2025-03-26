import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider,
  Route, 
  createRoutesFromElements 
} from 'react-router-dom';
import App from './App.tsx';
import { ServicePage } from './ServicePage';
import { ServiceProvidersPage } from './ServiceProvidersPage';
import {ProviderBookingPage} from './ProviderBookingPage';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/services/:serviceId" element={<ServicePage />} />
      <Route path="/services/:serviceId/providers" element={<ServiceProvidersPage />} />
      <Route path="/services/:serviceId/providers/:providerId" element={<ProviderBookingPage />} />
    </>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);