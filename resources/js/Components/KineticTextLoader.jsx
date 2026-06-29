import React from 'react';

export default function KineticTextLoader({ className, text = "Loading", ...props }) {
    const letters = text.split("");

    return (
        <div 
            className={`relative flex items-center justify-center font-light ${className || ''}`} 
            style={{ fontFamily: "'Outfit', 'Roboto', sans-serif" }}
            {...props}
        >
            <style>{`
                @keyframes ktl-dotMove {
                    0%, 100% { transform: rotate(180deg) translate(-80px, -10px) rotate(-180deg); }
                    50% { transform: rotate(0deg) translate(-81px, 10px) rotate(0deg); }
                }
                @keyframes ktl-letterStretch {
                    0%, 100% { transform: scale(1, 0.35); transform-origin: 100% 75%; }
                    8%, 28% { transform: scale(1, 1.4); transform-origin: 100% 67%; }
                    37% { transform: scale(1, 0.875); transform-origin: 100% 75%; }
                    46% { transform: scale(1, 1.03); transform-origin: 100% 75%; }
                    50%, 97% { transform: scale(1); transform-origin: 100% 75%; }
                }
                @keyframes ktl-l-bounce {
                    0%, 45%, 70%, 100% { transform: scaleY(1.11); }
                    49% { transform: scaleY(0.31); }
                    50% { transform: scaleY(0.16); }
                    53% { transform: scaleY(0.63); }
                    60% { transform: scaleY(1.275); }
                    68% { transform: scaleY(1.04); }
                }
            `}</style>
            
            <div className="relative scale-75 md:scale-95 lg:scale-100 flex items-center justify-center">
                {/* The moving dot (Gold base color) */}
                <div 
                    className="absolute z-10 top-[28px] left-[78px] w-[7px] h-[7px] bg-gold-base rounded-full shadow-md shadow-gold-base/50"
                    style={{ animation: "ktl-dotMove 1800ms cubic-bezier(0.25,0.25,0.75,0.75) infinite" }}
                />
                
                <p 
                    className="relative m-0 whitespace-nowrap text-[3rem] font-medium text-pearl-light tracking-[8px] flex select-none"
                    aria-label={text}
                >
                    {letters.map((char, index) => {
                        // Letter 'L' (index 0) bounce animation
                        if (index === 0 && char.toUpperCase() === 'L') {
                            return (
                                <span 
                                    key={index} 
                                    className="inline-block relative transform origin-[100%_70%]"
                                    style={{ animation: "ktl-l-bounce 1800ms cubic-bezier(0.25,0.25,0.75,0.75) infinite" }}
                                >
                                    {char}
                                </span>
                            );
                        }
                        
                        // Letter 'i' (index 4) stretch animation
                        if (index === 4 && char.toLowerCase() === 'i') {
                            return (
                                <span 
                                    key={index} 
                                    className="inline-block relative transform origin-[100%_70%]"
                                    style={{ animation: "ktl-letterStretch 1800ms cubic-bezier(0.25,0.23,0.73,0.75) infinite" }}
                                >
                                    {char === 'i' ? 'ı' : char}
                                </span>
                            );
                        }

                        return (
                            <span key={index} className="inline-block relative">
                                {char}
                            </span>
                        );
                    })}
                </p>
            </div>
        </div>
    );
}
