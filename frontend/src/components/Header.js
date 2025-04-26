import React from 'react';

const Header = () => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 0',
      borderBottom: '1px solid #eee'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ fontSize: '28px', margin: '0', color: '#4a4a8a' }}>SkillShare</h1>
        <span style={{ fontSize: '16px', marginLeft: '10px', color: '#888' }}>Connect. Learn. Grow.</span>
      </div>
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: '0', padding: '0' }}>
          <li><a href=" " style={{ textDecoration: 'none', color: '#4a4a8a' }}>Home</a></li>
          <li><a href=" " style={{ textDecoration: 'none', color: '#666' }}>Courses</a></li>
          <li><a href=" " style={{ textDecoration: 'none', color: '#666' }}>Teach</a></li>
          <li><a href=" " style={{ textDecoration: 'none', color: '#666' }}>About</a></li>
        </ul>
      </nav>
      <div>
        <button style={{
          backgroundColor: 'transparent',
          border: '1px solid #4a4a8a',
          borderRadius: '4px',
          padding: '8px 16px',
          marginRight: '10px',
          cursor: 'pointer',
          color: '#4a4a8a'
        }}>
          Log In
        </button>
        <button style={{
          backgroundColor: '#4a4a8a',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 16px',
          cursor: 'pointer',
          color: 'white'
        }}>
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;