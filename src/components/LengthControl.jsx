import React from 'react';
import '../styles/LengthControl.css';

const LengthControl = ({ length, onChange }) => {
    const handleSliderChange = (e) => {
        onChange(Number(e.target.value));
    };

    const handleInputChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 4 && value <= 64) {
            onChange(value);
        }
    };

    return (
        <div className="length-control">
            <div className="length-header">
                <label htmlFor="length-slider" className="length-label">
                    Password Length
                </label>
                <input
                    type="number"
                    className="length-input"
                    value={length}
                    onChange={handleInputChange}
                    min="4"
                    max="64"
                    aria-label="Password length value"
                />
            </div>
            <input
                type="range"
                id="length-slider"
                className="length-slider"
                value={length}
                onChange={handleSliderChange}
                min="4"
                max="64"
                aria-label="Password length slider"
            />
            <div className="length-marks">
                <span>4</span>
                <span>64</span>
            </div>
        </div>
    );
};

export default LengthControl;
