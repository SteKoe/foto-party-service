import React from "react";

type ProgressType = number | "indeterminate";

interface ProgressBarProps {
    progress: ProgressType; // 0–100 or "indeterminate"
}

const FloatingProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    const isIndeterminate = progress === "indeterminate";

    return (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full z-50 shadow-lg">
            <div className="bg-gray-200 h-1">
                {isIndeterminate ? (
                    <div className="absolute inset-0 animate-indeterminate bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 rounded-full h-1 w-1/2" />
                ) : (
                    <div
                        className="bg-blue-600 h-1 transition-all duration-300 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                )}
            </div>
        </div>
    );
};

export default FloatingProgressBar;
