import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import skill from '../../images/skill.webp';   // Logo image
import nnn from '../../images/nnn.png';       // Default user photo

const Sidebar = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { path: '/', icon: 'fas fa-home', label: 'Home' },
        { path: '/profile', icon: 'fas fa-user', label: 'Profile' },
        { path: '/courses', icon: 'fas fa-book', label: 'Courses' },
        { path: '/mentors', icon: 'fas fa-chalkboard-teacher', label: 'Mentors' },
        { path: '/skills', icon: 'fas fa-brain', label: 'Skills' },
        { path: '/messages', icon: 'fas fa-envelope', label: 'Messages' },
        { path: '/calendar', icon: 'fas fa-calendar-alt', label: 'Calendar' },
        { path: '/resources', icon: 'fas fa-folder', label: 'Resources' },
        { path: '/settings', icon: 'fas fa-cog', label: 'Settings' },
    ];

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="logo-container">
                    <img src={skill} alt="Skill Share Logo" className="logo" />
                    {!collapsed && <span className="logo-text">Skill Share</span>}
                </div>
                <button 
                    className="collapse-btn"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <i className={`fas fa-${collapsed ? 'chevron-right' : 'chevron-left'}`}></i>
                </button>
            </div>

            <div className="user-profile">
                <div className="user-avatar">
                    <img 
                        src={localStorage.getItem('userPhoto') || nnn} 
                        alt="User" 
                    />
                </div>
                {!collapsed && (
                    <div className="user-info">
                        <h3>{localStorage.getItem('userName') || 'User Name'}</h3>
                        <p>{localStorage.getItem('userEmail') || 'user@email.com'}</p>
                    </div>
                )}
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <i className={item.icon}></i>
                        {!collapsed && <span>{item.label}</span>}
                    </Link>
                ))}
            </nav>

            <div className="sidebar-footer">
                <Link to="/help" className="nav-item">
                    <i className="fas fa-question-circle"></i>
                    {!collapsed && <span>Help & Support</span>}
                </Link>
                <button 
                    className="nav-item logout-btn"
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = '/login';
                    }}
                >
                    <i className="fas fa-sign-out-alt"></i>
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
