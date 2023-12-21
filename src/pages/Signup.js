import { useState } from "react";
import { useAuth } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { firebaseErrors } from "../utils/MessageErrors";
import { Alert } from "../components/Alert";
import logo from "../img/logo.png"

export function Signup() {
    const [userAuth, setUser] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState();
    const { signup, verifiedEmail } = useAuth();
    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) =>
        setUser({ ...userAuth, [name]: value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { user } = await signup(userAuth.email, userAuth.password);
            await verifiedEmail(user)
            navigate('/notify');
        } catch (error) {
            setError(firebaseErrors(error.code));
        }
    }

    return (
        <div className="w-full max-w-md m-auto">
            {error && <Alert message={error}/>}
            <form onSubmit={handleSubmit} className="bg-stone-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">

            <img src={logo} alt={"logo"} className="w-21 h-21 bg-stone-400 mb-4" />

            <span className="block text-center text-slate-900 text-lg font-bold py-4">
                SIGN UP 
            </span>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-fold mb-2">Email</label>
                    <input type="email" name="email" placeholder="email@example.com" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange} />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-fold mb-2">Password</label>
                    <input type="password" name="password" placeholder="********" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange} />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign up</button>
            </form>
            <p className="my-4 text-sm text-slate-200 flex justify-between px-3">
                Already have an Account?
                <Link to="/login" className="text-blue-500 hover:text-blue-700">
                Login
                </Link>
            </p>
        </div>
    );
}