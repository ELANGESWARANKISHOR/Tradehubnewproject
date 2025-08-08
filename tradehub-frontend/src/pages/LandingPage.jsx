import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Sparkle, Truck, Tag, Users, Package, Star } from 'lucide-react';
import './LandingPage.css';

// This is the complete Landing Page component with the updated feedback functionality.
const LandingPage = () => {
  const initialReviews = [
    { id: '1', name: "Bole", stars: 5, text: "Trade Hub has revolutionized how we source our home supplies. The platform is user-friendly and the quality of products is exceptional." },
    { id: '2', name: "Aagayan", stars: 5, text: "The variety of suppliers on Trade Hub is impressive. We found a unique supplier for our boutique that we wouldn't have discovered otherwise. The service is reliable." },
    { id: '3', name: "Malveda", stars: 5, text: "Our partnership with Trade Hub has significantly increased our brand visibility and sales. Their support team is always responsive and helpful." }
  ];

  const [reviews, setReviews] = useState(initialReviews);
  const [newFeedback, setNewFeedback] = useState("");
  const [userName, setUserName] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // State for hover effect
  const [message, setMessage] = useState('');

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();
    if (newFeedback.trim() === '' || userName.trim() === '' || starRating === 0) {
      setMessage('Please fill in your name, select a star rating, and write your feedback.');
      return;
    }
    
    const newReview = {
      id: crypto.randomUUID(), 
      name: userName,
      stars: starRating,
      text: newFeedback
    };

    setReviews(prevReviews => [...prevReviews, newReview]);
    setNewFeedback("");
    setUserName("");
    setStarRating(0);
    setMessage('Thank you for your feedback!');
  };

  // Function to render stars based on a rating value
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          fill={i <= rating ? '#FFD700' : 'none'}
          stroke={i <= rating ? '#FFD700' : '#4b5563'}
          size={20}
          className="cursor-pointer transition-colors duration-200"
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setStarRating(i)}
        />
      );
    }
    return stars;
  };

  return (
    <div className="landing-page-container">
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <Sparkle className="text-blue-600" size={28} />
            <div className="logo-text">Trade Hub</div>
          </div>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact Us</a>
            <a href="#feedback">Feedback</a>
          </nav>
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup-buyer" className="signup-btn">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Connect with a global network of businesses</h1>
          <div className="hero-buttons">
            <Link to="/signup-buyer" className="join-btn">Join as Buyer</Link>
            <Link to="/signup-buyer" className="join-btn">Join as Seller</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section text-center">
        <div className="container">
          <h2 className="section-title">About Trade Hub</h2>
          <p className="section-text">
            Trade Hub is a leading platform connecting businesses of all sizes. We provide a comprehensive suite of tools and resources to help you grow your business and connect with customers all across the world.
          </p>
          <h2 className="section-subtitle">Why Trade Hub?</h2>
          <p className="section-text">
            Trade Hub helps businesses...
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-gray">
        <div className="container">
          <h2 className="section-title text-center">Benefits of Trade Hub</h2>
          <div className="card-grid">
            <div className="card">
              <Truck className="card-icon" size={48} />
              <h3 className="card-title">For Buyers</h3>
              <p className="card-text">Access to a diverse range of products and suppliers...</p>
            </div>
            <div className="card">
              <Tag className="card-icon" size={48} />
              <h3 className="card-title">For Sellers</h3>
              <p className="card-text">Reach a global audience of potential customers...</p>
            </div>
            <div className="card">
              <Users className="card-icon" size={48} />
              <h3 className="card-title">For Partners</h3>
              <p className="card-text">Collaborate with us to expand your reach...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">Featured Products</h2>
          <div className="card-grid">
            <div className="card">
              <img src="https://placehold.co/400x300/a3e635/0f172a?text=Apples" alt="Organic Apples" className="product-image" />
              <h3 className="card-title">Organic Apples</h3>
              <p className="card-text">Organic apples are known for their fresh...</p>
            </div>
            <div className="card">
              <img src="https://placehold.co/400x300/e0e7ff/0f172a?text=Fresh+Milk" alt="Fresh Milk" className="product-image" />
              <h3 className="card-title">Fresh Milk</h3>
              <p className="card-text">Sourced from local farms with our unique...</p>
            </div>
            <div className="card">
              <img src="https://placehold.co/400x300/fecaca/0f172a?text=Notebook" alt="Notebook" className="product-image" />
              <h3 className="card-title">Notebook</h3>
              <p className="card-text">Our notebook is perfect for all your needs...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section bg-gray">
        <div className="container">
          <h2 className="section-title text-center">Reviews</h2>
          <div className="reviews-grid">
            {reviews.map(review => (
              <div className="review-card" key={review.id}>
                <div className="review-stars-display flex">
                  {/* Display stars based on the review rating */}
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      fill={i < review.stars ? '#FFD700' : 'none'}
                      stroke={i < review.stars ? '#FFD700' : '#4b5563'}
                      size={20}
                    />
                  ))}
                </div>
                <p className="review-text">"{review.text}"</p>
                <h4 className="review-author">- {review.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="feedback-form-container">
        <div className="container">
          <h2 className="section-title text-center">Submit Feedback</h2>
          <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="feedback-input"
              />
            </div>
            <div className="form-group">
              <div className="star-rating-container">
                <div className="star-rating">
                  {renderStars(hoverRating || starRating)}
                </div>
              </div>
            </div>
            <div className="form-group">
              <textarea
                placeholder="Write your feedback..."
                required
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                className="feedback-textarea"
              ></textarea>
            </div>
            <button
              type="submit"
              className="feedback-button"
            >
              Submit Feedback
            </button>
            {message && (
              <p className={message.includes('Please') ? 'message-error' : 'message-success'}>
                {message}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-links">
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
          <p className="text-sm">&copy; 2024 Trade Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

