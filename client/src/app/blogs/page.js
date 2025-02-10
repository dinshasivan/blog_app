'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, HeartFill, Bookmark, BookmarkFill } from 'react-bootstrap-icons';
import Header from '@/pages/Header';
import Footer from '@/pages/Footer';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [likedBlogs, setLikedBlogs] = useState({});
    const [savedBlogs, setSavedBlogs] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/viewBlog', { cache: 'no-store' });
                const data = await response.json();
                if (response.ok) {
                    setBlogs(data.blogs);
                } else {
                    console.error('Error fetching blogs:', data.message);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchBlogs();
    }, []);

    const toggleLike = (id) => {
        setLikedBlogs((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleSave = (id) => {
        setSavedBlogs((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const goToBlogDetails = (id) => {
        router.push(`/blog/${id}`);
    };

    return (
        <div>
            <Header />
            <div className="container">
                <h2 className="text-center my-4">Latest Blogs</h2>
                <div className="blog-grid">
                    {blogs.length > 0 ? (
                        blogs.map((blog, index) => (
                            <div key={blog.id} className={`blog-item ${index === 1 ? 'main-blog' : ''}`}>
                                <div className="blog-image" onClick={() => goToBlogDetails(blog.id)}>
                                    <img src={blog.media || '/default.jpg'} alt={blog.title} />
                                </div>
                                <div className="blog-content">
                                    <h5>{blog.title}</h5>
                                    <p>{blog.description}</p>
                                    <p className="text-muted">
                                        <strong>By: {blog.username || 'Unknown'}</strong>
                                    </p>
                                    <small className="text-muted">
                                        {blog.date ? new Date(blog.date).toLocaleDateString() : 'No date'}
                                    </small>
                                    <div className="icons">
                                        <span onClick={() => toggleLike(blog.id)}>
                                            {likedBlogs[blog.id] ? <HeartFill color="red" /> : <Heart />}
                                        </span>
                                        <span onClick={() => toggleSave(blog.id)}>
                                            {savedBlogs[blog.id] ? <BookmarkFill color="blue" /> : <Bookmark />}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No blogs available.</p>
                    )}
                </div>
            </div>

            <style jsx>{`
                .blog-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                }
                .blog-item {
                    background: white;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s;
                }
                .blog-item:hover {
                    transform: scale(1.02);
                }
                .main-blog {
                    grid-column: span 2;
                }
                .blog-image img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    cursor: pointer;
                }
                .blog-content {
                    padding: 15px;
                }
                .icons span {
                    cursor: pointer;
                    font-size: 20px;
                    margin-right: 10px;
                }
            `}</style>
             <Footer/>
        </div>
       
    );
};

export default BlogList;
