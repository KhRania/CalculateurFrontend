import Auth from "./components/Auth";
import {Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import ProjectCreation from "./components/ProjectCreation";


function App() {
  return (
    <> 
      <Routes>
        <Route path='/'  element={<Auth />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/createProject' element={<ProjectCreation />} />
      </Routes> 
    </>
  );
}

export default App;
