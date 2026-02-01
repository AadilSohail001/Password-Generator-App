import { useState, useEffect } from 'react';
import { generateSecurePassword, CHARSET } from '../utils/passwordUtils';

export const usePasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });

    const updateOption = (key, value) => {
        setOptions(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const generatePassword = () => {
        // Ensure at least one option is selected
        const activeOptions = Object.values(options).some(v => v);
        if (!activeOptions) {
            setOptions(prev => ({ ...prev, lowercase: true }));
            return;
        }

        const newPassword = generateSecurePassword(length, options);
        setPassword(newPassword);
    };

    // Generate password on mount and when settings change
    useEffect(() => {
        generatePassword();
    }, [length, options.uppercase, options.lowercase, options.numbers, options.symbols]);

    return {
        password,
        length,
        setLength,
        options,
        updateOption,
        generatePassword
    };
};