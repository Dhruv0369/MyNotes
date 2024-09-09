import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import userProfileImg from '../assets/profile.png'; // Import the profile image

const Profile = () => {
    let navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Retrieve the user's name from localStorage
        const name = localStorage.getItem('userName');
        setUserName(name || 'Guest'); // Default to 'Guest' if no name is found
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName'); // Remove the userName as well
        navigate('/login');
        toast.success("Logged out successfully");
    };

    return (
        <div
            className="card"
            style={{
                maxWidth: '300px',
                margin: 'auto',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div
                className="card-header"
                style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                {/* Display user name */}
                <h4>Profile</h4>
            </div>
            <div
                className="card-body"
                style={{ textAlign: 'center' }}
            >
                <img
                    src={userProfileImg}
                    alt="Profile"
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        margin: '20px auto',
                        backgroundColor: '#ccc',
                    }}
                />
                <h5 className="card-title">{userName}</h5>
                <i onClick={handleLogout} className="fa-solid fa-right-from-bracket"></i>
            </div>
        </div>
    );
};

export default Profile;
