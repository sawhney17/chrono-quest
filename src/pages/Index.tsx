
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BookOpen, Search, Sparkles, Archive, Clock, MessageCircleQuestion, Leaf, ScrollText, ChartBar, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import VideoChat from './VideoChat/VideoChat';

const collections = {
  archives: {
    title: 'University Archives',
    description: 'Journey through historical documents and university records',
    icon: <Archive className="w-6 h-6 text-indigo-500" />,
    route: '/dataset/archives',
    features: [
      'Interactive Timeline Visualization',
      'Document Analysis Dashboard',
      'Historical Network Graphs',
      'Event Pattern Analysis'
    ],
    color: 'indigo'
  },
  herbaria: {
    title: 'Digital Herbaria',
    description: 'Discover the fascinating world of botanical specimens',
    icon: <Leaf className="w-6 h-6 text-emerald-500" />,
    route: '/dataset/herbarias',
    features: [
      'Specimen Distribution Maps',
      'Species Relationship Networks',
      'Temporal Collection Patterns',
      'Environmental Data Correlation'
    ],
    color: 'emerald'
  }
};

const randomFacts = [
  {
    collection: 'archives',
    fact: 'Did you know? The university\'s first building was constructed in 1887!',
    icon: <Clock className="w-8 h-8 text-indigo-500" />
  },
  {
    collection: 'herbaria',
    fact: 'Amazing! Our oldest preserved specimen dates back to 1823.',
    icon: <Leaf className="w-8 h-8 text-emerald-500" />
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [randomFact, setRandomFact] = useState(randomFacts[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or filter dashboard based on query
      navigate('/search', { state: { query: searchQuery } });
    }
  };

  const getNewRandomFact = () => {
    const newFact = randomFacts[Math.floor(Math.random() * randomFacts.length)];
    setRandomFact(newFact);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Hero Section with Search */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">
              Chrono-Quest
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover historical documents and botanical specimens through interactive visualizations and AI-powered insights
            </p>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
              <Input
                type="text"
                placeholder="Search across all collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </form>
          </div>

          {/* Random Fact Card */}
          <Card className="mx-auto max-w-2xl cursor-pointer hover:bg-gray-50 transition-colors border-amber-200">
            <CardContent className="p-6">
            <VideoChat />
            </CardContent>
          </Card>

          {/* Collection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(collections).map(([key, collection]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => navigate(collection.route)}
                className="cursor-pointer"
              >
                <Card className={`border-${collection.color}-200 hover:shadow-lg transition-shadow`}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {collection.icon}
                      <div>
                        <CardTitle className={`text-2xl text-${collection.color}-800`}>
                          {collection.title}
                        </CardTitle>
                        <CardDescription>{collection.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h4 className="font-semibold">Featured Visualizations:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {collection.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <ChartBar className={`w-4 h-4 text-${collection.color}-500`} />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full mt-4 bg-${collection.color}-500 hover:bg-${collection.color}-600`}
                        onClick={() => navigate(collection.route)}
                      >
                        Explore Dashboard
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
