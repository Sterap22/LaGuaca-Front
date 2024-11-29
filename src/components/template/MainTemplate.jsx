import React from 'react';
import Navbar from '../organisms/Navbar';

const MainTemplate = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header >
        <Navbar />
      </header>
      <main className="pt-8">
        {children}
      </main>
      <footer className="bg-blue-600 py-4 text-white text-center">
        <p>&copy; 2024 bar la guaca. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default MainTemplate;