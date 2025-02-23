import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Leaf, TreePine, Sprout, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { setYear } from 'date-fns';

interface PlantDiscoveryStoryProps {
  onComplete: () => void;
  type?: string;
}

interface TaxonomyLevel {
  name: string;
  description: string;
  funFact: string;
  image: string;
}

// A mapping from taxonomy names to their corresponding icons.
const iconMapping: { [key: string]: React.ReactNode } = {
  "Kingdom Plantae": <TreePine className="w-8 h-8 text-emerald-600" />,
  "Division Tracheophyta": <Sprout className="w-8 h-8 text-emerald-600" />,
  "Class Liliopsida": <Leaf className="w-8 h-8 text-emerald-600" />,
  "Order Poales": <Sprout className="w-8 h-8 text-emerald-600" />,
  "Family Cyperaceae": <Leaf className="w-8 h-8 text-emerald-600" />
};

const PlantDiscoveryStory: React.FC<PlantDiscoveryStoryProps> = ({ onComplete, type }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showFunFact, setShowFunFact] = useState(false);
  const [taxonomyJourney, setTaxonomyJourney] = useState<TaxonomyLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [publisheddate, setPublishedDate] = useState("January 1912");
  const [error, setError] = useState<string | null>(null);

  // The year of the plant discovery.
  const [year, setYear] = useState("1912");

  useEffect(() => {
    setYear(publisheddate.split("-")[0]);
  }
  , [publisheddate]);

  // Fetch the taxonomy journey data from the backend on component mount.
  useEffect(() => {
    fetch("http://127.0.0.1:5000/taxonomy_journey")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch taxonomy journey data");
          console.log("AWWW")
        }
        return response.json();
      })
      .then((data: TaxonomyLevel[]) => {
        console.log("Taxonomy Journey Data:", data);

        // remove teh last item in the array
        
        const date = data.pop();
        // it will be in tihs format 2000-10-01T00:00:00
        console.log(date)
        // @ts-expect-error is stupid
        setPublishedDate(date.date.split("T")[0]);

        setTaxonomyJourney(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    if (currentLevel < taxonomyJourney.length - 1) {
      setShowFunFact(false);
      setCurrentLevel(prev => prev + 1);
      toast.success("Great job! Let's learn about the next level!");
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentLevel > 0) {
      setShowFunFact(false);
      setCurrentLevel(prev => prev - 1);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const currentItem = taxonomyJourney[currentLevel];
  const currentIcon = iconMapping[currentItem.name] || <Leaf className="w-8 h-8 text-emerald-600" />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">
          Time Travel to {year}: A Plant Discovery Journey
        </h2>
        <p className="text-emerald-600">
          Follow the path of classification for a plant discovered on {publisheddate}
        </p>
      </motion.div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Card className="p-6 bg-white/90 backdrop-blur-sm hover:bg-white transition-colors">
              <div className="flex items-center gap-4 mb-4">
                {currentIcon}
                <h3 className="text-xl font-semibold text-emerald-700">
                  {currentItem.name}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{currentItem.description}</p>
              <Button 
                onClick={() => setShowFunFact(prev => !prev)}
                variant="outline"
                className="w-full"
              >
                {showFunFact ? "Hide Fun Fact" : "Show Fun Fact"}
              </Button>
              <AnimatePresence>
                {showFunFact && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-emerald-50 rounded-lg"
                  >
                    <p className="text-emerald-700">{currentItem.funFact}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            <div className="relative h-64 rounded-lg overflow-hidden">
              <img
                src={currentItem.image}
                alt={currentItem.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <Button
            onClick={handlePrevious}
            disabled={currentLevel === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Level
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentLevel === taxonomyJourney.length - 1}
            className="flex items-center gap-2"
          >
            Next Level
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {taxonomyJourney.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentLevel ? 'bg-emerald-600' : 'bg-emerald-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlantDiscoveryStory;