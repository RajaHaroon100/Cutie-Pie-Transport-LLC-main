import Header from './components/header';
import TopBanner from './components/headBanner';
import Footer from './components/footer';
import BottomBanner from './components/footBanner';

import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <TopBanner />
      <Header />
      <Outlet />
      <Footer />
      <BottomBanner />
    </>
  );
}