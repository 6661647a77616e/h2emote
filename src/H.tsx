'use client'

import React, { useState, useEffect } from 'react'
import mojiTranslate from 'moji-translate'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw, Volume2 } from 'lucide-react'

export default function H() {
  const [currentHadith, setCurrentHadith] = useState({ text: '', number: '' })
  const [translatedText, setTranslatedText] = useState('')
  const [loading, setLoading] = useState(true)
  const [hadiths, setHadiths] = useState<any[]>([])

  useEffect(() => {
    fetchHadiths()
  }, [])

  const fetchHadiths = async () => {
    try {
      const response = await fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-dehlawi.json'
      )
      const data = await response.json()

      if (data.hadiths && data.hadiths.length > 0) {
        setHadiths(data.hadiths)
        updateHadith()
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching Hadiths:', error)
      setLoading(false)
    }
  }

  const updateHadith = () => {
    const randomIndex = Math.floor(Math.random() * hadiths.length)
    const randomHadith = hadiths[randomIndex]

    const translated = mojiTranslate.translate(randomHadith.text)

    setCurrentHadith({
      text: randomHadith.text,
      number: randomHadith.hadithnumber,
    })
    setTranslatedText(translated)
  }

  const speakHadith = () => {
    const utterance = new SpeechSynthesisUtterance(currentHadith.text)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-blue-600">Random Hadith</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <p className="text-xl font-semibold mb-4 transition-opacity duration-500 ease-in-out">
                  {currentHadith.text}
                </p>
                <p className="text-right text-gray-600">
                  Hadith Number: {currentHadith.number}
                </p>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-2xl font-bold mb-4 text-purple-600">Emoji Translation:</h3>
                <p className="text-lg bg-gray-100 p-4 rounded-lg shadow-inner transition-opacity duration-500 ease-in-out">
                  {translatedText}
                </p>
              </div>
              <div className="flex justify-center space-x-4 mt-6">
                <Button onClick={updateHadith} className="bg-blue-500 hover:bg-blue-600">
                  <RefreshCw className="mr-2 h-4 w-4" /> New Hadith
                </Button>
                <Button onClick={speakHadith} className="bg-purple-500 hover:bg-purple-600">
                  <Volume2 className="mr-2 h-4 w-4" /> Speak Hadith
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

