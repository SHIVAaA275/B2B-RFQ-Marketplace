import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import AuthContext from "../context/AuthContext";

function Login() {

    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [successMessage, setSuccessMessage] = useState(
        location.state?.message || ""
    );

    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            console.log("LOGIN RESPONSE:", response.data);
            console.log("USER ROLE:", response.data.user.role);

            const user = response.data.user;    


            setUser(user);

            setSuccessMessage(response.data.message);

            if (user.role === "buyer") {
                navigate("/buyer");
            } else if (user.role === "supplier") {
                navigate("/supplier");
            }

            setEmail("");
            setPassword("");

        } catch (error) {
            console.log(error.response?.data);

            setErrorMessage(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Login
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Login to your RFQ Marketplace account
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
                    onSubmit={handleLogin}
                >

                    <div className="mb-4">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div className="mb-4">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="w-full mb-4 hover:text-black text-blue-600 mt-4 text-center cursor-pointer"
                    >
                        Don't have an account? Register
                    </button>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;