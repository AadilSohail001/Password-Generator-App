import React from 'react';
import '../styles/OptionToggle.css';

const OptionToggle = ({ id, label, checked, onChange, icon }) => {
    return (
        <div className="option-toggle">
            <label htmlFor={id} className="toggle-label">
                <span className="toggle-icon">{icon}</span>
                <span className="toggle-text">{label}</span>
            </label>
            <input
                type="checkbox"
                id={id}
                className="toggle-checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label htmlFor={id} className="toggle-switch">
                <span className="toggle-slider" />
            </label>
        </div>
    );
};

export default OptionToggle;
