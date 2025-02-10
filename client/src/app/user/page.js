"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/pages/Header"; // Ensure this import path is correct
import BlogList from "@/pages/BlogList";
import Footer from "@/pages/Footer";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    media: null,
    date: new Date().toISOString().slice(0, 10),
  });

  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      router.push("/login"); // Redirect if not logged in
    }
  }, [router]);

  if (!user) {
    return <p>Loading...</p>; // Show loading while fetching user data
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setBlogData((prev) => ({ ...prev, media: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username) {
      console.error("Username is missing");
      return;
    }

    const formData = new FormData();
    formData.append("username", user.username); //  Replace user ID with username
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("date", blogData.date);
    if (blogData.media) {
      formData.append("media", blogData.media);
    }

    //  Debugging: Log FormData content
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch("/api/addBlog", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Blog Added Successfully")
        console.log("Blog Submitted Successfully");
        setShowForm(false);
      } else {
        const errorData = await response.json();
        alert("Failed To Add Blog")
        console.error("Failed to submit blog:", errorData.message);
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <div>
      <Header /> {/* Display the Header component */}

      <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", textAlign: "center" }}>
        <button onClick={() => setShowForm(true)} style={buttonStyle}>
          Add Blog
        </button>
        <BlogList/>
        {/* <button onClick={() => router.push("/view-blogs")} style={buttonStyle}>
          View Blogs
        </button>
        <button onClick={() => router.push("/my-blogs")} style={buttonStyle}>
          View My Blogs
        </button> */}
      </div>

      {/* Popup Blog Form */}
      {showForm && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h2>Add Blog</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={blogData.title}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={blogData.description}
                onChange={handleInputChange}
                required
                style={textareaStyle}
              />
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                style={inputStyle}
              />
              <input
                type="date"
                name="date"
                value={blogData.date}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
              <button type="submit" style={buttonStyle}>
                Submit
              </button>
              <button
                onClick={() => setShowForm(false)}
                type="button"
                style={closeButtonStyle}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

const buttonStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
  height: "100px",
};

const closeButtonStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

export default UserPage;
