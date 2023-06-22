import Auth from "./components/Auth";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/projects/Home";
import Profile from "./pages/Profile";
function App() {
  return (
    <> 
      
     
      <Routes>
        <Route path='/'  element={<Auth />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Profile' element={<Profile />} />
      </Routes>
      
    </>
  );
}

export default App;
