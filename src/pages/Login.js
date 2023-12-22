import { useState } from "react";
import { useAuth } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { firebaseErrors } from "../utils/MessageErrors";
import { Alert } from "../components/Alert";
import logo from "../img/logo.png"


export function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState();
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    // handleChange, set the information of user when it changes.
    const handleChange = ({ target: { name, value } }) =>
        setUser({ ...user, [name]: value });

    // handleSubmit, call login from Firebase.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userAuth = await login(user.email, user.password);
            if (!userAuth.user.emailVerified) {
                await logout();
                var err =  new Error();
                err.code = "auth/not-verificated-email";
                throw err;
            }
            navigate('/');
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
                    LOGIN 
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

                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                    <Link to="/recover_password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Forgot your password?
                    </Link>
                </div>

                
            </form>
            <p className="my-4 text-sm text-slate-200 flex justify-between px-3">
                Don't have an account yet?
                <Link to="/signup" className="text-blue-500 hover:text-blue-700">
                Sign Up!
                </Link>
            </p>
        </div>
    );
}