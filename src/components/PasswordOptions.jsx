import React from 'react';

const PasswordOptions = ({ options, updateOption }) => {
    const optionsList = [
        { key: 'uppercase', label: 'Uppercase (A-Z)' },
        { key: 'lowercase', label: 'Lowercase (a-z)' },
        { key: 'numbers', label: 'Numbers (0-9)' },
        { key: 'symbols', label: 'Symbols (!@#$%)' }
    ];

    return (
        <div className="space-y-2 pt-2">
            <p className="text-sm font-medium text-slate-300 mb-3">Include</p>

            {optionsList.map((option) => (
                <label
                    key={option.key}
                    className="flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors border border-slate-700/30 group"
                >
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                        {option.label}
                    </span>
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={options[option.key]}
                            onChange={(e) => updateOption(option.key, e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </div>
                </label>
            ))}
        </div>
    );
};

export default PasswordOptions;