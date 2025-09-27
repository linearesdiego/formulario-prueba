import React from "react";

export default function Input({ label, name, type = "text", value, onChange, required, placeholder, error }) {
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200 hover:border-gray-400'
                    }`}
            />
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
