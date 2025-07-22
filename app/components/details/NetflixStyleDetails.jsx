"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faClosedCaptioning,
  faMicrophone,
  faHeart,
  faInfoCircle,
  faStar,
  faCalendarAlt,
  faClock,
  faFilm,
  faBookmark,
  faCheck,
  faList,
  faPlus,
  faChevronDown,
  faShareAlt,
  faThumbsUp,
  faCopy,
  faXmark,
  faVolumeHigh,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { useTitle, useSettings } from '@lib/store';
import { useStore } from 'zustand';
import Addtolist from './Addtolist';
import Tag from './Tag';

function NetflixStyleDetails({ data, id, session, list, setList, url }) {
  const animetitle = useStore(useTitle, (state) => state.animetitle);
  const settings = useStore(useSettings, (state) => state.settings);
  const [isFull, setIsFull] = useState(false);
  const [showWatchlistDropdown, setShowWatchlistDropdown] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [openlist, setOpenlist] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [muted, setMuted] = useState(true);
  const watchlistDropdownRef = useRef(null);
  const shareDropdownRef = useRef(null);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Handle click outside of dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (watchlistDropdownRef.current && !watchlistDropdownRef.current.contains(event.target)) {
        setShowWatchlistDropdown(false);
      }
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function Handlelist() {
    setOpenlist(!openlist);
  }

  const handleToggleMute = () => {
    setMuted((prev) => {
      const newMuted = !prev;
      if (playerRef.current) {
        if (newMuted) {
          playerRef.current.mute();
        } else {
          playerRef.current.unMute();
        }
      }
      return newMuted;
    });
  };

  // Load YouTube IFrame API
  useEffect(() => {
    if (data?.trailer?.id && settings.bannertrailer === true) {
      console.log('Loading YouTube API for trailer:', data.trailer.id);
      if (typeof window !== 'undefined') {
        if (window.YT) {
          loadPlayer();
        } else {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          const firstScriptTag = document.getElementsByTagName("script")[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          window.onYouTubeIframeAPIReady = loadPlayer;
        }
      }
    }
  }, [data, settings.bannertrailer]);

  function loadPlayer() {
    console.log('Loading player for trailer:', data?.trailer?.id);
    if (data?.trailer?.id && playerContainerRef.current && settings.bannertrailer === true) {
      try {
        if (playerRef.current) {
          playerRef.current.destroy();
        }
        
        // Create a div element that will contain the YouTube iframe
        const playerElement = document.createElement('div');
        playerElement.id = 'youtube-player-' + Date.now();
        playerContainerRef.current.innerHTML = ''; // Clear existing content
        playerContainerRef.current.appendChild(playerElement);
        
        // Use larger size to ensure full coverage with no blank spaces
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Make the player slightly larger than the viewport
        const playerWidth = viewportWidth * 1.2;
        const playerHeight = viewportHeight * 1.2;
        
        console.log('Creating YouTube player with video ID:', data.trailer.id);
        playerRef.current = new window.YT.Player(playerElement.id, {
          videoId: data.trailer.id,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            loop: 1,
            playlist: data.trailer.id,
            disablekb: 1, // Disable keyboard controls
            fs: 0, // Disable fullscreen button
          },
          events: {
            onReady: (event) => {
              console.log('YouTube player ready');
              event.target.playVideo();
              if (muted) {
                event.target.mute();
              } else {
                event.target.unMute();
              }
              
              // Apply CSS to the iframe to ensure it covers the entire container
              const iframe = playerContainerRef.current?.querySelector('iframe');
              if (iframe) {
                iframe.style.position = 'absolute';
                iframe.style.top = '50%';
                iframe.style.left = '50%';
                iframe.style.width = playerWidth + 'px';
                iframe.style.height = playerHeight + 'px';
                iframe.style.transform = 'translate(-50%, -50%)';
                iframe.style.pointerEvents = 'none';
              }
            },
            onStateChange: (event) => {
              console.log('YouTube player state changed:', event.data);
              // When video ends (state = 0), set videoEnded to true
              if (event.data === 0) {
                setVideoEnded(true);
              }
            },
            onError: (event) => {
              console.error('YouTube player error:', event.data);
              setVideoEnded(true);
            }
          },
        });
        
        // Handle window resize to maintain full coverage
        const handleResize = () => {
          const iframe = playerContainerRef.current?.querySelector('iframe');
          if (iframe) {
            const newViewportWidth = window.innerWidth;
            const newViewportHeight = window.innerHeight;
            
            iframe.style.width = (newViewportWidth * 1.2) + 'px';
            iframe.style.height = (newViewportHeight * 1.2) + 'px';
          }
        };
        
        window.addEventListener('resize', handleResize);
        
        // Return cleanup function
        return () => {
          window.removeEventListener('resize', handleResize);
        };
        
      } catch (error) {
        console.error('Error creating YouTube player:', error);
        setVideoEnded(true);
      }
    }
  }

  // Force trailer to play on mount
  useEffect(() => {
    setVideoEnded(false);
  }, []);

  // Get anime info from data
  const title = data?.title?.[animetitle] || data?.title?.romaji || data?.title?.english;
  const japanese_title = animetitle === 'romaji' ? data?.title?.english : data?.title?.romaji;
  const poster = data?.coverImage?.extraLarge || data?.image;
  const banner = data?.bannerImage || data?.cover || poster;
  
  // Create info object from data
  const info = {
    tvInfo: {
      showType: data?.format || data?.type || 'TV',
      year: data?.startDate?.year,
      quality: 'HD',
      rating: data?.averageScore ? `${data.averageScore / 10}/10` : 'N/A',
      sub: 'SUB',
      dub: data?.format === 'MOVIE' ? 'DUB' : null
    },
    Overview: data?.description?.replace(/<[^>]*>/g, '') || 'No description available',
    Duration: data?.duration ? `${data.duration} min` : 'Unknown',
    Status: data?.status || 'Unknown',
    'MAL Score': data?.averageScore ? `${data.averageScore / 10}/10` : 'N/A',
    Aired: data?.startDate ? `${data.startDate.year}-${data.startDate.month}-${data.startDate.day}` : 'Unknown',
    Premiered: data?.season ? `${data.season} ${data.startDate?.year}` : 'Unknown',
    Studios: data?.studios?.nodes?.map(node => node.name) || ['Unknown'],
    Genres: data?.genres || ['Unknown']
  };

  // Create tags from info
  const tags = [
    { condition: info.tvInfo?.rating, icon: faStar, text: info.tvInfo.rating },
    { condition: info.tvInfo?.quality, text: info.tvInfo.quality },
    { condition: info.tvInfo?.sub, icon: faClosedCaptioning, text: info.tvInfo.sub },
    { condition: info.tvInfo?.dub, icon: faMicrophone, text: info.tvInfo.dub },
  ];

  // Check if anime is in progress
  const progress = list !== null ? list?.status === 'COMPLETED' ? 0 : list?.progress : 0;

  return (
    <div className="w-full">
      {/* Netflix-style Hero Banner Section */}
      <div className="relative w-full h-[50vh] sm:h-[65vh] md:h-[80vh] overflow-hidden">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10"></div>
        
        {/* Video player or background image */}
        {data?.trailer?.id && settings.bannertrailer === true && !videoEnded ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div ref={playerContainerRef} className="relative w-full h-full"></div>
          </div>
        ) : (
          <img 
            src={banner} 
            alt={`${title} Banner`} 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {/* Mute/Unmute button if video is playing */}
        {data?.trailer?.id && settings.bannertrailer === true && !videoEnded && (
          <div className="absolute bottom-4 right-4 z-30">
            <button
              onClick={handleToggleMute}
              className="bg-black/60 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              <FontAwesomeIcon
                icon={muted ? faVolumeMute : faVolumeHigh}
                className="w-5 h-5"
              />
            </button>
          </div>
        )}
        
        {/* Content positioned at bottom left */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12 z-20 flex flex-col items-start">
          {/* Title and metadata */}
          <div className="max-w-full md:max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
              {title}
            </h1>
            
            {/* Netflix-style metadata row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#ddd] mb-2 sm:mb-4">
              <span className="text-[#1a365d] font-medium">{info.tvInfo.showType}</span>
              {info.tvInfo.year && <span>{info.tvInfo.year}</span>}
              {info.tvInfo.quality && <span className="border border-[#555] px-1">{info.tvInfo.quality}</span>}
              <span className="px-2 py-0.5 bg-[#333] rounded text-xs">{info.tvInfo.rating}</span>
              {info.Duration && <span>{info.Duration}</span>}
            </div>
            
            {/* Description */}
            {info.Overview && (
              <p className="text-[#ddd] text-sm md:text-base mb-3 sm:mb-6 max-w-full md:max-w-2xl leading-relaxed">
                {isFull ? info.Overview : `${info.Overview.slice(0, 120)}...`}
                <button
                  className="text-[#ddd] font-medium ml-2 transition duration-300 hover:text-white"
                  onClick={() => setIsFull(!isFull)}
                >
                  {isFull ? "less" : "more"}
                </button>
              </p>
            )}
            
            {/* Tags in Netflix style */}
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-6">
              {tags.map(({ condition, icon, text }, index) => condition && (
                <div key={index} className="flex items-center gap-1 px-2 py-1 bg-[#333] rounded text-xs text-white">
                  {icon && <FontAwesomeIcon icon={icon} className="text-xs" />}
                  <span>{text}</span>
                </div>
              ))}
            </div>
            
            {/* Netflix-style Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link 
                href={url ?? ''} 
                className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white hover:bg-[#e6e6e6] text-black text-sm sm:text-base font-medium rounded-md transition-colors ${!url && 'opacity-50 bg-black pointer-events-none'}`}
              >
                <FontAwesomeIcon icon={faPlay} />
                <span className="whitespace-nowrap">
                  {list !== null && list?.status === 'COMPLETED' ? 'Rewatch' : list !== null && list?.progress > 0 ? `Ep ${list?.progress+1}` : `Play`}
                </span>
              </Link>
              
              {/* Action buttons for mobile - grouped together */}
              <div className="flex items-center gap-1 sm:gap-2">
                <Button 
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#232323] border border-[#555] hover:border-white transition-colors"
                  onPress={onOpen}
                >
                  <FontAwesomeIcon icon={faInfoCircle} size="sm" />
                </Button>
                
                <Button 
                  onClick={Handlelist}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#232323] border border-[#555] hover:border-white transition-colors"
                  title={list && list?.status !== null ? 'Edit List' : 'Add to List'}
                >
                  <FontAwesomeIcon icon={faPlus} size="sm" />
                </Button>
                
                <Button 
                  onClick={() => setShowShareDropdown(!showShareDropdown)}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#232323] border border-[#555] hover:border-white transition-colors ml-auto"
                  title="Share"
                >
                  <FontAwesomeIcon icon={faShareAlt} size="sm" />
                </Button>
              </div>
              
              {/* Share Dropdown - Position adjusted for mobile */}
              {showShareDropdown && (
                <div ref={shareDropdownRef} className="absolute right-4 sm:right-12 bottom-16 sm:bottom-24 w-56 sm:w-64 rounded shadow-lg bg-[#232323] border border-[#555] z-50">
                  <div className="py-1">
                    <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-white font-medium border-b border-[#444] flex justify-between items-center">
                      <span>Share this title</span>
                      <button 
                        onClick={() => setShowShareDropdown(false)}
                        className="text-[#999] hover:text-white"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                    
                    <div className="p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-[#999] mb-2">Copy link to share:</p>
                      <div className="flex items-center bg-[#111] rounded overflow-hidden">
                        <input 
                          type="text" 
                          readOnly 
                          value={typeof window !== 'undefined' ? window.location.href : ''}
                          className="flex-grow bg-transparent text-white text-xs sm:text-sm p-2 outline-none truncate"
                        />
                        <button 
                          onClick={() => {
                            if (typeof navigator !== 'undefined') {
                              navigator.clipboard.writeText(window.location.href);
                              setLinkCopied(true);
                              setTimeout(() => setLinkCopied(false), 2000);
                            }
                          }}
                          className="px-2 sm:px-3 py-2 text-white hover:bg-[#333] transition-colors"
                        >
                          <FontAwesomeIcon icon={faCopy} size="sm" />
                        </button>
                      </div>
                      {linkCopied && (
                        <p className="text-xs text-[#1a365d] mt-2">Link copied!</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Netflix-style maturity rating */}
        {data?.isAdult && (
          <div className="absolute top-4 sm:top-8 md:top-12 right-4 sm:right-8 md:right-12 z-20 bg-[#333] text-white px-2 py-1 border-l-4 border-[#1a365d]">
            <span className="text-xs sm:text-sm font-medium">18+</span>
          </div>
        )}
      </div>
      
      {/* Trailer Modal - Make responsive */}
      <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size={"xl"} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-0">{title}</ModalHeader>
              <ModalBody>
                <div className="w-full">
                  {data?.trailer?.id ? (
                    <div className="aspect-video w-full">
                      <iframe
                        title="Trailer"
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${data?.trailer?.id}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
                        frameBorder="0"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>
                  ) : (
                    <div className="aspect-video w-full flex items-center justify-center bg-[#111]">
                      <p className="text-[#999]">No trailer available</p>
                    </div>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      
      {/* Add to List Modal - Improved for mobile */}
      {session?.user ? (
        <Modal isOpen={openlist} onOpenChange={Handlelist} size={"3xl"} backdrop="opaque" hideCloseButton={true} placement="center" radius="sm" scrollBehavior="outside"
          classNames={{
            body: "p-0",
          }}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className=''>
                  <div className='relative'>
                    <div
                      className="w-full !h-28 sm:!h-40 brightness-50 rounded-t-md"
                      style={{ backgroundImage: `url(${banner})`, backgroundPosition: "center", backgroundSize: "cover", height: "100%", }}
                    ></div>
                    <div className='absolute z-10 bottom-1 sm:bottom-0 sm:top-[65%] left-0 sm:left-3 md:left-10 flex flex-row items-center'>
                      <Image src={poster} alt='Image' width={80} height={80} className="hidden sm:flex rounded-md" priority={true}/>
                      <div className='px-2 sm:px-4 mb-2 sm:mb-4 font-medium text-base sm:!text-xl text-white max-w-full line-clamp-2'>{title}</div>
                    </div>
                  </div>
                  <div className='mt-2 sm:mt-20 md:px-[5%] px-[2%] mb-2'>
                    <Addtolist session={session} setList={setList} list={list}
                      id={data?.id} eplength={data?.episodes || data?.nextAiringEpisode?.episode - 1 || 24} Handlelist={Handlelist} />
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      ) : (
        <Modal isOpen={openlist} onOpenChange={Handlelist} size={"xs"} backdrop="opaque" hideCloseButton={true} placement="center" radius="sm"
          classNames={{
            body: "py-6 px-3",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className=''>
                  <div className="text-center flex flex-col justify-center items-center">
                    <p className="text-base sm:text-lg mb-3">Login to edit your list.</p>
                    <Link href="/login" className="font-semibold outline-none border-none py-2 px-4 bg-[#1a365d] rounded-md flex items-center">
                      <Image alt="anilist-icon" loading="lazy" width="25" height="25" src="/anilist.svg" className='mr-2' />
                      Login With Anilist
                    </Link>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      
      {/* Netflix-style Content Sections with completely transparent background */}
      <div className="w-full bg-transparent">
        {/* About Section - Improved for mobile */}
        <div className="px-4 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 border-b border-[#333]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-base sm:text-lg md:text-xl font-medium text-white mb-2 sm:mb-3 md:mb-4">About {title}</h2>
              <p className="text-[#999] text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 md:mb-6">{info.Overview}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="mb-2 sm:mb-0">
                  <p className="text-[#999] mb-1">Studios:</p>
                  <div className="flex flex-wrap">
                    {Array.isArray(info.Studios) ? (
                      info.Studios.map((studio, index) => (
                        <Link
                          key={index}
                          href={`/producer/${studio.replace(/[&'"^%$#@!()+=<>:;,.?\/\\|{}[\]`~*_]/g, "").split(" ").join("-").replace(/-+/g, "-")}`}
                          className="text-white hover:underline mr-1"
                        >
                          {studio}{index < info.Studios.length - 1 && ", "}
                        </Link>
                      ))
                    ) : info.Studios ? (
                      <Link
                        href={`/producer/${info.Studios.replace(/[&'"^%$#@!()+=<>:;,.?\/\\|{}[\]`~*_]/g, "").split(" ").join("-").replace(/-+/g, "-")}`}
                        className="text-white hover:underline"
                      >
                        {info.Studios}
                      </Link>
                    ) : "Unknown"}
                  </div>
                </div>
                
                <div className="mb-2 sm:mb-0">
                  <p className="text-[#999] mb-1">Genres:</p>
                  <div className="flex flex-wrap">
                    {Array.isArray(info.Genres) ? (
                      info.Genres.map((genre, index) => (
                        <Link
                          key={index}
                          href={`/genre/${genre.replace(/[&'"^%$#@!()+=<>:;,.?\/\\|{}[\]`~*_]/g, "").split(" ").join("-").toLowerCase()}`}
                          className="text-white hover:underline mr-1"
                        >
                          {genre}{index < info.Genres.length - 1 && ", "}
                        </Link>
                      ))
                    ) : info.Genres ? (
                      <Link
                        href={`/genre/${info.Genres.replace(/[&'"^%$#@!()+=<>:;,.?\/\\|{}[\]`~*_]/g, "").split(" ").join("-").toLowerCase()}`}
                        className="text-white hover:underline"
                      >
                        {info.Genres}
                      </Link>
                    ) : "Unknown"}
                  </div>
                </div>
                
                <div className="mb-2 sm:mb-0">
                  <p className="text-[#999] mb-1">Status:</p>
                  <p className="text-white">{info.Status || "Unknown"}</p>
                  
                  <p className="text-[#999] mb-1 mt-2 sm:mt-3">MAL Score:</p>
                  <p className="text-white">{info['MAL Score'] || "N/A"}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-1 sm:mt-2 md:mt-0">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <p className="text-[#999] mb-1">Type:</p>
                  <p className="text-white">{info.tvInfo.showType || "TV"}</p>
                  
                  <p className="text-[#999] mb-1 mt-2 sm:mt-3">Aired:</p>
                  <p className="text-white">{info.Aired || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-[#999] mb-1">Duration:</p>
                  <p className="text-white">{info.Duration || "Unknown"}</p>
                  
                  <p className="text-[#999] mb-1 mt-2 sm:mt-3">Premiered:</p>
                  <p className="text-white">{info.Premiered || "Unknown"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NetflixStyleDetails; 