import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/variables.css';
import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/layout.css';

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import AppRouter from './routes/AppRouter';
import ChatWidget from './components/chat/ChatWidget';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AppRouter />
          <ChatWidget />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
