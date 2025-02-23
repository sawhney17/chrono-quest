import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, Link2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface ResearchResult {
  id?: string;
  scientificName?: string;
  commonName?: string;
  identifiedBy?: string;
  locality?: string;
  // add other fields as needed
}

interface ResearchResponse {
  results: ResearchResult[];
  suggestions: string;
  references: string[];
}

const ResearchAssistant = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<ResearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }
    setLoading(true);
    setError(null);
    setResponseData(null);
    try {
      console.log("Sending query:", query);
      const response = await fetch('http://127.0.0.1:5000/research_assistant', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      console.log("Response received:", response);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      console.log("Data parsed from response:", data);
      setResponseData(data);
      // @ts-expect-error idk why this is an error
    } catch (err: never) {
      console.error("Fetch error:", err);
      setError(err.message);
      toast.error(`Search failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for the search icon (magnifying glass)
  const searchIconVariants = {
    idle: { scale: 1 },
    searching: {
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-emerald-800">Research Assistant</CardTitle>
          <CardDescription>
            Ask questions about plants, species, or botanical research.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="E.g., 'What are the evolutionary patterns in tropical plant species?'"
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <motion.div
                variants={searchIconVariants}
                animate={loading ? "searching" : "idle"}
                className="flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                {loading ? "Searching..." : "Search"}
              </motion.div>
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading && (
        <div className="flex justify-center py-12">
          <motion.div
            variants={searchIconVariants}
            animate="searching"
          >
            <Search className="w-12 h-12 text-emerald-600" />
          </motion.div>
        </div>
      )}

      {error && (
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      )}

      {responseData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Specimen Results */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-emerald-800">Specimen Results</CardTitle>
            </CardHeader>
            <CardContent>
              {responseData.results.length > 0 ? (
                responseData.results.map((result, index) => (
                  <div key={index} className="mb-4 border-b pb-2">
                    <h3 className="text-lg font-bold text-emerald-700">
                      {result.scientificName || result.commonName || "Unknown Specimen"}
                    </h3>
                    <p className="text-gray-600">
                      <b>Collected by: </b>{result.identifiedBy || "Unknown"} 
                      <br></br>
                      <b>Locality: </b> {result.locality || "Unknown"}


                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No specimen results found.</p>
              )}
            </CardContent>
          </Card>

          {/* Research Suggestions */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-emerald-800">Research Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{responseData.suggestions}</p>
            </CardContent>
          </Card>

          {/* References */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-emerald-800">References</CardTitle>
            </CardHeader>
            <CardContent>
              

              {responseData.references.length > 0 ? (
                responseData.references.map((ref, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <Book className="w-4 h-4" />
                    <Markdown>
                    {ref}
                    </Markdown>
                  </motion.a>
                ))
              ) : (
                <p className="text-gray-600">No references available.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ResearchAssistant;