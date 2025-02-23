
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Archive, Leaf, ArrowLeft } from 'lucide-react';

interface SearchState {
  query: string;
}

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { query } = (location.state as SearchState) || { query: '' };

  const mockResults = [
    {
      type: 'archives',
      title: 'University Charter',
      year: 1887,
      description: 'Original university charter document',
      icon: <Archive className="w-5 h-5" />
    },
    {
      type: 'herbaria',
      title: 'Rosa californica',
      year: 1823,
      description: 'First documented California wild rose specimen',
      icon: <Leaf className="w-5 h-5" />
    }
  ];

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

      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      <p className="text-gray-600 mb-6">Showing results for: "{query}"</p>

      <div className="grid gap-4">
        {mockResults.map((result, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className={`p-2 rounded-full bg-${result.type === 'archives' ? 'indigo' : 'emerald'}-100`}>
                {result.icon}
              </div>
              <div>
                <CardTitle>{result.title}</CardTitle>
                <p className="text-sm text-gray-500">{result.year}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{result.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
