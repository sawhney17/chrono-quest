
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, Map, Network, BarChart, Clock } from 'lucide-react';
import MapVisualization from '@/components/MapVisualization';
import FeeAnalysisChart from '@/components/FeeAnalysisChart';
import Timeline from '@/components/Timeline';
import HorizontalTimeline from '@/components/HorizontalTimeline';

const HerbariaDashboard = () => {
  const navigate = useNavigate();

  const mockSpecimenData = [
    { family: "Asteraceae", specimens: 4582 },
    { family: "Orchidaceae", specimens: 4068 },
    { family: "Cyperaceae", specimens: 3168 },
    { family: "Rosaceae", specimens: 1298 },
    { family: "Fabaceae", specimens: 1117 },
    
  ];


  const mockLocationData = [
    {
      "stateProvince": "Connecticut",
      "scientificName": "Scapania nemorea (L.) Grolle",
      "decimalLatitude": 41.6032,
      "decimalLongitude": -73.0877
    },
    {
      "stateProvince": "New Jersey",
      "scientificName": "Heliotropium supinum L.",
      "decimalLatitude": 40.0583,
      "decimalLongitude": -74.4057
    },
    {
      "stateProvince": "Texas",
      "scientificName": "Obione occidentalis var. angustifolia Torr.",
      "decimalLatitude": 31.0,
      "decimalLongitude": -100.0
    },
    {
      "stateProvince": "Massachusetts",
      "scientificName": "Carex crinita var. crinita",
      "decimalLatitude": 42.4072,
      "decimalLongitude": -71.3824
    },
    {
      "stateProvince": "Wyoming",
      "scientificName": "Acarospora strigata (Nyl.) Jatta",
      "decimalLatitude": 43.07597,
      "decimalLongitude": -107.29028
    },
    {
      "stateProvince": "Connecticut",
      "scientificName": "Carex cephaloidea (Dewey) Dewey",
      "decimalLatitude": 41.6032,
      "decimalLongitude": -73.0877
    },
    {
      "stateProvince": "Texas",
      "scientificName": "Diodia virginiana L.",
      "decimalLatitude": 31.0,
      "decimalLongitude": -100.0
    },
    {
      "stateProvince": "New Mexico",
      "scientificName": "Thalictrum fendleri Engelm. ex A.Gray",
      "decimalLatitude": 34.3071,
      "decimalLongitude": -106.0181
    },
    {
      "stateProvince": "New Mexico",
      "scientificName": "Bahia biternata A.Gray",
      "decimalLatitude": 34.3071,
      "decimalLongitude": -106.0181
    },
    {
      "stateProvince": "New York",
      "scientificName": "Thalictrum dioicum L.",
      "decimalLatitude": 40.7128,
      "decimalLongitude": -74.006
    },
    {
      "stateProvince": "South Carolina",
      "scientificName": "Bacopa caroliniana (Walter) B.L.Rob.",
      "decimalLatitude": 33.8361,
      "decimalLongitude": -81.1637
    },
    {
      "stateProvince": "Rhode Island",
      "scientificName": "Carex festucacea Willd.",
      "decimalLatitude": 41.5801,
      "decimalLongitude": -71.4774
    },
    {
      "stateProvince": "California",
      "scientificName": "Bacidina californica S.Ekman",
      "decimalLatitude": 36.7783,
      "decimalLongitude": -119.4179
    },
    {
      "stateProvince": "California",
      "scientificName": "Hesperomecon linearis (Benth.) Greene",
      "decimalLatitude": 36.7783,
      "decimalLongitude": -119.4179
    },
    {
      "stateProvince": "Georgia",
      "scientificName": "Indigofera caroliniana Mill.",
      "decimalLatitude": 32.1656,
      "decimalLongitude": -82.9001
    },
    {
      "stateProvince": "Texas",
      "scientificName": "Coreopsis tinctoria Nutt.",
      "decimalLatitude": 31.0,
      "decimalLongitude": -100.0
    },
    {
      "stateProvince": "Rhode Island",
      "scientificName": "Carex hormathodes Fernald",
      "decimalLatitude": 41.5801,
      "decimalLongitude": -71.4774
    },
    {
      "stateProvince": "Maine",
      "scientificName": "Carex intumescens Rudge",
      "decimalLatitude": 45.2538,
      "decimalLongitude": -69.4455
    },
    {
      "stateProvince": "Arizona",
      "scientificName": "Anisacanthus thurberi (Torr.) A.Gray",
      "decimalLatitude": 34.0489,
      "decimalLongitude": -111.0937
    },
    {
      "stateProvince": "California",
      "scientificName": "Ramalina subleptocarpha Rundel & Bowler",
      "decimalLatitude": 36.7783,
      "decimalLongitude": -119.4179
    },
    {
      "stateProvince": "Maine",
      "scientificName": "Carex crawfordii Fernald",
      "decimalLatitude": 45.2538,
      "decimalLongitude": -69.4455
    },
    {
      "stateProvince": "South Dakota",
      "scientificName": "Orthocarpus luteus Nutt.",
      "decimalLatitude": 44.5,
      "decimalLongitude": -100.0
    },
    {
      "stateProvince": "Ohio",
      "scientificName": "Phlox maculata L.",
      "decimalLatitude": 40.3675,
      "decimalLongitude": -82.9962
    },
    {
      "stateProvince": "Arizona",
      "scientificName": "Cassia wrightii A.Gray",
      "decimalLatitude": 34.0489,
      "decimalLongitude": -111.0937
    },
    {
      "stateProvince": "Massachusetts",
      "scientificName": "Carex deweyana var. deweyana",
      "decimalLatitude": 42.4072,
      "decimalLongitude": -71.3824
    },
    {
      "stateProvince": "Vermont",
      "scientificName": "Carex cristatella Britton",
      "decimalLatitude": 44.0,
      "decimalLongitude": -72.6997
    },
    {
      "stateProvince": "Rhode Island",
      "scientificName": "Scirpus olneyi A.Gray",
      "decimalLatitude": 41.5801,
      "decimalLongitude": -71.4774
    },
    {
      "stateProvince": "Texas",
      "scientificName": "Phyllanthopsis phyllanthoides (Nutt.) Voronts. & Petra Hoffm.",
      "decimalLatitude": 31.0,
      "decimalLongitude": -100.0
    },
    {
      "stateProvince": "Texas",
      "scientificName": "Forestiera pubescens Nutt.",
      "decimalLatitude": 31.0,
      "decimalLongitude": -100.0
    },
    {
      "stateProvince": "Texas",
      "scientificName": "Haematomma persoonii (F\u00e9e) A.Massal.",
      "decimalLatitude": 31.0,
      "decimalLongitude": -100.0
    },
    {
      "stateProvince": "Maine",
      "scientificName": "Carex digitalis var. digitalis",
      "decimalLatitude": 45.2538,
      "decimalLongitude": -69.4455
    },
    {
      "stateProvince": "Pennsylvania",
      "scientificName": "Sisyrinchium montanum Greene",
      "decimalLatitude": 41.2033,
      "decimalLongitude": -77.1945
    }
  ]

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
          <h1 className="text-3xl font-bold">Digital Herbaria Dashboard</h1>
          <p className="text-gray-600">Explore botanical specimens and their distributions</p>
        </div>
      </div>

      <Tabs defaultValue="map" className="space-y-8">
        <TabsList>
          <TabsTrigger value="map">
            <Map className="w-4 h-4 mr-2" />
            Distribution Map
          </TabsTrigger>
          <TabsTrigger value="analysis">
            <BarChart className="w-4 h-4 mr-2" />
            Species Analysis
          </TabsTrigger>
          <TabsTrigger value="network">
            <Network className="w-4 h-4 mr-2" />
            Species Networks
          </TabsTrigger>
          <TabsTrigger value="temporal">
            <Clock className="w-4 h-4 mr-2" />
            Collection Timeline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Specimen Distribution Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] rounded-lg overflow-hidden">
                <MapVisualization data={mockLocationData} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Species Distribution by Family</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <FeeAnalysisChart data={mockSpecimenData} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network">
          <Card>
            <CardHeader>
              <CardTitle>Species Relationships</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Network visualization would go here */}
              <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500">Species Relationship Network</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent onClick={()=>{navigate("/timeline")}} value="temporal">
          <Card>
            <CardHeader>
              <CardTitle>Collection Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Timeline visualization would go here */}
              <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
                {/* render the timeline component */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HerbariaDashboard;
