import React, { lazy, startTransition } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LazyComponentLoader from './components/Essentials/Loading/LazyComponentLoader';
import { AdminProvider } from './Admin/context/AdminContext';

import { Toaster } from 'react-hot-toast'
import axios from 'axios';

const Layout = lazy(() => import('./Layout'));
const Home = lazy(() => import('./pages/Home/Home'));
const Services = lazy(() => import('./pages/Services/Services'));
const AboutUs = lazy(() => import('./pages/About Us/AboutUs'));
const ContactUs = lazy(() => import('./pages/Contact Us/ContactUs'));
const Quote = lazy(() => import('./pages/Quote/Quote'));
const FTLQuote = lazy(() => import('./pages/Quote/FTL Quote/FTLQuote'));
const LTLQuote = lazy(() => import('./pages/Quote/LTL Quote/LTLQuote'));
const QuoteCalculation = lazy(() => import('./pages/Quote/QuoteCalculation'));
const TrackShipment = lazy(() => import('./pages/Track Shipment/TrackShipment'));
const TrackingDetails = lazy(() => import('./pages/Track Shipment/TrackingDetails'));
const AdminLogin = lazy(() => import('./Admin/pages/LogIn'));
const AdminPanel = lazy(() => import('./Admin/pages/Panel/AdminPanel'));
const Order = lazy(() => import('./pages/Order/Order'));
const OrderConfirmation = lazy(() => import('./pages/Order/OrderConfirmation'));
const Payment = lazy(() => import('./pages/Payment/Payment'))
const AccessorialPolicy = lazy(() => import('./pages/Accessorial Policy/AccessorialPolicy'))
const PaymentSuccess = lazy(() => import('./pages/Payment/PaymentSuccess'))

const UnauthorizedAccess = lazy(() => import('./Admin/components/UnauthorizedAccess'));

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function App() {

  const navigate = useNavigate();

  const handleNavigate = (path) => {
      startTransition(() => {
          navigate(path);
      });
  };

  return (
    <>
      <Toaster 
        position='bottom-center' 
        reverseOrder={false}
        gutter={8}
        toastOptions={{
            duration: 3000,
            success: {
              style: {
                background: '#4caf50',
                color: '#111827',
              },   
              iconTheme: {
                primary: '#111827',
                secondary: '#4caf50',
              },
            },
            error: {
              style: {
                background: '#f44336',
                color: '#111827',
              },
              iconTheme: {
                primary: '#111827',
                secondary: '#f44336',
              },
            },
        }} 
      />
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LazyComponentLoader component={Home} />} />
          <Route path="/services" element={<LazyComponentLoader component={Services} />} />
          <Route path="/aboutUs" element={<LazyComponentLoader component={AboutUs} />} />
          <Route path="/contactUs" element={<LazyComponentLoader component={ContactUs} />} />
          <Route path="/quote" element={<LazyComponentLoader component={Quote} />} />
          <Route path="/FTLquote" element={<LazyComponentLoader component={FTLQuote} />} />
          <Route path="/LTLquote" element={<LazyComponentLoader component={LTLQuote} />} />
          <Route path="/quoteCalculation" element={<LazyComponentLoader component={QuoteCalculation} />} />
          <Route path="/trackShipment" element={<LazyComponentLoader component={TrackShipment} />} />
          <Route path="/tracking-details" element={<LazyComponentLoader component={TrackingDetails} />} />
          <Route path="/order" element={<LazyComponentLoader component={Order} />} />
          <Route path="/orderConfirmation" element={<LazyComponentLoader component={OrderConfirmation} />} />
          <Route path="/order-payment" element={<LazyComponentLoader component={Payment} />} />
          <Route path="/accessorial-policy" element={<LazyComponentLoader component={AccessorialPolicy} />} />
          <Route path="/payment-success" element={<LazyComponentLoader component={PaymentSuccess} />} />
        </Route>
        <Route path="/login" element={
          <AdminProvider>
            <LazyComponentLoader component={AdminLogin} />
          </AdminProvider>
        } />
        <Route path="/adminPanel" element={
          <AdminProvider>
            <LazyComponentLoader component={AdminPanel} />
          </AdminProvider>
        } />
        <Route path="/unauthorizedAccess" element={<LazyComponentLoader component={UnauthorizedAccess} />} />
      </Routes>
    </>
  );
}

export default App;

