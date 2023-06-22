import Login from './component/Login';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './component/Signup';
import Dashboard from './component/Dashboard';

function App() {
  return (
    <>
     
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />


      </Routes>
    </>
  );
}

export default App;
