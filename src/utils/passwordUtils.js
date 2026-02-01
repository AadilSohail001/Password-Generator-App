/**
 * Character sets for password generation
 */
export const CHARSET = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

/**
 * Calculate password strength based on various criteria
 * @param {string} password - The password to evaluate
 * @returns {Object} - Strength score, label, and color
 */
export const calculatePasswordStrength = (password) => {
    if (!password) {
        return { score: 0, label: 'None', color: '#64748b' };
    }

    let score = 0;

    // Length checks
    if (password.length >= 12) score += 20;
    if (password.length >= 16) score += 10;

    // Character variety checks
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;

    // Determine strength level
    if (score <= 40) return { score, label: 'Weak', color: '#ef4444' };
    if (score <= 65) return { score, label: 'Fair', color: '#f59e0b' };
    if (score <= 85) return { score, label: 'Good', color: '#10b981' };
    return { score, label: 'Strong', color: '#06b6d4' };
};

/**
 * Generate a secure random password
 * @param {number} length - Desired password length
 * @param {Object} options - Character set options
 * @returns {string} - Generated password
 */
export const generateSecurePassword = (length, options) => {
    let chars = '';
    let password = '';

    // Build character set based on options
    if (options.lowercase) chars += CHARSET.lowercase;
    if (options.uppercase) chars += CHARSET.uppercase;
    if (options.numbers) chars += CHARSET.numbers;
    if (options.symbols) chars += CHARSET.symbols;

    // Fallback to lowercase if no options selected
    if (chars.length === 0) {
        chars = CHARSET.lowercase;
    }

    // Ensure at least one character from each selected set
    if (options.lowercase) {
        password += CHARSET.lowercase[Math.floor(Math.random() * CHARSET.lowercase.length)];
    }
    if (options.uppercase) {
        password += CHARSET.uppercase[Math.floor(Math.random() * CHARSET.uppercase.length)];
    }
    if (options.numbers) {
        password += CHARSET.numbers[Math.floor(Math.random() * CHARSET.numbers.length)];
    }
    if (options.symbols) {
        password += CHARSET.symbols[Math.floor(Math.random() * CHARSET.symbols.length)];
    }

    // Fill remaining length with random characters
    for (let i = password.length; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    // Shuffle the password to randomize character positions
    return shuffleString(password);
};

/**
 * Shuffle a string using Fisher-Yates algorithm
 * @param {string} str - String to shuffle
 * @returns {string} - Shuffled string
 */
const shuffleString = (str) => {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
};

/**
 * Validate password meets minimum requirements
 * @param {string} password - Password to validate
 * @param {Object} requirements - Minimum requirements
 * @returns {boolean} - Whether password meets requirements
 */
export const validatePassword = (password, requirements = {}) => {
    const {
        minLength = 8,
        requireUppercase = false,
        requireLowercase = false,
        requireNumbers = false,
        requireSymbols = false
    } = requirements;

    if (password.length < minLength) return false;
    if (requireUppercase && !/[A-Z]/.test(password)) return false;
    if (requireLowercase && !/[a-z]/.test(password)) return false;
    if (requireNumbers && !/[0-9]/.test(password)) return false;
    if (requireSymbols && !/[^A-Za-z0-9]/.test(password)) return false;

    return true;
};