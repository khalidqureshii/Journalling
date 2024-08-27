import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import NewEntry from './pages/NewEntry';
import Home from './pages/Home';
import ViewEntries from './pages/ViewEntries';
import Header from './components/Header.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/newEntry' element={<NewEntry />} />
          <Route path='/viewEntries' element={<ViewEntries />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
