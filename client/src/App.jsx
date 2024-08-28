import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import NewEntry from './pages/NewEntry';
import Home from './pages/Home';
import Header from './components/Header.jsx';
import PreHome from './pages/PreHome.jsx';
import ViewEntry from './pages/ViewEntry.jsx';
import Auth, { AuthProvider } from './store/Auth.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<PreHome />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/newEntry' element={<NewEntry />} />
          <Route path='/viewEntry' element={<ViewEntry />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
