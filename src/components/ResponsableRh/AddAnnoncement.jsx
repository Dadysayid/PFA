import React, { useState } from 'react';

function AddAnnoncement() {
  const [announcementData, setAnnouncementData] = useState({
    title: '',
    content: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/v1/annocement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(announcementData)
      });

      if (!response.ok) {
        throw new Error('Failed to add announcement');
      }

      // Clear the form after successful submission
      setAnnouncementData({ title: '', content: '' });
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  return (
    <div className="container" style={{ marginTop: 20 }}>
      <div className="card">
        <div className="card-header" style={{ backgroundColor: "#007bff", color: "#fff" }}>
          Add Announcement
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={announcementData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                className="form-control"
                name="content"
                value={announcementData.content}
                onChange={handleInputChange}
                rows="6"
                required
              />
            </div>
            <div className="text-center" style={{marginTop:15}}>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}




export default AddAnnoncement
