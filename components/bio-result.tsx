import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Copy } from "lucide-react"

interface BioResultProps {
  bio: string;
  onCopy: (text: string) => void;
}

export function BioResult({ bio, onCopy }: BioResultProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center text-linkedin-blue mb-4">Your LinkedIn Bio</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card 
          className="w-full max-w-2xl mx-auto cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white hover:bg-gray-50"
          onClick={() => onCopy(bio)}
        >
          <CardContent className="p-4 flex items-start">
            <p className="text-linkedin-dark-gray flex-grow">{bio}</p>
            <Copy className="h-4 w-4 text-linkedin-blue ml-2 flex-shrink-0" />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
