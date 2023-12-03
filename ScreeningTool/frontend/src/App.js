import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        front-end placeholder
      </div>
    </ThemeProvider>
  );
}

export default App;
