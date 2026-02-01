import React from 'react';
import { AlertTriangle } from 'lucide-react';

const StrengthIndicator = ({ strength }) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Strength</span>
                <div className="flex items-center gap-2">
                    {strength.score <= 40 && <AlertTriangle className="w-4 h-4 text-red-400" />}
                    <span className="font-bold" style={{ color: strength.color }}>
                        {strength.label}
                    </span>
                </div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                <div
                    className="h-full transition-all duration-500 ease-out rounded-full"
                    style={{
                        width: `${strength.score}%`,
                        backgroundColor: strength.color,
                        boxShadow: `0 0 10px ${strength.color}40`
                    }}
                />
            </div>
        </div>
    );
};

export default StrengthIndicator;