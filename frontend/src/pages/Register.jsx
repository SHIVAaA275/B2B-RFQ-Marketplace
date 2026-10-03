import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await api.post("/auth/register", {
                name,
                email,
                password,
                role
            });

            setSuccessMessage(response.data.message);

            setName("");
            setEmail("");
            setPassword("");
            setRole("");

            navigate("/login", {
                state: {
                    message: response.data.message
                }
            });


        } catch (error) {
                setErrorMessage(error.response?.data?.message || "Registration failed");
            }
    };

    return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">

            <h1 className="text-3xl font-bold text-center text-gray-800">
                Create Account
            </h1>

            <p className="text-center text-gray-500 mt-2">
                Create your RFQ Marketplace account
            </p>

            {successMessage && (
                <p className="mt-4 text-center text-green-600">
                {successMessage}
                </p>
            )}

            {errorMessage && (
                <p className="mt-4 text-center text-red-600">
                {errorMessage}
                </p>
            )}

            <form
                className="mt-6"
                onSubmit={handleRegister}
            >

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                    </label>

                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>

                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                    </label>

                    <select
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select your role</option>
                        <option value="buyer">Buyer</option>
                        <option value="supplier">Supplier</option>
                    </select>
                </div>


                    
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-full text-blue-600 mb-4 text-center hover:text-black cursor-pointer"
                >
                    Already have an account? Login
                </button>
                

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                    Register
                </button>

            </form>

        </div>

    </div>
);
}

export default Register;