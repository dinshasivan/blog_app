'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ Login Successful!');
                localStorage.setItem('user', JSON.stringify({ username: data.username }));
                router.push('/')
                // Redirect to another page or store session
            } else {
                alert(`❌ Error: ${data.error}`);
            }
        } catch (error) {
            alert('❌ Login failed');
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
                            <h1 className="mb-4 text-center">Login</h1>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username:</label>
                                <input type="text" className="form-control" id="username" value={formData.username} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} required />
                            </div>
                            <div className="mb-3 text-end">
                                <Link href="#" className="text-decoration-none">Forgotten Password?</Link>
                            </div>
                            <div className="mb-3 text-center">
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </div>
                            <div className="text-center">
                                <p>Don't have an account? <Link href="/register" className="text-decoration-none">Sign Up</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
