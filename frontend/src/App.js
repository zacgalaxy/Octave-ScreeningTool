import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
                <Routes>
                    {/* 
                    <Route path="/login" exact component={LoginPage} /> // This will be used for the login page
                    <Route path="/resetPassword/*" exact component={ResetPasswordPage} /> // This will be used to reset the user's password
                    <Route path="/activate/:verifyToken" component={ActivatePage} />  // This will be used for activating the user's account
                    */} 
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </Router>
    </ThemeProvider>
  );
}

export default App;
