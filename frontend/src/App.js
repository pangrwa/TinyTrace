import './App.css';
import Navbar from './components/Navbar';
import AuthProvider from './contexts/AuthContext';
import UrlProvider from './contexts/UrlContext';
import Routes from './routes/Routes';

function App() {
  return (
    <AuthProvider>
      <UrlProvider>
        <Routes />
      </UrlProvider>
    </AuthProvider>
  );
}

export default App;
