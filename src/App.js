import { AuthProvider } from "./contexts/authContext";
import AppRouter from './routes'



const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
