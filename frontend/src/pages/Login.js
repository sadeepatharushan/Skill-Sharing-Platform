import React, { useState, useEffect } from 'react';

export default function SkillshareLogin() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [buttonHover, setButtonHover] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }
      const { token } = await response.json();
      localStorage.setItem('jwtToken', token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      ...styles.container,
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 0.8s ease-in-out',
    }}>
      <div style={{
        ...styles.leftPanel,
        transform: isLoaded ? 'translateX(0)' : 'translateX(-50px)',
        transition: 'transform 0.8s ease-out',
      }}>
        <h1 style={styles.heading}>Welcome Back to Skillshare</h1>
        <div style={{
          ...styles.greenBar,
          width: isLoaded ? '50px' : '0px',
          transition: 'width 1s ease-out 0.4s',
        }} />
        <p style={{
          ...styles.subtext,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out 0.8s',
        }}>
          Sign in to continue to your account.
        </p>
      </div>

      <div style={{
        ...styles.rightPanel,
        transform: isLoaded ? 'translateX(0)' : 'translateX(50px)',
        transition: 'transform 0.8s ease-out',
      }}>
        <div style={{
          ...styles.divider,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.6s ease-out 0.7s',
        }}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>Sign In</span>
          <span style={styles.dividerLine} />
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form style={styles.form} onSubmit={handleSubmit}>
          {['email', 'password'].map((field, idx) => (
            <div
              key={field}
              style={{
                position: 'relative',
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                opacity: isLoaded ? 1 : 0,
                transition: `transform 0.6s ease-out ${0.7 + idx * 0.1}s, opacity 0.6s ease-out ${0.7 + idx * 0.1}s`,
              }}
            >
              <input
                type={field}
                placeholder={field === 'email' ? 'Email address' : 'Password'}
                id={field}
                value={field === 'email' ? email : password}
                onChange={(e) =>
                  field === 'email' ? setEmail(e.target.value) : setPassword(e.target.value)
                }
                style={{
                  ...styles.input,
                  borderColor: focusedInput === field ? '#0BDB62' : '#ddd',
                  boxShadow: focusedInput === field ? '0 0 0 2px rgba(11, 219, 98, 0.2)' : 'none',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onFocus={() => setFocusedInput(field)}
                onBlur={() => setFocusedInput(null)}
              />
              {focusedInput === field && (
                <div style={styles.floatingLabel}>
                  {field === 'email' ? 'Email address' : 'Password'}
                </div>
              )}
            </div>
          ))}

          <div style={styles.checkboxContainer}>
            <input type="checkbox" id="keepSignedIn" style={styles.checkbox} />
            <label htmlFor="keepSignedIn" style={styles.checkboxLabel}>
              Keep me signed in
            </label>
          </div>

          <button
            type="submit"
            style={{
              ...styles.signInButton,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              opacity: isLoaded ? 1 : 0,
              transition: 'transform 0.6s ease-out 1s, opacity 0.6s ease-out 1s',
              boxShadow:
                buttonHover === 'signin'
                  ? '0 6px 12px rgba(11, 219, 98, 0.3)'
                  : '0 4px 8px rgba(11, 219, 98, 0.2)',
            }}
            onMouseEnter={() => setButtonHover('signin')}
            onMouseLeave={() => setButtonHover(null)}
          >
            Sign In
          </button>

          <a href=" " style={styles.forgotPassword}>
            Forgot password?
          </a>

          <p style={styles.signupPrompt}>
            Not a member yet? <a href=" " style={styles.signupLink}>Sign Up.</a>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    borderRadius: '12px',
    overflow: 'hidden',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  leftPanel: {
    width: '40%',
    background: 'linear-gradient(150deg, #0A2136 0%, #12344E 70%, #154D67 100%)',
    color: 'white',
    padding: '40px 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  heading: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '24px',
    lineHeight: '1.1',
    letterSpacing: '-0.5px',
    background: 'linear-gradient(90deg, #ffffff, #e0e0e0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  
  greenBar: {
    width: '50px',
    height: '4px',
    background: 'linear-gradient(90deg, #0BDB62 0%, #13F96E 100%)',
    borderRadius: '2px',
    marginBottom: '24px',
  },
  subtext: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '1.5',
  },
  rightPanel: {
    width: '60%',
    padding: '40px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '28px',
    cursor: 'pointer',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  socialButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
  },
  socialButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px',
    border: '1px solid #eaeaea',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
    color: '#333',
  },
  socialIconContainer: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '24px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#eaeaea',
  },
  dividerText: {
    padding: '0 16px',
    color: '#888',
    fontSize: '24px',
    fontWeight: '500',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '14px 16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '15px',
    width: '100%',
    outline: 'none',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: '#0BDB62',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#555',
    cursor: 'pointer',
  },
  signInButton: {
    padding: '14px',
    background: 'linear-gradient(90deg, #0BDB62 0%, #13F96E 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#4C4CFF',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    margin: '8px 0',
  },
  signupPrompt: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#555',
    margin: '8px 0',
  },
  signupLink: {
    color: '#4C4CFF',
    textDecoration: 'none',
    fontWeight: '600',
  }
};