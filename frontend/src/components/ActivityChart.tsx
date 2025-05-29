import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ActivityChartProps {
  activityHours: Record<string, number>;
}

const ActivityChart = ({ activityHours }: ActivityChartProps) => {
  const hours = Object.keys(activityHours).sort();
  const commits = hours.map(hour => activityHours[hour]);

  const data = {
    labels: hours,
    datasets: [
      {
        label: 'Commits por Hora',
        data: commits,
        backgroundColor: 'rgba(88, 166, 255, 0.5)',
        borderColor: 'rgba(88, 166, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#7d8590',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#7d8590',
        },
      },
    },
  };

  return (
    <Card className="border-[#30363d] bg-[#161b22]">
      <CardHeader>
        <CardTitle className="text-[#c9d1d9]">Distribuição de Atividade</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart; 