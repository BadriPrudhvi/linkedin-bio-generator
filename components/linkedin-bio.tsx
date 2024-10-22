'use client'

import { useState, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, ArrowRight, NotebookPen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { BioResult } from "@/components/bio-result"

export function LinkedinBioGenerator() {
  const [userInput, setUserInput] = useState('')
  const [language, setLanguage] = useState('english')
  const [vibe, setVibe] = useState('professional')
  const [generatedBio, setGeneratedBio] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const startTime = useRef(0)
  const { toast } = useToast()

  const handleGenerate = async () => {
    setIsLoading(true)
    setGeneratedBio('')
    startTime.current = Date.now()
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

      const endTime = Date.now()
      const duration = (endTime - startTime.current) / 1000 // Convert to seconds

      toast({
        title: "Professional Bio Ready!",
        description: `Generated in ${duration.toFixed(2)} seconds.`,
      })
    } catch (error) {
      console.error('Error generating bio:', error)
      toast({
        title: "Error",
        description: "Failed to generate bio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Your LinkedIn bio has been copied to the clipboard.",
    })
  }, [toast])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <NotebookPen className="h-6 w-6" />
            <span className="font-bold text-xl">LinkedIn Bio Generator</span>
          </div>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-responsive-2xl font-bold text-center text-2xl text-linkedin-blue">Create Your Professional Bio</CardTitle>
            <CardDescription className="text-center text-linkedin-dark-gray">Generate the perfect summary in seconds</CardDescription>
          </CardHeader>
          <Separator className="w-[95%] mx-auto" />
          <CardContent className="space-y-6 p-6">
            <BioInputSection
              title="1. Tell us about yourself"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            
            <BioSelectSection
              title="2. Choose your language"
              value={language}
              onValueChange={setLanguage}
              options={[
                { value: "english", label: "English" },
                { value: "spanish", label: "Spanish" },
                { value: "german", label: "German" },
                { value: "french", label: "French" },
                { value: "italian", label: "Italian" },
                { value: "portuguese", label: "Portuguese" },
                { value: "hindi", label: "Hindi" },
                { value: "thai", label: "Thai" },
              ]}
            />

            <BioSelectSection
              title="3. Select your vibe"
              value={vibe}
              onValueChange={setVibe}
              options={[
                { value: "professional", label: "Professional" },
                { value: "casual", label: "Casual" },
                { value: "funny", label: "Funny" },
              ]}
            />
            
            <Button 
              onClick={handleGenerate} 
              disabled={isLoading || !userInput.trim()} 
              className="w-full bg-linkedin-blue hover:bg-linkedin-dark-blue text-white transition-colors duration-200"
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

            {generatedBio && <BioResult bio={generatedBio} onCopy={copyToClipboard} />}
          </CardContent>
        </Card>
      </div>
      
      <footer className="text-center p-4 text-sm text-linkedin-dark-gray">
        <p>
          Powered by{' '}
          <a 
            href="https://developers.cloudflare.com/workers-ai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-linkedin-blue hover:underline"
          >
            Cloudflare Workers AI
          </a>
          {' '}using{' '}
          <a 
            href="https://developers.cloudflare.com/workers-ai/models/llama-3.1-70b-instruct/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-linkedin-blue hover:underline"
          >
            Meta Llama 3.1
          </a>
        </p>
      </footer>
    </div>
  )
}

interface BioInputSectionProps {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function BioInputSection({ title, value, onChange }: BioInputSectionProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-linkedin-dark-gray">{title}</h2>
      <Textarea
        placeholder="Enter some facts or an intro about yourself..."
        value={value}
        onChange={onChange}
        className="min-h-[100px] border-linkedin-light-blue focus:border-linkedin-blue"
      />
    </div>
  )
}

interface BioSelectSectionProps {
  title: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function BioSelectSection({ title, value, onValueChange, options }: BioSelectSectionProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-linkedin-dark-gray">{title}</h2>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="border-linkedin-light-blue focus:border-linkedin-blue">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
