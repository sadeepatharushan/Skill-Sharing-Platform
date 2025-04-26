import React, { useState, useEffect } from 'react';
import { getUsers } from '../api';
import ThemeSelector from '../components/ThemeSelector';
import './ProfileView.css';

const ProfileView = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await getUsers();
                const lastUser = data[data.length - 1];
                setUser(lastUser);
                setEditedUser(lastUser);
                setLoading(false);
            } catch (err) {
                setError('Error fetching profile');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

    const handleSaveEdit = async () => {
        try {
            // Add your API call to update the user profile here
            // await updateUser(editedUser);
            setUser(editedUser);
            setIsEditing(false);
        } catch (err) {
            setError('Error updating profile');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDeleteProfile = async () => {
        try {
            // Add your API call to delete the user profile here
            // await deleteUser(user.id);
            // Redirect to home or login page after successful deletion
            window.location.href = '/';
        } catch (err) {
            setError('Error deleting profile');
        }
    };

    const handleThemeChange = (theme) => {
        // You can save the theme preference to localStorage or your backend
        localStorage.setItem('userTheme', JSON.stringify(theme));
    };

    useEffect(() => {
        // Load saved theme on component mount
        const savedTheme = localStorage.getItem('userTheme');
        if (savedTheme) {
            const theme = JSON.parse(savedTheme);
            document.documentElement.style.setProperty('--primary-color', theme.colors.primary);
            document.documentElement.style.setProperty('--secondary-color', theme.colors.secondary);
            document.documentElement.style.setProperty('--background-color', theme.colors.background);
            document.documentElement.style.setProperty('--text-color', theme.colors.text);
            document.documentElement.style.setProperty('--font-family', theme.font);
        }
    }, []);

    if (loading) return <div className="loading">Loading profile...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!user) return <div className="error">Profile not found</div>;

    if (isEditing) {
        return (
            <div className="profiles-container">
                <ThemeSelector onThemeChange={handleThemeChange} />
                <div className="edit-form">
                    <h2>Edit Profile</h2>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={editedUser.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={editedUser.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={editedUser.location}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bio</label>
                        <textarea
                            name="bio"
                            value={editedUser.bio}
                            onChange={handleInputChange}
                            className="bio-textarea"
                        />
                    </div>
                    <div className="edit-actions">
                        <button className="button button-primary" onClick={handleSaveEdit}>
                            <i className="fas fa-save"></i> Save Changes
                        </button>
                        <button className="button button-secondary" onClick={handleCancelEdit}>
                            <i className="fas fa-times"></i> Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profiles-container">
            <ThemeSelector onThemeChange={handleThemeChange} />
            <div className="profile-header">
                {user.coverPhotoUrl && (
                    <img 
                        src={user.coverPhotoUrl} 
                        alt="Cover" 
                        className="cover-photo"
                    />
                )}
                <div className="profile-header-content">
                    <div className="profile-photo-container">
                        {user.profilePhotoUrl ? (
                            <img 
                                src={user.profilePhotoUrl} 
                                alt="Profile" 
                                className="profile-photo"
                            />
                        ) : (
                            <div className="profile-photo-placeholder">
                                {user.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <h1 className="profile-name">{user.name}</h1>
                    <p className="profile-title">Software Engineer | Full-Stack Developer</p>
                    <div className="profile-stats">
                        <div className="stat-item">
                            <span className="stat-value">500+</span>
                            <span className="stat-label">Connections</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">50+</span>
                            <span className="stat-label">Projects</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">5+</span>
                            <span className="stat-label">Years Exp.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-sections">
                <div className="profile-section">
                    <h2 className="section-title">
                        <i className="fas fa-user"></i>
                        Personal Information
                    </h2>
                    <div className="info-row">
                        <span className="info-label">Full Name</span>
                        <span className="info-value">{user.name}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Username</span>
                        <span className="info-value">@{user.username}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Email</span>
                        <span className="info-value">
                            <i className="fas fa-envelope"></i> {user.email}
                        </span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Location</span>
                        <span className="info-value">
                            <i className="fas fa-map-marker-alt"></i> {user.location}
                        </span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Age</span>
                        <span className="info-value">{user.age} years</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Joined</span>
                        <span className="info-value">
                            <i className="fas fa-calendar"></i> January 2024
                        </span>
                    </div>
                </div>

                <div className="profile-section">
                    <h2 className="section-title">
                        <i className="fas fa-book"></i>
                        About Me
                    </h2>
                    <div className="about-content">
                        <p className="bio-text">{user.bio}</p>
                        <div className="highlights">
                            <h3>Career Highlights</h3>
                            <ul className="highlights-list">
                                <li>Full-Stack Development</li>
                                <li>Project Management</li>
                                <li>Team Leadership</li>
                                <li>Problem Solving</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="profile-section">
                    <h2 className="section-title">
                        <i className="fas fa-laptop-code"></i>
                        Technical Skills
                    </h2>
                    <div className="skills-grid">
                        <div className="skill-category">
                            <h3>Frontend</h3>
                            <div className="skill-tags">
                                <span className="skill-tag">React</span>
                                <span className="skill-tag">JavaScript</span>
                                <span className="skill-tag">HTML5</span>
                                <span className="skill-tag">CSS3</span>
                            </div>
                        </div>
                        <div className="skill-category">
                            <h3>Backend</h3>
                            <div className="skill-tags">
                                <span className="skill-tag">Node.js</span>
                                <span className="skill-tag">Spring Boot</span>
                                <span className="skill-tag">MongoDB</span>
                                <span className="skill-tag">REST APIs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-actions">
                <button className="button button-primary" onClick={handleEditClick}>
                    <i className="fas fa-edit"></i> Edit Profile
                </button>
                <button className="button button-secondary">
                    <i className="fas fa-share"></i> Share Profile
                </button>
                <button className="button button-outline">
                    <i className="fas fa-download"></i> Download Resume
                </button>
                <button className="button button-danger" onClick={() => setShowDeleteConfirm(true)}>
                    <i className="fas fa-trash-alt"></i> Delete Profile
                </button>
            </div>

            <div className="social-links">
                <a href=" " className="social-link">
                    <i className="fab fa-github"></i>
                </a>
                <a href=" " className="social-link">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href=" " className="social-link">
                    <i className="fab fa-twitter"></i>
                </a>
            </div>

            {showDeleteConfirm && (
                <div className="delete-confirmation">
                    <div className="delete-confirmation-content">
                        <h3>Delete Profile</h3>
                        <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
                        <div className="delete-confirmation-buttons">
                            <button className="button button-danger" onClick={handleDeleteProfile}>
                                <i className="fas fa-trash-alt"></i> Delete
                            </button>
                            <button className="button button-secondary" onClick={() => setShowDeleteConfirm(false)}>
                                <i className="fas fa-times"></i> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileView; 