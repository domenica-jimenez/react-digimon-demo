import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png"

export function Notify() {
    const navigate = useNavigate();

    // handleLogin, redirect to /login.
    const handleLogin = async (e) => {
        navigate('/login');
    }

    return (
        <div className="w-full max-w-md m-auto">
            <div className="bg-stone-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">

                <img src={logo} alt={"logo"} className="w-21 h-21 bg-stone-400 mb-4" />

                <span className="block text-center text-slate-900 text-lg font-bold py-4">
                    THANK YOU 
                </span>

                <p className="block text-center text-slate-900 pb-2">An email was sent. Please check your inbox.</p>

            </div>
            <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</button>
        </div>
    );
}