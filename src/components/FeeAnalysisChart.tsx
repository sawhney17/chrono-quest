
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface SpecimenData {
  family?: string;
  [key: string]: any;
}

interface ChartDataPoint {
  family: string;
  specimens: number;
}

const FeeAnalysisChart = ({ data }: { data: SpecimenData[] }) => {
  // Count specimens by family
  const familyCounts = data.reduce((acc: { [key: string]: number }, item) => {
    if (item.family && item.specimens) {
      acc[item.family] = (acc[item.family] || 0) + item.specimens;
    }
    return acc;
  }, {});

  // Convert to array and sort by count
  const chartData: ChartDataPoint[] = Object.entries(familyCounts)
    .map(([family, count]) => ({
      family,
      specimens: count
    }))
    .sort((a, b) => b.specimens - a.specimens)
    .slice(0, 10); // Show top 10 families

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="family"
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
            label={{ value: 'Plant Family', position: 'bottom', offset: 50 }}
          />
          <YAxis
            label={{ 
              value: 'Number of Specimens',
              angle: -90,
              position: 'left'
            }}
          />
          <Tooltip />
          <Bar dataKey="specimens" fill="#2ecc71" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeeAnalysisChart;
