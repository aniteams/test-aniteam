"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Characters from "./Characters";
import Overview from "./tabs/Overview";
import Link from "next/link";

function AnimeDetailsBottom({ data }) {
  const [relatedAnime, setRelatedAnime] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data?.id && !data?.relations?.edges) {
      setLoading(true);
      fetchRelations(data.id);
    }
  }, [data]);

  const fetchRelations = async (animeId) => {
    const query = `
      query ($id: Int) {
        Media(id: $id) {
          relations {
            edges {
              node {
                id
                title {
                  romaji
                  english
                }
                coverImage {
                  large
                }
                status
                startDate {
                  year
                }
                episodes
                averageScore
              }
              relationType
            }
          }
        }
      }
    `;

    try {
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { id: animeId },
        }),
      });

      const result = await response.json();
      if (result?.data?.Media?.relations?.edges) {
        setRelatedAnime(result.data.Media.relations.edges);
      }
    } catch (error) {
      console.error('Error fetching relations:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      name: "Overview",
      label: "Overview",
    },
    {
      name: "Relations",
      label: "Relations",
    },
    {
      name: "Characters",
      label: "Characters",
    },
    {
      name: "Staff",
      label: "Staff",
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  const isSelected = (tab) => activeTab.name === tab.name;

  return (
    <div className="mt-8 bg-black">
      <div className="border-b border-[#333] mb-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <div
              key={tab.name}
              className={`relative px-4 py-2 cursor-pointer ${
                isSelected(tab) ? "text-white" : "text-[#999] hover:text-[#ddd]"
              }`}
            >
              <div key={tab.name} onClick={(e) => handleClick(e, tab)}>
                {tab.label}
              </div>
              {isSelected(tab) && (
                <motion.div 
                  layoutId="indicator" 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1a365d]" 
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab.name || "empty"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 sm:px-8 md:px-12"
        >
          {activeTab.name === "Overview" && <Overview data={data} />}
          {activeTab.name === "Relations" && (
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">Related Anime</h3>
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="aspect-[3/4] bg-gray-700 rounded-md"></div>
                      <div className="mt-2 h-4 bg-gray-700 rounded w-3/4"></div>
                      <div className="mt-1 h-3 bg-gray-700 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {(data?.relations?.edges || relatedAnime)?.map((edge, index) => (
                    <Link href={`/anime/${edge?.node?.id}`} key={index} className="relative group">
                      <div className="aspect-[3/4] bg-[#333] rounded-md overflow-hidden">
                        <img 
                          src={edge?.node?.coverImage?.large} 
                          alt={edge?.node?.title?.romaji} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-sm text-white line-clamp-1 group-hover:text-[#1a365d] transition-colors">
                          {edge?.node?.title?.english || edge?.node?.title?.romaji}
                        </p>
                        <p className="text-xs text-[#999]">{edge?.relationType}</p>
                      </div>
                    </Link>
                  ))}
                  {(!data?.relations?.edges && !relatedAnime.length) && (
                    <p className="text-[#999] col-span-full">No related anime found</p>
                  )}
                </div>
              )}
            </div>
          )}
          {activeTab.name === "Characters" && (
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">Characters</h3>
              <Characters data={data?.characters?.edges} />
            </div>
          )}
          {activeTab.name === "Staff" && (
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">Staff</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {data?.staff?.edges?.map((edge, index) => (
                  <div key={index} className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-2">
                      <img 
                        src={edge?.node?.image?.large} 
                        alt={edge?.node?.name?.full} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-white line-clamp-1">{edge?.node?.name?.full}</p>
                    <p className="text-xs text-[#999]">{edge?.role}</p>
                  </div>
                ))}
                {(!data?.staff?.edges || data?.staff?.edges.length === 0) && (
                  <p className="text-[#999] col-span-full">No staff information available</p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default AnimeDetailsBottom; 