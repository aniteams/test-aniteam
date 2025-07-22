"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faClock, 
  faFilm, 
  faStar, 
  faLanguage, 
  faBuilding,
  faTag
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function Overview({ data }) {
  if (!data) return <div className="text-[#999]">No data available</div>;

  const formatDescription = (description) => {
    if (!description) return "No description available";
    return description.replace(/<[^>]*>/g, '');
  };

  const synopsis = formatDescription(data.description);

  return (
    <div className="text-white">
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-3">Synopsis</h3>
        <p className="text-[#ddd] text-sm leading-relaxed">{synopsis}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-medium mb-3">Information</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faFilm} className="text-[#999] mt-1" />
              <div>
                <p className="text-sm font-medium">Format</p>
                <p className="text-[#ddd] text-sm">{data.format || data.type || 'Unknown'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faClock} className="text-[#999] mt-1" />
              <div>
                <p className="text-sm font-medium">Episodes</p>
                <p className="text-[#ddd] text-sm">
                  {data.episodes || data.totalEpisodes || 'Unknown'} episodes · {data.duration ? `${data.duration} min each` : 'Unknown duration'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-[#999] mt-1" />
              <div>
                <p className="text-sm font-medium">Release Date</p>
                <p className="text-[#ddd] text-sm">
                  {data.startDate ? `${data.startDate.year}-${data.startDate.month}-${data.startDate.day}` : 'Unknown'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faStar} className="text-[#999] mt-1" />
              <div>
                <p className="text-sm font-medium">Rating</p>
                <p className="text-[#ddd] text-sm">
                  {data.averageScore ? `${data.averageScore / 10}/10` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-3">Details</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faTag} className="text-[#999] mt-1" />
              <div>
                <p className="text-sm font-medium">Genres</p>
                <div className="flex flex-wrap gap-1 text-sm text-[#ddd]">
                  {data.genres && data.genres.length > 0 ? (
                    data.genres.map((genre, index) => (
                      <Link key={index} href={`/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#1a365d]">
                        {genre}{index < data.genres.length - 1 ? ', ' : ''}
                      </Link>
                    ))
                  ) : (
                    'Unknown'
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faBuilding} className="text-[#999] mt-1" />
              <div>
                <p className="text-sm font-medium">Studios</p>
                <div className="text-sm text-[#ddd]">
                  {data.studios && data.studios.nodes && data.studios.nodes.length > 0 ? (
                    data.studios.nodes.map((studio, index) => (
                      <span key={index}>
                        {studio.name}{index < data.studios.nodes.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  ) : (
                    'Unknown'
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faLanguage} className="text-[#999] mt-1" />
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-[#ddd] text-sm">
                  {data.status || 'Unknown'}
                </p>
              </div>
            </div>

            {data.season && (
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-[#999] mt-1" />
                <div>
                  <p className="text-sm font-medium">Season</p>
                  <p className="text-[#ddd] text-sm">
                    {`${data.season} ${data.startDate?.year || ''}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview; 