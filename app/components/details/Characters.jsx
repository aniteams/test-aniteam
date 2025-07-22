"use client";
import React, { useRef, useState } from 'react';
import Image from 'next/image';

function Characters({ data }) {
    const containerRef = useRef();
    const [isLeftArrowActive, setIsLeftArrowActive] = useState(false);
    const [isRightArrowActive, setIsRightArrowActive] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    function handleScroll() {
        const container = containerRef.current;
        const scrollPosition = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        setIsLeftArrowActive(scrollPosition > 30);
        setIsRightArrowActive(scrollPosition < maxScroll - 30);
    }

    const smoothScroll = (amount) => {
        const container = containerRef.current;
        if (container) {
            container.classList.add('scroll-smooth');
            container.scrollLeft += amount;

            setTimeout(() => {
                container.classList.remove('scroll-smooth');
            }, 300);
        }
    };

    function scrollLeft() {
        smoothScroll(-500);
    }

    function scrollRight() {
        smoothScroll(500);
    }

    return (
        <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <button 
                    onClick={scrollLeft}
                    className={`p-2 rounded-full bg-black/50 ${isLeftArrowActive ? 'opacity-100' : 'opacity-0'} transition-opacity`}
                    aria-label="Scroll left"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                </button>
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <button 
                    onClick={scrollRight}
                    className={`p-2 rounded-full bg-black/50 ${isRightArrowActive ? 'opacity-100' : 'opacity-0'} transition-opacity`}
                    aria-label="Scroll right"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </button>
            </div>
            
            <div 
                ref={containerRef} 
                onScroll={handleScroll}
                className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
            >
                {data?.map((character, index) => (
                    <div className='h-full flex-shrink-0' key={index}>
                        <div
                            className="w-[110px] sm:w-[135px] md:w-[155px] xl:w-[175px] h-[170px] sm:h-[200px] md:h-[230px] xl:h-[265px] relative rounded-lg cursor-pointer"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
                        >
                            <img
                                className={`w-full h-full rounded-lg transition-opacity duration-500 absolute ${hoveredIndex === index ? 'opacity-0' : 'opacity-100'} top-0 left-0 object-cover`}
                                src={character?.node?.image?.large}
                                alt={character?.node?.name?.full}
                                loading="lazy"
                            />
                            {character?.voiceActorRoles?.[0]?.voiceActor?.image?.large && (
                                <img
                                    className="w-full h-full top-0 left-0 rounded-lg object-cover"
                                    src={character?.voiceActorRoles[0]?.voiceActor?.image.large}
                                    alt={character?.voiceActorRoles[0]?.voiceActor?.name?.full || ''}
                                    loading="lazy"
                                />
                            )}
                            <div className="p-2 absolute top-0 left-0 align-bottom flex flex-col-reverse w-full h-full bg-gradient-to-b from-transparent via-transparent to-black">
                                <div className="font-medium text-[10px] sm:text-xs opacity-80 text-white">{character.role}</div>
                                <div className="font-semibold text-white text-xs sm:text-sm line-clamp-2">
                                    {hoveredIndex === index && character?.voiceActorRoles?.[0]?.voiceActor?.name?.full 
                                        ? character.voiceActorRoles[0].voiceActor.name.full 
                                        : character?.node?.name?.full}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {(!data || data.length === 0) && (
                    <p className="text-[#999] py-8">No character information available</p>
                )}
            </div>
        </div>
    );
}

export default Characters; 