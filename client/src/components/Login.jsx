import React from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Login = () => {
    const { showUserLogin, setShowUserLogin, setUser } = useAppContext();
    const [state, setState] = React.useState("Login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (state === "Login") {
            // For demo purposes just log in with the provided details
            setUser({ name: email.split('@')[0], email: email });
            toast.success("Login successful!");
        } else {
            // For signup
            if (!name) {
                toast.error("Please enter your name");
                return;
            }
            setUser({ name: name, email: email });
            toast.success("Account created successfully!");
        }
        setShowUserLogin(false);
    };

    return (
        <div 
            onClick={() => setShowUserLogin(false)} 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-center">{state}</h2>
                    <p className="text-gray-500 text-center mt-1">
                        {state === "Login" ? "Welcome back!" : "Create a new account"}
                    </p>

                    <form onSubmit={onSubmitHandler} className="mt-6 space-y-4">
                        {state === "Signup" && (
                            <div className="space-y-1">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    placeholder="Your name"
                                />
                            </div>
                        )}
                        
                        <div className="space-y-1">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>
                        
                        <div className="space-y-1">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                placeholder="******"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            {state === "Login" ? "Sign In" : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            {state === "Login" ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                className="font-medium text-green-600 hover:text-green-500"
                                onClick={() => setState(state === "Login" ? "Signup" : "Login")}
                            >
                                {state === "Login" ? "Sign up" : "Sign in"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;