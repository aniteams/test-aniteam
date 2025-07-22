'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import jsCookie from 'js-cookie'
import { motion, AnimatePresence } from 'framer-motion'
import NetflixStyleDetails from '@components/details/NetflixStyleDetails'
import AnimeDetailsBottom from '@components/details/AnimeDetailsBottom'
import List from '@components/details/list'
import { fetchAnimeData } from '../../actions/aniListFetch'

const AnimeDetails = () => {
  const { id } = useParams()
  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedList, setSelectedList] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const [watchUrl, setWatchUrl] = useState(null)
  const [charactersAndStaff, setCharactersAndStaff] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchAnimeDetails = async () => {
      const primaryUrl = `${process.env.NEXT_PUBLIC_CONSUMET_BASE_URL}/meta/anilist/data/${id}`
      const fallbackUrl = `https://hianime-mapper-iv3g.vercel.app/anime/info/${id}`

      try {
        let response = await fetch(primaryUrl)
        if (!response.ok) throw new Error('Primary API failed')
        const data = await response.json()
        setAnime(data)
      } catch {
        try {
          let fallbackResponse = await fetch(fallbackUrl)
          const fallbackData = await fallbackResponse.json()
          setAnime(fallbackData.data)
        } catch {}
      } finally {
        setLoading(false)
      }
    }

    const checkExistingStatus = async () => {
      const uid = jsCookie.get('uid')
      if (!uid || !id) return

      try {
        const res = await fetch('/api/checkStatus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ animeId: id }),
        })
        const { status } = await res.json()
        if (status) setSelectedList(status)
      } catch (err) {
        console.error('Failed to check bookmark status', err)
      }
    }

    // Fetch characters and staff data
    const fetchCharactersAndStaff = async () => {
      try {
        const data = await fetchAnimeData(parseInt(id))
        setCharactersAndStaff(data)
      } catch (err) {
        console.error('Failed to fetch characters and staff', err)
      }
    }

    fetchAnimeDetails()
    checkExistingStatus()
    fetchCharactersAndStaff()
  }, [id])

  useEffect(() => {
    // Set the watch URL
    if (anime) {
      setWatchUrl(`/watch/${id}`)
    }
  }, [anime, id])

  const handleSelectList = async (list) => {
    setSelectedList(list)
    setSubmitting(true)
    setDropdownOpen(false)

    const uid = jsCookie.get('uid')

    if (!uid) {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []
      const filtered = bookmarks.filter(item => item.id !== anime.id)
      filtered.push({
        id: anime.id,
        title: anime.title?.english || anime.title?.romaji,
        image: anime.image,
        status: list
      })
      localStorage.setItem('bookmarks', JSON.stringify(filtered))
      setSubmitting(false)
      setSuccessMessage('Anime Saved!')
      setTimeout(() => setSuccessMessage(false), 2000) // hide after 2 seconds
      return
    }

    try {
      const res = await fetch('/api/saveBookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid,
          animeId: anime.id,
          title: anime.title?.english || anime.title?.romaji,
          image: anime.image,
          status: list,
        }),
      })

      if (res.ok) {
        const { message } = await res.json()
        if (message === 'Anime Saved!') {
          setSuccessMessage('Anime Saved!')
          setTimeout(() => setSuccessMessage(false), 2000) // hide after 2 seconds
        }
      } else {
        throw new Error('Failed to save anime')
      }
    } catch (error) {
      console.error('Error saving anime to Firestore:', error)
    } finally {
      setSubmitting(false)
    }
  }

  // Combine all data for AnimeDetailsBottom
  const combinedData = anime ? {
    ...anime,
    characters: charactersAndStaff?.characters,
    staff: charactersAndStaff?.staff
  } : null

  return (
    <div className="bg-black text-white min-h-screen">
      {loading ? <SkeletonLoader /> : anime ? (
        <>
          <NetflixStyleDetails 
            data={anime} 
            id={id} 
            session={{user: jsCookie.get('uid') ? {name: jsCookie.get('uid')} : null}}
            list={selectedList}
            setList={setSelectedList}
            url={watchUrl}
          />
          
          <div className="container mx-auto px-4 mt-8">
            <div className="mb-8">
              <List id={id} />
            </div>
            
            <AnimeDetailsBottom data={combinedData} />
          </div>
          
          {successMessage && (
            <motion.div
              className="fixed top-4 right-4 p-4 bg-green-600 text-white rounded z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Done!
            </motion.div>
          )}
        </>
      ) : (
        <ErrorMessage />
      )}
    </div>
  )
}

const SkeletonLoader = () => (
  <div className="animate-pulse">
    {/* Hero section skeleton */}
    <div className="h-[65vh] bg-gray-800 relative">
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="h-12 w-3/4 bg-gray-700 rounded mb-4"></div>
        <div className="h-4 w-1/2 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 w-1/3 bg-gray-700 rounded mb-4"></div>
        <div className="h-10 w-32 bg-gray-700 rounded"></div>
      </div>
    </div>
    
    {/* Content skeleton */}
    <div className="container mx-auto px-4 mt-8">
      <div className="h-10 bg-gray-800 rounded mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-800 rounded"></div>
        ))}
      </div>
      <div className="h-8 w-48 bg-gray-800 rounded mb-4"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-800 rounded"></div>
        ))}
      </div>
    </div>
  </div>
)

const ErrorMessage = () => (
  <div className="text-center text-red-500 mt-10 p-8">
    <h2 className="text-2xl font-bold mb-4">Anime Not Found</h2>
    <p>Sorry, we couldn't find the anime you're looking for. Please check the URL and try again.</p>
  </div>
)

export default AnimeDetails
