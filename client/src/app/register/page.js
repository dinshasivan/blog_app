'use client';

import { useState } from 'react';
import Link from 'next/link';

const Register = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullname: formData.fullname,
                    username: formData.username,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ Registration Successful!');
            } else {
                alert(`❌ Error: ${data.error}`);
            }
        } catch (error) {
            alert('❌ Failed to register');
        }
    };

    return (
        <div className="bg-light">
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <div className="row w-100 shadow-lg rounded overflow-hidden">
                    <div className="col-md-6 p-0">
                        <img src="/pictures/Food.jpg" alt="Food" className="img-fluid h-100 w-100 object-fit-cover" />
                    </div>

                    <div className="col-md-6 bg-white p-5">
                        <form onSubmit={handleSubmit}>
                            <h1 className="mb-4 text-center">Sign Up</h1>

                            <div className="mb-3">
                                <label htmlFor="fullname" className="form-label">Full Name:</label>
                                <input type="text" className="form-control" id="fullname" value={formData.fullname} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username:</label>
                                <input type="text" className="form-control" id="username" value={formData.username} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                                <input type="password" className="form-control" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                            </div>

                            <div className="mb-3 text-center">
                                <button type="submit" className="btn btn-success w-100">Sign Up</button>
                            </div>

                            <div className="text-center">
                                <p>Already have an account? <Link href={'/login'} className="text-decoration-none">Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
