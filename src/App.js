import Header from "./components/header";
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Resgister';
import Profile from './pages/Profile';
import UserProvider from './context/user';

function App() {
  return (
    <div >


   <UserProvider  >
    <BrowserRouter>
      <Header />
      <div  className="container col-5">
      <Routes  >
      
        <Route path="/auth/login"  element={<Login />} />
        <Route path="/auth/register"  element={<Register />} />
        <Route path="/profile"  element={<Profile />} />
        <Route path="/"  element={<Home />} />
      </Routes >
      </div>
    </BrowserRouter>

    </UserProvider>
      
    </div>
  );
}

export default App;
