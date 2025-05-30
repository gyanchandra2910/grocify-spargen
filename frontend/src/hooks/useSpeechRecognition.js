import { useState, useRef, useCallback } from 'react'

// Custom hook for speech recognition
export default function useSpeechRecognition({ onResult, lang = 'en-US' } = {}) {
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)
  const isSupported = typeof window !== 'undefined' && (
    window.SpeechRecognition || window.webkitSpeechRecognition
  )

  const start = useCallback(() => {
    if (!isSupported) return
    if (!recognitionRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.lang = lang
      recognition.interimResults = false
      recognition.maxAlternatives = 1
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        if (onResult) onResult(transcript)
      }
      recognition.onstart = () => setListening(true)
      recognition.onend = () => setListening(false)
      recognition.onerror = () => setListening(false)
      recognitionRef.current = recognition
    }
    recognitionRef.current.start()
  }, [isSupported, lang, onResult])

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }, [])

  return { listening, start, stop, isSupported }
}
