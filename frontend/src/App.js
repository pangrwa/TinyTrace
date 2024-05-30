import './App.css';
import Navbar from './components/Navbar';
import AuthProvider from './contexts/AuthContext';
import Routes from './routes/Routes';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
