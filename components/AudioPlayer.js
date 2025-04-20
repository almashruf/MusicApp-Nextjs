"use client"

import { useEffect, useRef, useState } from "react"

const AudioPlayer = ({ isPlaying, soundType, audioSrc }) => {
  const audioRef = useRef(null)
  const [volume, setVolume] = useState(0.7)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Optional: Add fade in/out effects
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      // Fade in
      let vol = 0
      audioRef.current.volume = vol
      const fadeIn = setInterval(() => {
        if (vol < volume) {
          vol += 0.05
          audioRef.current.volume = Math.min(volume, vol) // Ensure volume never exceeds target
        } else {
          clearInterval(fadeIn)
        }
      }, 100)

      return () => clearInterval(fadeIn)
    } else {
      // Fade out
      let vol = audioRef.current.volume
      const fadeOut = setInterval(() => {
        if (vol > 0) {
          vol -= 0.05
          audioRef.current.volume = Math.max(0, vol) // Ensure volume is never negative
        } else {
          clearInterval(fadeOut)
          audioRef.current.pause()
        }
      }, 100)

      return () => clearInterval(fadeOut)
    }
  }, [isPlaying, volume])

  return (
    <audio
      ref={audioRef}
      src={audioSrc}
      loop
      preload="auto"
      onEnded={() => {
        // Handle audio ended if needed
      }}
    />
  )
}

export default AudioPlayer
