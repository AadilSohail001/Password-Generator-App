import { useState, useEffect, useCallback } from 'react';
import { generatePassword, calculateStrength } from '../utils/passwordUtils';

/**
 * Custom hook for password generation and management
 */
export const usePassword = () => {
    const [password, setPassword] = useState('');
    const [options, setOptions] = useState({
        length: 16,
        uppercase: true,
        numbers: true,
        symbols: true,
    });
    const [strength, setStrength] = useState({ score: 0, label: 'None', color: 'var(--color-weak)' });
    const [copied, setCopied] = useState(false);

    // Generate password when options change
    const generate = useCallback(() => {
        const newPassword = generatePassword(options);
        setPassword(newPassword);
        setCopied(false);
    }, [options]);

    // Update strength when password or options change
    useEffect(() => {
        const newStrength = calculateStrength(password, options);
        setStrength(newStrength);
    }, [password, options]);

    // Generate initial password
    useEffect(() => {
        generate();
    }, [generate]);

    const updateOption = (key, value) => {
        setOptions((prev) => ({ ...prev, [key]: value }));
    };

    return {
        password,
        options,
        strength,
        copied,
        generate,
        updateOption,
        setCopied,
    };
};
