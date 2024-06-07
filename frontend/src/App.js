import './App.css';
import AuthProvider from './contexts/AuthContext';
import PageProvider from './contexts/PageContext';
import UrlProvider from './contexts/UrlContext';
import Routes from './routes/Routes';

function App() {
  return (
    <AuthProvider>
      <UrlProvider>
        <PageProvider>
          <Routes />
        </PageProvider>
      </UrlProvider>
    </AuthProvider>
  );
}

export default App;
