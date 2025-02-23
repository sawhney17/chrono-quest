
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import DatasetViewer from "@/pages/DatasetViewer";
import NotFound from "@/pages/NotFound";
import VideoChat from "@/pages/VideoChat/VideoChat";
import Timeline from "@/pages/Timeline/Timeline";
import TimelineQuiz from "@/pages/TimelineQuiz";
import MultipleChoiceQuizPage from "@/pages/MultipleChoiceQuizPage";
import Dashboard from "./pages/Dashboard";
import CSVLoader from "./components/CSVLoader";
import PlantStory from '@/components/PlantStory';
import { useState } from "react";
import SearchResults from "./pages/SearchResults";
import ArchivesDashboard from "./pages/ArchivesDashboard";
import HerbariaDashboard from "./pages/HerbariaDashboard";
import ResearchAssistant from "./components/ResearchAssistant";

const queryClient = new QueryClient();

const App = () => {
  const [data, setData] = useState([]);
  const csvFilePath = '/runaway.csv';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dataset/:type" element={<DatasetViewer />} />
            <Route path="/dataset/archives" element={<ArchivesDashboard />} />
            <Route path="/dataset/herbaria" element={<HerbariaDashboard />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/plant-story" element={<PlantStory />} />
            <Route path="/video-chat" element={<VideoChat />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/quiz" element={<TimelineQuiz />} />
            <Route path="/research-assistant" element={<ResearchAssistant />} />
            <Route path="/multiple-choice" element={<MultipleChoiceQuizPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
