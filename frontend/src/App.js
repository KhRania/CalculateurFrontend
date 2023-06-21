import Auth from "./components/Auth";
import Sidebar from "./components/Sidebar";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
function App() {
  return (
    <> 
      <Sidebar />
      <Routes>
      <Route path='/' exact element={<Auth />} />
      </Routes>
      
      <Routes>
        
        <Route path='/Home' element={<Home />} />
        <Route path='/Profile' element={<Profile/>} />

      </Routes>
      
    </>
  );
}

export default App;
