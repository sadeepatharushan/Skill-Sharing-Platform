import React from 'react';

const CourseCard = () => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '20px',
      padding: '25px',
      border: '1px solid #e1e1e1',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{ color: '#6a6f73', fontSize: '14px', marginBottom: '8px' }}>
        Development › Web Development › Web Development
      </div>
      
      {/* Title */}
      <h1 style={{
        fontSize: '32px',
        margin: '0 0 15px 0',
        color: '#1c1d1f',
        fontWeight: '700'
      }}>
        Complete web development course
      </h1>
      
      {/* Subtitle */}
      <p style={{
        fontSize: '18px',
        marginBottom: '15px',
        color: '#1c1d1f'
      }}>
        Only web development course that you will need. Covers HTML, CSS, Tailwind, Node, React, MongoDB, Prisma, Deployment etc
      </p>
      
      {/* Stats */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '15px',
        color: '#6a6f73',
        fontSize: '14px'
      }}>
        <span style={{ color: '#b4690e', fontWeight: 'bold' }}>★★★★★ 4.7</span>
        <span>(8,821 ratings)</span>
        <span>33,592 students</span>
      </div>
      
      {/* Details */}
      <div style={{
        marginBottom: '20px',
        color: '#6a6f73',
        fontSize: '14px'
      }}>
        <div>Created by <span style={{ color: '#5624d0' }}>Hitesh Choudhary</span></div>
        <div>Last updated 3/2025</div>
        <div>English English [Auto], Arabic [Auto], Liners</div>
      </div>
      
      {/* What You'll Learn */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{
          fontSize: '20px',
          margin: '0 0 15px 0',
          color: '#1c1d1f'
        }}>
          What you'll learn
        </h3>
        <ul style={{
          margin: 0,
          paddingLeft: '20px',
          listStyleType: 'none'
        }}>
          {['Become a full stack developer', 'Build any project for your company', 'Explore related topics'].map((item, i) => (
            <li key={i} style={{
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '10px', color: '#5624d0' }}>•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Call to Action */}
      <div style={{
        display: 'flex',
        gap: '15px',
        flexDirection: window.innerWidth < 640 ? 'column' : 'row'
      }}>
        <button style={{
          backgroundColor: '#5624d0',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '4px',
          fontWeight: '500',
          border: 'none',
          cursor: 'pointer'
        }}>
          Enroll Now
        </button>
        <button style={{
          backgroundColor: 'transparent',
          color: '#5624d0',
          padding: '12px 24px',
          borderRadius: '4px',
          fontWeight: '500',
          border: '1px solid #5624d0',
          cursor: 'pointer'
        }}>
          Preview Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;