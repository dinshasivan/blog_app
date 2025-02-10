'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowLeft, Heart, HeartFill, Bookmark, BookmarkFill } from 'react-bootstrap-icons';

export default function BlogDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (!id) {
            setError("Blog ID not found in URL");
            setLoading(false);
            return;
        }

        async function fetchBlog() {
            try {
                const response = await fetch(`/api/viewBlog?id=${id}`);
                
                if (!response.ok) {
                    throw new Error('Blog not found');
                }

                const data = await response.json();
                
                const foundBlog = data.blogs.find(blog => blog.id === Number(id));

                if (!foundBlog) {
                    throw new Error('Blog not found');
                }

                setBlog(foundBlog);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBlog();
    }, [id]);

    const handleLike = () => setLiked(!liked);
    const handleSave = () => setSaved(!saved);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() !== "") {
            setComments([...comments, comment]);
            setComment("");
        }
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;

    return (
        <div className="container mt-5">
            {/* Back Button */}
            <button className="btn btn-dark mb-4 d-flex align-items-center" onClick={() => router.push('/blogs')}>
                <ArrowLeft className="me-2" /> Back to Blogs
            </button>

            {/* Blog Content */}
            <div className="row g-4">
                {/* Image Section */}
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <div className="border rounded p-3 shadow-sm">
                        <img src={blog?.media} alt={blog?.title} className="img-fluid rounded" />
                    </div>
                </div>

                {/* Description Section */}
                <div className="col-md-6">
                    <div className="border rounded p-4 shadow-sm">
                        <h1 className="text-dark">{blog?.title}</h1>
                        <p className="text-muted">{blog?.description}</p>
                        <p className="text-secondary">Published on: {new Date(blog?.created_at).toLocaleDateString()}</p>

                        {/* Like & Save Buttons */}
                        <div className="d-flex gap-3 mt-3">
                            <button className="btn btn-outline-danger d-flex align-items-center" onClick={handleLike}>
                                {liked ? <HeartFill className="me-2" /> : <Heart className="me-2" />} 
                                {liked ? 'Liked' : 'Like'}
                            </button>
                            <button className="btn btn-outline-success d-flex align-items-center" onClick={handleSave}>
                                {saved ? <BookmarkFill className="me-2" /> : <Bookmark className="me-2" />} 
                                {saved ? 'Saved' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="mt-5">
                <h3 className="mb-3">Comments</h3>

                {/* Comments List */}
                <ul className="list-group mb-3">
                    {comments.length === 0 ? (
                        <li className="list-group-item text-muted">No comments yet. Be the first to comment!</li>
                    ) : (
                        comments.map((cmt, index) => (
                            <li key={index} className="list-group-item">
                                 {cmt}
                            </li>
                        ))
                    )}
                </ul>

                {/* Comment Input */}
                <form onSubmit={handleCommentSubmit}>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Write a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Comment</button>
                </form>
            </div>
        </div>
    );
}
