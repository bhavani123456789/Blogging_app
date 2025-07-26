import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = () => {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    content: '',
    category_id: '',
    created_at: '',
    updated_at: '',
    status: '',
  });

  const [blogs, setBlogs] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      created_at: formData.created_at ? new Date(formData.created_at).toISOString() : null,
      updated_at: formData.updated_at ? new Date(formData.updated_at).toISOString() : null,
    };

    axios.post('http://localhost:8000/blogs/', formattedData)
      .then(res => {
        alert("Blog submitted successfully!");
        setBlogs(prev => [...prev, res.data]);
        setFormData({
          image: '',
          title: '',
          content: '',
          category_id: '',
          created_at: '',
          updated_at: '',
          status: '',
        });
      })
      .catch(err => {
        console.error("Submit error:", err.response?.data || err.message);
        alert("Error submitting blog. Check console for details.");
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Submit a Blog</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" style={styles.input} />
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" style={styles.input} />
        <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" style={styles.textarea} />
        <input type="number" name="category_id" value={formData.category_id} onChange={handleChange} placeholder="Category ID" style={styles.input} />
        <input type="date" name="created_at" value={formData.created_at} onChange={handleChange} style={styles.input} />
        <input type="date" name="updated_at" value={formData.updated_at} onChange={handleChange} style={styles.input} />
        <select name="status" value={formData.status} onChange={handleChange} style={styles.input}>
          <option value="">Select Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <button type="submit" style={styles.button}>Submit Blog</button>
      </form>

      <h3 style={styles.heading}>Blogs</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Content</th>
            <th>Category ID</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={index}>
              <td><img src={blog.image} alt="blog" width="80" /></td>
              <td>{blog.title}</td>
              <td>{blog.content}</td>
              <td>{blog.category_id}</td>
              <td>{blog.created_at}</td>
              <td>{blog.updated_at}</td>
              <td>{blog.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ✅ Inline CSS styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1rem'
  },
  form: {
    display: 'grid',
    gap: '1rem',
    marginBottom: '2rem'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    height: '100px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    border: '1px solid #ccc'
  },
  td: {
    padding: '10px',
    border: '1px solid #ccc'
  }
};

export default BlogForm;
