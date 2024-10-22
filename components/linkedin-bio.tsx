'use client'

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, Mountain, ArrowRight, Copy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"

export function LinkedinBioGenerator() {
  const [userInput, setUserInput] = useState('')
  const [language, setLanguage] = useState('english')
  const [vibe, setVibe] = useState('professional')
  const [generatedBio, setGeneratedBio] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [bioCount, setBioCount] = useState(0)

  const handleGenerate = async () => {
    setIsLoading(true)
    setGeneratedBio('')
    try {
      const response = await fetch('/api/generate_bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput, language, vibe }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate bio')
      }

      const data = await response.json() as { bio: string }
      setGeneratedBio(data.bio)
      setBioCount(prevCount => prevCount + 1)
    } catch (error) {
      console.error('Error generating bio:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Mountain className="h-6 w-6" />
            <span className="font-bold text-xl">LinkedIn Bio Generator</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="group transition-all duration-300 ease-in-out transform hover:scale-105 rounded-full"
          >
            <span className="mr-2 text-orange-500">{bioCount}</span>
            <span className="group-hover text-gray-500">bios generated so far</span>
          </Button>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">Create Your Professional Bio</CardTitle>
            <CardDescription className="text-center text-gray-600">Generate the perfect summary in seconds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">1. Tell us about yourself</h2>
              <Textarea
                placeholder="Enter some facts or an intro about yourself..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-2">2. Choose your language</h2>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="portuguese">Portuguese</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="thai">Thai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">3. Select your vibe</h2>
              <Select value={vibe} onValueChange={setVibe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Vibe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="funny">Funny</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleGenerate} 
              disabled={isLoading || !userInput.trim()} 
              className="w-full group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <span className="flex items-center justify-center">
                  Generate your bio
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
                </span>
              )}
            </Button>
            
            {generatedBio && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Your Professional Summary</h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="w-full max-w-2xl mx-auto cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white hover:bg-gray-50"
                        onClick={() => copyToClipboard(generatedBio)}>
                    <CardContent className="p-4 flex items-start">
                      <p className="text-gray-700 flex-grow">{generatedBio}</p>
                      <Copy className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <footer className="py-1 px-1 mt-4 mb-8 text-center text-sm text-gray-500">
        <p className="max-w-2xl mx-auto">
          Powered by{' '}
          <a 
            href="https://developers.cloudflare.com/workers-ai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-500 hover:underline"
          >
            Cloudflare Workers AI
          </a>
          {' '}using{' '}
          <a 
            href="https://developers.cloudflare.com/workers-ai/models/llama-3.1-70b-instruct/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-500 hover:underline"
          >
            Meta Llama 3.1
          </a>
        </p>
      </footer>
    </div>
  )
}
