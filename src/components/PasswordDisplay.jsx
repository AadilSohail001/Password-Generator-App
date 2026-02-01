import React from 'react';
import { copyToClipboard } from '../utils/passwordUtils';
import '../styles/PasswordDisplay.css';

const PasswordDisplay = ({ password, copied, setCopied }) => {
    const handleCopy = async () => {
        const success = await copyToClipboard(password);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="password-display">
            <div className="password-text">{password || 'Generate a password'}</div>
            <button
                className={`copy-button ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
                disabled={!password}
                aria-label="Copy password"
            >
                {copied ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                )}
                <span className="copy-text">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
        </div>
    );
};

export default PasswordDisplay;
