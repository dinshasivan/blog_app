import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BlogList = () => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [editBlog, setEditBlog] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "", media: "" });

    const router = useRouter();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const parsedUser = JSON.parse(loggedInUser);
            setUser(parsedUser);
            fetchUserBlogs(parsedUser.username);
        } else {
            router.push("/login");
        }
    }, [router]);

    const fetchUserBlogs = async (username) => {
        try {
            const response = await fetch(`/api/viewBlog?username=${username}`);
            console.log(response);

            if (response.ok) {
                const data = await response.json();
                setBlogs(data.blogs.filter(blog => blog.username === username));
            } else {
                console.error("Failed to fetch user blogs");
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const handleEditClick = (blog) => {
        setEditBlog(blog);
        setFormData({ title: blog.title, description: blog.description, media: blog.media || "" });
    };

    const handleCloseModal = () => {
        setEditBlog(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editBlog) return;

        try {
            const response = await fetch(`/api/editBlog/${editBlog.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setBlogs(blogs.map(blog => (blog.id === editBlog.id ? { ...blog, ...formData } : blog)));
                handleCloseModal();
            } else {
                console.error("Failed to edit blog");
            }
        } catch (error) {
            console.error("Edit error:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            const response = await fetch(`/api/deleteBlog/${id}`, { method: "DELETE" });
            if (response.ok) {
                setBlogs(blogs.filter(blog => blog.id !== id));
            } else {
                console.error("Failed to delete blog");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="container">
            {/* <h2 className="text-center my-4">User Blogs</h2> */}
            <h2 className="text-center my-4">
                Welcome {user ? user.username : "Guest"}!
            </h2>
            <div className="cols">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div key={blog.id} className="col-md-4 mb-4 w-100">
                            <div className="card shadow">
                                <img
                                    src={blog.media ? blog.media : "/default.jpg"}
                                    alt={blog.title}
                                    className="card-img-top"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <p className="card-text">{blog.description}</p>
                                    <small className="text-muted">
                                        {blog.date ? new Date(blog.date).toLocaleDateString() : "No date"}
                                    </small>
                                    <div className="mt-3 d-flex justify-content-between">
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(blog)}>✏️ Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(blog.id)}>🗑️ Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No blogs available.</p>
                )}
            </div>

            {editBlog && (
                <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Blog</h5>
                                <button className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleEditSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Image URL</label>
                                        <input
                                            type="file"
                                            name="media"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button type="submit" className="btn btn-success">Save Changes</button>
                                        <button type="button" className="btn btn-secondary ms-2" onClick={handleCloseModal}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogList;
