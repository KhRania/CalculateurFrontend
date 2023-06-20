import Auth from "./components/Auth";
import Sidebar from "./components/Sidebar";
import {Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div> 
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/Myprojects' element={<Sidebar />} />
      </Routes>
    </div>
  );
}

export default App;
