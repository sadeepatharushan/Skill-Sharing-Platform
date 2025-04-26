import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import web from '../images/web.jpg';
import ma from '../images/ma.jpg';
import ui from '../images/ui.jpg';
import spa from '../images/spa.jpg';
import de from '../images/de.jpg';
import le from '../images/le.png';
import background from '../images/background.jpg';
import HowItWorks from '../components/HowItWorks';


const SkillSharingPlatform = () => {
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'tech', name: 'Technology' },
    { id: 'business', name: 'Business' },
    { id: 'design', name: 'Design' },
    { id: 'language', name: 'Languages' },
    { id: 'health', name: 'Health & Fitness' }
  ];

  const featuredCourses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      instructor: 'Sarah Johnson',
      category: 'tech',
      rating: 4.8,
      students: 1245,
      price: 49.99,
      image: web,
    
    },
    {
      id: 2,
      title: 'Digital Marketing Fundamentals',
      instructor: 'Michael Brown',
      category: 'business',
      rating: 4.7,
      students: 987,
      image: ma,
      price: 39.99
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Emma Wilson',
      category: 'design',
      rating: 4.9,
      students: 756,
      image: ui,
      price: 59.99
    },
    {
      id: 4,
      title: 'Spanish for Beginners',
      instructor: 'Carlos Rodriguez',
      category: 'language',
      rating: 4.6,
      students: 542,
      image: spa,
      price: 29.99
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? featuredCourses 
    : featuredCourses.filter(course => course.category === selectedCategory);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    }}>
      <Header />

      {/* Hero Section */}
<section
  style={{
    display: "flex",
    alignItems: "center",
    padding: "60px 0",
    borderRadius: "10px",
    margin: "30px 0",
    backgroundImage: `url(${background})`, // Only the image as background
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div style={{ flex: 1, padding: "0 20px" }}>
    <h2 style={{ fontSize: "42px", marginBottom: "20px", color: "black" }}>
      Learn from experts,<br />
      grow your skills
    </h2>
    {/* <p
      style={{
        fontSize: "18px",
        marginBottom: "30px",
        color: "black",
        lineHeight: "1.6",
      }}
    >
      Join our community of learners and instructors. Access thousands of
      courses on various topics and enhance your skills at your own pace.
    </p> */}
    <div style={{ display: "flex", gap: "15px" }}>
      <button
        style={{
          backgroundColor: "#4a4a8a",
          border: "none",
          borderRadius: "4px",
          padding: "12px 24px",
          cursor: "pointer",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Explore Courses
      </button>
      <button
        style={{
          backgroundColor: "transparent",
          border: "1px solid #4a4a8a",
          borderRadius: "4px",
          padding: "12px 24px",
          cursor: "pointer",
          color: "#4a4a8a",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Become an Instructor
      </button>
    </div>
  </div>
</section>


      {/* Featured Courses */}
      <section style={{ padding: '40px 0' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '30px', textAlign: 'center' }}>Featured Courses</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          {categories.map(category => (
            <button 
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                backgroundColor: selectedCategory === category.id ? '#4a4a8a' : 'transparent',
                color: selectedCategory === category.id ? 'white' : '#666',
                border: selectedCategory === category.id ? 'none' : '1px solid #ddd',
                borderRadius: '20px',
                padding: '8px 16px',
                margin: '0 5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '20px' }}>
          {filteredCourses.map(course => (
            <div key={course.id} style={{
              border: '1px solid #eee',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              backgroundColor: 'white'
            }}>
              <img src={course.image} alt={course.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <div style={{ padding: '15px' }}>
                <h3 style={{ fontSize: '18px', margin: '0 0 10px 0' }}>{course.title}</h3>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>Instructor: {course.instructor}</p>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ color: '#f8c51c', marginRight: '5px' }}>★</span>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{course.rating}</span>
                  <span style={{ color: '#666', fontSize: '14px', marginLeft: '5px' }}>({course.students} students)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '18px' }}>${course.price}</span>
                  <button style={{
                    backgroundColor: '#4a4a8a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        backgroundColor: '#f9f9ff',
        padding: '40px',
        borderRadius: '20px',
        margin: '40px 0',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '28px', marginBottom: '40px' }}>Why Choose SkillShare?</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#4a4a8a', marginBottom: '10px' }}>10K+</div>
            <p style={{ fontSize: '18px', color: '#666' }}>Online Courses</p>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#4a4a8a', marginBottom: '10px' }}>8M+</div>
            <p style={{ fontSize: '18px', color: '#666' }}>Students</p>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#4a4a8a', marginBottom: '10px' }}>200+</div>
            <p style={{ fontSize: '18px', color: '#666' }}>Expert Instructors</p>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#4a4a8a', marginBottom: '10px' }}>4.8</div>
            <p style={{ fontSize: '18px', color: '#666' }}>Average Rating</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

     

      {/* Testimonials */}
      <section style={{ padding: '40px 0' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '40px', textAlign: 'center' }}>What Our Students Say</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ 
            flex: 1, 
            minWidth: '300px', 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '25px', 
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            border: '1px solid #eee'
          }}>
            <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
              "SkillShare has completely transformed my career. The courses are comprehensive and well-structured, and the instructors are top-notch professionals in their fields."
            </p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                backgroundColor: '#ddd', 
                marginRight: '15px',
                overflow: 'hidden'
              }}>
                <img src={de} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h4 style={{ margin: '0', fontSize: '16px' }}>David Wilson</h4>
                <p style={{ margin: '0', fontSize: '14px', color: '#888' }}>Software Developer</p>
              </div>
            </div>
          </div>
          <div style={{ 
            flex: 1, 
            minWidth: '300px', 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '25px', 
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            border: '1px solid #eee'
          }}>
            <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
              "I've tried many online learning platforms, but SkillShare stands out with its intuitive interface and high-quality content. I've learned so much in just a few months!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                backgroundColor: '#ddd', 
                marginRight: '15px',
                overflow: 'hidden'
              }}>
                <img src={le} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h4 style={{ margin: '0', fontSize: '16px' }}>Jennifer Lee</h4>
                <p style={{ margin: '0', fontSize: '14px', color: '#888' }}>Graphic Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{
        backgroundColor: '#4a4a8a',
        padding: '40px',
        borderRadius: '10px',
        margin: '40px 0',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Join Our Newsletter</h2>
        <p style={{ fontSize: '16px', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px auto' }}>
          Stay updated with the latest courses, promotions, and learning tips. No spam, we promise!
        </p>
        <form onSubmit={handleSubscribe} style={{ display: 'flex', maxWidth: '500px', margin: '0 auto' }}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={handleEmailChange}
            required
            style={{
              flex: '1',
              padding: '12px 15px',
              fontSize: '16px',
              borderRadius: '4px 0 0 4px',
              border: 'none',
              outline: 'none'
            }}
          />
          <button 
            type="submit"
            style={{
              backgroundColor: '#f8c51c',
              color: '#333',
              border: 'none',
              borderRadius: '0 4px 4px 0',
              padding: '12px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Subscribe
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default SkillSharingPlatform;