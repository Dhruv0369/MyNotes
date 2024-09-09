import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; // Import the toast from sonner

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;

        // Check if passwords match
        if (password !== cpassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                // Show success toast notification
                toast.success('Successfully Signed Up!');

                // Save the auth token and user name in localStorage
                localStorage.setItem('token', json.authtoken);
                localStorage.setItem('userName', name);

                // Redirect to home page
                navigate("/");
            } else {
                // Show error toast notification with the specific error message
                toast.error(json.error || "An unexpected error occurred");
            }
        } catch (error) {
            // Handle network or other errors
            toast.error("An unexpected error occurred");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container mt-1'>
            <h2>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit} className='container mt-5'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={credentials.name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        aria-describedby="emailHelp"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                        minLength={6}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="cpassword"
                        name="cpassword"
                        value={credentials.cpassword}
                        onChange={onChange}
                        minLength={6}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
