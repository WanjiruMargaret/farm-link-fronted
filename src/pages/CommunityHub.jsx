import React, { useState } from 'react';
import './index.css'; // Import the consolidated CSS

const CommunityHub = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowModal(false);
    setFormData({ name: '', email: '' }); // Reset form
  };

  return (
    <div className="community-hub">
      <h1>Community Hub</h1>
      <button className="join-button" onClick={handleModalToggle}>
        Join the Community
      </button>
      {showModal && (
        <div className="modal">
          <h2>Join Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
          <button onClick={handleModalToggle}>Close</button>
        </div>
      )}
      <div className="community-info">
        <p>Connect with local farmers and share resources.</p>
      </div>
    </div>
  );
};

export default CommunityHub;