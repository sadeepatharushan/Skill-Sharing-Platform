import React from 'react';
import h3 from '../images/h3.png';

const HowItWorks = () => {
  return (
    <section
      style={{
        padding: '60px 0',
        backgroundColor: '#f8f9fa',
      }}
    >
      <h2 style={{ fontSize: '32px', marginBottom: '40px', textAlign: 'center', color: '#333' }}>How It Works</h2>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '40px',
        flexWrap: 'wrap'
      }}>
        {/* Image Side */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <img 
            src={h3} 
            alt="Learning Process" 
            style={{ 
              width: '100%', 
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }} 
          />
        </div>
        
        {/* Steps Side */}
        <div style={{ 
          flex: '1', 
          minWidth: '300px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {[
            { step: '1', title: 'Sign Up', text: 'Create an account and browse our wide range of courses.' },
            { step: '2', title: 'Enroll', text: 'Choose your favorite courses and enroll with just a few clicks.' },
            { step: '3', title: 'Learn', text: 'Access course materials, watch videos, and practice at your own pace.' },
            { step: '4', title: 'Get Certified', text: 'Complete courses and earn certificates to showcase your skills.' }
          ].map(({ step, title, text }) => (
            <div key={step} style={{ 
              flex: '1 0 45%', 
              minWidth: '200px', 
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#4a4a8a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                flexShrink: 0
              }}>{step}</div>
              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#4a4a8a' }}>{title}</h3>
                <p style={{ color: '#666', lineHeight: '1.5', margin: 0 }}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;