import Auth from "./components/Auth";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/projects/Home";
import Profile from "./pages/Profile";
import ProjectCreation from "./pages/projects/ProjectCreation";


function App() {
  return (
    <> 
      
     
      <Routes>
        <Route path='/'  element={<Auth />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/createProject' element={<ProjectCreation />} />
      </Routes>
      
    </>
  );
}

export default App;
