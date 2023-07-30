
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About';
import Sign from './components/Sign';
import Notestate from './context/Notestate';
import Notes from './components/Notes';
import Enter from './components/Enter';

function App() {

  return (
    <>
    <Router>
    <Navbar/>
    <Notestate>

     <div className="container">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/sign' element={<Sign/>}/>
        <Route path='/logged' element={<Notes/>}/>
        <Route path='/enter' element={<Enter/>}/>
      </Routes>
      </div>
    </Notestate>
    </Router>
    </>
  );
}

export default App;
