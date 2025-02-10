'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, HeartFill, Bookmark, BookmarkFill } from 'react-bootstrap-icons';
import Header from '@/pages/Header'; // Correct Import Path

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [likedBlogs, setLikedBlogs] = useState({});
    const [savedBlogs, setSavedBlogs] = useState({});
    const router = useRouter(); // Router for navigation

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/viewBlog', { cache: "no-store" });
                const data = await response.json();

                if (response.ok) {
                    setBlogs(data.blogs);
                } else {
                    console.error("Error fetching blogs:", data.message);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchBlogs();
    }, []);

    // Toggle Like
    const toggleLike = (id) => {
        setLikedBlogs((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Toggle Save
    const toggleSave = (id) => {
        setSavedBlogs((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Navigate to Blog Details Page
    const goToBlogDetails = (id) => {
        router.push(`/blog/${id}`);
    };

    return (
        <div className='m-4'>
            <div className="container">
                {/* <h2 className="text-center my-4"></h2> */}
                <div className="row">
                    {blogs.length > 0 ? (
                        blogs.slice(0,4).map((blog) => (
                            <div key={blog.id} className="col mb-4">
                                <div className="card shadow">
                                    {/* Clickable Image */}
                                    <img 
                                        src={blog.media ? blog.media : "/default.jpg"} 
                                        alt={blog.title} 
                                        className="card-img-top"
                                        style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
                                        onClick={() => goToBlogDetails(blog.id)}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{blog.title}</h5>
                                        {/* <p className="card-text">{blog.description}</p> */}
                                        {/* <p className="text-muted mb-2">
                                            <strong>By: {blog.username || "Unknown"}</strong>
                                        </p> */}
                                        {/* <small className="text-muted d-block mb-3">
                                            {blog.date ? new Date(blog.date).toLocaleDateString() : "No date"}
                                        </small> */}
                                        <div className="d-flex justify-content-between">
                                            <span 
                                                onClick={() => toggleLike(blog.id)} 
                                                style={{ cursor: "pointer", fontSize: "20px" }}
                                            >
                                                {likedBlogs[blog.id] ? <HeartFill color="red" /> : <Heart />}
                                            </span>
                                            <span 
                                                onClick={() => toggleSave(blog.id)} 
                                                style={{ cursor: "pointer", fontSize: "20px" }}
                                            >
                                                {savedBlogs[blog.id] ? <BookmarkFill color="blue" /> : <Bookmark />}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No blogs available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blog