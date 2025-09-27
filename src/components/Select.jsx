import React from "react";

export default function Select({ label, name, value, onChange, options = [], required, disabled, error }) {
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={`w-full px-4 py-3 border rounded-lg appearance-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${disabled
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                            : error
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50 text-gray-900'
                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200 hover:border-gray-400 text-gray-900 bg-white'
                        }`}
                >
                    <option value="">Seleccionar...</option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className={`w-5 h-5 ${disabled ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {error && (
                <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-500 text-sm font-medium">{error}</span>
                </div>
            )}
        </div>
    );
}
