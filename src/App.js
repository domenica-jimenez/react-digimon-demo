import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { UserContext } from "./context/UserContext"; 
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { RecoverPassword } from "./pages/RecoverPassword";
import { ItemCard } from "./pages/ItemCard";
import { Notify } from "./components/Notify";

function App() {
  return (
    <div className="bg-emerald-950 h-screen text-black flex">
      <UserContext>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/recover_password" element={<RecoverPassword/>}/>
          <Route path="/notify" element={<Notify/>}/>
          <Route path="/digimon/:id" element={
            <ProtectedRoute>
              <ItemCard/>
            </ProtectedRoute>}/>
        </Routes>
      </UserContext>
    </div>
  );
}

export default App;
