import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
