import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Filter, Download, Share2, Leaf, Search, ScrollText, TreePine, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import PlantMatchingGame from '@/components/PlantMatchingGame';
import PlantDiscoveryStory from '@/components/PlantDiscoveryStory';
import Timeline from '@/components/Timeline';
import ResearchAssistant from '@/components/ResearchAssistant';

const DatasetViewer = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'story' | 'explore' | 'quiz' | 'timeline'>('story');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [completedStories, setCompletedStories] = useState(0);

  const herbariaTimelineEvents = [
    {
      date: "January 1912",
      title: "First Specimen Collection",
      description: "Discovery of a new species in the Amazon rainforest",
      longDescription: "During an expedition led by renowned botanist...",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      funFact: "This specimen was preserved using a revolutionary technique for its time",
      thinkAboutIt: "How do you think botanical preservation methods have evolved since 1912?",
      color: "emerald"
    },
    // ... Add more events
  ];

  const archiveTimelineEvents = [
    {
      date: "March 1912",
      title: "Local Newspaper Coverage",
      description: "First public announcement of the botanical discovery",
      longDescription: "The newspaper article detailed the significance...",
      image: "https://images.unsplash.com/photo-1566378246598-5b11a0d486cc",
      funFact: "This was the first time a botanical discovery made front page news",
      thinkAboutIt: "How has scientific news coverage changed over the past century?",
      color: "blue"
    },
    // ... Add more events
  ];

  const navigateToDashboard = () => {
    if (type === 'archives') {
      navigate('/dataset/archives');
    } else if (type === 'herbaria') {
      navigate('/dataset/herbaria');
    }
  };

  const handleStoryCompletion = () => {
    if (type === 'herbaria' && completedStories === 2) {
      toast.success("You've unlocked the Plant Story Explorer!");
      setTimeout(() => {
        navigate('/plant-story');
      }, 2000);
    } else {
      setCompletedStories(prev => prev + 1);
      toast.success("Great job! Keep exploring to unlock more features!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Collections
            </Button>
            <Button 
              variant="default"
              onClick={navigateToDashboard}
              className="flex items-center gap-2"
            >
              {type === 'archives' ? (
                <>
                  <ScrollText className="w-4 h-4" />
                  Open Archives Dashboard
                </>
              ) : (
                <>
                  <Leaf className="w-4 h-4" />
                  Open Herbaria Dashboard
                </>
              )}
            </Button>
          </div>

          <div className="flex gap-2 mb-6 justify-center">
            {(['story', 'explore', 'quiz', 'timeline'] as const).map((view) => (
              <Button
                key={view}
                variant={activeView === view ? 'default' : 'outline'}
                onClick={() => setActiveView(view)}
                className="capitalize flex items-center gap-2"
              >
                {view === 'timeline' && <Clock className="w-4 h-4" />}
                {view === 'story' && 'Story Mode'}
                {view === 'explore' && 'Explorer Lab'}
                {view === 'quiz' && 'Knowledge Check'}
                {view === 'timeline' && 'Historical Timeline'}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeView === 'story' && (
                <PlantDiscoveryStory 
                  onComplete={handleStoryCompletion}
                  type={type}
                />
              )}

              {activeView === 'timeline' && (
                <Timeline 
                  timelineEvents={type === 'herbaria' ? herbariaTimelineEvents : archiveTimelineEvents}
                />
              )}

              {activeView === 'explore' && (
                <div className="space-y-8">
                  {type === 'herbaria' && (
                    <ResearchAssistant />
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {type === 'herbaria' ? (
                      <>
                        <Card className="p-6 bg-white/90 hover:bg-white transition-colors cursor-pointer"
                              onClick={() => navigate('/dataset/herbaria')}>
                          <div className="flex flex-col items-center text-center space-y-4">
                            <Leaf className="w-12 h-12 text-emerald-500" />
                            <h3 className="text-xl font-semibold">Digital Collection</h3>
                            <p className="text-gray-600">Explore our digitized plant specimens</p>
                          </div>
                        </Card>
                        
                        <Card className="p-6 bg-white/90 hover:bg-white transition-colors cursor-pointer"
                              onClick={() => navigate('/plant-story')}>
                          <div className="flex flex-col items-center text-center space-y-4">
                            <TreePine className="w-12 h-12 text-emerald-500" />
                            <h3 className="text-xl font-semibold">Plant Stories</h3>
                            <p className="text-gray-600">Discover the fascinating stories of plants</p>
                          </div>
                        </Card>
                      </>
                    ) : (
                      <Card className="p-6 bg-white/90 hover:bg-white transition-colors cursor-pointer"
                            onClick={() => navigate('/research-assistant')}>
                        <div className="flex flex-col items-center text-center space-y-4">
                          <ScrollText className="w-12 h-12 text-emerald-500" />
                          <h3 className="text-xl font-semibold">Research Assistant</h3>
                          <p className="text-gray-600">Use an AI assistant to conduct better research and learn more through a database</p>
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              )}

              {activeView === 'quiz' && (
                <PlantMatchingGame onComplete={handleStoryCompletion} />
              )}
            </motion.div>
          </AnimatePresence>

          {type === 'herbaria' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-lg"
            >
              <h3 className="text-center font-semibold text-emerald-800 mb-4">
                Progress: {completedStories}/3 Activities
              </h3>
              <div className="flex justify-center gap-4">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full ${
                      index < completedStories ? 'bg-emerald-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              {completedStories === 2 && (
                <p className="text-center text-sm text-emerald-600 mt-4">
                  Complete one more activity to unlock the Plant Story Explorer!
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DatasetViewer;
