/**
 * NavOverlay Component
 * Renders the mobile navigation overlay backdrop
 */
import React from 'react';

interface NavOverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

export const NavOverlay: React.FC<NavOverlayProps> = ({ isOpen, onClick }) => {
  return (
    <div 
      className={`md:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity z-40
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClick}
    />
  );
};