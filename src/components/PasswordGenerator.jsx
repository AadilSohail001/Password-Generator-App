import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check, Shield, AlertTriangle } from 'lucide-react';
import { usePasswordGenerator } from '../hooks/usePasswordGenerator';
import { calculatePasswordStrength } from '../utils/passwordUtils';
import StrengthIndicator from './StrengthIndicator';
import PasswordOptions from './PasswordOptions';

const PasswordGenerator = () => {
    const {
        password,
        length,
        setLength,
        options,
        updateOption,
        generatePassword
    } = usePasswordGenerator();

    const [copied, setCopied] = useState(false);
    const strength = calculatePasswordStrength(password);

    const copyToClipboard = async () => {
        if (!password) return;

        try {
            await navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6"
            style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
                fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace'
            }}>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative w-full max-w-md">
                <div className="backdrop-blur-xl bg-slate-900/80 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden"
                    style={{
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(148, 163, 184, 0.1)'
                    }}>

                    {/* Header */}
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-6 border-b border-slate-700/50">
                        <div className="flex items-center gap-3">
                            <Shield className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Password Generator</h1>
                                <p className="text-sm text-slate-400 mt-0.5">Secure Password Generator</p>
                            </div>
                        </div>
                    </div>

                    {/* Password display */}
                    <div className="p-6 space-y-4">
                        <div className="relative">
                            <div className="bg-slate-800/80 rounded-xl p-4 pr-24 border border-slate-700/50 min-h-[80px] flex items-center"
                                style={{
                                    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)'
                                }}>
                                <p className="text-cyan-300 text-lg break-all font-medium leading-relaxed tracking-wide">
                                    {password || 'Generate a password'}
                                </p>
                            </div>

                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                                <button
                                    onClick={copyToClipboard}
                                    disabled={!password}
                                    className="p-3 bg-slate-700/80 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all duration-200 group"
                                    title="Copy to clipboard"
                                >
                                    {copied ? (
                                        <Check className="w-5 h-5 text-green-400" strokeWidth={2} />
                                    ) : (
                                        <Copy className="w-5 h-5 text-slate-300 group-hover:text-white" strokeWidth={2} />
                                    )}
                                </button>
                                <button
                                    onClick={generatePassword}
                                    className="p-3 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-all duration-200 group"
                                    title="Generate new password"
                                >
                                    <RefreshCw className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" strokeWidth={2} />
                                </button>
                            </div>
                        </div>

                        <StrengthIndicator strength={strength} />

                        {/* Length slider */}
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-300">Length</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-cyan-400 font-bold text-lg w-8 text-right">{length}</span>
                                    <span className="text-slate-500 text-sm">chars</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="4"
                                max="64"
                                value={length}
                                onChange={(e) => setLength(Number(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer border border-slate-700/50"
                                style={{
                                    background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((length - 4) / 60) * 100}%, #1e293b ${((length - 4) / 60) * 100}%, #1e293b 100%)`
                                }}
                            />
                        </div>

                        <PasswordOptions options={options} updateOption={updateOption} />
                    </div>
                </div>

                <p className="text-center text-slate-500 text-xs mt-6 tracking-wide">
                    Generated passwords are never stored or transmitted
                </p>
                <p className="text-center text-slate-500 text-xs mt-6 tracking-wide">
                    Made with ❤️
                </p>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          background: #06b6d4;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #0f172a;
          box-shadow: 0 0 0 2px #06b6d440, 0 4px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          background: #22d3ee;
          box-shadow: 0 0 0 4px #06b6d460, 0 6px 12px rgba(0, 0, 0, 0.4);
          transform: scale(1.1);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: #06b6d4;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #0f172a;
          box-shadow: 0 0 0 2px #06b6d440, 0 4px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          background: #22d3ee;
          box-shadow: 0 0 0 4px #06b6d460, 0 6px 12px rgba(0, 0, 0, 0.4);
          transform: scale(1.1);
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
      `}</style>
        </div>
    );
};

export default PasswordGenerator;