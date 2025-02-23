
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, ScrollText, Network, BarChart as BarChartIcon, Search, Filter, Calendar, Tag } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

// Mock data for newspapers
const mockNewspapers = [
  { year: 1987, articles: 245, topics: ['Local Politics', 'Public Health', 'Social Events'] },
  { year: 1986, articles: 312, topics: ['Railroad Expansion', 'Business News', 'Crime Reports'] },
  { year: 1985, articles: 289, topics: ['Immigration News', 'Market Prices', 'Theater Reviews'] },
  { year: 1984, articles: 401, topics: ['Industrial Growth', 'Labor Movement', 'Public Health', 'City Expansion'] },
];

const mockTopics = [
  { name: 'Student Organization', count: 156 },
  { name: 'Administration', count: 142 },
  { name: 'Social Events', count: 98 },
  { name: 'Public Health', count: 87 },
  { name: 'Theater Reviews', count: 76 },
];

const mockTrendData = mockNewspapers.map(paper => ({
  year: paper.year,
  articles: paper.articles,
}));

const ArchivesDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Historical Newspaper Archives</h1>
          <p className="text-gray-600">Explore articles and coverage from the late 19th century</p>
        </div>
        <Button 
          onClick={() => navigate('/timeline')}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Clock className="w-4 h-4 mr-2" />
          View Timeline
        </Button>
      </div>

      {/* Search and Filter Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search historical articles..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter by Topic
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Publication Date
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChartIcon className="w-4 h-4 mr-2" />
            Archive Overview
          </TabsTrigger>
          <TabsTrigger value="trends">
            <Clock className="w-4 h-4 mr-2" />
            Publication Trends
          </TabsTrigger>
          <TabsTrigger value="topics">
            <Tag className="w-4 h-4 mr-2" />
            News Categories
          </TabsTrigger>
          <TabsTrigger value="browse">
            <ScrollText className="w-4 h-4 mr-2" />
            Browse Papers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Published Articles by Year</CardTitle>
                <CardDescription>Historical publication frequency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="articles" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular News Categories</CardTitle>
                <CardDescription>Most covered topics in archives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockTopics} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>News Coverage Over Time</CardTitle>
              <CardDescription>Historical reporting patterns and volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="articles" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics">
          <div className="grid gap-6">
            {mockTopics.map((topic, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{topic.name}</CardTitle>
                  <CardDescription>{topic.count} news articles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${(topic.count / mockTopics[0].count) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-4 text-sm text-gray-600">
                      {Math.round((topic.count / mockTopics[0].count) * 100)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="browse">
          <div className="space-y-6">
            {mockNewspapers.map((paper, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">News Archive - {paper.year}</CardTitle>
                  <CardDescription>{paper.articles} articles from this year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {paper.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  <a href="https://www.dropbox.com/scl/fo/3ci16qi1smkomcnzuojdy/AE1x8mdsteBmrBUDj5mG8Dk/1987?rlkey=mkc0l42dpmhexd4bfrr7rmpp2&e=1&dl=0"><Button className="mt-4" variant="outline" >
                    View Articles
                  </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArchivesDashboard;
