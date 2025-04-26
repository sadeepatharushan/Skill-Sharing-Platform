import React, { useState } from 'react';
import './ThemeSelector.css';

const ThemeSelector = ({ onThemeChange }) => {
    const [showPanel, setShowPanel] = useState(false);

    const themes = {
        modern: {
            name: 'Modern Clean',
            colors: {
                primary: '#007bff',
                secondary: '#6c757d',
                background: '#f8f9fa',
                text: '#2c3e50',
                headerBg: '#ffffff',
                cardBg: '#ffffff',
                accent: '#0056b3'
            },
            font: "'Roboto', sans-serif",
            layout: 'modern',
            styles: {
                borderRadius: '12px',
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                headerStyle: 'clean'
            }
        },
        professional: {
            name: 'Professional Dark',
            colors: {
                primary: '#2c3e50',
                secondary: '#34495e',
                background: '#1a1a1a',
                text: '#ffffff',
                headerBg: '#2c3e50',
                cardBg: '#2d2d2d',
                accent: '#3498db'
            },
            font: "'Open Sans', sans-serif",
            layout: 'classic',
            styles: {
                borderRadius: '8px',
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                headerStyle: 'gradient'
            }
        },
        creative: {
            name: 'Creative Colorful',
            colors: {
                primary: '#e74c3c',
                secondary: '#c0392b',
                background: '#ffffff',
                text: '#2c3e50',
                headerBg: '#ff6b6b',
                cardBg: '#fff5f5',
                accent: '#ff8787'
            },
            font: "'Poppins', sans-serif",
            layout: 'modern',
            styles: {
                borderRadius: '20px',
                shadowColor: 'rgba(231, 76, 60, 0.1)',
                headerStyle: 'wave'
            }
        },
        minimal: {
            name: 'Minimal Light',
            colors: {
                primary: '#212529',
                secondary: '#495057',
                background: '#ffffff',
                text: '#212529',
                headerBg: '#f8f9fa',
                cardBg: '#ffffff',
                accent: '#343a40'
            },
            font: "'Montserrat', sans-serif",
            layout: 'minimal',
            styles: {
                borderRadius: '4px',
                shadowColor: 'rgba(0, 0, 0, 0.05)',
                headerStyle: 'simple'
            }
        },
        tech: {
            name: 'Tech Theme',
            colors: {
                primary: '#00ff00',
                secondary: '#008000',
                background: '#000000',
                text: '#00ff00',
                headerBg: '#001a00',
                cardBg: '#002600',
                accent: '#00cc00'
            },
            font: "'Source Code Pro', monospace",
            layout: 'tech',
            styles: {
                borderRadius: '0',
                shadowColor: 'rgba(0, 255, 0, 0.1)',
                headerStyle: 'terminal'
            }
        }
    };

    const fonts = [
        { name: 'Segoe UI', value: "'Segoe UI', sans-serif" },
        { name: 'Roboto', value: "'Roboto', sans-serif" },
        { name: 'Poppins', value: "'Poppins', sans-serif" },
        { name: 'Open Sans', value: "'Open Sans', sans-serif" },
        { name: 'Montserrat', value: "'Montserrat', sans-serif" }
    ];

    const handleThemeSelect = (theme) => {
        // Apply main colors
        document.documentElement.style.setProperty('--primary-color', theme.colors.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.colors.secondary);
        document.documentElement.style.setProperty('--background-color', theme.colors.background);
        document.documentElement.style.setProperty('--text-color', theme.colors.text);
        document.documentElement.style.setProperty('--header-bg', theme.colors.headerBg);
        document.documentElement.style.setProperty('--card-bg', theme.colors.cardBg);
        document.documentElement.style.setProperty('--accent-color', theme.colors.accent);

        // Apply fonts
        document.documentElement.style.setProperty('--font-family', theme.font);

        // Apply styles
        document.documentElement.style.setProperty('--border-radius', theme.styles.borderRadius);
        document.documentElement.style.setProperty('--shadow-color', theme.styles.shadowColor);
        document.documentElement.style.setProperty('--header-style', theme.styles.headerStyle);

        // Apply layout class
        document.body.className = `theme-${theme.layout}`;

        onThemeChange(theme);
    };

    const handleCustomColor = (variable, value) => {
        document.documentElement.style.setProperty(`--${variable}`, value);
    };

    const handleFontChange = (fontFamily) => {
        document.documentElement.style.setProperty('--font-family', fontFamily);
    };

    return (
        <div className="theme-selector">
            <button 
                className="theme-toggle-btn"
                onClick={() => setShowPanel(!showPanel)}
            >
                <i className="fas fa-palette"></i>
                Change Profile Theme
            </button>

            {showPanel && (
                <div className="theme-panel">
                    <h3>Select Profile Theme</h3>
                    <div className="theme-options">
                        {Object.entries(themes).map(([key, theme]) => (
                            <button
                                key={key}
                                className="theme-option"
                                onClick={() => handleThemeSelect(theme)}
                                style={{
                                    background: `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                                    color: theme.colors.text,
                                    fontFamily: theme.font
                                }}
                            >
                                {theme.name}
                            </button>
                        ))}
                    </div>

                    <h3>Custom Colors</h3>
                    <div className="color-pickers">
                        <div className="color-picker">
                            <label>Primary Color</label>
                            <input
                                type="color"
                                onChange={(e) => handleCustomColor('primary-color', e.target.value)}
                                defaultValue="#007bff"
                            />
                        </div>
                        <div className="color-picker">
                            <label>Secondary Color</label>
                            <input
                                type="color"
                                onChange={(e) => handleCustomColor('secondary-color', e.target.value)}
                                defaultValue="#6c757d"
                            />
                        </div>
                        <div className="color-picker">
                            <label>Background Color</label>
                            <input
                                type="color"
                                onChange={(e) => handleCustomColor('background-color', e.target.value)}
                                defaultValue="#f8f9fa"
                            />
                        </div>
                        <div className="color-picker">
                            <label>Text Color</label>
                            <input
                                type="color"
                                onChange={(e) => handleCustomColor('text-color', e.target.value)}
                                defaultValue="#2c3e50"
                            />
                        </div>
                    </div>

                    <h3>Select Font</h3>
                    <select 
                        className="font-selector"
                        onChange={(e) => handleFontChange(e.target.value)}
                        defaultValue="'Segoe UI', sans-serif"
                    >
                        {fonts.map((font) => (
                            <option key={font.name} value={font.value}>
                                {font.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default ThemeSelector; 