import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="flex pt-16">
        <Nav isMenuOpen={isMenuOpen} />

        <main className={`flex-1 ${isMenuOpen ? 'ml-64' : 'ml-20'} py-8 px-16 transition-all duration-300 overflow-y-auto scrollbar-custom h-[calc(100vh-4rem)]`}>
          <div className="space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;