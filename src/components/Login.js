import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                toast.success('Logged in Successfully');
                
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken);
                navigate("/");

            } else {
                // Show error toast notification with the specific error message
                toast.error(json.error || "Invalid credentials");
            }
        } catch (error) {
            // Handle network or other errors
            toast.error("An unexpected error occurred");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='container mt-5'>
                <h2 className='mb-5'>Login To Continue to iNotebook</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={credentials.email}
                        onChange={onChange}
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={onChange}
                        name="password"
                        id="password"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;
