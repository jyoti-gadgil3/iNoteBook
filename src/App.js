import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
        <Route index exact path='/' element={<Home />}/>
        <Route exact path='/about' element={<About />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
