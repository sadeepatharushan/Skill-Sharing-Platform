import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './SkillsPage.css';

const SkillsPage = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newSkill, setNewSkill] = useState({
        name: '',
        description: '',
        category: '',
        level: 'Beginner'
    });

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setSkills([
                {
                    _id: '1',
                    name: 'JavaScript',
                    description: 'Scripting language for web development.',
                    category: 'Programming',
                    level: 'Advanced'
                },
                {
                    _id: '2',
                    name: 'React',
                    description: 'JavaScript library for building UI.',
                    category: 'Frontend',
                    level: 'Intermediate'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSkill(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fakeId = Date.now().toString(); // Simulated ID
        const skillToAdd = { ...newSkill, _id: fakeId };
        setSkills(prev => [...prev, skillToAdd]);
        setNewSkill({
            name: '',
            description: '',
            category: '',
            level: 'Beginner'
        });
        setShowAddForm(false);
    };

    const getLevelCounts = () => {
        const levelMap = {};
        skills.forEach(skill => {
            levelMap[skill.level] = (levelMap[skill.level] || 0) + 1;
        });
        return Object.entries(levelMap).map(([level, count]) => ({
            level,
            count
        }));
    };

    if (loading) return <div className="skills-loading">Loading skills...</div>;
    if (error) return <div className="skills-error">{error}</div>;

    return (
        <div className="skills-container">
            <div className="skills-header">
                <h1>Skills Directory</h1>
                <button 
                    className="add-skill-btn"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? 'Cancel' : 'Add New Skill'}
                </button>
            </div>

            {showAddForm && (
                <form className="add-skill-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Skill Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newSkill.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newSkill.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={newSkill.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="level">Level:</label>
                        <select
                            id="level"
                            name="level"
                            value={newSkill.level}
                            onChange={handleInputChange}
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-btn">Add Skill</button>
                </form>
            )}

            <div className="skills-grid">
                {skills.map((skill) => (
                    <div key={skill._id} className="skill-card">
                        <h3>{skill.name}</h3>
                        <p>{skill.description}</p>
                        <div className="skill-details">
                            <span className="skill-category">{skill.category}</span>
                            <span className="skill-level">Level: {skill.level}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bar Chart */}
            <div className="skills-chart">
                <h2>Skill Levels Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getLevelCounts()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="level" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3498db" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SkillsPage;
