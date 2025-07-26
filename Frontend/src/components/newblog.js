import React, { useState } from "react";
import axios from "axios";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/blogs/", formData);
      console.log("Blog submitted successfully:", response.data);
      alert("Blog submitted successfully!");
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Submit a Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Category</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />

        <label>Content</label>
        <textarea name="content" value={formData.content} onChange={handleChange} required />

        <label>Tags (comma separated)</label>
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} />

        <label>Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
