import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Addbook} from "./components/Addbook"
import { Allbooks} from "./components/Allbooks"
import { Deletebook} from "./components/Deletebook"
import { Searchbook} from "./components/Searchbook"
import { Updatebook} from "./components/Updatebook"


function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allbooks" element={<Allbooks />} />
            <Route path="/deletebook" element={<Deletebook />} />
            <Route path="/addbook" element={<Addbook />} />
            <Route path="/addbook" element={<Addbook/>} />
            <Route path="/searchbook" element={<Searchbook/>} />
            <Route path="/updatebook" element={<Updatebook/>} />
          </Routes>
        </div>
      </Router>
  </>
  );
}

export default App;
