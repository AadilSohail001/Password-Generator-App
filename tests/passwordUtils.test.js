import { describe, it, expect } from 'vitest';
import {
  calculatePasswordStrength,
  generateSecurePassword,
  validatePassword,
  CHARSET
} from '../src/utils/passwordUtils';

describe('passwordUtils', () => {
  describe('calculatePasswordStrength', () => {
    it('should return None for empty password', () => {
      const result = calculatePasswordStrength('');
      expect(result.label).toBe('None');
      expect(result.score).toBe(0);
    });

    it('should return Weak for short passwords', () => {
      const result = calculatePasswordStrength('abc');
      expect(result.label).toBe('Weak');
    });

    it('should return Strong for complex passwords', () => {
      const result = calculatePasswordStrength('Abcd1234!@#$efgh');
      expect(result.label).toBe('Strong');
      expect(result.score).toBeGreaterThan(85);
    });

    it('should increase score with length', () => {
      const short = calculatePasswordStrength('Abc123!');
      const long = calculatePasswordStrength('Abc123!@#$defgh');
      expect(long.score).toBeGreaterThan(short.score);
    });
  });

  describe('generateSecurePassword', () => {
    it('should generate password of correct length', () => {
      const password = generateSecurePassword(16, {
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: true
      });
      expect(password).toHaveLength(16);
    });

    it('should include lowercase when option is true', () => {
      const password = generateSecurePassword(20, {
        lowercase: true,
        uppercase: false,
        numbers: false,
        symbols: false
      });
      expect(/[a-z]/.test(password)).toBe(true);
    });

    it('should include uppercase when option is true', () => {
      const password = generateSecurePassword(20, {
        lowercase: false,
        uppercase: true,
        numbers: false,
        symbols: false
      });
      expect(/[A-Z]/.test(password)).toBe(true);
    });

    it('should include numbers when option is true', () => {
      const password = generateSecurePassword(20, {
        lowercase: false,
        uppercase: false,
        numbers: true,
        symbols: false
      });
      expect(/[0-9]/.test(password)).toBe(true);
    });

    it('should include symbols when option is true', () => {
      const password = generateSecurePassword(20, {
        lowercase: false,
        uppercase: false,
        numbers: false,
        symbols: true
      });
      expect(/[^A-Za-z0-9]/.test(password)).toBe(true);
    });

    it('should generate different passwords on consecutive calls', () => {
      const options = {
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: true
      };
      const password1 = generateSecurePassword(16, options);
      const password2 = generateSecurePassword(16, options);
      expect(password1).not.toBe(password2);
    });
  });

  describe('validatePassword', () => {
    it('should validate minimum length', () => {
      expect(validatePassword('short', { minLength: 8 })).toBe(false);
      expect(validatePassword('longenough', { minLength: 8 })).toBe(true);
    });

    it('should validate uppercase requirement', () => {
      expect(validatePassword('lowercase', { requireUppercase: true })).toBe(false);
      expect(validatePassword('Uppercase', { requireUppercase: true })).toBe(true);
    });

    it('should validate lowercase requirement', () => {
      expect(validatePassword('UPPERCASE', { requireLowercase: true })).toBe(false);
      expect(validatePassword('lowercase', { requireLowercase: true })).toBe(true);
    });

    it('should validate numbers requirement', () => {
      expect(validatePassword('noNumbers', { requireNumbers: true })).toBe(false);
      expect(validatePassword('has123', { requireNumbers: true })).toBe(true);
    });

    it('should validate symbols requirement', () => {
      expect(validatePassword('noSymbols', { requireSymbols: true })).toBe(false);
      expect(validatePassword('has!@#', { requireSymbols: true })).toBe(true);
    });

    it('should validate all requirements together', () => {
      const requirements = {
        minLength: 12,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: true
      };
      expect(validatePassword('short', requirements)).toBe(false);
      expect(validatePassword('Abcd1234!@#$', requirements)).toBe(true);
    });
  });

  describe('CHARSET', () => {
    it('should contain all character sets', () => {
      expect(CHARSET.uppercase).toBeDefined();
      expect(CHARSET.lowercase).toBeDefined();
      expect(CHARSET.numbers).toBeDefined();
      expect(CHARSET.symbols).toBeDefined();
    });

    it('should have correct character counts', () => {
      expect(CHARSET.uppercase).toHaveLength(26);
      expect(CHARSET.lowercase).toHaveLength(26);
      expect(CHARSET.numbers).toHaveLength(10);
    });
  });
});