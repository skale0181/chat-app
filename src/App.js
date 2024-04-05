import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Signup } from "./pages/signup/Signup";
import { Login } from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import { AuthRoutes } from "./privateRoutes/AuthRoutes";


function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<AuthRoutes><Home/></AuthRoutes>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
