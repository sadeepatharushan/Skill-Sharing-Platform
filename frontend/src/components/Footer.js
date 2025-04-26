import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid #eee',
      padding: '40px 0',
      marginTop: '40px'
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>SkillShare</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            SkillShare is an online learning platform that helps you learn new skills and advance your career. Join millions of students worldwide.
          </p>
        </div>
        <div style={{ flex: '1', minWidth: '150px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Explore</h3>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            <li style={{ marginBottom: '10px' }}><a href=" " style={{ textDecoration: 'none', color: '#666' }}>All Courses</a></li>
            <li style={{ marginBottom: '10px' }}><a href=" " style={{ textDecoration: 'none', color: '#666' }}>Categories</a></li>
            <li style={{ marginBottom: '10px' }}><a href=" " style={{ textDecoration: 'none', color: '#666' }}>Pricing</a></li>
            <li style={{ marginBottom: '10px' }}><a href=" " style={{ textDecoration: 'none', color: '#666' }}>For Business</a></li>
          </ul>
        </div>
        <div style={{ flex: '1', minWidth: '150px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>For Instructors</h3>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            <li style={{ marginBottom: '10px' }}><a href=" " style={{ textDecoration: 'none', color: '#666' }}>Become an Instructor</a></li>
            <li style={{ marginBottom: '10px' }}><a href=" " style={{ textDecoration: 'none', color: '#666' }}>Instructor Guidelines</a></li>
            <li style={{ marginBottom: '10px' }}><a href=" " style={{ textDecoration: 'none', color: '#666' }}>Earnings</a></li>
            <li style={{ marginBottom: '10px' }}><a href=" " style={{ textDecoration: 'none', color: '#666' }}>Success Stories</a></li>
          </ul>
        </div>
        <div style={{ flex: '1', minWidth: '150px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Support</h3>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            <li style={{ marginBottom: '10px' }}><a href=" " style={{ textDecoration: 'none', color: '#666' }}>Contact Us</a></li>
            <li style={{ marginBottom: '10px' }}><a href=" " style={{ textDecoration: 'none', color: '#666' }}>FAQ</a></li>
            <li style={{ marginBottom: '10px' }}><a href=" " style={{ textDecoration: 'none', color: '#666' }}>Help Center</a></li>
            <li style={{ marginBottom: '10px' }}><a href=" " style={{ textDecoration: 'none', color: '#666' }}>Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div style={{ marginTop: '40px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
        <p>&copy; 2025 SkillShare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;