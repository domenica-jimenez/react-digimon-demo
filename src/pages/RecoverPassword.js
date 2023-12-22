import { useState } from "react";
import { useAuth } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { firebaseErrors } from "../utils/MessageErrors";
import { Alert } from "../components/Alert";

export function RecoverPassword() {
    const [email, setEmain] = useState("");
    const [error, setError] = useState();
    const { recoverPassword } = useAuth();
    const navigate = useNavigate();

    // handleChange, save the information on email variable.
    const handleChange = ({ target: { value } }) =>
        setEmain(value);

    // handleSubmit, call recoverPassword from Firebase.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await recoverPassword(email);
            navigate('/notify');
        } catch (error) {
            setError(firebaseErrors(error.code));
        }
    }

    return (
    <div className="w-full max-w-md m-auto">
        {error && <Alert message={error}/>}
        <form onSubmit={handleSubmit} className="bg-stone-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-fold mb-2">Email</label>
                <input type="email" name="email" placeholder="email@example.com" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange} />
            </div>

            <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send</button>
                    <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Cancel
                    </Link>
                </div>
        </form>
    </div>
    );
}