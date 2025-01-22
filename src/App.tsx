import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationLayout } from './components/navigation/NavigationLayout';
import { AppRoutes } from './routes';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <NavigationLayout>
            <AppRoutes />
          </NavigationLayout>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;