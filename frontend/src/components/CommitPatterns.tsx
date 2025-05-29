import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface CommitPatternsProps {
  patterns: {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
  };
}

const CommitPatterns = ({ patterns }: CommitPatternsProps) => {
  const data = {
    labels: ['Manhã (6h-12h)', 'Tarde (12h-18h)', 'Noite (18h-22h)', 'Madrugada (22h-6h)'],
    datasets: [
      {
        data: [
          patterns.morning,
          patterns.afternoon,
          patterns.evening,
          patterns.night,
        ],
        backgroundColor: [
          'rgba(88, 166, 255, 0.5)',  // Morning
          'rgba(35, 134, 54, 0.5)',   // Afternoon
          'rgba(218, 153, 34, 0.5)',  // Evening
          'rgba(248, 81, 73, 0.5)',   // Night
        ],
        borderColor: [
          'rgba(88, 166, 255, 1)',
          'rgba(35, 134, 54, 1)',
          'rgba(218, 153, 34, 1)',
          'rgba(248, 81, 73, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#7d8590',
        },
      },
    },
  };

  return (
    <Card className="border-[#30363d] bg-[#161b22]">
      <CardHeader>
        <CardTitle className="text-[#c9d1d9]">Padrões de Commit</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Pie data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CommitPatterns; 