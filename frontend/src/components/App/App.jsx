import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "../../pages/Home/Home";
import { Login } from "../../pages/Login/Login";
import { Signup } from "../../pages/Signup/Signup";
import { NotFound } from "../../pages/NotFound/NotFound";
import { Navbar } from "../Navbar/Navbar";
import { AuthProvider } from "../../firebase/Auth";
import { Map } from "../Map/Map";
import { Footer } from "../Footer/Footer";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/map" element={<Map />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
